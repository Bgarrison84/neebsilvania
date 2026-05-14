export const TILE_SIZE = 32;
export const WORLD_WIDTH = 25;
export const WORLD_HEIGHT = 18;

export interface Entity {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  color: string;
  type: 'player' | 'npc';
  name: string;
}

export interface GameState {
  player: Entity;
  npcs: Entity[];
  milestones: Record<string, boolean>;
  currentDialogueId: string | null;
  dialogueIndex: number;
}

export const initialGameState: GameState = {
  player: {
    id: 'player',
    x: TILE_SIZE * 5,
    y: TILE_SIZE * 5,
    width: TILE_SIZE,
    height: TILE_SIZE,
    color: '#fff',
    type: 'player',
    name: 'New Guy'
  },
  npcs: [
    {
      id: 'simon',
      x: TILE_SIZE * 15,
      y: TILE_SIZE * 10,
      width: TILE_SIZE,
      height: TILE_SIZE,
      color: '#10b981',
      type: 'npc',
      name: 'Simon'
    },
    {
      id: 'appsro',
      x: TILE_SIZE * 20,
      y: TILE_SIZE * 4,
      width: TILE_SIZE,
      height: TILE_SIZE,
      color: '#CE1031',
      type: 'npc',
      name: 'Appsro'
    },
    {
      id: 'neebs',
      x: TILE_SIZE * 3,
      y: TILE_SIZE * 14,
      width: TILE_SIZE,
      height: TILE_SIZE,
      color: '#FFD700',
      type: 'npc',
      name: 'Neebs'
    },
    {
      id: 'dora',
      x: TILE_SIZE * 22,
      y: TILE_SIZE * 14,
      width: TILE_SIZE,
      height: TILE_SIZE,
      color: '#3b82f6',
      type: 'npc',
      name: 'Doraleous'
    }
  ],
  milestones: {},
  currentDialogueId: null,
  dialogueIndex: 0
};
