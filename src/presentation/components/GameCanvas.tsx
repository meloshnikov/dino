import React from 'react';
import { GAME_CONFIG } from '../../infrastructure/config/gameConstants';

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
