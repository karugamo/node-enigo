const fs = require('fs');
const path = require('path');
const { platform, arch } = process;

// Determine the extension based on the platform
const extension = platform === 'win32' ? '.dll' : platform === 'darwin' ? '.dylib' : '.so';

// Source path (where Cargo builds the binary)
const sourcePath = path.join(__dirname, '..', 'target', 'release', `libnode_enigo${extension}`);

// Destination path (where Node.js expects to find the binary)
const destPath = path.join(__dirname, '..', 'index.node');

// Platform-specific destination paths
const platformSpecificPaths = {
  linux: {
    x64: path.join(__dirname, '..', 'node-enigo-linux-x64.node')
  },
  darwin: {
    arm64: path.join(__dirname, '..', 'node-enigo-macos-arm64.node')
  }
};

try {
  // Copy the binary to the standard location
  fs.copyFileSync(sourcePath, destPath);
  console.log(`Successfully copied binary from ${sourcePath} to ${destPath}`);
  
  // If we're on a platform/arch that has a specific path, copy there too
  if (platformSpecificPaths[platform] && platformSpecificPaths[platform][arch]) {
    const platformSpecificPath = platformSpecificPaths[platform][arch];
    fs.copyFileSync(sourcePath, platformSpecificPath);
    console.log(`Successfully copied binary from ${sourcePath} to ${platformSpecificPath}`);
  }
} catch (error) {
  console.error('Error copying binary:', error);
  process.exit(1);
} 