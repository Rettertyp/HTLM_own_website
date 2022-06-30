import { detectVerticalCollision, detectHorizontalCollision } from "./collisionDetection.js";

export default class Brick {
  constructor(game, position) {
    // import the image of the ball
    this.image = document.getElementById("img_brick");

    // size of the brick
    this.width = game.gameWidth / 10;
    this.height = game.gameHeight / 25;

    // the coordinates of the ball
    this.position = position;

    // property that indicates whether the brick will be deleted in the next update
    this.markedForDeletion = false;

    // make the "game" instance avaliable fo the brick to use
    this.game = game;
  }

  // update whether or not the brick still exists
  update() {
    // check, whether the ball hits the brick
    if (detectVerticalCollision(this.game.ball, this)) {
      // make the ball bounce of vertically
      this.game.ball.speed.y = -this.game.ball.speed.y;
      // set the flag that deletes the brick in the next update
      this.markedForDeletion = true;
    }
    if (detectHorizontalCollision(this.game.ball, this)) {
      // make the ball bounce of vertically
      this.game.ball.speed.x = -this.game.ball.speed.x;
      // set the flag that deletes the brick in the next update
      this.markedForDeletion = true;
    }
  }

  // draws the brick to the screen
  draw(ctx) {
    // signature: (image, position x, position y, size x, size y)
    ctx.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
  }
}
