/**
 * @class BrowserInputHandler
 * @description Управляет вводом пользователя в браузере (клавиатура, мышь, касания).
 */
export class BrowserInputHandler {
  private onJump: () => void;

  private handleKeyDown: (e: KeyboardEvent) => void;

  private handleMouseDown: () => void;

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
   * @description Удаляет все слушатели событий, чтобы избежать утечек памяти.
   */
  destroy() {
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('mousedown', this.handleMouseDown);
    window.removeEventListener('touchstart', this.handleTouchStart);
  }
}
