export default class Lives {
  constructor(game) {
    // lifes left
    this.lives = 3;

    // coordinates where we want to draw items
    this.textPosX = game.gameWidth - 40;
    this.textPosY = 20;
  }

  loseLife() {
    this.lives--;
  }

  isDead() {
    return this.lives <= 0;
  }

  // draws the amount of lifes left on the top right corner
  draw(ctx) {
    ctx.font = "20px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("Lives: " + this.lives, this.textPosX, this.textPosY);
  }

  // does nothing since it doesnt need to update, but has to exist since its a gameObject
  update(deltaTime) {
    return;
  }
}
