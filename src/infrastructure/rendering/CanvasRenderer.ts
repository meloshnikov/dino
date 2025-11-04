import { IGameRenderer } from '../../application/ports/IGameRenderer';
import { Player } from '../../domain/models/Player';
import { World } from '../../domain/models/World';

export class CanvasRenderer implements IGameRenderer {
  private ctx: CanvasRenderingContext2D;

  constructor(canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext('2d')!;
  }

  clear() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
  }

  drawPlayer(player: Player) {
    this.ctx.fillStyle = '#666';
    this.ctx.fillRect(player.position.x, player.position.y, player.size.width, player.size.height);
  }

  drawWorld(world: World) {
    /** Цвет земли */
    this.ctx.fillStyle = '#333';
    /** Основная линия земли */
    this.ctx.fillRect(0, world.groundLevel, this.ctx.canvas.width, 2);

    /** Рисуем повторяющийся узор на земле, чтобы сделать движение видимым */
    this.ctx.fillStyle = '#666';
    const segmentWidth = 30;
    const gapWidth = 50;
    const patternWidth = segmentWidth + gapWidth;

    /** Используем оператор остатка для создания бесконечно повторяющегося узора */
    const startOffset = world.backgroundOffset % patternWidth;

    for (let x = -startOffset; x < this.ctx.canvas.width; x += patternWidth) {
      /** Рисуем каждый сегмент узора */
      this.ctx.fillRect(x, world.groundLevel, segmentWidth, 5);
    }
  }
}
