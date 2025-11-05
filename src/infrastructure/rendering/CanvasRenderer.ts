import { IGameRenderer } from '../../application/ports/IGameRenderer';
import { Player, World, GameState, Obstacle, BackgroundObject } from '../../domain/models';

// Ассеты
import playerRunRightSprite from '../../assets/Chrome_T-Rex_Right_Run.png';
import playerRunLeftSprite from '../../assets/Chrome_T-Rex_Left_Run.png';
import playerJumpSprite from '../../assets/Chrome_T-Rex_Left_Run.png';
import playerDeadSprite from '../../assets/Chrome_T-Rex-Dead.webp.png';
import cactusSmall from '../../assets/Chrome_1_Cactus.png';
import cactusLarge from '../../assets/Chrome_3_Cactus.png';
import cloudSprite from '../../assets/Chrome_T-Rex-cloud.png';

/**
 * @class CanvasRenderer
 * @implements {IGameRenderer}
 * @description Реализация рендерера на Canvas API.
 */
export class CanvasRenderer implements IGameRenderer {
  private ctx: CanvasRenderingContext2D;
  private assets: Map<string, HTMLImageElement> = new Map();
  
  // Координаты спрайтов [x, y, width, height]
  private spriteCoords = {
    jumping: [0, 0, 88, 94],
    collided: [0, 0, 88, 94],
    'cactus-small': [0, 0, 34, 70],
    'cactus-large': [0, 0, 102, 70],
  };


  /**
   * @constructor
   * @param {HTMLCanvasElement} canvas - HTML-элемент canvas для отрисовки.
   */
  constructor(canvas: HTMLCanvasElement) {
    this.ctx = canvas.getContext('2d')!;
  }
  
  /**
   * @method loadAssets
   * @description Асинхронно загружает все игровые ассеты.
   * @returns {Promise<void>}
   */
  public async loadAssets(): Promise<void> {
    await this.loadImages();
  }

  /**
   * @method loadImage
   * @private
   * @description Загружает одно изображение и сохраняет его в карту ассетов.
   * @param {string} name - Имя ассета.
   * @param {string} src - URL изображения.
   * @returns {Promise<void>}
   */
  private loadImage(name: string, src: string): Promise<void> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        this.assets.set(name, img);
        resolve();
      };
      img.onerror = reject;
    });
  }

  /**
   * @method loadImages
   * @private
   * @description Загружает все изображения, необходимые для игры.
   * @returns {Promise<void>}
   */
  private async loadImages(): Promise<void> {
    await Promise.all([
      this.loadImage('player-run-right', playerRunRightSprite),
      this.loadImage('player-run-left', playerRunLeftSprite),
      this.loadImage('player-jump', playerJumpSprite),
      this.loadImage('player-dead', playerDeadSprite),
      this.loadImage('cactus-small', cactusSmall),
      this.loadImage('cactus-large', cactusLarge),
      this.loadImage('cloud', cloudSprite),
    ]);
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
   * @method drawPlayer
   * @private
   * @description Отрисовывает спрайт игрока в зависимости от его состояния.
   */
  private drawPlayer(player: Player) {
    let playerImage: HTMLImageElement | undefined;
    let sX = 0, sY = 0, sW = 88, sH = 94;

    switch (player.animationState) {
      case 'running':
        playerImage = this.assets.get(player.animationFrame === 0 ? 'player-run-right' : 'player-run-left');
        if (!playerImage) return;
        sW = playerImage.width;
        sH = playerImage.height;
        break;
      case 'jumping':
        playerImage = this.assets.get('player-jump');
        if (!playerImage) return;
        [sX, sY, sW, sH] = this.spriteCoords.jumping;
        break;
      case 'collided':
        playerImage = this.assets.get('player-dead');
        if (!playerImage) return;
        [sX, sY, sW, sH] = this.spriteCoords.collided;
        break;
    }
    
    this.ctx.drawImage(
      playerImage,
      sX, sY, sW, sH, // Source rect
      player.position.x, player.position.y, player.size.width, player.size.height // Destination rect
    );
  }
  
  /**
   * @method drawObstacles
   * @private
   * @description Отрисовывает спрайты препятствий.
   */
  private drawObstacles(obstacles: Obstacle[]) {
    obstacles.forEach(obstacle => {
      const obstacleImage = this.assets.get(obstacle.type);
      if (obstacleImage) {
        this.ctx.drawImage(obstacleImage, obstacle.x, obstacle.y, obstacle.width, obstacle.height);
      }
    });
  }

  /**
   * @method drawBackgroundObjects
   * @private
   * @description Отрисовывает фоновые объекты (облака).
   */
  private drawBackgroundObjects(backgroundObjects: BackgroundObject[]) {
    const cloudImage = this.assets.get('cloud');
    if (!cloudImage) return;

    backgroundObjects.forEach(cloud => {
      this.ctx.drawImage(cloudImage, cloud.x, cloud.y, cloud.width, cloud.height);
    });
  }


  /**
   * @method drawGame
   * @private
   * @description Отрисовывает основные элементы игры: мир, игрока, счет.
   */
  private drawGame(player: Player, world: World) {
    // Отрисовка облаков
    this.drawBackgroundObjects(world.backgroundObjects);

    // Отрисовка земли
    this.ctx.fillStyle = '#333';
    this.ctx.fillRect(0, world.groundLevel, this.ctx.canvas.width, 2);

    // Отрисовка препятствий
    this.drawObstacles(world.obstacles);

    // Отрисовка игрока
    this.drawPlayer(player);

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
