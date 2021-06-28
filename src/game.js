// import the classes used from the specified locations
import Paddle from "/src/paddle.js";
import InputHandler from "/src/input.js";
import Ball from "/src/ball.js";
import Brick from "/src/brick.js";
import { buildLevel, level1 } from "/src/levels.js";

// defining the Game-States as a const-struct
const GAMESTATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAMEOVER: 3
};

export default class Game {
  // "constructs" a new game
  constructor(gameWidth, gameHeight) {
    // screen proportions
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;
  }

  // instanciates the necessary components of the game
  start() {
    // set the gamestate to running
    this.gamestate = GAMESTATE.RUNNING;

    // create a new paddle
    this.paddle = new Paddle(this);

    // create the ball
    this.ball = new Ball(this);

    // create a dummy brick that is used to get the proportions of a brick
    this.dummyBrick = new Brick(this, { x: 0, y: 0 });

    // create a new array named "bricks"
    let bricks = buildLevel(this, level1);

    // array of the game Objects
    // ...bricks adds the array bricks to the array gameObjects
    this.gameObjects = [this.ball, this.paddle, ...bricks];

    // instanciate the inputHandler
    new InputHandler(this);
  }

  // updates the game components
  update(deltaTime) {
    // checking whether the game is paused or not
    // if so, dont do anything until it is not paused anymore
    if (this.gamestate === GAMESTATE.PAUSED) return;

    // using the update function for each of the elements of the gameObjects array
    this.gameObjects.forEach((object) => object.update(deltaTime));

    // delete the Objects that are marked for deletion
    this.gameObjects = this.gameObjects.filter(
      (object) => !object.markedForDeletion
    );
  }

  //draws the game components
  draw(ctx) {
    // using the draw function for each of the elements of the gameObjects array
    this.gameObjects.forEach((object) => object.draw(ctx));

    if (this.gamestate === GAMESTATE.PAUSED) {
      // get the screen a little darker by drawing a rectangle that covers the whole screen
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      // fill it with black, but with a 50% opacity
      ctx.fillStyle = "rgba(0,0,0,0.5)";
      ctx.fill();

      // pringt a "pause"-Text at the center of the screen
      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("Paused", this.gameWidth / 2, this.gameHeight / 2);
    }
  }

  // pausing / unpausing the game
  togglePause() {
    // if (this.gamestate === GAMESTATE.PAUSED) {
    //   this.gamestate = GAMESTATE.RUNNING;
    // } else {
    //   this.gamestate = GAMESTATE.PAUSED;
    // }

    //Ternary operator
    this.gamestate === GAMESTATE.PAUSED ? this.gamestate = GAMESTATE.RUNNING : this.gamestate = GAMESTATE.PAUSED
  }
}
