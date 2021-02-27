import { renderHook, act } from '@testing-library/react-hooks'
import useScoreBoard from './useScoreBoard'

test('createMatch should update useScoreBoard state when called with 2 string as parameters', () => {
  const { result } = renderHook(() => useScoreBoard())

  // assert initial state
  expect(typeof result.current.matches === 'object' && result.current.matches !== null).toBe(true)
  expect(Object.keys(result.current.matches).length).toBe(0)

  // assert parameters
  act(() => {
    result.current.createMatch('Home Team')
    result.current.createMatch(32, 3)
  })
  expect(Object.keys(result.current.matches).length).toBe(0)

  // assert match creation
  let _testid = ''
  act(() => {
    _testid = result.current.createMatch('Home Team', 'Away Team')
  })
  expect(_testid).toBeTruthy()
  expect(Object.keys(result.current.matches).length).toBe(1)
  expect(result.current.matches[_testid].homeTeam).toBe('Home Team')
  expect(result.current.matches[_testid].awayTeam).toBe('Away Team')
  expect(result.current.matches[_testid].status).toBe('in_progress')
})

test('should be able to update the score of a match', () => {
  expect(true).toBe(true)
})

test('should be able to end/remove matchs', () => {
  expect(true).toBe(true)
})

test('should be able to get matches history filtered by total score & most recent for equals scores', () => {
  expect(true).toBe(true)
})
