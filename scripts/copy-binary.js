const fs = require('fs');
const path = require('path');
const { platform } = process;

// Determine the extension based on the platform
const extension = platform === 'win32' ? '.dll' : platform === 'darwin' ? '.dylib' : '.so';

// Source path (where Cargo builds the binary)
const sourcePath = path.join(__dirname, '..', 'target', 'release', `libenigo_example${extension}`);

// Destination path (where Node.js expects to find the binary)
const destPath = path.join(__dirname, '..', 'index.node');

try {
  // Copy the binary
  fs.copyFileSync(sourcePath, destPath);
  console.log(`Successfully copied binary from ${sourcePath} to ${destPath}`);
} catch (error) {
  console.error('Error copying binary:', error);
  process.exit(1);
} 