
export default class InputHandler {
  constructor(game) {
    // adding an "event listener" that tracks the keys that are down and returns the keyCodes
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
}
