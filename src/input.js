export default class InputHandler {
  constructor(game) {
    // how far the arrow keys have to be pressed to be considered as pressed
    this.threshold = 0.2;
    // context information about the pause button to avoid double pressing
    this.pauseButtonStatus = {
      wasPressed: false,
      lastTimePressed: 0,
    };
    this.game = game;
    // waiting for the gamepad to be connected, then start the game
    window.addEventListener("gamepadconnected", (e) => {
      this.pressPause(new Date());
      this.gamepad = navigator.getGamepads()[e.gamepad.index];
    });
  }

  // fetch all inputs from the gamepad and react to them
  update(deltaTime) {
    // return when the gamepad isn't connected (yet)
    if (!this.gamepad) {
      return;
    }

    // getting the direction of the arrow keys
    const axes = this.gamepad.axes[0];
    const paddleDirection = Math.abs(axes) >= this.threshold ? axes : 0;
    // react to the direction of the arrow keys
    switch (paddleDirection) {
      case 0:
        this.game.paddle.stop();
        break;
      case -1:
        this.game.paddle.moveLeft();
        break;
      case 1:
        this.game.paddle.moveRight();
        break;
      default:
        console.log("invalid direction");
        break;
    }

    // check if the start/stop button is pressed
    pauseButtonCheck: if (this.gamepad.buttons[6].pressed) {
      // if the button was pressed before, check if it was pressed again in the last second
      const date = new Date();
      if (this.pauseButtonStatus.wasPressed && date.getTime() - this.pauseButtonStatus.lastTimePressed <= 1000) {
        break pauseButtonCheck;
      }

      this.pressPause(date);
    } else {
      // if the button isn't pressed anymore, reset the status
      this.pauseButtonStatus.wasPressed = false;
    }

    // reset the game if the reset button is pressed and the game is over
    if (this.game.lives.isDead() && this.gamepad.buttons[7].pressed) {
      this.game.reset();
    }
  }

  pressPause(date) {
    this.pauseButtonStatus.wasPressed = true;
    this.pauseButtonStatus.lastTimePressed = date.getTime();
    this.game.togglePause();
  }
}
