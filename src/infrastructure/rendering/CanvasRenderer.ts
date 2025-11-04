import { IGameRenderer } from '../../application/ports/IGameRenderer';
import { Player } from '../../domain/models/Player';
import { World } from '../../domain/models/World';

/**
 * @class CanvasRenderer
 * @implements {IGameRenderer}
 * @description Реализация рендерера, использующая HTML5 Canvas API для отрисовки игровых объектов.
 */
export class CanvasRenderer implements IGameRenderer {
  private ctx: CanvasRenderingContext2D;

  /**
   * @constructor
   * @param {HTMLCanvasElement} canvas - HTML-элемент canvas, на котором будет происходить отрисовка.
   */
  constructor(canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext('2d')!;
  }

  /**
   * @method clear
   * @description Полностью очищает холст перед каждой новой отрисовкой.
   */
  clear() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  /**
   * @method drawPlayer
   * @description Отрисовывает игрока в виде прямоугольника.
   * @param {Player} player - Объект игрока.
   */
  drawPlayer(player: Player) {
    this.ctx.fillStyle = '#666';
    this.ctx.fillRect(player.position.x, player.position.y, player.size.width, player.size.height);
  }

  /**
   * @method drawWorld
   * @description Отрисовывает все элементы игрового мира: землю, препятствия, счет и экран "Game Over".
   * @param {World} world - Объект мира.
   */
  drawWorld(world: World) {
    // Цвет земли
    this.ctx.fillStyle = '#333';
    // Основная линия земли
    this.ctx.fillRect(0, world.groundLevel, this.ctx.canvas.width, 2);

    // Рисуем повторяющийся узор на земле для имитации движения
    this.ctx.fillStyle = '#666';
    const segmentWidth = 30;
    const gapWidth = 50;
    const patternWidth = segmentWidth + gapWidth;

    const startOffset = world.backgroundOffset % patternWidth;

    for (let x = -startOffset; x < this.ctx.canvas.width; x += patternWidth) {
      this.ctx.fillRect(x, world.groundLevel, segmentWidth, 5);
    }

    // Отрисовка препятствий
    this.ctx.fillStyle = '#c23b22'; // Цвет препятствий
    world.obstacles.forEach((obstacle) => {
      this.ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    });

    // Отрисовка счета
    this.ctx.fillStyle = '#111';
    this.ctx.font = '20px Arial';
    this.ctx.textAlign = 'right';
    this.ctx.fillText(`Score: ${Math.floor(world.score)}`, this.ctx.canvas.width - 10, 30);
    this.ctx.fillText(`High: ${Math.floor(world.highScore)}`, this.ctx.canvas.width - 10, 55);

    // Если игра окончена, показать сообщение
    if (world.isGameOver) {
      this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
      this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

      this.ctx.fillStyle = 'white';
      this.ctx.font = '40px Arial';
      this.ctx.textAlign = 'center';
      this.ctx.fillText('Game Over', this.ctx.canvas.width / 2, this.ctx.canvas.height / 2 - 20);

      this.ctx.font = '20px Arial';
      this.ctx.fillText('Press any key to restart', this.ctx.canvas.width / 2, this.ctx.canvas.height / 2 + 20);
    }
  }
}
