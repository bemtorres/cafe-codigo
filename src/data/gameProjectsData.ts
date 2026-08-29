export interface GameProjectVariable {
  name: string;
  type: string;
  initialValue: string;
  description: string;
}

export interface GameProjectMenuOption {
  option: string;
  title: string;
  description: string;
  logic: string;
}

export interface GameProjectStep {
  id: string;
  title: string;
  desc: string;
}

export interface GameProject {
  id: number;
  slug: string;
  number: string;
  title: string;
  subtitle: string;
  icon: string;
  accentColor: string;
  badge: string;
  difficulty: string;
  story: string;
  objective: string;
  initialInputs: string[];
  variables: GameProjectVariable[];
  menuOptions: GameProjectMenuOption[];
  rules: string[];
  extraChallenges: string[];
  steps: GameProjectStep[];
  consolePreview: string;
  solutions: {
    csharp: string;
    python: string;
    java: string;
    cpp: string;
    javascript: string;
    php: string;
    pseint: string;
  };
}

import { project1ArenaRpg } from './projects_data/project1';
import { project2Zombie } from './projects_data/project2';
import { project3Valorant } from './projects_data/project3';
import { project4Minecraft } from './projects_data/project4';
import { project5Pokemon } from './projects_data/project5';
import { project6Arcade } from './projects_data/project6';

export const gameProjectsData: GameProject[] = [
  project1ArenaRpg,
  project2Zombie,
  project3Valorant,
  project4Minecraft,
  project5Pokemon,
  project6Arcade
];
