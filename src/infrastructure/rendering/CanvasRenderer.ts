import { IGameRenderer } from '../../application/ports/IGameRenderer';
import { Player, World, GameState } from '../../domain/models';

/**
 * @class CanvasRenderer
 * @implements {IGameRenderer}
 * @description Реализация рендерера на Canvas API.
 */
export class CanvasRenderer implements IGameRenderer {
  private ctx: CanvasRenderingContext2D;

  /**
   * @constructor
   * @param {HTMLCanvasElement} canvas - HTML-элемент canvas для отрисовки.
   */
  constructor(canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext('2d')!;
  }

  /**
   * @method clear
   * @description Очищает холст.
   */
  clear() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  /**
   * @method draw
   * @description Отрисовывает игру в зависимости от состояния.
   * @param {Player} player - Объект игрока.
   * @param {World} world - Объект мира.
   */
  draw(player: Player, world: World) {
    this.drawGame(player, world); // Всегда рисуем мир и игрока

    switch (world.gameState) {
      case GameState.WaitingToStart:
        this.drawStartScreen();
        break;
      case GameState.GameOver:
        this.drawGameOverScreen(world.score, world.highScore);
        break;
      default:
        break;
    }
  }

  /**
   * @method drawGame
   * @private
   * @description Отрисовывает основные элементы игры: мир, игрока, счет.
   */
  private drawGame(player: Player, world: World) {
    // Отрисовка земли
    this.ctx.fillStyle = '#333';
    this.ctx.fillRect(0, world.groundLevel, this.ctx.canvas.width, 2);

    // Отрисовка препятствий
    this.ctx.fillStyle = '#c23b22';
    world.obstacles.forEach((obstacle) => {
      this.ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
    });

    // Отрисовка игрока
    this.ctx.fillStyle = '#666';
    this.ctx.fillRect(player.position.x, player.position.y, player.size.width, player.size.height);

    // Отрисовка счета
    this.ctx.fillStyle = '#111';
    this.ctx.font = '20px Arial';
    this.ctx.textAlign = 'right';
    this.ctx.fillText(`Score: ${Math.floor(world.score)}`, this.ctx.canvas.width - 10, 30);
    this.ctx.fillText(`High: ${Math.floor(world.highScore)}`, this.ctx.canvas.width - 10, 55);
  }

  /**
   * @method drawStartScreen
   * @private
   * @description Отрисовывает экран ожидания начала игры.
   */
  private drawStartScreen() {
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

    this.ctx.fillStyle = 'white';
    this.ctx.font = '30px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('Нажмите Пробел, чтобы начать', this.ctx.canvas.width / 2, this.ctx.canvas.height / 2);
  }

  /**
   * @method drawGameOverScreen
   * @private
   * @description Отрисовывает экран конца игры.
   */
  private drawGameOverScreen(score: number, highScore: number) {
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    this.ctx.fillRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);

    this.ctx.fillStyle = 'white';
    this.ctx.font = '40px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('Game Over', this.ctx.canvas.width / 2, this.ctx.canvas.height / 2 - 40);

    this.ctx.font = '20px Arial';
    this.ctx.fillText(`Score: ${Math.floor(score)}`, this.ctx.canvas.width / 2, this.ctx.canvas.height / 2);
    this.ctx.fillText(`High: ${Math.floor(highScore)}`, this.ctx.canvas.width / 2, this.ctx.canvas.height / 2 + 25);

    this.ctx.font = '18px Arial';
    this.ctx.fillText('Нажмите любую клавишу для перезапуска', this.ctx.canvas.width / 2, this.ctx.canvas.height / 2 + 70);
  }
}
