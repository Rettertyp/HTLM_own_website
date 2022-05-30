// import the "detectCollision"-function
import { detectVerticalCollision, detectHorizontalCollision } from "./collisionDetection.js";

export default class Ball {
  constructor(game) {
    // import the image of the ball
    this.image = $("#img_ball")[0];

    // proportions of the game screen
    this.gameWidth = game.gameWidth;
    this.gameHeight = game.gameHeight;

    // size of the ball
    this.size = 16;

    // the coordinates of the ball
    this.position = { x: this.gameWidth / 2, y: this.gameHeight / 2 };

    // struct that contains the speed of the ball in the two directions
    this.speed = { x: 70, y: -70 };

    // make the "game" instance avaliable fo the ball to use
    this.game = game;
  }

  // resets the ball to the middle after touching the ground
  reset() {
    this.position = { x: this.gameWidth / 2, y: this.gameHeight / 2 };
    this.speed = { x: Math.abs(this.speed.x) * getRandomVorzeichen(), y: -Math.abs(this.speed.y) };
  }

  // speeds up the ball, depending on what level the game is actually in
  increaseSpeed() {
    this.speed.x += this.speed.x < 0 ? -20 : 20;
    this.speed.y += this.speed.y < 0 ? -20 : 20;
  }

  // draw the image to the screen
  draw(ctx) {
    // signature: (image, position x, position y, size x, size y)
    ctx.drawImage(this.image, this.position.x, this.position.y, this.size, this.size);
  }

  // updates the position of the ball
  update(deltaTime) {
    // move the ball in the two directions
    this.position.x += this.speed.x / deltaTime;
    this.position.y += this.speed.y / deltaTime;

    // if it touches the side walls of the game, it bounces of
    if (this.position.x > this.gameWidth - this.size || this.position.x < 0) {
      this.speed.x = -this.speed.x;
    }

    // if it touches the top wall of the game, it bounces of
    if (this.position.y < 0) {
      this.speed.y = -this.speed.y;
    }

    // if it touches the floor of the game, we lower the lives by one
    if (this.position.y > this.gameHeight - this.size) {
      this.game.lives.loseLife();
      this.reset();
    }

    if (detectHorizontalCollision(this, this.game.paddle)) {
      this.speed.x = -this.speed.x;
      // this.position.x = this.game.paddle.position.x - this.size;
    } else if (detectVerticalCollision(this, this.game.paddle)) {
      this.speed.y = -this.speed.y;
      this.position.y = this.game.paddle.position.y - this.size;
    }
  }
}

function getRandomVorzeichen() {
  const number = Math.random();
  let res;
  if (number < 0.5) {
    res = -1;
  } else {
    res = 1;
  }
  return res;
}
