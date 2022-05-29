export default class InputHandler {
  constructor(game) {
    // how far the arrow keys have to be pressed to be considered as pressed
    this.threshold = 0.2;
    // context information about the pause button to avoid double pressing
    this.pauseButtonWasPressed = false;
    this.reloadButtonWasPressed = false;
    this.reloadButtonFirstPressed;
    this.game = game;
    // waiting for the gamepad to be connected, then start the game
    window.addEventListener("gamepadconnected", (e) => {
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
    const paddleDirection = Math.abs(this.gamepad.axes[0]) >= this.threshold ? this.gamepad.axes[0] : 0;
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
    if (this.gamepad.buttons[6].pressed) {
      // if the pause button was just pressed, pause/start the game
      if (!this.pauseButtonWasPressed) {
        this.pauseButtonWasPressed = true;
        this.game.togglePause();
      }
    } else {
      // if the button isn't pressed anymore, reset the status
      this.pauseButtonWasPressed = false;
    }

    // reset the game if the reset button is pressed and the game is over
    if (this.gamepad.buttons[7].pressed) {
      // when the reload button has just been pressed, save the time
      const date = new Date();
      if (!this.reloadButtonWasPressed) {
        this.reloadButtonWasPressed = true;
        this.reloadButtonFirstPressed = date.getTime();

        // when the reload button has been constantly pressed for more than 3 seconds, reset the game
      } else if (date.getTime() - this.reloadButtonFirstPressed >= 3000) {
        this.game.reset();
      }
    } else {
      this.reloadButtonWasPressed = false;
    }
  }
}
