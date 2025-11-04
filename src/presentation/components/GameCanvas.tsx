import React from 'react';
import { GAME_CONFIG } from '../../infrastructure/config/gameConstants';

/**
 * @component GameCanvas
 * @description React-компонент, который отображает HTML-элемент `<canvas>` для игры.
 * Использует `React.forwardRef` для передачи `ref` на DOM-элемент canvas.
 * @param {object} props - Свойства, передаваемые в компонент.
 * @param {React.Ref<HTMLCanvasElement>} ref - Ref для доступа к элементу canvas.
 * @returns {React.ReactElement} - Элемент canvas.
 */
const GameCanvas = React.forwardRef<HTMLCanvasElement>((props, ref) => (
  <canvas
    ref={ref}
    width={GAME_CONFIG.CANVAS_WIDTH}
    height={GAME_CONFIG.CANVAS_HEIGHT}
    style={{ border: '1px solid black' }}
    {...props}
  />
));

export default GameCanvas;
