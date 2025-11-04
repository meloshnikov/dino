/**
 * @const GAME_CONFIG
 * @description Глобальный объект конфигурации, содержащий все основные константы игры.
 */
export const GAME_CONFIG = {
  CANVAS_WIDTH: 800,
  CANVAS_HEIGHT: 300,
  PLAYER_INITIAL_POS: { x: 50, y: 250 },
  PLAYER_SIZE: { width: 50, height: 50 },
  GRAVITY: 0.5,
  WORLD_INITIAL_SPEED: 5,
  GROUND_LEVEL: 250,

  // Obstacle properties
  OBSTACLE_MIN_HEIGHT: 30,
  OBSTACLE_MAX_HEIGHT: 70,
  OBSTACLE_WIDTH: 30,
  OBSTACLE_SPAWN_RATE_MIN: 50, // Min frames between spawns
  OBSTACLE_SPAWN_RATE_MAX: 120, // Max frames between spawns
};
