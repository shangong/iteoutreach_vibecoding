export const GRID_SIZE = 20; // 20x20 grid
export const INITIAL_SPEED = 150; // ms
export const MIN_SPEED = 50; // ms
export const SPEED_DECREMENT = 2; // ms per food
export const SCORE_INCREMENT = 10;

// Defines coordinates for the initial snake (middle of board)
export const INITIAL_SNAKE = [
  { x: 10, y: 10 },
  { x: 10, y: 11 },
  { x: 10, y: 12 },
];

export const INITIAL_DIRECTION = 'UP'; // Using string/enum value directly implies import in usage
