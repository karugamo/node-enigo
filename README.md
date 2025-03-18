# node-enigo

A Node.js binding for the Rust [enigo](https://github.com/enigo-rs/enigo) library, providing cross-platform keyboard and mouse automation.

## Installation

```bash
npm install node-enigo
```

## Usage

```javascript
const enigo = require('node-enigo');

// Type text (Promise-based, non-blocking)
await enigo.typeText('Hello, world!');

// Move mouse to absolute position (100, 100)
await enigo.moveMouse(100, 100);

// Move mouse relatively by (50, 50)
await enigo.moveMouse(50, 50, true);

// Or with Promise syntax
enigo.typeText('Hello, world!')
  .then(result => console.log(result))
  .catch(error => console.error(error));
```

## API

### `typeText(text: string): Promise<string>`

Types the specified text at the current cursor position. Returns a Promise that resolves with the result.

**Parameters:**
- `text` (string): The text to type

**Returns:**
- A Promise that resolves to a string with the result of the operation

**Example with async/await:**
```javascript
const enigo = require('node-enigo');

async function example() {
  try {
    // Type text with await
    const result = await enigo.typeText('Hello, world!');
    console.log(result);
  } catch (error) {
    console.error('Error:', error);
  }
}

example();
```

**Example with Promises:**
```javascript
const enigo = require('node-enigo');

// Type text with Promise syntax
enigo.typeText('Hello, world!')
  .then(result => console.log(result))
  .catch(error => console.error('Error:', error));
```

### `moveMouse(x: number, y: number, isRelative?: boolean): Promise<string>`

Moves the mouse cursor to the specified coordinates. By default, it uses absolute positioning, but relative movement can be enabled with the third parameter.

**Parameters:**
- `x` (number): The x-coordinate to move to (or the x-distance to move by, if using relative movement)
- `y` (number): The y-coordinate to move to (or the y-distance to move by, if using relative movement)
- `isRelative` (boolean, optional): If true, the movement will be relative to the current cursor position. Default is false (absolute positioning).

**Returns:**
- A Promise that resolves to a string with the result of the operation

**Example with absolute movement:**
```javascript
const enigo = require('node-enigo');

async function example() {
  try {
    // Move mouse to absolute position (100, 100)
    const result = await enigo.moveMouse(100, 100);
    console.log(result);
  } catch (error) {
    console.error('Error:', error);
  }
}

example();
```

**Example with relative movement:**
```javascript
const enigo = require('node-enigo');

async function example() {
  try {
    // Move mouse relatively by (50, 50)
    const result = await enigo.moveMouse(50, 50, true);
    console.log(result);
  } catch (error) {
    console.error('Error:', error);
  }
}

example();
```

## Supported Platforms

- **macOS**: x64, arm64
- **Windows**: x64, ia32
- **Linux**: x64, arm64

## Permissions

### macOS

On macOS, you need to grant accessibility permissions to the application running this code:

1. Go to System Preferences > Security & Privacy > Privacy > Accessibility
2. Click the lock icon to make changes (you'll need to enter your password)
3. Add your application to the list
4. Make sure the checkbox next to the application is checked

Without these permissions, the keyboard and mouse automation will not work.

### Windows

On Windows, the application respects the user's scaling settings.

### Linux

On Linux, make sure X11 permissions are set correctly.

## Examples

See the [example.js](./example.js), [non-blocking-example.js](./non-blocking-example.js), and [mouse-example.js](./mouse-example.js) files for usage examples.

## Building from Source

If you want to build the library from source:

```bash
git clone https://github.com/yourusername/node-enigo.git
cd node-enigo
npm install
npm run build
```

## Building and Distributing Binaries

This project uses GitHub Actions to automatically build and distribute binaries for multiple platforms and architectures.

### Supported Platforms in CI

- **Linux**: x64
- **macOS**: arm64

### How to Release

1. Create a new tag with the version number:
   ```bash
   git tag v1.2.0
   git push origin v1.2.0
   ```

2. The GitHub Actions workflow will automatically:
   - Build binaries for all supported platforms
   - Create a GitHub Release with the binaries attached
   - The binaries will be named according to their platform and architecture:
     - `node-enigo-linux-x64.node`
     - `node-enigo-macos-arm64.node`

### Manual Workflow Trigger

You can also manually trigger the build workflow from the GitHub Actions tab in your repository.

## License

MIT 