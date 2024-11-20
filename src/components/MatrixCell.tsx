import { motion } from 'framer-motion'
import { cn } from '../utils/cn'

interface MatrixCellProps {
  value: number
  isSelected: boolean
  isHint: boolean
  isAltered: boolean
  isCorrect: boolean
  onClick: () => void
}

export const MatrixCell = ({
  value,
  isSelected,
  isHint,
  isAltered,
  isCorrect,
  onClick,
}: MatrixCellProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={cn(
        "w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 flex items-center justify-center text-sm sm:text-base lg:text-lg font-bold rounded-lg transition-colors duration-200",
        isSelected && "bg-blue-500 text-white shadow-lg",
        isHint && "bg-purple-500 text-white animate-pulse",
        isAltered && !isCorrect && !isSelected && !isHint && "bg-yellow-500 text-white",
        !isSelected && !isHint && (isCorrect || !isAltered) && "bg-white hover:bg-gray-100"
      )}
    >
      {value}
    </motion.button>
  )
}