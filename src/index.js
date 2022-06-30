import Game from "./game.js";
// import the classes used from the specified locations

// initialization of the game

// gameScreen has been defined in the index.html
const screenName = "gameScreen";
//ctx = context
const canvas = document.getElementById(screenName);
let ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;

// consts that stores the proportions of the screen
const GAME_WIDTH = 800;
const GAME_HEIGHT = 600;

// create a new Game object
let game = new Game(GAME_WIDTH, GAME_HEIGHT);

// game loop

// a variable that saves the last time the screen got updated
let lastTime;

// the main loop, in which the game is regularly updated
function gameLoop(timestamp) {
  if (lastTime === undefined) {
    lastTime = timestamp;
  }
  // deltaFactor is the factor that objects should be moved times their speed
  let deltaFactor = (timestamp - lastTime) * (1 / 256);
  if (deltaFactor === 0) deltaFactor = 1 / 256;
  // save that we just updated the screen
  lastTime = timestamp;

  // first clears the specified rectangle, same signature as fillRect
  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  // update and draw the game
  game.update(deltaFactor);
  game.draw(ctx);

  // request a frame from the browser
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
