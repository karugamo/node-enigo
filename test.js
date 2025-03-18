const enigoExample = require('./index');
const readline = require('readline');

// Debug: Log what functions are available in the module
console.log('Available functions in enigoExample module:');
console.log(Object.keys(enigoExample));
console.log('Is typeText a function?', typeof enigoExample.typeText === 'function');
console.log('Is moveMouse a function?', typeof enigoExample.moveMouse === 'function');
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

// Display menu for selecting the demo type
console.log('Select a demo to run:');
console.log('1. Typing demo');
console.log('2. Mouse movement demo');
console.log('3. Combined demo (typing + mouse movement)');

rl.question('Enter your choice (1-3): ', (choice) => {
  switch(choice) {
    case '1':
      runTypingDemo(rl);
      break;
    case '2':
      runMouseDemo();
      rl.close();
      break;
    case '3':
      runCombinedDemo();
      rl.close();
      break;
    default:
      console.log('Invalid choice. Exiting.');
      rl.close();
  }
});

// Typing demo
function runTypingDemo(rl) {
  // Prompt user for text to type
  rl.question('Enter the text you want Enigo to type: ', (textToType) => {
    console.log('');
    console.log(`You have 4 seconds to switch to the window where you want the text "${textToType}" to be typed.`);
    console.log('');
    
    setTimeout(async () => {
      try {
        // Call the Rust function to type the text
        const result = await enigoExample.typeText(textToType);
        console.log(result);
      } catch (error) {
        console.error('Error running typing demo:', error);
      }

      console.log('');
      console.log('Typing demo completed.');
      console.log('If no text was typed, please check the permission settings mentioned above.');
      
      // Close the readline interface
      rl.close();
    }, 4000);
  });
}

// Mouse movement demo
function runMouseDemo() {
  console.log('');
  console.log('You have 4 seconds before the mouse will be moved...');
  console.log('The mouse cursor will move to different positions using both absolute and relative coordinates.');
  console.log('');
  
  setTimeout(async () => {
    console.log('Starting mouse movement test...');

    try {
      // First move to absolute position (100, 100)
      console.log('\nMoving to absolute position (100, 100)...');
      console.time('Absolute move');
      const result1 = await enigoExample.moveMouse(100, 100, false);
      console.timeEnd('Absolute move');
      console.log('Result:', result1);
      
      // Wait for 1 second
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Then move to absolute position (500, 500)
      console.log('\nMoving to absolute position (500, 500)...');
      console.time('Absolute move 2');
      const result2 = await enigoExample.moveMouse(500, 500);
      console.timeEnd('Absolute move 2');
      console.log('Result:', result2);
      
      // Wait for 1 second
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Move relatively by (50, 50)
      console.log('\nMoving relatively by (50, 50)...');
      console.time('Relative move');
      const result3 = await enigoExample.moveMouse(50, 50, true);
      console.timeEnd('Relative move');
      console.log('Result:', result3);
      
      // Wait for 1 second
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Move relatively by (-100, 50)
      console.log('\nMoving relatively by (-100, 50)...');
      console.time('Relative move 2');
      const result4 = await enigoExample.moveMouse(-100, 50, true);
      console.timeEnd('Relative move 2');
      console.log('Result:', result4);
    } catch (error) {
      console.error('Error running mouse demo:', error);
    }

    console.log('\nMouse demo completed.');
    console.log('If the mouse didn\'t move, please check the permission settings mentioned above.');
  }, 4000);
}

// Combined demo
function runCombinedDemo() {
  console.log('');
  console.log('Running combined typing and mouse movement demo...');
  console.log('You have 4 seconds to prepare...');
  console.log('');
  
  setTimeout(async () => {
    try {
      // First move mouse to position (300, 300)
      console.log('\nMoving mouse to position (300, 300)...');
      const moveResult1 = await enigoExample.moveMouse(300, 300);
      console.log('Result:', moveResult1);
      
      // Wait for 1 second
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Type some text
      console.log('\nTyping text...');
      const typeResult = await enigoExample.typeText('Hello from node-enigo! This is a combined demo.');
      console.log('Result:', typeResult);
      
      // Wait for 1 second
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Move mouse relatively
      console.log('\nMoving mouse relatively by (100, -50)...');
      const moveResult2 = await enigoExample.moveMouse(100, -50, true);
      console.log('Result:', moveResult2);
      
    } catch (error) {
      console.error('Error running combined demo:', error);
    }
    
    console.log('\nCombined demo completed.');
    console.log('If the demo didn\'t work as expected, please check the permission settings mentioned above.');
  }, 4000);
} 