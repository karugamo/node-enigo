const enigoExample = require('./index');
const readline = require('readline');

// Debug: Log what functions are available in the module
console.log('Available functions in enigoExample module:');
console.log(Object.keys(enigoExample));
console.log('Is typeText a function?', typeof enigoExample.typeText === 'function');
console.log('');

console.log('Running Enigo example from Node.js...');
console.log('');
console.log('NOTE: On macOS, you need to grant accessibility permissions to your terminal app:');
console.log('1. Go to System Preferences > Security & Privacy > Privacy > Accessibility');
console.log('2. Click the lock icon to make changes (enter your password)');
console.log('3. Add your terminal application to the list and check the checkbox');
console.log('');

// Create readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Prompt user for text to type
rl.question('Enter the text you want Enigo to type: ', (textToType) => {
  console.log('');
  console.log(`You have 4 seconds to switch to the window where you want the text "${textToType}" to be typed.`);
  console.log('');
  
  try {
    // Call the Rust function to type the text
    const result = enigoExample.typeText(textToType);
    console.log(result);
  } catch (error) {
    console.error('Error running Enigo example:', error);
  }

  console.log('');
  console.log('Enigo example completed.');
  console.log('If no text was typed, please check the permission settings mentioned above.');
  
  // Close the readline interface
  rl.close();
}); 