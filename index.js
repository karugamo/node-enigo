const { existsSync } = require('fs')
const { join } = require('path')
const { platform, arch } = process

let nativeBinding = null

function getPlatformSpecificBinary() {
  // Map platform and architecture to binary name
  if (platform === 'linux' && arch === 'x64') {
    return 'node-enigo-linux-x64.node'
  } else if (platform === 'darwin') {
    if (arch === 'arm64') {
      return 'node-enigo-macos-arm64.node'
    } else if (arch === 'x64') {
      // Fallback to the default binary for macOS x64
      return 'index.node'
    }
  }
  
  // Default to the standard binary
  return 'index.node'
}

try {
  // First try to load the platform-specific binary
  const platformSpecificPath = join(__dirname, getPlatformSpecificBinary())
  
  // Then try the default binary path
  const defaultBinaryPath = join(__dirname, 'index.node')
  
  if (existsSync(platformSpecificPath)) {
    nativeBinding = require(platformSpecificPath)
  } else if (existsSync(defaultBinaryPath)) {
    nativeBinding = require('./index.node')
  } else {
    throw new Error(`Native binding not found at ${defaultBinaryPath} or platform-specific path`)
  }
} catch (error) {
  throw new Error(`Failed to load native binding: ${error.message}. Platform: ${platform}, Architecture: ${arch}`)
}

// Export the native binding directly
module.exports = nativeBinding;