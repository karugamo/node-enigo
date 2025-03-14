const { existsSync } = require('fs')
const { join } = require('path')
const { platform, arch } = process

let nativeBinding = null

try {
  // Just try to load the binary directly
  const binaryPath = join(__dirname, 'index.node')
  
  if (existsSync(binaryPath)) {
    nativeBinding = require('./index.node')
  } else {
    throw new Error(`Native binding not found at ${binaryPath}`)
  }
} catch (error) {
  throw new Error(`Failed to load native binding: ${error.message}. Platform: ${platform}, Architecture: ${arch}`)
}

// Export the native binding directly
module.exports = nativeBinding;