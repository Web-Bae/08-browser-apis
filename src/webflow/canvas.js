document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.querySelector("#canvas");
  const ctx = canvas.getContext("2d");
  const brushSize = document.querySelector("#brush-size");
  const colorPicker = document.querySelector("#color-picker");

  // Adjust the canvas size
  function resizeCanvas() {
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
  }

  // Call resizeCanvas to set initial size and add event listener for any resize
  resizeCanvas();

  // Flag to track the painting state
  let painting = false;

  // Function called when the mouse button is pressed
  // Sets the painting flag to true and starts the drawing process
  function startPosition(e) {
    painting = true;
    // Call the draw function immediately to allow dot-like drawings
    draw(e);
  }

  // Function called when the mouse button is released
  // Resets the painting state and prepares the context for a new path
  function endPosition() {
    painting = false;
    // Starts a new path by resetting the current path. This prevents lines from connecting to the next starting point.
    ctx.beginPath();
  }

  // The main drawing function that reacts to mouse movements
  function draw(e) {
    // If we are not in painting mode, don't draw
    if (!painting) return;

    // Get the bounding rectangle of the canvas to consider any CSS styling
    const rect = canvas.getBoundingClientRect();

    // Calculate mouse position relative to the canvas.
    // This accounts for any element offset, ensuring the drawing position matches the mouse position.
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Set the properties of the drawing line
    ctx.lineWidth = brushSize.value;
    ctx.lineCap = "round";
    ctx.strokeStyle = colorPicker.value;

    // Create a line to the new position from the last position
    ctx.lineTo(x, y);
    // Render the line on the canvas
    ctx.stroke();
    // Begin a new path with a move to the current position
    // This prevents lines from being connected to the subsequent moveTo position
    ctx.beginPath();
    // Moves the path to the new position without creating a line
    ctx.moveTo(x, y);
  }

  // Event Listeners
  canvas.addEventListener("mousedown", startPosition);
  canvas.addEventListener("mouseup", endPosition);
  canvas.addEventListener("mousemove", draw);
});
