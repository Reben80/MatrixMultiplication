import { motion } from 'framer-motion'
import { Volume2, VolumeX, HelpCircle } from 'lucide-react'
import { HowToPlay } from './HowToPlay'
import { useState } from 'react'

interface GameControlsProps {
  score: number
  timer: number
  difficulty: 'easy' | 'medium' | 'hard'
  soundEnabled: boolean
  onNewPuzzle: () => void
  onCheckSolution: () => void
  onGetHint: () => void
  onDifficultyChange: (difficulty: 'easy' | 'medium' | 'hard') => void
  onToggleSound: () => void
}

export const GameControls = ({
  score,
  timer,
  difficulty,
  soundEnabled,
  onNewPuzzle,
  onCheckSolution,
  onGetHint,
  onDifficultyChange,
  onToggleSound,
}: GameControlsProps) => {
  const [showHelp, setShowHelp] = useState(false)

  return (
    <>
      <div className="w-full bg-white rounded-xl shadow-lg p-3 sm:p-4 mb-4">
        <div className="flex flex-wrap items-center gap-3 mb-3">
          <div className="flex gap-4 flex-1 min-w-[120px]">
            <div className="text-center">
              <p className="text-xs sm:text-sm text-gray-500">Score</p>
              <p className="text-lg sm:text-xl font-bold text-blue-600">{score}</p>
            </div>
            <div className="text-center">
              <p className="text-xs sm:text-sm text-gray-500">Time</p>
              <p className="text-lg sm:text-xl font-bold text-purple-600">{timer}s</p>
            </div>
          </div>
          
          <div className="flex gap-2">
            <select
              value={difficulty}
              onChange={(e) => onDifficultyChange(e.target.value as 'easy' | 'medium' | 'hard')}
              className="px-2 py-1 text-sm rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onToggleSound}
              className="p-1 rounded-lg bg-gray-100 hover:bg-gray-200"
            >
              {soundEnabled ? <Volume2 size={18} /> : <VolumeX size={18} />}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowHelp(true)}
              className="p-1 rounded-lg bg-gray-100 hover:bg-gray-200 text-blue-600"
            >
              <HelpCircle size={18} />
            </motion.button>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onNewPuzzle}
            className="flex-1 px-3 py-1.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-semibold text-sm"
          >
            New Puzzle
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onCheckSolution}
            className="flex-1 px-3 py-1.5 bg-green-500 text-white rounded-lg hover:bg-green-600 font-semibold text-sm"
          >
            Check
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onGetHint}
            className="flex-1 px-3 py-1.5 bg-purple-500 text-white rounded-lg hover:bg-purple-600 font-semibold text-sm"
          >
            Hint
          </motion.button>
        </div>
      </div>

      <HowToPlay isOpen={showHelp} onClose={() => setShowHelp(false)} />
    </>
  )
}