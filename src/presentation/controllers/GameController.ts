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
   * @param {CanvasRenderer} renderer - Готовый экземпляр рендерера.
   */
  private constructor(renderer: CanvasRenderer) {
    this.renderer = renderer;
    this.player = GameController.createPlayer();
    this.world = GameController.createWorld();
    this.inputHandler = new BrowserInputHandler(this.handleInput.bind(this));
    this.resetGame();
  }

  /**
   * @method create
   * @public
   * @static
   * @description Асинхронно создает и инициализирует контроллер игры.
   * @param {HTMLCanvasElement} canvas - HTML-элемент canvas для отрисовки.
   * @returns {Promise<GameController>} - Экземпляр GameController.
   */
  public static async create(canvas: HTMLCanvasElement): Promise<GameController> {
    const renderer = new CanvasRenderer(canvas);
    await renderer.loadAssets();
    return new GameController(renderer);
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

  private lastTime: number = 0;

  /**
   * @method update
   * @private
   * @description Обновляет состояние игры, если она активна.
   * @param {number} deltaTime - Время, прошедшее с последнего кадра (в мс).
   */
  private update(deltaTime: number): void {
    if (this.world.gameState !== GameState.Playing) return;

    updatePlayerState(this.player, this.world, deltaTime);
    updateWorldState(this.world);
    this.updateBackgroundColor();

    if (checkCollisions(this.player, this.world.obstacles)) {
      this.world.gameState = GameState.GameOver;
      if (this.world.score > this.world.highScore) {
        this.world.highScore = this.world.score;
      }
    }
  }

  /**
   * @method interpolateColor
   * @private
   * @static
   * @description Линейно интерполирует между двумя цветами.
   * @param {number[]} color1 - Начальный цвет в формате [r, g, b].
   * @param {number[]} color2 - Конечный цвет в формате [r, g, b].
   * @param {number} factor - Фактор интерполяции (от 0 до 1).
   * @returns {string} - Интерполированный цвет в формате "rgb(r, g, b)".
   */
  private static interpolateColor(color1: number[], color2: number[], factor: number): string {
    const result = color1.slice();
    for (let i = 0; i < 3; i += 1) {
      result[i] = Math.round(result[i] + factor * (color2[i] - color1[i]));
    }
    return `rgb(${result[0]}, ${result[1]}, ${result[2]})`;
  }

  /**
   * @method updateBackgroundColor
   * @private
   * @description Обновляет цвет фона мира в зависимости от счета для создания цикла дня и ночи.
   */
  private updateBackgroundColor(): void {
    const { score } = this.world;
    const cycleDuration = 2000; // Один полный цикл "день-ночь-день"
    const halfCycle = cycleDuration / 2;

    const dayColor = [135, 206, 235]; // Sky Blue
    const nightColor = [0, 0, 139];     // Dark Blue

    const cyclePosition = score % cycleDuration;

    let factor;
    if (cyclePosition < halfCycle) {
      // От дня к ночи
      factor = cyclePosition / halfCycle;
      this.world.backgroundColor = GameController.interpolateColor(dayColor, nightColor, factor);
    } else {
      // От ночи ко дню
      factor = (cyclePosition - halfCycle) / halfCycle;
      this.world.backgroundColor = GameController.interpolateColor(nightColor, dayColor, factor);
    }
  }

  /**
   * @method gameLoop
   * @private
   * @description Основной игровой цикл. Выполняет обновление и отрисовку каждого кадра.
   * @param {number} timestamp - Текущее время от requestAnimationFrame.
   */
  private gameLoop(timestamp: number): void {
    const deltaTime = timestamp - this.lastTime;
    this.lastTime = timestamp;

    this.update(deltaTime);
    this.renderer.clear(this.world);
    this.renderer.draw(this.player, this.world);
    this.frameId = requestAnimationFrame(this.gameLoop.bind(this));
  }

  /**
   * @method start
   * @description Запускает игровой цикл.
   */
  public start(): void {
    this.lastTime = 0;
    this.frameId = requestAnimationFrame(this.gameLoop.bind(this));
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
