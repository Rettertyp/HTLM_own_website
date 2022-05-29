// import the classes used from the specified locations
import Paddle from "./paddle.js";
import InputHandler from "./input.js";
import Ball from "./ball.js";
import Brick from "./brick.js";
import { buildLevel, level1, level2, level3, level4, level5, level6 } from "./levels.js";
import Lives from "./lives.js";
import ActualLevel from "./actualLevel.js";

const GAMESTATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAMEOVER: 3,
  NEWLEVEL: 4,
};

export default class Game {
  // "constructs" a new game
  constructor(gameWidth, gameHeight) {
    // screen proportions
    this.gameWidth = gameWidth;
    this.gameHeight = gameHeight;

    // set the gamestate to menu
    this.gamestate = GAMESTATE.MENU;

    // create a new paddle
    this.paddle = new Paddle(this);

    // create the ball
    this.ball = new Ball(this);

    // an array that belongs to the game object and contains the bricks, so that other functions that have acces to the game object may acces them too
    this.bricks = [];

    // create a dummy brick that is used to get the proportions of a brick
    this.dummyBrick = new Brick(this, { x: 0, y: 0 });

    // create empty gameObjects-Array so that the draw funkction can still run before the game starts
    this.gameObjects = [];

    // the lives, that the player has left
    this.lives = new Lives(this);

    // an array of the levels
    this.levels = [level1, level2, level3, level4, level5, level6];
    // the level the player is currently at (the entry of the levels-array)
    this.actualLevel = new ActualLevel();

    // instanciate the inputHandler
    new InputHandler(this);
  }

  // crates the level and starts the game
  start() {
    // imediately quit, if we're not in the menu or trying to load a new level
    if (this.gamestate !== GAMESTATE.MENU && this.gamestate !== GAMESTATE.NEWLEVEL) return;

    // create a new array named "bricks"
    this.bricks = buildLevel(this, this.levels[this.actualLevel.current]);

    // set the ball to the inital position
    this.ball.reset();

    // array of the game Objects
    // ...bricks adds the array bricks to the array gameObjects
    this.gameObjects = [this.ball, this.paddle, this.lives, this.actualLevel];

    this.gamestate = GAMESTATE.RUNNING;
  }

  // updates the game components
  update(deltaTime) {
    // in case the player has no lives left, the game is set to over
    if (this.lives.isDead()) {
      this.gamestate = GAMESTATE.GAMEOVER;
    }

    // checking whether the game is paused, in menu or over or not
    // if so, dont do anything until it is in the "running"-state
    if (this.gamestate === GAMESTATE.PAUSED || this.gamestate === GAMESTATE.MENU || this.gamestate === GAMESTATE.GAMEOVER) return;

    // if there are no bricks left, the level is complete and the next level will be loaded
    if (this.bricks.length === 0) {
      this.actualLevel.nextLevel();
      this.ball.increaseSpeed();
      this.paddle.increaseSpeed();
      this.gamestate = GAMESTATE.NEWLEVEL;
      this.start();
    }

    // merging the gameObject-array and the bricks into an array
    // using the update function for each of the elements of the merged array
    [...this.gameObjects, ...this.bricks].forEach((object) => object.update(deltaTime));

    // delete the Objects that are marked for deletion
    this.bricks = this.bricks.filter((brick) => !brick.markedForDeletion);
  }

  //draws the game components
  draw(ctx) {
    // using the draw function for each of the elements of the gameObjects array
    [...this.gameObjects, ...this.bricks].forEach((object) => object.draw(ctx));

    // the pause state => nothing gets changed, screen is darker and says "Paused"
    if (this.gamestate === GAMESTATE.PAUSED) {
      // get the screen a little darker by drawing a rectangle that covers the whole screen
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      // fill it with black, but with a 50% opacity
      ctx.fillStyle = "rgba(0,0,0,0.5)";
      ctx.fill();

      // print a "pause"-Text at the center of the screen
      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("Paused", this.gameWidth / 2, this.gameHeight / 2);
      return;
    }

    if (this.gamestate === GAMESTATE.MENU) {
      // get the screen black by drawing a rectangle that covers the whole screen
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      // fill it with black
      ctx.fillStyle = "rgba(0,0,0,1)";
      ctx.fill();

      // print a "how to start"-Text at the center of the screen
      ctx.font = "30px Arial";
      ctx.fillStyle = "white";
      ctx.textAlign = "center";
      ctx.fillText("Welcome to Brick Breaker! Press space to start", this.gameWidth / 2, this.gameHeight / 2);
      return;
    }

    if (this.gamestate === GAMESTATE.GAMEOVER) {
      // get the screen black by drawing a rectangle that covers the whole screen
      ctx.rect(0, 0, this.gameWidth, this.gameHeight);
      // fill it with black
      ctx.fillStyle = "rgba(0,0,0,1)";
      ctx.fill();

      // print a "GAME OVER"-Text at the center of the screen
      ctx.font = "30px Arial";
      ctx.fillStyle = "red";
      ctx.textAlign = "center";
      ctx.fillText("GAME OVER", this.gameWidth / 2, this.gameHeight / 2);
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
    this.gamestate === GAMESTATE.PAUSED ? (this.gamestate = GAMESTATE.RUNNING) : (this.gamestate = GAMESTATE.PAUSED);
  }
}
