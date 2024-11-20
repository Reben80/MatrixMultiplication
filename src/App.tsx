import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Matrix } from './components/Matrix'
import { GameControls } from './components/GameControls'
import { Calculator } from './components/Calculator'
import { randomInt, multiplyMatrices, copyMatrix, swapElements } from './utils/matrix'

export default function App() {
  const [matrices, setMatrices] = useState<number[][][]>([])
  const [originalMatrices, setOriginalMatrices] = useState<number[][][]>([])
  const [alteredCells, setAlteredCells] = useState<[number, number, number][]>([])
  const [selectedCell, setSelectedCell] = useState<[number, number, number] | null>(null)
  const [isSolved, setIsSolved] = useState(false)
  const [hintCell, setHintCell] = useState<[number, number, number] | null>(null)
  const [difficulty, setDifficulty] = useState<'easy' | 'medium' | 'hard'>('easy')
  const [score, setScore] = useState(0)
  const [timer, setTimer] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [showCongrats, setShowCongrats] = useState(false)

  const playSound = useCallback((soundName: string) => {
    if (soundEnabled) {
      const audio = new Audio(`/sounds/${soundName}.mp3`)
      audio.play().catch(() => {})
    }
  }, [soundEnabled])

  const generatePuzzle = useCallback(() => {
    const a = Array(3).fill(0).map(() => Array(3).fill(0).map(() => randomInt(1, 9)))
    const b = Array(3).fill(0).map(() => Array(3).fill(0).map(() => randomInt(1, 9)))
    const c = multiplyMatrices(a, b)
    
    const newMatrices = [a, b, c]
    const newOriginalMatrices = newMatrices.map(copyMatrix)
    
    const altered: [number, number, number][] = []
    const swapCount = difficulty === 'easy' ? 3 : difficulty === 'medium' ? 5 : 7
    
    for (let i = 0; i < swapCount; i++) {
      const matrix1 = randomInt(0, 2)
      const row1 = randomInt(0, 2)
      const col1 = randomInt(0, 2)
      let matrix2, row2, col2
      
      do {
        matrix2 = randomInt(0, 2)
        row2 = randomInt(0, 2)
        col2 = randomInt(0, 2)
      } while (matrix1 === matrix2 && row1 === row2 && col1 === col2)
      
      const swappedMatrices = swapElements(newMatrices, [matrix1, row1, col1], [matrix2, row2, col2])
      newMatrices.splice(0, 3, ...swappedMatrices)
      altered.push([matrix1, row1, col1], [matrix2, row2, col2])
    }

    setMatrices(newMatrices)
    setOriginalMatrices(newOriginalMatrices)
    setAlteredCells([...new Set(altered.map(JSON.stringify))].map(JSON.parse))
    setSelectedCell(null)
    setIsSolved(false)
    setHintCell(null)
    setTimer(0)
    setIsRunning(true)
    playSound('new_puzzle')
  }, [difficulty, playSound])

  const checkSolution = useCallback(() => {
    const solved = JSON.stringify(matrices) === JSON.stringify(originalMatrices)
    setIsSolved(solved)
    if (solved) {
      setIsRunning(false)
      setShowCongrats(true)
      const timeBonus = Math.max(0, 300 - timer)
      const difficultyMultiplier = difficulty === 'easy' ? 1 : difficulty === 'medium' ? 2 : 3
      const newScore = score + 100 + timeBonus * difficultyMultiplier
      setScore(newScore)
      playSound('puzzle_solved')
    } else {
      playSound('incorrect')
    }
  }, [matrices, originalMatrices, timer, difficulty, score, playSound])

  const handleCellClick = useCallback((matrix: number, row: number, col: number) => {
    if (selectedCell) {
      setMatrices(prevMatrices => swapElements(prevMatrices, selectedCell, [matrix, row, col]))
      setSelectedCell(null)
      playSound('swap')
    } else {
      setSelectedCell([matrix, row, col])
      playSound('select')
    }
    setHintCell(null)
  }, [selectedCell, playSound])

  const getHint = useCallback(() => {
    for (let m = 0; m < matrices.length; m++) {
      for (let r = 0; r < matrices[m].length; r++) {
        for (let c = 0; c < matrices[m][r].length; c++) {
          if (matrices[m][r][c] !== originalMatrices[m][r][c]) {
            setHintCell([m, r, c])
            playSound('hint')
            return
          }
        }
      }
    }
  }, [matrices, originalMatrices, playSound])

  useEffect(() => {
    generatePuzzle()
  }, [generatePuzzle])

  useEffect(() => {
    let interval: NodeJS.Timeout
    if (isRunning) {
      interval = setInterval(() => {
        setTimer(prevTimer => prevTimer + 1)
      }, 1000)
    }
    return () => clearInterval(interval)
  }, [isRunning])

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-center text-gray-800 mb-8"
        >
          Matrix Multiplication Game
        </motion.h1>

        <GameControls
          score={score}
          timer={timer}
          difficulty={difficulty}
          soundEnabled={soundEnabled}
          onNewPuzzle={generatePuzzle}
          onCheckSolution={checkSolution}
          onGetHint={getHint}
          onDifficultyChange={setDifficulty}
          onToggleSound={() => setSoundEnabled(!soundEnabled)}
        />

        <div className="space-y-8">
          {matrices.length === 3 && (
            <div className="flex flex-wrap justify-center items-center gap-8">
              <Matrix
                matrix={matrices[0]}
                index={0}
                label="A"
                selectedCell={selectedCell}
                hintCell={hintCell}
                alteredCells={alteredCells}
                originalMatrix={originalMatrices[0]}
                onCellClick={handleCellClick}
              />
              <div className="text-4xl font-bold text-gray-800">×</div>
              <Matrix
                matrix={matrices[1]}
                index={1}
                label="B"
                selectedCell={selectedCell}
                hintCell={hintCell}
                alteredCells={alteredCells}
                originalMatrix={originalMatrices[1]}
                onCellClick={handleCellClick}
              />
              <div className="text-4xl font-bold text-gray-800">=</div>
              <Matrix
                matrix={matrices[2]}
                index={2}
                label="C"
                selectedCell={selectedCell}
                hintCell={hintCell}
                alteredCells={alteredCells}
                originalMatrix={originalMatrices[2]}
                onCellClick={handleCellClick}
              />
            </div>
          )}

          <Calculator />
        </div>

        <AnimatePresence>
          {showCongrats && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
              onClick={() => setShowCongrats(false)}
            >
              <div className="bg-white p-8 rounded-xl shadow-2xl text-center">
                <h2 className="text-3xl font-bold text-green-600 mb-4">
                  Congratulations!
                </h2>
                <p className="text-xl text-gray-700">
                  You solved the puzzle in {timer} seconds!
                </p>
                <p className="text-lg text-gray-600 mt-2">
                  Score: {score}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}