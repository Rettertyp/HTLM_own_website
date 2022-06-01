export default class GameStatus {
  constructor(game) {
    // lifes left
    this.lives = 3;

    // actual level
    this.level = 1;

    // score
    this.score = 0;
    this.streak = 0;
    this.onStreak = false;

    // coordinates where we want to draw items
    this.livesTextPosX = game.gameWidth - 40;
    this.levelTextPosX = 40;
    this.scoreTextPosX = game.gameWidth / 2;
    this.textPosY = 20;
  }

  loseLife() {
    this.lives--;
  }

  isDead() {
    return this.lives <= 0;
  }

  nextLevel() {
    this.level++;
  }

  incrementScore() {
    if (this.onStreak) {
      this.streak++;
    } else {
      this.streak = 0;
    }
    this.score += this.streak + 1;
    this.onStreak = true;
  }

  // gets called when the ball hits the paddle
  nextStreak() {
    this.onStreak = false;
  }

  // draws the HUD
  draw(ctx) {
    // draw the amount of lives left on the top right corner
    ctx.font = "20px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("Lives: " + this.lives, this.livesTextPosX, this.textPosY);

    // draw the actual level on the top left corner
    ctx.fillText("Level: " + this.level, this.levelTextPosX, this.textPosY);

    // draw the score in the top middle of the screen
    ctx.fillText("Score: " + this.score, this.scoreTextPosX, this.textPosY);
  }

  // does nothing since it doesnt need to update, but has to exist since its a gameObject
  update(deltaTime) {
    return;
  }
}
