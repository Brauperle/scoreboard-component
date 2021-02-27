import { useState } from 'react'
import { nanoid } from 'nanoid'

const useScoreBoard = () => {
  const [matches, setMatches] = useState({})

  const createMatch = (ht, at) => {
    if (!ht || !at) return
    if (typeof ht !== 'string' || typeof at !== 'string') return

    const _id = nanoid()
    setMatches({
      ...matches,
      [_id]: {
        homeTeam: ht,
        awayTeam: at,
        status: 'in_progress',
        score: [0, 0]
      }
    })
    return _id
  }

  const finishMatch = mid => {

  }

  const updateMatchScore = (hts, ats) => {

  }

  const getMatchHistory = () => {

  }

  return {
    matches,
    createMatch,
    finishMatch,
    updateMatchScore,
    getMatchHistory
  }
}

export default useScoreBoard
