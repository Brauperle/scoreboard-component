import 'regenerator-runtime/runtime'
import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import ScoreBoard from './ScoreBoard'

test('User should be able to create a match using the ScoreBoard component', async () => {
  const { queryByTestId } = render(<ScoreBoard />)

  // Create Match
  const buttonCreateMatch = queryByTestId('scoreboard__create')
  const inputHomeName = queryByTestId('scoreboard__homename')
  const inputAwayName = queryByTestId('scoreboard__awayname')

  await fireEvent.change(inputHomeName, { target: { value: 'France' } })
  await fireEvent.change(inputAwayName, { target: { value: 'Belgique' } })
  await fireEvent.click(buttonCreateMatch)

  // Assert match was created
  await waitFor(() => {
    expect(queryByTestId('scoreboard__display').children.length).toBe(1)
    expect(queryByTestId('scoreboard__display').children[0].textContent).toBe('France 0 - Belgique 0')
  })
})

test('User should be able to end a match using the ScoreBoard component', async () => {
  const { queryByTestId, container } = render(<ScoreBoard />)

  // Create Match
  const buttonCreateMatch = queryByTestId('scoreboard__create')
  const inputHomeName = queryByTestId('scoreboard__homename')
  const inputAwayName = queryByTestId('scoreboard__awayname')

  await fireEvent.change(inputHomeName, { target: { value: 'France' } })
  await fireEvent.change(inputAwayName, { target: { value: 'Belgique' } })
  await fireEvent.click(buttonCreateMatch)

  // Assert match was created
  await waitFor(() => {
    expect(queryByTestId('scoreboard__display').children.length).toBe(1)
    expect(queryByTestId('scoreboard__display').children[0].textContent).toBe('France 0 - Belgique 0')
  })

  // Delete Match
  const buttonDeleteMatch = container.querySelectorAll('.scoreboard__end')[0]
  await fireEvent.click(buttonDeleteMatch)

  // Assert match was deleted
  await waitFor(() => {
    expect(queryByTestId('scoreboard__admin')).toBe(null)
  })
})

test('User should be able to update a match score using the ScoreBoard component', async () => {
  const { queryByTestId, container } = render(<ScoreBoard />)

  // Create Match
  const buttonCreateMatch = queryByTestId('scoreboard__create')
  const inputHomeName = queryByTestId('scoreboard__homename')
  const inputAwayName = queryByTestId('scoreboard__awayname')

  await fireEvent.change(inputHomeName, { target: { value: 'France' } })
  await fireEvent.change(inputAwayName, { target: { value: 'Belgique' } })
  await fireEvent.click(buttonCreateMatch)

  // Assert match was created
  await waitFor(() => {
    expect(queryByTestId('scoreboard__admin').children.length).toBe(1)
  })

  const inputScoreHome = container.querySelectorAll('.scoreboard__score__home')[0]
  const inputScoreAway = container.querySelectorAll('.scoreboard__score__away')[0]

  await fireEvent.change(inputScoreHome, { target: { value: 5 } })
  await fireEvent.change(inputScoreAway, { target: { value: 5 } })

  // Assert score was updated
  await waitFor(() => {
    expect(queryByTestId('scoreboard__display').children.length).toBe(1)
    expect(queryByTestId('scoreboard__display').children[0].textContent).toBe('France 5 - Belgique 5')
  })
})

test('User should be able to consult all match using the ScoreBoard component (ordered by total score & creation time)', async () => {
  const { queryByTestId, container } = render(<ScoreBoard />)

  // variables
  const buttonCreateMatch = queryByTestId('scoreboard__create')
  const inputHomeName = queryByTestId('scoreboard__homename')
  const inputAwayName = queryByTestId('scoreboard__awayname')

  // Fisrt match

  await fireEvent.change(inputHomeName, { target: { value: 'France' } })
  await fireEvent.change(inputAwayName, { target: { value: 'Belgique' } })
  await fireEvent.click(buttonCreateMatch)

  // Assert match was created
  await waitFor(() => {
    expect(queryByTestId('scoreboard__admin').children.length).toBe(1)
  })

  const inputScoreHome1 = container.querySelectorAll('.scoreboard__score__home')[0]
  const inputScoreAway1 = container.querySelectorAll('.scoreboard__score__away')[0]

  await fireEvent.change(inputScoreHome1, { target: { value: 5 } })
  await fireEvent.change(inputScoreAway1, { target: { value: 5 } })

  // Second match

  await fireEvent.change(inputHomeName, { target: { value: 'Germany' } })
  await fireEvent.change(inputAwayName, { target: { value: 'Italy' } })
  await fireEvent.click(buttonCreateMatch)

  // Assert match was created
  await waitFor(() => {
    expect(queryByTestId('scoreboard__admin').children.length).toBe(2)
  })

  const inputScoreHome2 = container.querySelectorAll('.scoreboard__score__home')[1]
  const inputScoreAway2 = container.querySelectorAll('.scoreboard__score__away')[1]

  await fireEvent.change(inputScoreHome2, { target: { value: 5 } })
  await fireEvent.change(inputScoreAway2, { target: { value: 5 } })

  // Assert display order is correct
  await waitFor(() => {
    const homescores = container.querySelectorAll('.scoreboard__score__home')
    const awayscores = container.querySelectorAll('.scoreboard__score__away')

    expect(homescores[0].value).toBe('5')
    expect(homescores[1].value).toBe('5')

    expect(awayscores[0].value).toBe('5')
    expect(awayscores[1].value).toBe('5')
  })

  expect(queryByTestId('scoreboard__display').children.length).toBe(2)
  expect(queryByTestId('scoreboard__display').children[0].textContent).toBe('Germany 5 - Italy 5')
  expect(queryByTestId('scoreboard__display').children[1].textContent).toBe('France 5 - Belgique 5')
})
