const enigoExample = require('./index');
const readline = require('readline');

// Debug: Log what functions are available in the module
console.log('Available functions in enigoExample module:');
console.log(Object.keys(enigoExample));
console.log('Is typeText a function?', typeof enigoExample.typeText === 'function');
console.log('Is moveMouse a function?', typeof enigoExample.moveMouse === 'function');
console.log('Is mouseButton a function?', typeof enigoExample.mouseButton === 'function');
console.log('Is key a function?', typeof enigoExample.key === 'function');
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
console.log('3. Mouse button demo');
console.log('4. Combined demo (typing + mouse movement)');
console.log('5. Full demo (typing + mouse movement + buttons)');
console.log('6. Keyboard test (copy & paste)');

rl.question('Enter your choice (1-6): ', (choice) => {
  switch(choice) {
    case '1':
      runTypingDemo(rl);
      break;
    case '2':
      runMouseDemo();
      rl.close();
      break;
    case '3':
      runButtonDemo();
      rl.close();
      break;
    case '4':
      runCombinedDemo();
      rl.close();
      break;
    case '5':
      runFullDemo();
      rl.close();
      break;
    case '6':
      runKeyboardTest();
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

// Button demo
function runButtonDemo() {
  console.log('');
  console.log('You have 4 seconds before the mouse buttons will be tested...');
  console.log('The demo will perform various button actions (click, press, release).');
  console.log('');
  
  setTimeout(async () => {
    console.log('Starting mouse button test...');

    try {
      // First move to absolute position (300, 300)
      console.log('\nMoving to position (300, 300)...');
      await enigoExample.moveMouse(300, 300);
      
      // Wait for 1 second
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Click left button
      console.log('\nClicking left mouse button...');
      const result1 = await enigoExample.mouseButton('left', 'click');
      console.log('Result:', result1);
      
      // Wait for 1 second
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Test press and release
      console.log('\nTesting press and release of right button...');
      console.log('Pressing right mouse button...');
      const result2 = await enigoExample.mouseButton('right', 'press');
      console.log('Result:', result2);
      
      // Wait for 1 second
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      console.log('Releasing right mouse button...');
      const result3 = await enigoExample.mouseButton('right', 'release');
      console.log('Result:', result3);
      
      // Wait for 1 second
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Click middle button
      console.log('\nClicking middle mouse button...');
      const result4 = await enigoExample.mouseButton('middle', 'click');
      console.log('Result:', result4);
      
    } catch (error) {
      console.error('Error running button demo:', error);
    }

    console.log('\nButton demo completed.');
    console.log('If the buttons didn\'t work, please check the permission settings mentioned above.');
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

// Full demo
function runFullDemo() {
  console.log('');
  console.log('Running full demo with typing, mouse movement, and button actions...');
  console.log('You have 4 seconds to prepare...');
  console.log('');
  
  setTimeout(async () => {
    try {
      // Move mouse to position (300, 300)
      console.log('\nMoving mouse to position (300, 300)...');
      await enigoExample.moveMouse(300, 300);
      
      // Wait for 1 second
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Click left button
      console.log('\nClicking left mouse button...');
      await enigoExample.mouseButton('left', 'click');
      
      // Wait for 1 second
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Type some text
      console.log('\nTyping text...');
      await enigoExample.typeText('Hello from node-enigo! This is a full demo with typing and mouse actions.');
      
      // Wait for 1 second
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Move mouse relatively and perform right click
      console.log('\nMoving mouse relatively by (100, 50)...');
      await enigoExample.moveMouse(100, 50, true);
      
      // Wait for 0.5 seconds
      await new Promise(resolve => setTimeout(resolve, 500));
      
      console.log('\nClicking right mouse button...');
      await enigoExample.mouseButton('right', 'click');
      
    } catch (error) {
      console.error('Error running full demo:', error);
    }
    
    console.log('\nFull demo completed.');
    console.log('If the demo didn\'t work as expected, please check the permission settings mentioned above.');
  }, 4000);
}

// Keyboard test (copy and paste)
function runKeyboardTest() {
  // Determine the OS to use the correct modifier key
  const isMac = process.platform === 'darwin';
  const modifierKey = isMac ? 'cmd' : 'ctrl';
  
  console.log('');
  console.log('==== Keyboard Key Test (Copy & Paste) ====');
  console.log('This test will simulate keyboard shortcuts for copy and paste operations.');
  console.log('');
  console.log('Instructions:');
  console.log('1. Open a text editor or any application where text can be edited');
  console.log(`2. This test will first type some sample text`);
  console.log(`3. It will select all the text using ${modifierKey.toUpperCase()}+A`);
  console.log(`4. Then it will copy the text using ${modifierKey.toUpperCase()}+C`);
  console.log(`5. Finally, it will paste the text using ${modifierKey.toUpperCase()}+V`);
  console.log('');
  console.log('You have 5 seconds to prepare (open a text editor)...');
  
  setTimeout(async () => {
    try {
      // Type some text that can be selected
      console.log('\nTyping sample text...');
      await enigoExample.typeText('This is some text for testing keyboard shortcuts. ');
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Select all the text using Cmd+A or Ctrl+A
      console.log(`\nSelecting all text using ${modifierKey.toUpperCase()}+A...`);
      await enigoExample.keys([modifierKey, 'a']);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Copy the text using Cmd+C or Ctrl+C
      console.log(`\nCopying selected text using ${modifierKey.toUpperCase()}+C...`);
      await enigoExample.keys([modifierKey, 'c']);
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Type a newline to position cursor for paste
      console.log('\nMoving to a new line...');
      await enigoExample.key('return', 'click');
      await enigoExample.key('return', 'click');
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Paste the text using Cmd+V or Ctrl+V
      console.log(`\nPasting text using ${modifierKey.toUpperCase()}+V...`);
      await enigoExample.keys([modifierKey, 'v']);
      
    } catch (error) {
      console.error('Error running keyboard test:', error);
    }
    
    console.log('\nKeyboard test completed.');
    console.log('If the shortcuts didn\'t work, please check the permission settings mentioned above.');
  }, 5000);
} 