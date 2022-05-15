import { Direction, Enemy, Player } from "./Interfaces";

export const initializeEnemies = () => {
  let enemies = new Array<Enemy>();

  let enemyOne = {
    location: {
      x: 6,
      y: 5,
    },
    isDead: false,
    apperance: "static/images/ballon_enemy.png",
  };

  let enemyTwo = {
    location: {
      x: 6,
      y: 9,
    },
    isDead: false,
    apperance: "static/images/ballon_enemy.png",
  };

  enemies.push(enemyOne, enemyTwo);

  return enemies;
};

export const isDead = (direction: Direction, player: Player, enemy: Enemy) => {
  switch (direction) {
    case Direction.North:
      for (let i = 0; i <= player.pump.length; i++) {
        let result = checkDead(player.location.x, player.location.y - i, enemy);

        if (result === true) {
          return true;
        }
      }
      return false;
    case Direction.South:
      for (let i = 0; i <= player.pump.length; i++) {
        let result = checkDead(
          player.location.x,
          player.location.y + i,
          enemy
        );

        if (result === true) {
          return true;
        }
      }
      return false;
    case Direction.East:
      for (let i = 0; i <= player.pump.length; i++) {
        let result = checkDead(
          player.location.x + i,
          player.location.y,
          enemy
        );

        if (result === true) {
          return true;
        }
      }
      return false;
    case Direction.West:
      for (let i = 0; i <= player.pump.length; i++) {
        let result = checkDead(
          player.location.x - i,
          player.location.y,
          enemy
        );

        if (result === true) {
          return true;
        }
      }
      return false;
  }
};

const checkDead = (firstX: number, firstY: number, enemy: Enemy) => {
  return firstX === enemy.location.x && firstY === enemy.location.y;
};
