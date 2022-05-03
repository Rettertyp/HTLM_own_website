// function that detects collisions between a rectangle and the ball
export function detectVerticalCollision(ball, gameObject) {
  // y-coordinates of the top/bottom of the ball
  let bottomOfBall = ball.position.y + ball.size;
  let topOfBall = ball.position.y;
  // x-coordinates of the sides of the ball
  let leftSideOfBall = ball.position.x;
  let rightSideOfBall = ball.position.x + ball.size;
  // y-coordinates of the top and bottom of the object
  let bottomOfObject = gameObject.position.y + gameObject.height;
  let topOfObject = gameObject.position.y;
  // x-coordinates of the sides of the object
  let leftSideOfObject = gameObject.position.x;
  let rightSideOfObject = gameObject.position.x + gameObject.width;

  if (bottomOfBall >= topOfObject && topOfBall <= bottomOfObject && leftSideOfBall >= leftSideOfObject && rightSideOfBall <= rightSideOfObject) {
    return true;
  } else {
    return false;
  }
}

export function detectHorizontalCollision(ball, gameObject) {
  // y-coordinates of the top/bottom of the ball
  let bottomOfBall = ball.position.y + ball.size;
  let topOfBall = ball.position.y;
  // x-coordinates of the sides of the ball
  let leftSideOfBall = ball.position.x;
  let rightSideOfBall = ball.position.x + ball.size;
  // y-coordinates of the top and bottom of the object
  let bottomOfObject = gameObject.position.y + gameObject.height;
  let topOfObject = gameObject.position.y;
  // x-coordinates of the sides of the object
  let leftSideOfObject = gameObject.position.x;
  let rightSideOfObject = gameObject.position.x + gameObject.width;

  // if (
  //   rightSideOfBall >= leftSideOfObject &&
  //   leftSideOfBall <= rightSideOfObject &&
  //   bottomOfBall <= bottomOfObject &&
  //   topOfBall >= topOfObject
  // ) {
  //   return true;
  // } else {
  //   return false;
  // }
  return rightSideOfBall >= leftSideOfObject && leftSideOfBall <= rightSideOfObject && bottomOfBall <= bottomOfObject && topOfBall >= topOfObject;
}
