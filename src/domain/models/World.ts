import { GameState } from './GameState';
import { Obstacle } from './Obstacle';

export interface BackgroundObject {
  spriteName: string;
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
}

/**
 * @class World
 * @description Представляет сущность игрового мира.
 * @property {number} groundLevel - Координата Y, на которой находится поверхность земли.
 * @property {number} speed - Текущая скорость движения мира (пикселей за кадр).
 * @property {number} backgroundOffset - Смещение фона/земли по оси X для иллюзии движения.
 * @property {Obstacle[]} obstacles - Массив активных препятствий.
 * @property {BackgroundObject[]} backgroundObjects - Массив фоновых объектов (облака).
 * @property {GameState} gameState - Текущее состояние игры (ожидание, игра, конец).
 * @property {number} score - Текущий счет игрока.
 * @property {number} highScore - Лучший результат за сессию.
 * @property {number} obstacleSpawnTimer - Таймер для появления следующего препятствия.
 */
export class World {
  groundLevel: number;

  speed: number;

  backgroundOffset: number;

  obstacles: Obstacle[];

  backgroundObjects: BackgroundObject[];

  gameState: GameState;

  score: number;

  highScore: number;

  obstacleSpawnTimer: number;

  cloudSpawnTimer: number;

  backgroundColor: string;


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
    this.backgroundObjects = [];
    this.gameState = GameState.WaitingToStart;
    this.score = 0;
    this.highScore = 0;
    this.obstacleSpawnTimer = 0;
    this.cloudSpawnTimer = 0;
    this.backgroundColor = '#87CEEB'; // Sky Blue for day
  }
}
