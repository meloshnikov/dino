/**
 * @const GAME_CONFIG
 * @description Глобальный объект конфигурации, содержащий все основные константы игры.
 * @property {number} CANVAS_WIDTH - Ширина игрового холста (px).
 * @property {number} CANVAS_HEIGHT - Высота игрового холста (px).
 * @property {{x: number, y: number}} PLAYER_INITIAL_POS - Начальная позиция игрока.
 * @property {{width: number, height: number}} PLAYER_SIZE - Размер игрока.
 * @property {number} GRAVITY - Сила гравитации, действующая на игрока.
 * @property {number} WORLD_INITIAL_SPEED - Начальная скорость движения мира.
 * @property {number} GROUND_LEVEL - Координата Y уровня земли.
 * @property {number} OBSTACLE_MIN_HEIGHT - Минимальная высота препятствия.
 * @property {number} OBSTACLE_MAX_HEIGHT - Максимальная высота препятствия.
 * @property {number} OBSTACLE_WIDTH - Ширина препятствия.
 * @property {number} OBSTACLE_SPAWN_RATE_MIN - Мин. кадров между появлением препятствий.
 * @property {number} OBSTACLE_SPAWN_RATE_MAX - Макс. кадров между появлением препятствий.
 */
export const GAME_CONFIG = {
  CANVAS_WIDTH: 800,
  CANVAS_HEIGHT: 300,
  PLAYER_INITIAL_POS: { x: 50, y: 250 },
  PLAYER_SIZE: { width: 44, height: 47 },
  GRAVITY: 0.5,
  WORLD_INITIAL_SPEED: 5,
  GROUND_LEVEL: 250,

  OBSTACLE_MIN_HEIGHT: 30,
  OBSTACLE_MAX_HEIGHT: 70,
  OBSTACLE_WIDTH: 30,
  OBSTACLE_SPAWN_RATE_MIN: 50,
  OBSTACLE_SPAWN_RATE_MAX: 120,
};
