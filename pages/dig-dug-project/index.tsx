import type { NextPage } from "next";
import { useEffect, useRef, useState } from "react";
import {
  canvasHeight,
  canvasWidth,
  digBlocks,
  drawInfaltor,
  drawSprit,
  initializeBoard,
} from "../../projects/dig-dug-game/Canvas";
import useInterval, { useThrottle } from "../../projects/dig-dug-game/Helpers";
import {
  generateLevel,
  layoutTemplate,
  placeEnemiesOnLevels,
} from "../../projects/dig-dug-game/Level";
import _ from "lodash";
import { findPath } from "../../projects/dig-dug-game/PathFinding";
import {
  Player,
  Direction,
  Enemy,
  Location,
} from "../../projects/dig-dug-game/Interfaces";
import styles from "./dig-dug.module.css";
import { initializeEnemies, isDead } from "../../projects/dig-dug-game/Enemy";

const Home: NextPage = () => {
  const taizoSize = 4;
  const minGameSpeed = 2;
  const SKY_COLOR = "#92dff3";
  const DIRT_COLOR = "#000000";

  // Canvas
  const canvasRef = useRef<any>();

  // Game Settings
  const [gameBoard, setGameBoard] = useState<Array<Array<number>>>([]);
  const [gameDelay, setGameDelay] = useState<any>(1000 / minGameSpeed);
  const [gameTick, setGameTick] = useState<number>(0);
  const [round, setRound] = useState<number>(1);
  const [isGameStart, setIsGameStart] = useState<boolean>(true);
  const [running, setRunning] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [bestScore, setBestScore] = useState<number>(0);
  const [taizoHori, setTaizoHori] = useState<Player>({
    location: {
      x: 0,
      y: 0,
    },
    direction: Direction.East,
    pump: {
      length: 0,
    },
    apperance: "static/images/taizo_right.png",
  });
  const [enemies, setEnemies] = useState<Array<Enemy>>(initializeEnemies());

  let canvas = canvasRef?.current;

  // Game Hook
  useEffect(() => {
    canvas = canvasRef?.current;
    const ctx: any = canvas?.getContext("2d");

    if (isGameStart) {
      let board = generateLevel(layoutTemplate);
      setGameBoard(board);
      initializeBoard(ctx, board);
      setIsGameStart(false);
      // draw taizo at start
      drawSprit(
        ctx,
        taizoHori.location.x,
        taizoHori.location.y,
        taizoSize,
        taizoHori.apperance
      );

      let locations: Array<Location> = placeEnemiesOnLevels(enemies.length, board);

      let enemiesWithLocations = _.cloneDeep(enemies);
      enemiesWithLocations.forEach((enemy, index) => {
        enemy.location = locations[index];
      });

      enemiesWithLocations.forEach((enemy) => {
        drawSprit(
          ctx,
          enemy.location.x,
          enemy.location.y,
          taizoSize,
          enemy.apperance
        );
      });

      setEnemies(enemiesWithLocations);
      setRunning(true);
    } else {
      let currentBoard = _.cloneDeep(gameBoard);
      let currentEnemies = _.cloneDeep(enemies);
      let backgroundColor = DIRT_COLOR;

      // move to next level
      if (enemies.filter(enemy => enemy.isDead === true).length == enemies.length) {
        setRound(round + 1);
        handleRestart();
      }

      if (score > bestScore) {
        setBestScore(score);
      }

      // Check if Player has died
      for (let i = 0; i < enemies.length; i++) {
        let currentEnemy = _.cloneDeep(enemies[i]);
        if (
          !enemies[i].isDead &&
          taizoHori.location.y === enemies[i].location.y &&
          taizoHori.location.x === enemies[i].location.x
        ) {
          setRunning(false);
          setScore(0);
          setRound(1);

          return;
        }

        // Check is Enemies have died
        if (
          !enemies[i].isDead
          && isDead(taizoHori.direction, taizoHori, currentEnemy)
        ) {
          currentEnemy.isDead = true;
          setScore(score + 100);

          currentEnemies.splice(i, 1, currentEnemy);
          setEnemies(currentEnemies);
        }

        if (currentEnemy.isDead != true) {
          const prevLocationX = currentEnemy.location.x;
          const prevLocationY = currentEnemy.location.y;

          let moved = false;
          let next = findPath(
            [enemies[i].location.y, enemies[i].location.x],
            [taizoHori.location.y, taizoHori.location.x],
            currentBoard
          );

          if (next) {
            moved = true;
            currentEnemy.location.x = next[1];
            currentEnemy.location.y = next[0];

            currentEnemies.splice(i, 1, currentEnemy);
            setEnemies(currentEnemies);
          }

          if (moved) {
            drawSprit(
              ctx,
              currentEnemy.location.x,
              currentEnemy.location.y,
              taizoSize,
              currentEnemy.apperance
            );

            if (currentBoard[prevLocationY][prevLocationX] === 0) {
              backgroundColor = SKY_COLOR;
            } else {
              backgroundColor = DIRT_COLOR;
            }

            digBlocks(ctx, prevLocationX, prevLocationY, backgroundColor);
          }
        }
      }
    }
  }, [gameTick]);

  // Handle player movement updates
  useEffect(() => {
    if (running) {
      const ctx: any = canvas?.getContext("2d");

      let currentBoard = _.cloneDeep(gameBoard);
      let backgroundColor = DIRT_COLOR;
      let prevLocationX = taizoHori.location.x;
      let prevLocationY = taizoHori.location.y;
      let x = taizoHori.location.x;
      let y = taizoHori.location.y;

      switch (taizoHori.direction) {
        case Direction.North:
          prevLocationY++;
          if (prevLocationY >= 0 && currentBoard[prevLocationY][prevLocationX] === 0) {
            backgroundColor = SKY_COLOR;
          }
          break;
        case Direction.South:
          prevLocationY--;
          if (prevLocationY >= 0 && currentBoard[prevLocationY][prevLocationX] === 0) {
            backgroundColor = SKY_COLOR;
          }
          break;
        case Direction.East:
          prevLocationX--;
          if (prevLocationX >= 0 && currentBoard[prevLocationY][prevLocationX] === 0) {
            backgroundColor = SKY_COLOR;
          }
          break;
        case Direction.West:
          prevLocationX++;
          if (prevLocationX >= 0 && currentBoard[prevLocationY][prevLocationX] === 0) {
            backgroundColor = SKY_COLOR;
          }
          break;
      }

      if (currentBoard[y][x] >= 2) {
        setScore(score + 10);
      }

      if (currentBoard[y][x] !== 0 && currentBoard[y][x] !== 1) {
        currentBoard[y][x] = 1;
        digBlocks(ctx, x, y, DIRT_COLOR);
        setGameBoard(currentBoard);
      }

      digBlocks(ctx, prevLocationX, prevLocationY, backgroundColor);
      drawSprit(ctx, x, y, taizoSize, taizoHori.apperance);
    }
  }, [taizoHori.location]);

  // I think we will want a seperate use effect to handle Taizo attacking, turning animation and maybe even for his movement in the future
  // maybe there was a reason why I had it in the gameTick block tho
  // if I'm just passing in clones I can move this logic to its own player file or somthing that will be much nicer to read
  useEffect(() => {
    // pump cant be allowed to go into walls if it hits a wall it breaks
    // when it breaks/ length goes beyond 3 needs to be cleared
    canvas = canvasRef?.current;
    const ctx: any = canvas?.getContext("2d");
    let currentPlayer = _.cloneDeep(taizoHori);
    if (currentPlayer.pump.length > 0) {
      switch (currentPlayer.direction) {
        case Direction.North:
          drawInfaltor(
            ctx,
            currentPlayer.location.x,
            currentPlayer.location.y - currentPlayer.pump.length,
            "static/images/beam_vertical.png"
          );
          break;
        case Direction.South:
          drawInfaltor(
            ctx,
            currentPlayer.location.x,
            currentPlayer.location.y + currentPlayer.pump.length,
            "static/images/beam_vertical.png"
          );
          break;
        case Direction.East:
          drawInfaltor(
            ctx,
            currentPlayer.location.x + currentPlayer.pump.length,
            currentPlayer.location.y,
            "static/images/beam_horizontal.png"
          );

          break;
        case Direction.West:
          drawInfaltor(
            ctx,
            currentPlayer.location.x - currentPlayer.pump.length,
            currentPlayer.location.y,
            "static/images/beam_horizontal.png"
          );
          break;
      }
    }
  }, [taizoHori.pump]);

  const clearPump = (
    ctx: CanvasRenderingContext2D,
    direction: Direction,
    taizoLocation: Location,
    length: number
  ) => {
    
    while (length != 0) {
      let backgroundColor = DIRT_COLOR;
      let newY = taizoLocation.y;
      let newX = taizoLocation.x;

      switch (direction) {
        case Direction.North:
          newY = taizoLocation.y - length;

          if (newY >= 0 && gameBoard[newY][taizoLocation.x] === 0) {
            backgroundColor = SKY_COLOR;
          }
          digBlocks(
            ctx,
            taizoLocation.x,
            newY,
            backgroundColor
          );
          break;
        case Direction.South:
          newY = taizoLocation.y + length;
        
          if (newY >= 0 && gameBoard[newY][taizoLocation.x] === 0) {
            backgroundColor = SKY_COLOR;
          }
          digBlocks(
            ctx,
            taizoLocation.x,
            newY,
            backgroundColor
          );
          break;
        case Direction.East:
          newX = taizoLocation.x + length;
          
          if (newX >= 0 && gameBoard[taizoLocation.y][newX] === 0) {
            backgroundColor = SKY_COLOR;
          }
          digBlocks(
            ctx,
            newX,
            taizoLocation.y,
            backgroundColor
          );
          break;
        case Direction.West:
          newX = taizoLocation.x - length;
          
          if (newX >= 0 && gameBoard[newY][taizoLocation.x] === 0) {
            backgroundColor = SKY_COLOR;
          }
          digBlocks(
            ctx,
            newX,
            taizoLocation.y,
            backgroundColor
          );
          break;
      }
      length--;
    }
  };

  useInterval(
    () => {
      if (running) {
        console.log(gameTick);
        setGameTick(gameTick + 1);
      }
    },
    running ? gameDelay : null
  );

  const throttledKeyDown = useThrottle((e: KeyboardEvent) => {
    if (
      ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight", " ", "r"].includes(
        e.key
      )
    ) {
      const ctx: any = canvas?.getContext("2d");
      let currentPlayer = _.cloneDeep(taizoHori);

      if (currentPlayer.pump.length != 0 && e.key != " ") {
        clearPump(
          ctx,
          currentPlayer.direction,
          currentPlayer.location,
          currentPlayer.pump.length
        );
        currentPlayer.pump.length = 0;
      }

      switch (e.key) {
        case "ArrowRight":
          if (currentPlayer.location.x + 1 < gameBoard[0].length) {
            currentPlayer.location.x = currentPlayer.location.x + 1;
            currentPlayer.direction = Direction.East;
            currentPlayer.apperance = "static/images/taizo_right.png";
          }
          break;
        case "ArrowLeft":
          if (currentPlayer.location.x - 1 >= 0) {
            currentPlayer.location.x = currentPlayer.location.x - 1;
            currentPlayer.direction = Direction.West;
            currentPlayer.apperance = "static/images/taizo_left.png";
          }
          break;
        case "ArrowDown":
          if (currentPlayer.location.y + 1 < gameBoard.length) {
            currentPlayer.location.y = currentPlayer.location.y + 1;
            currentPlayer.direction = Direction.South;
            currentPlayer.apperance = "static/images/taizo_down.png";
          }
          break;
        case "ArrowUp":
          if (currentPlayer.location.y - 1 >= 0) {
            currentPlayer.location.y = currentPlayer.location.y - 1;
            currentPlayer.direction = Direction.North;
            currentPlayer.apperance = "static/images/taizo_up.png";
          }
          break;
        case " ":
          if (currentPlayer.pump.length < 3) {
            switch (currentPlayer.direction) {
              case Direction.North:
                if (currentPlayer.location.y - currentPlayer.pump.length - 1 >= 0 &&
                  gameBoard[
                    currentPlayer.location.y - currentPlayer.pump.length - 1
                  ][currentPlayer.location.x] <= 1
                ) {
                  currentPlayer.pump.length = currentPlayer.pump.length + 1;
                } else {
                  clearPump(
                    ctx,
                    currentPlayer.direction,
                    currentPlayer.location,
                    currentPlayer.pump.length
                  );
                  currentPlayer.pump.length = 0;
                }
                break;
              case Direction.South:
                if (
                  gameBoard[
                    currentPlayer.location.y + currentPlayer.pump.length + 1
                  ][currentPlayer.location.x] <= 1
                ) {
                  currentPlayer.pump.length = currentPlayer.pump.length + 1;
                } else {
                  clearPump(
                    ctx,
                    currentPlayer.direction,
                    currentPlayer.location,
                    currentPlayer.pump.length
                  );
                  currentPlayer.pump.length = 0;
                }
                break;
              case Direction.East:
                if (
                  gameBoard[currentPlayer.location.y][
                    currentPlayer.location.x + currentPlayer.pump.length + 1
                  ] <= 1
                ) {
                  currentPlayer.pump.length = currentPlayer.pump.length + 1;
                } else {
                  clearPump(
                    ctx,
                    currentPlayer.direction,
                    currentPlayer.location,
                    currentPlayer.pump.length
                  );
                  currentPlayer.pump.length = 0;
                }
                break;
              case Direction.West:
                if (
                  gameBoard[currentPlayer.location.y][
                    currentPlayer.location.x - currentPlayer.pump.length - 1
                  ] <= 1
                ) {
                  currentPlayer.pump.length = currentPlayer.pump.length + 1;
                } else {
                  clearPump(
                    ctx,
                    currentPlayer.direction,
                    currentPlayer.location,
                    currentPlayer.pump.length
                  );
                  currentPlayer.pump.length = 0;
                }
                break;
            }
          } else {
            clearPump(
              ctx,
              currentPlayer.direction,
              currentPlayer.location,
              currentPlayer.pump.length
            );
            currentPlayer.pump.length = 0;
          }
          break;
        case "r":
          if (!running) {
            handleRestart();
          }
          break;
        default:
          console.error("Error with handleKeyDown");
      }
      if (running) {
        setTaizoHori(currentPlayer);
      }
    }
  }, gameDelay);

  // Event Listener: Key Presses
  useEffect(() => {
    document.addEventListener("keydown", throttledKeyDown);
    return () => {
      document.removeEventListener("keydown", throttledKeyDown);
    };
  }, [taizoHori]);

  const handleRestart = () => {
    setRunning(true);
    setIsGameStart(true);

    let player = _.cloneDeep(taizoHori);

    player.location.x = 0;
    player.location.y = 0;

    setTaizoHori(player);
    setEnemies(initializeEnemies());
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (
      ["Space", "ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].indexOf(
        e.code
      ) > -1
    ) {
      e.preventDefault();
    }
  };

  // prevent scrolling of window when playing game
  useEffect(() => {
    window.addEventListener("keydown", onKeyDown, false);
    return () => window.removeEventListener("keydown", onKeyDown);
  });

  return (
    <body className={styles.digDug}>
      <h2>Dig Dug Clone</h2>
      <div className={styles.gameContainer}>
        <div className={styles.border}>
          <div className={styles.scoreBoard}>
            <h1>HIGH SCORE</h1>
            <ul>
              <li>currentScore: {score}</li>
              <li>bestScore: {bestScore}</li>
            </ul>
          </div>
          <div className={styles.gameBoard}>
            {!running ? (
              <div className={styles.gameOver}>
                <h2>GAME OVER</h2>
                <h6>Press "r" to retry</h6>
              </div>
            ) : (
              <></>
            )}
            <canvas ref={canvasRef} width={canvasWidth} height={canvasHeight} />
          </div>
          <ul className={styles.gameInfo}>
            <li>1 Life</li>
            <li>Round {round}</li>
          </ul>
        </div>
      </div>
      <h4>Use arrow keys to move and space to attack.</h4>
    </body>
  );
};

export default Home;

// Planning;

// next.js game resource -> https://github.com/marcmll/next-snake
// gameboard: https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D
// character is 2 blocks wide and each 2 block section is a little sliver of a block
// for the levels I want to come up with some kinda of randomzier that will place a certian number oif air holes and enemies
// around based on luck and maybe the number of levels played to get progressivly harder
// will need some kind of game speed for when the player gets further in the game
// -> more on that here: https://overreacted.io/making-setinterval-declarative-with-react-hooks/
// ^^ pop in his useInterval hook looks very nice

// https://www.spriters-resource.com/search/?q=dig+dug <- spriters

//TODO
// 1. draw beam horizontal

//NOTES
// 1. Keeping the enemies to have like a max number (5 or so) will be way easier
// 2. May ignore adding in the fruits as its easier
// 3. Prioritize my work to get a single leveling working functionally. After that I can add more levels
//    and make it pretty. Animations might not happen idk. Music would be pretty sweet
// 4. only implement 1 enemy type for the time being
// 5. making the digging look nicer is possible and easiest way is to add more blocks and jsut make dig dug bigger
