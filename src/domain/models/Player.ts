/**
 * @interface Position
 * @description Представляет координаты объекта в 2D-пространстве.
 * @property {number} x - Координата по оси X.
 * @property {number} y - Координата по оси Y.
 */
export interface Position {
  x: number;
  y: number;
}

/**
 * @class Player
 * @description Представляет сущность игрока в игровом мире.
 * @property {Position} position - Текущая позиция игрока (левый верхний угол).
 * @property {{ y: number }} velocity - Скорость игрока по вертикали (положительное значение - вниз).
 * @property {{ width: number; height: number }} size - Размеры игрока (ширина и высота).
 * @property {boolean} isJumping - Флаг, указывающий, находится ли игрок в состоянии прыжка.
 * @property {number} gravity - Сила гравитации, постоянно действующая на игрока.
 */
export class Player {
  position: Position;

  velocity: { y: number };

  size: { width: number; height: number };

  isJumping: boolean;

  gravity: number;

  animationState: 'running' | 'jumping' | 'collided';

  animationFrame: number;

  frameTime: number;

  frameInterval: number;

  /**
   * @constructor
   * @param {Position} initialPos - Начальная позиция игрока.
   * @param {{ width: number; height: number }} size - Размер игрока.
   * @param {number} gravity - Сила гравитации.
   */
  constructor(
    initialPos: Position,
    size: { width: number; height: number },
    gravity: number,
  ) {
    this.position = { ...initialPos };
    this.size = size;
    this.gravity = gravity;
    this.velocity = { y: 0 };
    this.isJumping = false;
    this.animationState = 'running';
    this.animationFrame = 0;
    this.frameTime = 0;
    this.frameInterval = 100; // ms per frame
  }
}
