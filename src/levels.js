import Brick from "/src/brick.js";

export function buildLevel(game, level) {
  // instanciate an empty array of bricks
  let bricks = [];

  // go over each row to decide whether or not to put a brick there
  level.forEach((row, rowIndex) => {
    // go over each entry of the row
    row.forEach((brick, brickIndex) => {
      // if the entry is 1, build a brick there
      if (brick === 1) {
        // calculate the position of the brick
        let position = {
          /*
          x: 80 * brickIndex,
          y: 20+ 24 * rowIndex
          */
          ///*
          x: game.dummyBrick.width * brickIndex,
          y: game.dummyBrick.height * (rowIndex + 3)
          //*/
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
export const level1 = [
  // line 1, 1 means there is a brick at the position, o means there is not a brick
  [0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
  // line 2, ...
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  // line 3, ...
  [0, 0, 0, 0, 1, 1, 0, 0, 0, 0]
];

export const level2 = [
  // line 1, 1 means there is a brick at the position, o means there is not a brick
  [0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
  // line 2, ...
  [0, 1, 1, 1, 1, 1, 1, 1, 1, 0],
  // line 3, ...
  [0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
  // line 4, ...
  [0, 0, 0, 1, 1, 1, 1, 0, 0, 0]
];

export const level3 = [
  // line 1, 1 means there is a brick at the position, o means there is not a brick
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  // line 2, ...
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  // line 3, ...
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  // line 4, ...
  [1, 0, 0, 1, 1, 1, 1, 0, 0, 0],
  // line 5, ...
  [0, 0, 0, 0, 1, 1, 0, 0, 0, 0]
];

export const level4 = [
  // line 1, 1 means there is a brick at the position, o means there is not a brick
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  // line 2, ...
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  // line 3, ...
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  // line 4, ...
  [1, 1, 1, 1, 0, 0, 1, 1, 1, 1],
  // line 5, ...
  [1, 1, 0, 0, 0, 0, 0, 0, 1, 1]
];