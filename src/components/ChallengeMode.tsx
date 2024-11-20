import { motion } from 'framer-motion'
import { CHALLENGES } from '../types/game'
import { Lock, Trophy } from 'lucide-react'

interface ChallengeModeProps {
  score: number
  onSelectChallenge: (challengeId: number) => void
  currentChallenge: number | null
}

export const ChallengeMode = ({
  score,
  onSelectChallenge,
  currentChallenge,
}: ChallengeModeProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
      {CHALLENGES.map((challenge) => {
        const isUnlocked = score >= challenge.pointsToUnlock
        const isActive = currentChallenge === challenge.id

        return (
          <motion.button
            key={challenge.id}
            whileHover={isUnlocked ? { scale: 1.02 } : {}}
            whileTap={isUnlocked ? { scale: 0.98 } : {}}
            onClick={() => isUnlocked && onSelectChallenge(challenge.id)}
            className={`
              relative p-4 rounded-xl text-left transition-colors
              ${isUnlocked 
                ? isActive
                  ? 'bg-blue-500 text-white shadow-lg'
                  : 'bg-white hover:bg-gray-50 shadow'
                : 'bg-gray-100 cursor-not-allowed'
              }
            `}
          >
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className={`font-bold ${isActive ? 'text-white' : 'text-gray-800'}`}>
                  Challenge {challenge.id}
                </h3>
                <p className={`text-sm ${isActive ? 'text-blue-100' : 'text-gray-600'}`}>
                  {challenge.name}
                </p>
              </div>
              {!isUnlocked ? (
                <Lock className="text-gray-400" size={20} />
              ) : (
                <Trophy className={isActive ? 'text-blue-200' : 'text-blue-500'} size={20} />
              )}
            </div>
            
            <p className={`text-sm mb-2 ${isActive ? 'text-blue-100' : 'text-gray-600'}`}>
              {challenge.description}
            </p>
            
            <div className="flex flex-wrap gap-2 text-xs">
              <span className={`px-2 py-1 rounded-full ${
                isActive 
                  ? 'bg-blue-400 text-white' 
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {challenge.difficulty.toUpperCase()}
              </span>
              <span className={`px-2 py-1 rounded-full ${
                isActive 
                  ? 'bg-blue-400 text-white' 
                  : 'bg-gray-100 text-gray-600'
              }`}>
                {challenge.timeLimit}s
              </span>
            </div>

            {!isUnlocked && (
              <div className="mt-2 text-sm text-gray-500">
                Unlock at {challenge.pointsToUnlock} points
              </div>
            )}
          </motion.button>
        )
      })}
    </div>
  )
}