const enigo = require("./index");

// Example: Type text with async/await
console.log("Example: Type text with async/await");
console.log("You have 4 seconds to switch to a text editor or input field...");
console.log('The text "Hello from node-enigo! 👋" will be typed.');

// Wait for 4 seconds, then type the text
setTimeout(async () => {
  console.log("Starting non-blocking test...");

  // Start a counter to demonstrate non-blocking behavior
  let counter = 0;
  const intervalId = setInterval(() => {
    counter++;
    console.log(`Still running... (${counter})`);
  }, 10); // Log every 100ms

  console.log("Before typeText call - this should appear immediately");

  try {
    // Using await with the Promise-based typeText function
    console.time("typeText execution");
    const result = await enigo.typeText("Hello from node-enigo! 👋");
    console.timeEnd("typeText execution");
    console.log("Result:", result);
  } catch (error) {
    console.error("Error typing text:", error);
  }

  // Stop the counter
  clearInterval(intervalId);
  console.log(`Counter reached: ${counter}`);

  console.log("\nExample completed.");
  console.log(
    "If no text was typed, please check the accessibility permissions:"
  );
  console.log(
    "- On macOS: System Preferences > Security & Privacy > Privacy > Accessibility"
  );
  console.log(
    "- On Windows: Make sure the application has appropriate permissions"
  );
  console.log("- On Linux: Make sure X11 permissions are set correctly");
}, 4000);
