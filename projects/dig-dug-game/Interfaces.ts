export interface Player {
  location: Location,
  direction: Direction,
  pump: Pump,
  apperance: string
}

export interface Pump {
  length: number
}

export interface Location {
  x: number,
  y: number
}
// Enemey might be able to extend player whcih should amybe be called baseNPC or somthing
export interface Enemy {
  location: Location,
  isDead: boolean,
  apperance: string
}

// TODO this can go somwhere more apportiate
export enum Direction {
  North,
  South,
  East,
  West
}