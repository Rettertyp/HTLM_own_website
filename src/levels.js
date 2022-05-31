import Brick from "./brick.js";

export function buildLevel(game) {
  // instanciate an empty array of bricks
  let bricks = [];

  const level = game.levels[game.gameStatus.level - 1];

  // go over each row to decide whether or not to put a brick there
  level.forEach((row, rowIndex) => {
    // go over each entry of the row
    row.forEach((brick, brickIndex) => {
      // if the entry is 1, build a brick there
      if (brick === 1) {
        // calculate the position of the brick
        const position = {
          x: game.dummyBrick.width * brickIndex,
          y: game.dummyBrick.height * (rowIndex + 3),
        };
        // insert the brick to the "bricks"-array
        bricks.push(new Brick(game, position));
      }
    });
  });

  // return the constructed brick array
  return bricks;
}

// export const => a value that can be imported elsewhere
// array of arrays that indicates, where bricks shall be
export const levels = [
  [
    // level 1
    [0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
  ],
  [
    // level 2
    [0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    [0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
    [0, 0, 0, 1, 1, 1, 1, 0, 0, 0],
  ],
  [
    // level 3
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 0, 0, 1, 1, 1, 1, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
  ],
  [
    // level 4
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 1, 0, 0, 1, 1, 1, 1],
    [1, 1, 0, 0, 0, 0, 0, 0, 1, 1],
  ],
  [
    // level 5
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
    [0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
    [1, 1, 1, 0, 0, 0, 1, 0, 1, 1],
    [0, 0, 1, 1, 0, 0, 1, 1, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
  ],
  [
    // level 6
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0, 1, 0],
    [0, 1, 0, 1, 0, 1, 0, 1, 0, 1],
    [1, 1, 0, 0, 1, 1, 0, 0, 1, 1],
  ],
];
