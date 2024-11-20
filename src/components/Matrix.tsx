import { motion } from 'framer-motion'
import { MatrixCell } from './MatrixCell'

interface MatrixProps {
  matrix: number[][]
  index: number
  label: string
  selectedCell: [number, number, number] | null
  hintCell: [number, number, number] | null
  alteredCells: [number, number, number][]
  originalMatrix: number[][]
  onCellClick: (matrix: number, row: number, col: number) => void
}

export const Matrix = ({
  matrix,
  index,
  label,
  selectedCell,
  hintCell,
  alteredCells,
  originalMatrix,
  onCellClick,
}: MatrixProps) => {
  const isCellAltered = (row: number, col: number) =>
    alteredCells.some(([m, r, c]) => m === index && r === row && c === col)

  const isCellCorrect = (row: number, col: number) =>
    matrix[row][col] === originalMatrix[row][col]

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white p-2 sm:p-3 lg:p-4 rounded-xl shadow-lg"
    >
      <h2 className="text-base sm:text-lg lg:text-xl font-bold mb-2 text-center text-gray-800">
        Matrix {label}
      </h2>
      <div className="grid grid-cols-3 gap-1 sm:gap-1.5 lg:gap-2">
        {matrix.map((row, i) =>
          row.map((cell, j) => (
            <MatrixCell
              key={`${label}-${i}-${j}`}
              value={cell}
              isSelected={
                selectedCell?.[0] === index &&
                selectedCell?.[1] === i &&
                selectedCell?.[2] === j
              }
              isHint={
                hintCell?.[0] === index &&
                hintCell?.[1] === i &&
                hintCell?.[2] === j
              }
              isAltered={isCellAltered(i, j)}
              isCorrect={isCellCorrect(i, j)}
              onClick={() => onCellClick(index, i, j)}
            />
          ))
        )}
      </div>
    </motion.div>
  )
}