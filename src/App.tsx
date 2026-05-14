import React, { useState, useEffect, useRef } from 'react';
import { initialGameState, TILE_SIZE, WORLD_WIDTH, WORLD_HEIGHT } from './game/engine';
import { initialDialogues, crew } from './data/gameData';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Users, Map as MapIcon, Settings } from 'lucide-react';
import './styles/game.css';

const App: React.FC = () => {
  const [state, setState] = useState(initialGameState);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>(0);

  // Handle Input
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (state.currentDialogueId) return;

      let { x, y } = state.player;
      const speed = TILE_SIZE / 4;

      if (e.key === 'ArrowUp' || e.key === 'w') y -= speed;
      if (e.key === 'ArrowDown' || e.key === 's') y += speed;
      if (e.key === 'ArrowLeft' || e.key === 'a') x -= speed;
      if (e.key === 'ArrowRight' || e.key === 'd') x += speed;

      // Bounds check
      x = Math.max(0, Math.min(x, (WORLD_WIDTH - 1) * TILE_SIZE));
      y = Math.max(0, Math.min(y, (WORLD_HEIGHT - 1) * TILE_SIZE));

      // NPC Interaction Check
      const interactingNpc = state.npcs.find(npc => {
        const dist = Math.sqrt((x - npc.x) ** 2 + (y - npc.y) ** 2);
        return dist < TILE_SIZE * 1.2;
      });

      if (interactingNpc && e.key === ' ') {
        let dialogueId = 'intro-simon';
        if (interactingNpc.id === 'appsro') dialogueId = 'intro-appsro';
        if (interactingNpc.id === 'neebs') dialogueId = 'intro-neebs';
        if (interactingNpc.id === 'dora') dialogueId = 'intro-dora';
        
        setState(s => ({ ...s, currentDialogueId: dialogueId, dialogueIndex: 0 }));
        return;
      }

      setState(s => ({ ...s, player: { ...s.player, x, y } }));
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [state.player, state.currentDialogueId, state.npcs]);

  // Game Loop for Rendering
  useEffect(() => {
    const render = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      // Clear
      ctx.fillStyle = '#222';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw Grid
      ctx.strokeStyle = '#333';
      for (let i = 0; i < WORLD_WIDTH; i++) {
        for (let j = 0; j < WORLD_HEIGHT; j++) {
          ctx.strokeRect(i * TILE_SIZE, j * TILE_SIZE, TILE_SIZE, TILE_SIZE);
        }
      }

      // Draw NPCs
      state.npcs.forEach(npc => {
        ctx.fillStyle = npc.color;
        ctx.fillRect(npc.x, npc.y, npc.width, npc.height);
        // "Head"
        ctx.fillStyle = '#fce7f3';
        ctx.fillRect(npc.x + 4, npc.y + 2, npc.width - 8, npc.height / 2);
        // Name Label
        ctx.fillStyle = '#fff';
        ctx.font = '10px monospace';
        ctx.fillText(npc.name, npc.x, npc.y - 5);
      });

      // Draw Player
      ctx.fillStyle = state.player.color;
      ctx.fillRect(state.player.x, state.player.y, state.player.width, state.player.height);
      ctx.fillStyle = '#fce7f3';
      ctx.fillRect(state.player.x + 4, state.player.y + 2, state.player.width - 8, state.player.height / 2);

      requestRef.current = requestAnimationFrame(render);
    };

    requestRef.current = requestAnimationFrame(render);
    return () => cancelAnimationFrame(requestRef.current);
  }, [state]);

  const currentDialogue = initialDialogues.find(d => d.id === state.currentDialogueId);

  const nextDialogue = () => {
    if (!currentDialogue) return;
    if (state.dialogueIndex < currentDialogue.lines.length - 1) {
      setState(s => ({ ...s, dialogueIndex: s.dialogueIndex + 1 }));
    } else {
      const milestone = currentDialogue.onCompleteMilestone;
      setState(s => ({
        ...s,
        currentDialogueId: null,
        dialogueIndex: 0,
        milestones: milestone ? { ...s.milestones, [milestone]: true } : s.milestones
      }));
    }
  };

  return (
    <div className="game-container">
      <div className="hud">
        <div className="hud-item" style={{ color: 'var(--neebs-yellow)' }}>
          <User size={16} /> {state.player.name}
        </div>
        <div className="hud-item" style={{ color: 'var(--dora-blue)' }}>
          <Users size={16} /> Crew Found: {Object.keys(state.milestones).length} / 4
        </div>
      </div>

      <div className="canvas-wrapper">
        <canvas 
          ref={canvasRef} 
          width={WORLD_WIDTH * TILE_SIZE} 
          height={WORLD_HEIGHT * TILE_SIZE} 
        />
      </div>

      <AnimatePresence>
        {state.currentDialogueId && currentDialogue && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="dialogue-box"
            onClick={nextDialogue}
          >
            <div className="char-name" style={{ color: crew.find(c => c.name === currentDialogue.lines[state.dialogueIndex].character)?.color }}>
              {currentDialogue.lines[state.dialogueIndex].character}
            </div>
            <div className="dialogue-text">
              {currentDialogue.lines[state.dialogueIndex].text}
            </div>
            <div style={{ fontSize: '0.7em', marginTop: '10px', opacity: 0.5 }}>
              Click or press Space to continue...
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ position: 'absolute', top: 20, right: 20, display: 'flex', gap: '20px' }}>
        <MapIcon className="icon-btn" />
        <Settings className="icon-btn" />
      </div>
    </div>
  );
};

export default App;
