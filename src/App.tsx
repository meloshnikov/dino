import { useRef } from 'react';
import GameCanvas from './presentation/components/GameCanvas';
import { useGameController } from './presentation/hooks/useGameController';

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useGameController(canvasRef);

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
      <GameCanvas ref={canvasRef} />
    </div>
  );
}

export default App;
