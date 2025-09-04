const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Create temp directory structure
const tempDir = path.join(__dirname, 'temp-package');
const packageDir = path.join(tempDir, 'package');

// Clean up old temp directory
if (fs.existsSync(tempDir)) {
    fs.rmSync(tempDir, { recursive: true });
}

// Create package directory
fs.mkdirSync(packageDir, { recursive: true });

// Copy files from pkg directory
const filesToCopy = [
    'package.json',
    'main.js', 
    'yarn.lock'
];

// Copy main files
filesToCopy.forEach(file => {
    const src = path.join(__dirname, 'pkg', file);
    const dest = path.join(packageDir, file);
    if (fs.existsSync(src)) {
        fs.copyFileSync(src, dest);
        console.log(`Copied ${file}`);
    }
});

// Create companion directory and copy manifest
const companionDir = path.join(packageDir, 'companion');
fs.mkdirSync(companionDir, { recursive: true });

// Copy manifest.json
const manifestSrc = path.join(__dirname, 'pkg', 'companion', 'manifest.json');
const manifestDest = path.join(companionDir, 'manifest.json');
if (fs.existsSync(manifestSrc)) {
    fs.copyFileSync(manifestSrc, manifestDest);
    console.log('Copied companion/manifest.json');
}

// Copy HELP.md
const helpSrc = path.join(__dirname, 'pkg', 'companion', 'HELP.md');
const helpDest = path.join(companionDir, 'HELP.md');
if (fs.existsSync(helpSrc)) {
    fs.copyFileSync(helpSrc, helpDest);
    console.log('Copied companion/HELP.md');
}

// Create the tarball
try {
    process.chdir(tempDir);
    execSync('tar czf ../generic-showswitcher-2.0.5.tgz package/');
    console.log('Package created successfully: generic-showswitcher-2.0.5.tgz');
    
    // Clean up temp directory
    process.chdir('..');
    fs.rmSync(tempDir, { recursive: true });
    
    // Show package info
    const stats = fs.statSync('generic-showswitcher-2.0.5.tgz');
    console.log(`Package size: ${(stats.size / 1024).toFixed(1)} KB`);
} catch (error) {
    console.error('Error creating package:', error);
}