import React, { useState } from 'react'
import useScoreBoard from './useScoreBoard'

const ScoreBoard = () => {
  const {
    matches,
    createMatch,
    finishMatch,
    updateMatchScore,
    getAllMatchOrdered
  } = useScoreBoard()

  const [homeTeamName, setHomeTeamName] = useState('')
  const [awayTeamName, setAwayTeamName] = useState('')

  const orderedMatchList = getAllMatchOrdered()

  return (
    <section>
      <header><h1>SCOREBOARD</h1></header>
      <hr />
      <div>
        <h4>Create New Match</h4>
        <label htmlFor="home_team">Home Team</label>
        <input type="text" id="home_team" name="home_team" value={homeTeamName} onChange={e => {
          setHomeTeamName(e.target.value)
        }} />
        <label htmlFor="home_team">Away Team</label>
        <input type="text" id="away_team" name="away_team" value={awayTeamName} onChange={e => {
          setAwayTeamName(e.target.value)
        }} />
        <button type="button" onClick={() => {
          createMatch(homeTeamName, awayTeamName)
        }}>Create Match</button>
      </div>
      <hr />
      <div>
        <h4>In Progress Matches</h4>
        {
          Object.keys(matches).length === 0
            ? <div>No In Progress Match, Please Create One</div>
            : Object.keys(matches)
              .filter(mid => matches[mid].status === 'in_progress').length === 0
              ? <div>No In Progress Match, Please Create One</div>
              : <ul>
                {Object.keys(matches)
                  .filter(mid => matches[mid].status === 'in_progress')
                  .map(mid => {
                    return (
                      <li key={mid}>
                        <ul>
                          <li><strong>Match ID:</strong> {mid}</li>
                          <li><strong>Match Status:</strong> {matches[mid].status}</li>
                          <li><strong>Created at:</strong> {matches[mid].createdAt}</li>
                          <li><strong>Home Team:</strong> {matches[mid].homeTeam}</li>
                          <li><strong>Away Team:</strong> {matches[mid].awayTeam}</li>
                          <li>
                            <div><strong>Score:</strong></div>
                            <div>
                              <label htmlFor={`${mid}__home`}>{matches[mid].homeTeam}</label>
                              <input id={`${mid}__home`} name={`${mid}__home`} type="text" value={matches[mid].score[0]} onChange={e => {
                                if (isNaN(parseInt(e.target.value, 10))) return
                                updateMatchScore(
                                  mid,
                                  parseInt(e.target.value, 10),
                                  matches[mid].score[1]
                                )
                              }} />
                            </div>
                            <div>
                              <label htmlFor={`${mid}__away`}>{matches[mid].awayTeam}</label>
                              <input id={`${mid}__away`} name={`${mid}__away`} type="text" value={matches[mid].score[1]} onChange={e => {
                                if (isNaN(parseInt(e.target.value, 10))) return
                                updateMatchScore(
                                  mid,
                                  matches[mid].score[0],
                                  parseInt(e.target.value, 10)
                                )
                              }}/>
                            </div>
                          </li>
                          <li>
                            <button type="button" onClick={() => {
                              finishMatch(mid)
                            }}>End Match</button>
                          </li>
                        </ul>
                      </li>
                    )
                  })}
              </ul>
        }
      </div>
      <hr />
      <div>
        <h4>Match Ordered List</h4>
        {
          orderedMatchList.length === 0
            ? <div>No Match, Please Create One</div>
            : <ol>
              { orderedMatchList.map((match, idx) => {
                return (
                  <li key={idx}>{match.homeTeam} {match.score[0]} - {match.awayTeam} {match.score[1]}</li>
                )
              })}
            </ol>
        }
      </div>
    </section>
  )
}

export default ScoreBoard
