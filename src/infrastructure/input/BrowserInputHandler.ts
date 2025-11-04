/**
 * @class BrowserInputHandler
 * @description Управляет вводом пользователя (клавиатура, мышь, касания).
 * @param {() => void} onJump - Колбэк-функция, вызываемая при действии прыжка.
 */
export class BrowserInputHandler {
  private onJump: () => void;

  private handleKeyDown: (e: KeyboardEvent) => void;

  private handleMouseDown: () => void;

  private handleTouchStart: () => void;

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
