import { isNonWordChar, isWordChar } from './wordChar'

export function computeBeginningOfLine(): number {
  return 0
}

export function computeEndOfLine(string: string): number {
  return string.length
}

export function computeForwardChar(string: string, cursorPos: number): number {
  // ensure we do not loop
  if (cursorPos === string.length) return string.length
  return cursorPos + 1
}

export function computeBackwardChar(string: string, cursorPos: number): number {
  // ensure we do not loop
  if (cursorPos === 0) return 0
  return cursorPos - 1
}

export function computeForwardWord(string: string, cursorPos: number): number {
  // TODO: get rid of textAfterCursor and just start at arrays
  // in correctly indexes in for loops
  const textAfterCursor = string.slice(cursorPos)
  const cursorPosAsChar = string.charAt(cursorPos)

  if (isWordChar(cursorPosAsChar)) {
    let cursorStage = 'initial'
    for (const char of textAfterCursor) {
      cursorPos++

      if (cursorStage === 'initial') {
        if (isNonWordChar(char)) cursorStage = 'passedCurrentWord'
      }

      if (cursorStage === 'passedCurrentWord') {
        if (isWordChar(char)) cursorStage = 'final'
        break
      }
    }
    // if we start at a non-word
  } else {
    let cursorStage = 'onNonWord'
    for (const char of textAfterCursor) {
      cursorPos++

      if (cursorStage === 'onNonWord') {
        if (isWordChar(char)) cursorStage = 'onNextWord'
      }

      if (cursorStage === 'onNextWord') {
        if (isNonWordChar(char)) break
      }
    }
  }

  // if we are at the end, we don't want to do `cursorPos - 1`
  if (cursorPos === string.length) return cursorPos
  return cursorPos - 1
}

export function computeBackwardWord(string: string, cursorPos: number): number {
  const textBeforeCursor = string.slice(0, cursorPos)
  const cursorPosAsChar = string.charAt(cursorPos - 1)

  let cursorStage = 'initial'
  if (isWordChar(cursorPosAsChar)) {
    for (let i = textBeforeCursor.length; i > 0; --i) {
      const char = textBeforeCursor.charAt(i - 1)
      cursorPos--

      if (cursorStage === 'initial') {
        if (isNonWordChar(char)) break
      }
    }
  } else {
    for (let i = textBeforeCursor.length; i > 0; --i) {
      const char = textBeforeCursor.charAt(i - 1)
      cursorPos--

      if (cursorStage === 'initial') {
        if (isWordChar(char)) cursorStage = 'onWord'
      }

      if (cursorStage === 'onWord') {
        if (isNonWordChar(char)) break
      }
    }
  }
  // if we are at start, return without incrementing
  if (cursorPos === 0) return cursorPos
  return cursorPos + 1
}
