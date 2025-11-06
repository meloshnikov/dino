/**
 * @class BrowserInputHandler
 * @description Управляет вводом пользователя (клавиатура, мышь, касания).
 * @param {() => void} onJump - Колбэк-функция, вызываемая при действии прыжка.
 */
export class BrowserInputHandler {
  private onJump: () => void;

  /**
   * @property { (e: KeyboardEvent) => void } handleKeyDown - обработчик нажатия клавиш
   */
  private handleKeyDown: (e: KeyboardEvent) => void;

  /**
   * @property { () => void } handleMouseDown - обработчик нажатия мыши
   */
  private handleMouseDown: () => void;

  /**
   * @property { () => void } handleTouchStart - обработчик касания
   */
  private handleTouchStart: () => void;

  /**
   * @constructor
   * @param {() => void} onJump - Колбэк-функция, вызываемая при действии прыжка.
   */
  constructor(onJump: () => void) {
    this.onJump = onJump;

    this.handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'ArrowUp') {
        this.onJump();
      }
    };

    this.handleMouseDown = () => {
      this.onJump();
    };

    this.handleTouchStart = () => {
      this.onJump();
    };

    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('mousedown', this.handleMouseDown);
    window.addEventListener('touchstart', this.handleTouchStart);
  }

  /**
   * @method destroy
   * @description Удаляет слушатели событий во избежание утечек памяти.
   */
  destroy() {
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('mousedown', this.handleMouseDown);
    window.removeEventListener('touchstart', this.handleTouchStart);
  }
}
