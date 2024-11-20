import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronUp, ChevronDown } from 'lucide-react'

export const Calculator = () => {
  const [display, setDisplay] = useState('')
  const [result, setResult] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const handleButtonClick = (value: string) => {
    if (value === '=') {
      try {
        const calculatedResult = new Function('return ' + display)()
        setResult(calculatedResult.toString())
      } catch (error) {
        setResult('Error')
      }
    } else if (value === 'C') {
      setDisplay('')
      setResult('')
    } else {
      setDisplay(prev => prev + value)
    }
  }

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (!isOpen) return

      e.preventDefault()
      
      const key = e.key.toLowerCase()
      
      if (/^[0-9.]$/.test(key) || ['(', ')', '+', '-', '*', '/'].includes(key)) {
        handleButtonClick(key)
      }
      else if (key === 'enter') {
        handleButtonClick('=')
      }
      else if (key === 'backspace') {
        handleButtonClick('C')
      }
      else if (key === 'escape') {
        setIsOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [isOpen])

  const row1 = ['7', '8', '9', '*', '/', 'C']
  const row2 = ['4', '5', '6', '+', '-', '=']
  const row3 = ['1', '2', '3', '0', '.', '()']

  return (
    <div className="w-full mt-8">
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-full bg-gray-900 text-white py-3 px-6 rounded-t-xl flex items-center justify-center gap-2 font-semibold"
      >
        {isOpen ? 'Hide Calculator' : 'Show Calculator'}
        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-white rounded-b-xl shadow-lg p-4 overflow-hidden"
          >
            <div className="max-w-2xl mx-auto">
              <div className="bg-gray-100 p-3 rounded-lg mb-3">
                <div className="text-right text-lg font-mono overflow-x-auto whitespace-nowrap mb-1">
                  {display || '0'}
                </div>
                <div className="text-right text-xl font-bold font-mono overflow-x-auto whitespace-nowrap text-blue-600">
                  {result || '0'}
                </div>
              </div>

              <div className="grid grid-rows-2 gap-2">
                <div className="grid grid-cols-6 gap-1">
                  {row1.map((btn) => (
                    <motion.button
                      key={btn}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        if (btn === '()') {
                          handleButtonClick(display.split('(').length > display.split(')').length ? ')' : '(')
                        } else {
                          handleButtonClick(btn)
                        }
                      }}
                      className={`
                        ${btn === 'C' ? 'bg-red-500 hover:bg-red-600 text-white' : 
                          ['/', '*'].includes(btn) ? 'bg-blue-500 hover:bg-blue-600 text-white' :
                          'bg-gray-100 hover:bg-gray-200'}
                        p-2 rounded-lg font-semibold transition-colors text-sm sm:text-base
                      `}
                    >
                      {btn}
                    </motion.button>
                  ))}
                </div>
                <div className="grid grid-cols-6 gap-1">
                  {row2.map((btn) => (
                    <motion.button
                      key={btn}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleButtonClick(btn)}
                      className={`
                        ${btn === '=' ? 'bg-green-500 hover:bg-green-600 text-white' : 
                          ['+', '-'].includes(btn) ? 'bg-blue-500 hover:bg-blue-600 text-white' :
                          'bg-gray-100 hover:bg-gray-200'}
                        p-2 rounded-lg font-semibold transition-colors text-sm sm:text-base
                      `}
                    >
                      {btn}
                    </motion.button>
                  ))}
                </div>
                <div className="grid grid-cols-6 gap-1">
                  {row3.map((btn) => (
                    <motion.button
                      key={btn}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => {
                        if (btn === '()') {
                          handleButtonClick(display.split('(').length > display.split(')').length ? ')' : '(')
                        } else {
                          handleButtonClick(btn)
                        }
                      }}
                      className="bg-gray-100 hover:bg-gray-200 p-2 rounded-lg font-semibold transition-colors text-sm sm:text-base"
                    >
                      {btn}
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}