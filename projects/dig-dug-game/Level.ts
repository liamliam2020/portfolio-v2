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
// 0 - air block
// 1 - yellow soil
// 2 - orange soil
// 3 - red soil
// 4 - very red soil
// 5 - sky block
// TODO ... enemies??

export const generateLevel = () => {
  // TODO
  // need to randomly generate lcoations for enemies
  // the number of enemies and place them
  // maybe select up to 10 or so enemies to support and just have them defined as enemie1... ect in index
  // this fucntion would jsut return enemies and locations, but it also has to make tubes for them to
  // bounce in
  return layout;
};

export const placeEnemiesOnLevels = (numEnemies: number) => {
  // return an array of arrays (where the array is the cords for one enemy)

  // so skip the top row and then generate a random number that is between 0 and the number of tunnel spaces
  // the random number will be the number of tunnel spaces to skip 

  for (let i = 0; i < numEnemies; i++) {

    let whiteSpaceSkips = Math.round(Math.random() * 28 - 1);
    let whiteSpaceSeen = 0;

    for (let x = 0; layout[0].length > x; x++) {
      for (let y = 0; layout.length > y; y++) {

        if (layout[y][x] === 1) {
          whiteSpaceSeen++

          console.log("cords for the enemy to spawn: ", whiteSpaceSkips)
          if (whiteSpaceSeen === whiteSpaceSkips) {
            console.log("cords for the enemy to LOL: ", y, x)
          }
        }

      }
    }
    
  }
};