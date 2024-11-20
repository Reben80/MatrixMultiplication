export const randomInt = (min: number, max: number) => 
  Math.floor(Math.random() * (max - min + 1) + min)

export const multiplyMatrices = (a: number[][], b: number[][]) => {
  const result = Array(3).fill(0).map(() => Array(3).fill(0))
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      for (let k = 0; k < 3; k++) {
        result[i][j] += a[i][k] * b[k][j]
      }
    }
  }
  return result
}

export const copyMatrix = (matrix: number[][]) => matrix.map(row => [...row])

export const swapElements = (
  matrices: number[][][], 
  pos1: [number, number, number], 
  pos2: [number, number, number]
) => {
  const newMatrices = matrices.map(copyMatrix)
  const temp = newMatrices[pos1[0]][pos1[1]][pos1[2]]
  newMatrices[pos1[0]][pos1[1]][pos1[2]] = newMatrices[pos2[0]][pos2[1]][pos2[2]]
  newMatrices[pos2[0]][pos2[1]][pos2[2]] = temp
  return newMatrices
}