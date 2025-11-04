import { Obstacle } from './Obstacle';

/**
 * @class World
 * @description Представляет сущность игрового мира.
 * @property {number} groundLevel - Координата Y, на которой находится поверхность земли.
 * @property {number} speed - Текущая скорость движения мира (пикселей за кадр).
 * @property {number} backgroundOffset - Смещение фона/земли по оси X для иллюзии движения.
 * @property {Obstacle[]} obstacles - Массив активных препятствий.
 * @property {boolean} isGameOver - Флаг, указывающий, закончена ли игра.
 * @property {number} score - Текущий счет игрока.
 * @property {number} highScore - Лучший результат за сессию.
 * @property {number} obstacleSpawnTimer - Таймер для появления следующего препятствия.
 */
export class World {
  groundLevel: number;

  speed: number;

  backgroundOffset: number;

  obstacles: Obstacle[];

  isGameOver: boolean;

  score: number;

  highScore: number;

  obstacleSpawnTimer: number;

  /**
   * @constructor
   * @param {number} groundLevel - Начальный уровень земли.
   * @param {number} initialSpeed - Начальная скорость мира.
   */
  constructor(groundLevel: number, initialSpeed: number) {
    this.groundLevel = groundLevel;
    this.speed = initialSpeed;
    this.backgroundOffset = 0;
    this.obstacles = [];
    this.isGameOver = false;
    this.score = 0;
    this.highScore = 0;
    this.obstacleSpawnTimer = 0;
  }
}
