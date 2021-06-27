// export deafult means, that it is publicly visible for other files to import
export default class Paddle {
    // a constructor for objects of the type Paddle
    constructor(game) {
      // proportions of the game screen
      this.gameWidth = game.gameWidth;
  
      // proportions of the Paddle
      this.width = 150;
      this.height = 20;
  
      // the maximum speed of the pedal in pixels per Second
      this.maxSpeed = 90;
  
      // the current speed of the pedal
      this.speed = 0;
  
      // position of the paddle as a struct
      this.position = {
        x: game.gameWidth / 2 - this.width / 2,
        y: game.gameHeight - this.height - 10
      };
    }
  
    // moving the paddle to the left by setting the speed to negative maxSpeed (negative = to the left in terms of coordinates)
    moveLeft() {
      this.speed = -this.maxSpeed;
    }
    moveRight() {
      this.speed = this.maxSpeed;
    }
  
    // stoping the paddle by setting the speed to 0
    stop() {
      this.speed = 0;
    }
  
    // draws the paddle
    draw(ctx) {
      ctx.fillStyle = "#00f";
      ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
  
    // updated the position of the paddle depending on the delta time
    update(deltaTime) {
      this.position.x += this.speed / deltaTime;
  
      // avoid getting of the screen by setting it to the left corner when leaving
      if (this.position.x < 0) {
        this.position.x = 0;
      }
      if (this.position.x > this.gameWidth - this.width) {
        this.position.x = this.gameWidth - this.width;
      }
    }
  }
  