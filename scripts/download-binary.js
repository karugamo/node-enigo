const https = require('https');
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
  } else if (platform === 'darwin' && arch === 'arm64') {
    return 'node-enigo-macos-arm64.node';
  }
  
  // Return null if no pre-built binary is available for this platform/arch
  return null;
}

// Download a file from a URL to a local path
function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(destPath);
    
    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download file: ${response.statusCode} ${response.statusMessage}`));
        return;
      }
      
      response.pipe(file);
      
      file.on('finish', () => {
        file.close();
        resolve();
      });
      
      file.on('error', (err) => {
        fs.unlink(destPath, () => {}); // Delete the file on error
        reject(err);
      });
    }).on('error', (err) => {
      fs.unlink(destPath, () => {}); // Delete the file on error
      reject(err);
    });
  });
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
    const destPath = path.join(__dirname, '..', binaryName);
    
    console.log(`Downloading binary from ${downloadUrl}...`);
    
    await downloadFile(downloadUrl, destPath);
    
    console.log(`Successfully downloaded binary to ${destPath}`);
  } catch (error) {
    console.error('Error downloading binary:', error.message);
    console.log('Will fall back to building from source.');
  }
}

main(); 