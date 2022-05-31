// object that handles input, has an update function
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

    // adding event listeners in order to be able to also control it via the keyboard
    document.addEventListener("keydown", (event) => {
      switch (event.keyCode) {
        // when the left arrow is down => keyCode = 37, we tell the paddle to move left
        case 37:
          game.paddle.moveLeft();
          break;
        // when the right arrow is down => keyCode = 39, we tell the paddle to move right
        case 39:
          game.paddle.moveRight();
          break;

        // keyCode 27 = escape key
        case 27:
          game.togglePause();
          break;

        // keyCode 32 = space bar
        case 32:
          game.start();
          break;

        default:
          break;
      }
    });

    // another Event listener, that tracks whether the keys are NOT pressed
    document.addEventListener("keyup", (event) => {
      switch (event.keyCode) {
        // when the left arrow is down => keyCode = 37, we tell the paddle to move left
        case 37:
          // stop in case we're travelling left at the moment, else dont
          if (game.paddle.speed < 0) game.paddle.stop();
          break;
        // when the right arrow is down => keyCode = 39, we tell the paddle to move right
        case 39:
          // stop in case we're travelling left at the moment, else dont
          if (game.paddle.speed > 0) game.paddle.stop();
          break;

        default:
          break;
      }
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
