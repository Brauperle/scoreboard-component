import 'regenerator-runtime/runtime'
import { renderHook, act } from '@testing-library/react-hooks'
import useScoreBoard from './useScoreBoard'

test('createMatch should update useScoreBoard state when called with 2 string as parameters', async () => {
  const { result } = renderHook(() => useScoreBoard())

  // assert initial state
  expect(typeof result.current.matches === 'object' && result.current.matches !== null).toBe(true)
  expect(Object.keys(result.current.matches).length).toBe(0)

  // assert parameters
  await act(async () => {
    await result.current.createMatch('Home Team')
    await result.current.createMatch(32, 3)
  })
  expect(Object.keys(result.current.matches).length).toBe(0)

  // assert match creation
  let _testid = ''
  await act(async () => {
    _testid = await result.current.createMatch('Home Team', 'Away Team')
  })
  expect(_testid).toBeTruthy()
  expect(Object.keys(result.current.matches).length).toBe(1)
  expect(result.current.matches[_testid].homeTeam).toBe('Home Team')
  expect(result.current.matches[_testid].awayTeam).toBe('Away Team')
  expect(result.current.matches[_testid].status).toBe('in_progress')

  // assert multiple match creation
  await act(async () => {
    await result.current.createMatch('Home Team', 'Away Team')
    await result.current.createMatch('Home Team', 'Away Team')
    await result.current.createMatch('Home Team', 'Away Team')
    await result.current.createMatch('Home Team', 'Away Team')
  })
  expect(Object.keys(result.current.matches).length).toBe(5)
})

test('finishMatch should update a specific match status to "ended" with an ID as parameter', async () => {
  const { result } = renderHook(() => useScoreBoard())

  // Create a new match
  let _testid = ''
  await act(async () => {
    _testid = await result.current.createMatch('Home Team', 'Away Team')
  })

  // assert parameters
  await act(async () => {
    await result.current.finishMatch('non-existing-id')
    await result.current.finishMatch()
  })
  expect(result.current.matches[_testid].status).toBe('in_progress')

  // assert match ending
  await act(async () => {
    await result.current.finishMatch(_testid)
  })
  expect(Object.keys(result.current.matches).length).toBe(1)
  expect(result.current.matches[_testid].status).toBe('ended')
})

test('updateMatchScore should update a specific match scorer with an ID & new scores values as parameter', async () => {
  const { result } = renderHook(() => useScoreBoard())
  // Create a new match
  let _testid = ''
  await act(async () => {
    _testid = await result.current.createMatch('Home Team', 'Away Team')
  })

  await act(async () => {
    await result.current.updateMatchScore('non-existing-id')
    await result.current.updateMatchScore(_testid, 'string-parameters', 'string-parameters')
    await result.current.updateMatchScore()
  })
  expect(result.current.matches[_testid].score[0]).toBe(0)
  expect(result.current.matches[_testid].score[1]).toBe(0)

  // assert score updating
  await act(async () => {
    await result.current.updateMatchScore(_testid, 1, 4)
  })
  expect(result.current.matches[_testid].score[0]).toBe(1)
  expect(result.current.matches[_testid].score[1]).toBe(4)
})

test('getAllMatchOrdered should re-order the matches by total score & by most recently added if same score', async () => {
  const { result } = renderHook(() => useScoreBoard())

  let _matchHistory = []
  let MCid, SBid, GFid, UIid, AAid

  const _awaitOut = duration => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve()
      }, duration)
    })
  }

  // Create all matches and setup scores
  await act(async () => {
    MCid = await result.current.createMatch('Mexico', 'Canada')
    await result.current.updateMatchScore(MCid, 0, 5)

    await _awaitOut(100)

    SBid = await result.current.createMatch('Spain', 'Brasil')
    await result.current.updateMatchScore(SBid, 10, 2)

    await _awaitOut(100)

    GFid = await result.current.createMatch('Germany', 'France')
    await result.current.updateMatchScore(GFid, 2, 2)

    await _awaitOut(100)

    UIid = await result.current.createMatch('Uruguay', 'Italy')
    await result.current.updateMatchScore(UIid, 6, 6)

    await _awaitOut(100)

    AAid = await result.current.createMatch('Argentina', 'Australia')
    await result.current.updateMatchScore(AAid, 3, 1)

    _matchHistory = await result.current.getAllMatchOrdered()
  })

  // Check for correct order
  expect(_matchHistory[0].homeTeam).toBe('Uruguay')
  expect(_matchHistory[1].homeTeam).toBe('Spain')
  expect(_matchHistory[2].homeTeam).toBe('Mexico')
  expect(_matchHistory[3].homeTeam).toBe('Argentina')
  expect(_matchHistory[4].homeTeam).toBe('Germany')
})
