export type Difficulty = 'easy' | 'medium' | 'hard'

export interface Challenge {
  id: number
  name: string
  description: string
  difficulty: Difficulty
  swapCount: number
  timeLimit: number
  minRange: number
  maxRange: number
  pointsToUnlock: number
}

export const CHALLENGES: Challenge[] = [
  {
    id: 1,
    name: "Beginner's Step",
    description: "Start with simple 1-5 numbers and just 2 swaps",
    difficulty: 'easy',
    swapCount: 2,
    timeLimit: 120,
    minRange: 1,
    maxRange: 5,
    pointsToUnlock: 0
  },
  {
    id: 2,
    name: "Getting Warmer",
    description: "Slightly more swaps with small numbers",
    difficulty: 'easy',
    swapCount: 3,
    timeLimit: 180,
    minRange: 1,
    maxRange: 6,
    pointsToUnlock: 100
  },
  {
    id: 3,
    name: "Number Juggler",
    description: "More numbers to work with",
    difficulty: 'easy',
    swapCount: 4,
    timeLimit: 240,
    minRange: 1,
    maxRange: 7,
    pointsToUnlock: 300
  },
  {
    id: 4,
    name: "Time Pressure",
    description: "Same complexity but less time",
    difficulty: 'medium',
    swapCount: 4,
    timeLimit: 180,
    minRange: 1,
    maxRange: 7,
    pointsToUnlock: 500
  },
  {
    id: 5,
    name: "Matrix Master",
    description: "Larger numbers enter the game",
    difficulty: 'medium',
    swapCount: 5,
    timeLimit: 300,
    minRange: 2,
    maxRange: 8,
    pointsToUnlock: 800
  },
  {
    id: 6,
    name: "Quick Thinker",
    description: "More swaps, less time",
    difficulty: 'medium',
    swapCount: 6,
    timeLimit: 240,
    minRange: 2,
    maxRange: 8,
    pointsToUnlock: 1200
  },
  {
    id: 7,
    name: "Number Ninja",
    description: "Complex swaps with larger numbers",
    difficulty: 'hard',
    swapCount: 7,
    timeLimit: 360,
    minRange: 3,
    maxRange: 9,
    pointsToUnlock: 1600
  },
  {
    id: 8,
    name: "Matrix Mayhem",
    description: "Many swaps, full number range",
    difficulty: 'hard',
    swapCount: 8,
    timeLimit: 420,
    minRange: 1,
    maxRange: 9,
    pointsToUnlock: 2000
  },
  {
    id: 9,
    name: "Speed Demon",
    description: "Complex puzzle, tight time limit",
    difficulty: 'hard',
    swapCount: 8,
    timeLimit: 300,
    minRange: 1,
    maxRange: 9,
    pointsToUnlock: 2500
  },
  {
    id: 10,
    name: "Ultimate Challenge",
    description: "The ultimate test of matrix mastery",
    difficulty: 'hard',
    swapCount: 9,
    timeLimit: 360,
    minRange: 1,
    maxRange: 9,
    pointsToUnlock: 3000
  }
]