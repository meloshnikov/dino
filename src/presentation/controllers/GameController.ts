import {
  Player,
  World,
  GameState,
} from '../../domain/models';
import {
  playerJump,
  updatePlayerState,
  updateWorldState,
  checkCollisions,
} from '../../application/use-cases';
import { CanvasRenderer } from '../../infrastructure/rendering';
import { BrowserInputHandler } from '../../infrastructure/input';
import { GAME_CONFIG } from '../../infrastructure/config';

/**
 * @class GameController
 * @description Управляет основным игровым циклом, состоянием и взаимодействием компонентов игры.
 */
export class GameController {
  private renderer: CanvasRenderer;

  private inputHandler: BrowserInputHandler;

  private player: Player;

  private world: World;

  private frameId: number = 0;

  /**
   * @constructor
   * @param {HTMLCanvasElement} canvas - HTML-элемент canvas для отрисовки.
   */
  constructor(canvas: HTMLCanvasElement) {
    this.renderer = new CanvasRenderer(canvas);
    this.player = GameController.createPlayer();
    this.world = GameController.createWorld();
    this.inputHandler = new BrowserInputHandler(this.handleInput.bind(this));
    this.resetGame();
  }

  /**
   * @method createPlayer
   * @private
   * @static
   * @description Создает экземпляр игрока.
   * @returns {Player} - Новый экземпляр игрока.
   */
  private static createPlayer(): Player {
    return new Player(
      GAME_CONFIG.PLAYER_INITIAL_POS,
      GAME_CONFIG.PLAYER_SIZE,
      GAME_CONFIG.GRAVITY
    );
  }

  /**
   * @method createWorld
   * @private
   * @static
   * @description Создает экземпляр игрового мира.
   * @returns {World} - Новый экземпляр мира.
   */
  private static createWorld(): World {
    return new World(
      GAME_CONFIG.GROUND_LEVEL,
      GAME_CONFIG.WORLD_INITIAL_SPEED
    );
  }

  /**
   * @method resetGame
   * @private
   * @description Сбрасывает состояние игры до начального.
   */
  private resetGame(): void {
    const oldHighScore = this.world?.highScore || 0;
    this.player = GameController.createPlayer();
    this.world = GameController.createWorld();
    this.world.highScore = oldHighScore;
    this.world.gameState = GameState.WaitingToStart;
  }

  /**
   * @method handleInput
   * @private
   * @description Обрабатывает ввод пользователя в зависимости от состояния игры.
   */
  private handleInput(): void {
    switch (this.world.gameState) {
      case GameState.WaitingToStart:
        this.world.gameState = GameState.Playing;
        playerJump(this.player);
        break;
      case GameState.Playing:
        playerJump(this.player);
        break;
      case GameState.GameOver:
        this.resetGame();
        break;
      default:
        break;
    }
  }

  /**
   * @method update
   * @private
   * @description Обновляет состояние игры, если она активна.
   */
  private update(): void {
    if (this.world.gameState !== GameState.Playing) return;

    updatePlayerState(this.player, this.world);
    updateWorldState(this.world);

    if (checkCollisions(this.player, this.world.obstacles)) {
      this.world.gameState = GameState.GameOver;
      if (this.world.score > this.world.highScore) {
        this.world.highScore = this.world.score;
      }
    }
  }

  /**
   * @method gameLoop
   * @private
   * @description Основной игровой цикл. Выполняет обновление и отрисовку каждого кадра.
   */
  private gameLoop(): void {
    this.update();
    this.renderer.clear();
    this.renderer.draw(this.player, this.world);
    this.frameId = requestAnimationFrame(this.gameLoop.bind(this));
  }

  /**
   * @method start
   * @description Запускает игровой цикл.
   */
  public start(): void {
    this.gameLoop();
  }

  /**
   * @method destroy
   * @description Останавливает игровой цикл и очищает ресурсы.
   */
  public destroy(): void {
    cancelAnimationFrame(this.frameId);
    this.inputHandler.destroy();
  }
}
