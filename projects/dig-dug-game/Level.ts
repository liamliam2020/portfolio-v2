import _ from "lodash";
import { Direction, Location } from "./Interfaces";

const MIN_NUM_AIR_SPACES = 13;

// 12 (*3 for blocks being 1/3 size) x 18 (*3) ishlets try that for now but dont worry for now
const layout = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2],
  [2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2],
  [2, 2, 2, 2, 2, 2, 1, 2, 1, 1, 1, 2],
  [2, 1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2],
  [2, 1, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2],
  [3, 1, 3, 3, 3, 3, 1, 3, 3, 3, 3, 3],
  [3, 1, 3, 3, 3, 3, 1, 3, 3, 3, 3, 3],
  [3, 1, 3, 3, 3, 3, 1, 3, 3, 3, 3, 3],
  [3, 3, 3, 3, 3, 1, 1, 1, 3, 3, 3, 3],
  [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
  [4, 4, 4, 4, 4, 4, 4, 4, 1, 4, 4, 4],
  [4, 4, 4, 4, 4, 4, 4, 4, 1, 4, 4, 4],
  [4, 4, 1, 1, 1, 4, 4, 4, 1, 4, 4, 4],
  [5, 5, 5, 5, 5, 5, 5, 5, 1, 5, 5, 5],
  [5, 5, 5, 5, 5, 5, 5, 5, 1, 5, 5, 5],
  [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
  [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
];
export const layoutTemplate = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2],
  [2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2],
  [2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2],
  [2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2],
  [2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2],
  [3, 3, 3, 3, 3, 3, 1, 3, 3, 3, 3, 3],
  [3, 3, 3, 3, 3, 3, 1, 3, 3, 3, 3, 3],
  [3, 3, 3, 3, 3, 3, 1, 3, 3, 3, 3, 3],
  [3, 3, 3, 3, 1, 1, 1, 1, 1, 3, 3, 3],
  [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
  [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
  [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
  [4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
  [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
  [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
  [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
  [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
];
// 0 - air block
// 1 - yellow soil
// 2 - orange soil
// 3 - red soil
// 4 - very red soil
// 5 - sky block

export const generateLevel = (temp: Array<Array<number>>) => {
  let seedLevel = _.cloneDeep(temp);

  // from a board of just dirt and top air carve out holes
  // pick a random number of seed air spots (1x3 size) and place onto the board (if even index place horizotal if odd vertial)
  // then loop over board and each air hole has a chance to spawn another one next to it
  // if we decide to put an air hole then we try again to place another next to that until we fail

  let numAirBlobs = Math.round(Math.random() * 3) + 4;
  let airBlobLocations: Array<Location> = [];

  for (let i = 0; i < numAirBlobs; i++) {
    let location: Location = {
      x: Math.round(Math.random() * 9) + 1,
      y: Math.round(Math.random() * 15) + 1,
    };

    while (airBlobLocations.includes(location)) {
      location = {
        x: Math.round(Math.random() * 9) + 1,
        y: Math.round(Math.random() * 15) + 1,
      };
    }
    airBlobLocations.push(location);
  }

  for (let i = 0; i < airBlobLocations.length; i++) {
    let y = airBlobLocations[i].x;
    let x = airBlobLocations[i].y;

    seedLevel[x][y] = 1;
    if (x > 1 ) {
      if (i % 2 === 0) {
        seedLevel[x + 1][y] = 1;
        seedLevel[x - 1][y] = 1;
      } else {
        seedLevel[x][y + 1] = 1;
        seedLevel[x][y - 1] = 1;
      }
    }
  }

  for (let x = 0; seedLevel[0].length > x; x++) {
    for (let y = 0; seedLevel.length > y; y++) {
      if (seedLevel[y][x] === 1) {
        let addAir = Math.round(Math.random());
        let tempX = x;
        let tempY = y;

        while (addAir === 1) {
          let directionOfAdd = chooseNextAirDirection(x, y, seedLevel);

          if (directionOfAdd === null) {
            break;
          }

          if (tempY <= 1 || tempY > 11 || tempX <= 1 || tempX > 17) {
            break;
          }

          if (directionOfAdd === Direction.North) {
            seedLevel[tempY + 1][tempX] = 1;
            tempY++;
          } else if (directionOfAdd === Direction.South) {
            seedLevel[tempY - 1][tempX] = 1;
            tempY--;
          } else if (directionOfAdd === Direction.West) {
            seedLevel[tempY][tempX + 1] = 1;
            tempX++;
          } else {
            seedLevel[tempY][tempX - 1] = 1;
            tempX--;
          }
          addAir = Math.round(Math.random() + 0.2);
        }
      }
    }
  }

  return seedLevel;
};

// instead of picking ranom why dont we pick the one with most dirt
const chooseNextAirDirection = (
  x: number,
  y: number,
  board: Array<Array<number>>
) => {
  let nextDirection = Direction.South;
  let leastAirSpaces = Number.MAX_VALUE;
  const directions: Array<Array<number>> = [
    [0, -1],
    [1, -1],
    [1, 0],
    [1, 1],
    [0, 1],
    [-1, 1],
    [-1, 0],
    [-1, -1],
  ];
  const cardnialDirections: Array<Direction> = [
    Direction.South,
    Direction.North,
    Direction.East,
    Direction.West,
  ];

  for (let i = 0; i < cardnialDirections.length; i++) {
    if (cardnialDirections[i] === Direction.North) {
      y++;
    } else if (cardnialDirections[i] === Direction.South) {
      y--;
    } else if (cardnialDirections[i] === Direction.West) {
      x++;
    } else {
      x--;
    }

    let currentAirSpaces = 0;
    for (let j = 0; j < directions.length; j++) {
      x = x + directions[j][1];
      y = y + directions[j][0];

      if (y < 0 || y > 12 || x < 0 || x > 18) {
        break;
      }

      if (board[y][x] === 1) {
        currentAirSpaces++;
      }
    }

    if (currentAirSpaces < leastAirSpaces) {
      leastAirSpaces = currentAirSpaces;
      nextDirection = cardnialDirections[i];
    }
  }

  if (leastAirSpaces > 3) {
    return null;
  }

  return nextDirection;
};

export const placeEnemiesOnLevels = (
  numEnemies: number,
  board: Array<Array<number>>
) => {
  let result: Array<Location> = [];
  let whiteSpaceSkips: Array<number> = [];

  for (let i = 0; i < numEnemies; i++) {
    let skips = Math.round(Math.random() * MIN_NUM_AIR_SPACES);

    while (whiteSpaceSkips.includes(skips) || whiteSpaceSkips.includes(skips + 1) || whiteSpaceSkips.includes(skips - 1)) {
      skips = Math.round(Math.random() * MIN_NUM_AIR_SPACES);
    }
    whiteSpaceSkips.push(skips);
  }

  for (let i = 0; i < numEnemies; i++) {
    let whiteSpaceSeen = 0;

    outer_loop: for (let x = 0; board[0].length > x; x++) {
      for (let y = 0; board.length > y; y++) {
        if (board[y][x] === 1) {
          if (whiteSpaceSeen === whiteSpaceSkips.at(i)) {
            let location: Location = {
              x: x,
              y: y,
            };
            result.push(location);
            break outer_loop;
          }
          whiteSpaceSeen++;
        }
      }
    }
  }
  return result;
};
