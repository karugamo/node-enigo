const { existsSync } = require("fs");
const { join } = require("path");
const { platform, arch } = process;

let nativeBinding = null;

function getPlatformSpecificBinary() {
  // Map platform and architecture to binary name
  if (platform === "linux") {
    if (arch === "x64") {
      return "node-enigo-linux-x64.node";
    } else if (arch === "arm64") {
      return "node-enigo-linux-arm64.node";
    }
  } else if (platform === "darwin") {
    if (arch === "arm64") {
      return "node-enigo-macos-arm64.node";
    }
  }

  // Instead of falling back to a default binary, throw an error for unsupported platforms
  throw new Error(
    `Unsupported platform or architecture: ${platform}-${arch}. Supported combinations are: linux-x64, linux-arm64, darwin-arm64`
  );
}

try {
  // Try to load the platform-specific binary
  const platformSpecificPath = join(__dirname, getPlatformSpecificBinary());

  if (existsSync(platformSpecificPath)) {
    nativeBinding = require(platformSpecificPath);
  } else {
    throw new Error(`Native binding not found at ${platformSpecificPath}`);
  }
} catch (error) {
  throw new Error(
    `Failed to load native binding: ${error.message}. Platform: ${platform}, Architecture: ${arch}`
  );
}

// Export the native binding directly
module.exports = nativeBinding;
