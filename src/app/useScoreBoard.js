import { useState } from 'react'
import { nanoid } from 'nanoid'

const useScoreBoard = () => {
  const [matches, setMatches] = useState({})

  /**
   * createMatch
   * Create a match between two teams and store it in state (memory)
   *
   * @param {string} ht Home Team name
   * @param {string} at Away Team name
   * @return {string} match ID of the newly created match
   */
  const createMatch = (ht, at) => {
    if (ht === undefined || at === undefined) return
    if (typeof ht !== 'string' || typeof at !== 'string') return

    const _id = nanoid()
    setMatches({
      ...matches,
      [_id]: {
        homeTeam: ht,
        awayTeam: at,
        status: 'in_progress',
        score: [0, 0],
        createdAt: (new Date()).getTime()
      }
    })
    return _id
  }

  /**
   * finishMatch
   * Finish a match with it's match ID by changing it's status to "ended"
   *
   * @param {string} mid match ID of the match to be finished
   */
  const finishMatch = mid => {
    if (mid === undefined) return
    if (!matches[mid]) return

    setMatches({
      ...matches,
      [mid]: {
        ...matches[mid],
        status: 'ended'
      }
    })
  }

  /**
   * updateMatchScore
   * Update a match score with it's match ID
   *
   * @param {string} mid match ID of the match to be updated
   * @param {number} hts Home Team current score
   * @param {number} ats Away Team current score
   */
  const updateMatchScore = (mid, hts, ats) => {
    if (mid === undefined || hts === undefined || ats === undefined) return
    if (typeof hts !== 'number' || typeof ats !== 'number') return
    if (!matches[mid]) return

    setMatches({
      ...matches,
      [mid]: {
        ...matches[mid],
        score: [hts, ats]
      }
    })
  }

  /**
   * getMatchHistory
   * Re-order the matches by total score & by most recently added if same score
   *
   * @return {Array} Array of ordered matches
   */
  const getMatchHistory = () => {
    const sortedMatchIDs = Object.keys(matches).sort((mid1, mid2) => {
      const totalScore1 = matches[mid1].score[0] + matches[mid1].score[1]
      const totalScore2 = matches[mid2].score[0] + matches[mid2].score[1]
      const createdAt1 = matches[mid1].createdAt
      const createdAt2 = matches[mid2].createdAt

      if (totalScore1 === totalScore2) return createdAt1 > createdAt2 ? -1 : 1
      return totalScore1 > totalScore2 ? -1 : 1
    })

    return sortedMatchIDs.map(mid => matches[mid])
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
