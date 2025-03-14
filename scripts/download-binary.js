const download = require('download');
const fs = require('fs');
const path = require('path');
const { platform, arch } = process;

// Get package version from package.json
const packageJson = require('../package.json');
const version = packageJson.version;

// GitHub repository information
const owner = 'karugamo';
const repo = 'node-enigo';

// Determine which binary to download based on platform and architecture
function getBinaryName() {
  if (platform === 'linux' && arch === 'x64') {
    return 'node-enigo-linux-x64.node';
  } else if (platform === 'linux' && arch === 'arm64') {
    return 'node-enigo-linux-arm64.node';
  } else if (platform === 'darwin' && arch === 'arm64') {
    return 'node-enigo-macos-arm64.node';
  }
  
  // Return null if no pre-built binary is available for this platform/arch
  return null;
}

async function main() {
  try {
    const binaryName = getBinaryName();
    
    // If no pre-built binary is available for this platform/arch, exit
    if (!binaryName) {
      console.log('No pre-built binary available for this platform/architecture. Will build from source.');
      return;
    }
    
    const downloadUrl = `https://github.com/${owner}/${repo}/releases/download/v${version}/${binaryName}`;
    const destDir = path.join(__dirname, '..');
    
    console.log(`Downloading binary from ${downloadUrl}...`);
    
    // Download the file to the destination directory
    await download(downloadUrl, destDir);

    console.log(`Successfully downloaded binary to ${path.join(destDir, binaryName)}`);
  } catch (error) {
    console.error('Error downloading binary:', error.message);
    console.log('Will fall back to building from source.');
  }
}

main(); 