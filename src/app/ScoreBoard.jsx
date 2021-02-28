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
        <input data-testid={'scoreboard__homename'} type="text" id="home_team" name="home_team" value={homeTeamName} onChange={e => {
          setHomeTeamName(e.target.value)
        }} />
        <label htmlFor="home_team">Away Team</label>
        <input data-testid={'scoreboard__awayname'} type="text" id="away_team" name="away_team" value={awayTeamName} onChange={e => {
          setAwayTeamName(e.target.value)
        }} />
        <button data-testid={'scoreboard__create'} type="button" onClick={() => {
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
              : <ul data-testid={'scoreboard__admin'}>
                {Object.keys(matches)
                  .filter(mid => matches[mid].status === 'in_progress')
                  .map(mid => {
                    return (
                      <li data-testid={`scoreboard__${mid}__in_progress`} key={mid}>
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
                              <input className="scoreboard__score__home" data-testid={`scoreboard__score__home__${mid}`} id={`${mid}__home`} name={`${mid}__home`} type="text" value={matches[mid].score[0]} onChange={e => {
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
                              <input className="scoreboard__score__away" data-testid={`scoreboard__score__away__${mid}`} id={`${mid}__away`} name={`${mid}__away`} type="text" value={matches[mid].score[1]} onChange={e => {
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
                            <button className="scoreboard__end" data-testid={`scoreboard__end__${mid}`} type="button" onClick={() => {
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
            : <ol data-testid="scoreboard__display">
              { orderedMatchList.map(match => {
                return (
                  <li data-testid={`scoreboard__display__${match.id}`} key={match.id}>{match.homeTeam} {match.score[0]} - {match.awayTeam} {match.score[1]}</li>
                )
              })}
            </ol>
        }
      </div>
    </section>
  )
}

export default ScoreBoard
