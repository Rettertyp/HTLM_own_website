// import the "detectCollision"-function
import { detectVerticalCollision, detectHorizontalCollision } from "./collisionDetection.js";
import { GAMESTATE } from "./game.js";

const spinFactor = 5;

export default class Ball {
  constructor(game) {
    // import the image of the ball
    this.image = document.getElementById("img_ball");

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
    this.position = { x: this.gameWidth / 2, y: this.gameHeight - 100 };
    this.speed = { x: (70 + (this.game.gameStatus.level - 1) * 20) * getRandomVorzeichen(), y: -(70 + (this.game.gameStatus.level - 1) * 20) };
    this.game.gameStatus.nextStreak();
  }

  spinOnBounce() {
    if (this.game.paddle.speed > 0) {
      if (this.speed.x > 0) this.speed.y = this.speed.y > 0 ? this.speed.y - spinFactor : this.speed.y + spinFactor;
      else this.speed.y = this.speed.y > 0 ? this.speed.y + spinFactor : this.speed.y - spinFactor;
      this.speed.x += 10;
    } else if (this.game.paddle.speed < 0) {
      if (this.speed.x < 0) this.speed.y = this.speed.y > 0 ? this.speed.y - spinFactor : this.speed.y + spinFactor;
      else this.speed.y = this.speed.y > 0 ? this.speed.y + spinFactor : this.speed.y - spinFactor;
      this.speed.x -= 10;
    }
  }

  // draw the image to the screen
  draw(ctx) {
    // signature: (image, position x, position y, size x, size y)
    ctx.drawImage(this.image, this.position.x, this.position.y, this.size, this.size);
  }

  // updates the position of the ball
  update(deltaFactor) {
    // move the ball in the two directions
    this.position.x += this.speed.x * deltaFactor;
    this.position.y += this.speed.y * deltaFactor;
    console.log(`${this.speed.x} ${this.speed.y}, ${deltaFactor}, ${this.speed.x * deltaFactor}, ${this.speed.y * deltaFactor}`);

    // if it touches the side walls of the game, it bounces of
    if (this.position.x > this.gameWidth - this.size || this.position.x < 0) {
      this.speed.x = -this.speed.x;
    }

    // if it touches the top wall of the game, it bounces of
    if (this.position.y < 0) {
      this.speed.y = -this.speed.y;
      // preventing the ball from getting stuck in the ceiling
      this.position.y = 0;
    }

    // if it touches the floor of the game, we lower the lives by one
    if (this.position.y > this.gameHeight - this.size) {
      this.game.gameStatus.loseLife();
      this.game.gamestate = GAMESTATE.LOSTLIFE;
      this.game.paddle.reset();
      this.reset();
    }

    if (detectHorizontalCollision(this, this.game.paddle)) {
      this.speed.x = -this.speed.x;
      // preventing the ball from getting stuck in the walls
      if (this.position.x < 0) this.position.x = 0;
      else if (this.position.x > this.gameWidth - this.size) this.position.x = this.gameWidth - this.size;
      this.game.gameStatus.nextStreak();
    }
    if (detectVerticalCollision(this, this.game.paddle)) {
      this.speed.y = -this.speed.y;
      this.position.y = this.game.paddle.position.y - this.size;
      this.game.gameStatus.nextStreak();
      this.spinOnBounce();
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
