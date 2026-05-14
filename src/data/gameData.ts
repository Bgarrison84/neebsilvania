export interface DialogueLine {
  text: string;
  character: string;
}

export interface Dialogue {
  id: string;
  lines: DialogueLine[];
  onCompleteMilestone?: string;
}

export interface Character {
  id: string;
  name: string;
  description: string;
  color: string;
  personality: string;
}

export const crew: Character[] = [
  { id: 'neebs', name: 'Neebs', description: 'The farmer and eternal optimist.', color: '#FFD700', personality: 'Cheerful, slightly oblivious, loves farming.' },
  { id: 'appsro', name: 'Appsro', description: 'The mechanical genius with a short fuse.', color: '#CE1031', personality: 'Angry, impatient, genius engineer.' },
  { id: 'doraleous', name: 'Doraleous', description: 'The level-headed warrior.', color: '#3b82f6', personality: 'Logical, brave, slightly exhausted.' },
  { id: 'simon', name: 'Simon', description: 'The lovable klutz.', color: '#10b981', personality: 'Hungry, confused, loyal.' },
  { id: 'thick44', name: 'Thick44', description: 'The Wyvern King.', color: '#8b5cf6', personality: 'Confident, powerful, legendary.' }
];

export const initialDialogues: Dialogue[] = [
  {
    id: 'intro-simon',
    lines: [
      { character: 'Simon', text: 'Where am I? This isn\'t the office. Is this a sandwich shop?' },
      { character: 'Player', text: 'I think we\'re in a video game, Simon.' },
      { character: 'Simon', text: 'Wait... can I eat the pixels? I\'m starving.' }
    ],
    onCompleteMilestone: 'found_simon'
  },
  {
    id: 'intro-appsro',
    lines: [
      { character: 'Appsro', text: 'WHO PROGRAMMED THIS CRAP?! The collision detection is garbage!' },
      { character: 'Appsro', text: 'You! New Guy! Fix this world before I lose my mind!' }
    ],
    onCompleteMilestone: 'found_appsro'
  },
  {
    id: 'intro-neebs',
    lines: [
      { character: 'Neebs', text: 'Hello! Have you seen any seeds around here? The soil is perfect!' },
      { character: 'Neebs', text: 'Oh, you\'re looking for the others? Appsro is over there being angry.' }
    ],
    onCompleteMilestone: 'found_neebs'
  },
  {
    id: 'intro-dora',
    lines: [
      { character: 'Doraleous', text: 'I\'ve been fighting digital slimes for three hours. My sword feels like it\'s made of math.' },
      { character: 'Doraleous', text: 'Let\'s regroup and find a way out of this code.' }
    ],
    onCompleteMilestone: 'found_dora'
  }
];
