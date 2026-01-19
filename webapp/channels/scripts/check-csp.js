#!/usr/bin/env node
// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

/**
 * Build check script to ensure CSP is correctly configured in the built bundle.
 * 
 * This script:
 * - Fails if final bundle contains script-src 'self' without 'unsafe-eval'
 * - Warns if frame-ancestors appears in meta tag
 */

const fs = require('fs');
const path = require('path');

const DIST_DIR = path.join(__dirname, '..', 'dist');
const ROOT_HTML = path.join(DIST_DIR, 'root.html');

let errors = [];
let warnings = [];

// Check if root.html exists
if (!fs.existsSync(ROOT_HTML)) {
    console.error(`ERROR: Built file not found: ${ROOT_HTML}`);
    console.error('Please run "npm run build" first.');
    process.exit(1);
}

// Read the built HTML file
const htmlContent = fs.readFileSync(ROOT_HTML, 'utf8');

// Check for CSP meta tag(s) - there should be only one
// Extract CSP content by finding the meta tag and parsing the content attribute
const cspMatches = [];
const metaTagRegex = /<meta\s+http-equiv=['"]Content-Security-Policy['"][^>]*>/gi;
let match;
while ((match = metaTagRegex.exec(htmlContent)) !== null) {
    const metaTag = match[0];
    // Extract content attribute value - handle both single and double quotes
    const contentMatch = metaTag.match(/content=(["'])((?:(?!\1)[^\\]|\\.)*)\1/);
    if (contentMatch) {
        cspMatches.push([match[0], contentMatch[2]]);
    }
}

if (cspMatches.length === 0) {
    errors.push('No Content-Security-Policy meta tag found in built root.html');
} else if (cspMatches.length > 1) {
    errors.push(`Multiple Content-Security-Policy meta tags found (${cspMatches.length}). There should be only one.`);
    cspMatches.forEach((match, idx) => {
        errors.push(`  CSP ${idx + 1}: ${match[1]}`);
    });
} else {
    const cspContent = cspMatches[0][1]; // The content value
    
    // Check 1: Fail if script-src 'self' exists without 'unsafe-eval'
    // This pattern matches script-src 'self' that is NOT followed by 'unsafe-eval'
    // We need to be careful - we want to catch cases where 'self' appears but 'unsafe-eval' is missing
    const scriptSrcRegex = /script-src\s+['"]self['"]/i;
    if (scriptSrcRegex.test(cspContent)) {
        // Check if 'unsafe-eval' is present anywhere in the CSP
        if (!cspContent.includes("'unsafe-eval'") && !cspContent.includes('"unsafe-eval"')) {
            errors.push(
                `CSP contains script-src 'self' without 'unsafe-eval'. ` +
                `This will cause EvalError. Current CSP: ${cspContent}`
            );
        }
    }
    
    // Check 2: Warn if frame-ancestors appears in meta tag (it's ignored and causes warnings)
    if (cspContent.includes('frame-ancestors')) {
        warnings.push(
            `CSP meta tag contains 'frame-ancestors' which is ignored when delivered via <meta> element. ` +
            `Current CSP: ${cspContent}`
        );
    }
    
    // Check 3: Verify 'unsafe-eval' is present
    if (!cspContent.includes("'unsafe-eval'") && !cspContent.includes('"unsafe-eval"')) {
        errors.push(
            `CSP does not contain 'unsafe-eval' which is required for Snack build. ` +
            `Current CSP: ${cspContent}`
        );
    }
}

// Report results
if (warnings.length > 0) {
    console.warn('\n⚠️  WARNINGS:');
    warnings.forEach(warning => console.warn(`  - ${warning}`));
}

if (errors.length > 0) {
    console.error('\n❌ ERRORS:');
    errors.forEach(error => console.error(`  - ${error}`));
    console.error('\nBuild check failed. Please fix the CSP configuration.');
    process.exit(1);
}

if (warnings.length === 0 && errors.length === 0) {
    console.log('✅ CSP check passed!');
    console.log(`   Found CSP: ${cspMatches.length > 0 ? cspMatches[0][1] : 'N/A'}`);
}

process.exit(0);
