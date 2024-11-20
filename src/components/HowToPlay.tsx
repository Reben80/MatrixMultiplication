import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

interface HowToPlayProps {
  isOpen: boolean
  onClose: () => void
}

export const HowToPlay = ({ isOpen, onClose }: HowToPlayProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white rounded-xl p-6 max-w-2xl w-full shadow-xl relative"
            onClick={e => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>

            <h2 className="text-2xl font-bold mb-4">How to Play</h2>

            <div className="space-y-4 text-gray-600">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Game Objective</h3>
                <p>
                  Solve the matrix multiplication puzzle by rearranging numbers to make A × B = C true.
                  Your goal is to move all yellow numbers to their correct positions.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Understanding the Colors</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>
                    <span className="inline-block w-4 h-4 bg-yellow-500 rounded-sm mr-2"></span>
                    Yellow cells show numbers that are in the wrong position
                  </li>
                  <li>
                    <span className="inline-block w-4 h-4 bg-blue-500 rounded-sm mr-2"></span>
                    Blue shows your currently selected cell
                  </li>
                  <li>
                    <span className="inline-block w-4 h-4 bg-purple-500 rounded-sm mr-2"></span>
                    Purple highlights a hint when requested
                  </li>
                  <li>
                    <span className="inline-block w-4 h-4 bg-white border border-gray-200 rounded-sm mr-2"></span>
                    White cells are either in their correct position or haven't been moved
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 mb-2">How to Play</h3>
                <ol className="list-decimal list-inside space-y-2">
                  <li>Look for yellow numbers - these need to be moved</li>
                  <li>Click a cell to select it (turns blue)</li>
                  <li>Click another cell to swap their positions</li>
                  <li>When a yellow number reaches its correct spot, it will turn white</li>
                  <li>The puzzle is solved when no yellow cells remain</li>
                </ol>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Helpful Tools</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Use the "Get Hint" button to highlight a cell that needs attention</li>
                  <li>The calculator below can help verify your matrix multiplication</li>
                  <li>Check your solution at any time with the "Check Solution" button</li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Scoring</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li>Base points: 100 per solved puzzle</li>
                  <li>Time bonus: up to 300 points for quick solutions</li>
                  <li>Difficulty multipliers: Easy ×1, Medium ×2, Hard ×3</li>
                </ul>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}