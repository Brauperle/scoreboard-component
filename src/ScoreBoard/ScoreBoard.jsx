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
    <section className="container mx-auto box-border font-mono mt-6 mb-6 max-w-4xl">
      <header><h1 className="text-4xl font-bold tracking-wide text-green-500">SCOREBOARD</h1></header>
      <div className="shadow-md rounded-md border border-gray-200 sm:flex justify-between pl-3 pr-3 pt-5 pb-3 items-center mt-6 mb-6">
        <div className="sm:flex justify-between items-center mb-3 sm:m-0">
          <div className="relative mr-3 mb-5 sm:mb-0">
            <label className="border border-gray-300 absolute text-xs font-bold bg-gray-200 rounded-full pr-2 pl-2 -top-2 left-2" htmlFor="home_team">Home team</label>
            <input placeholder="Enter home team" className="shadow-md border border-gray-200 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600" data-testid={'scoreboard__homename'} type="text" id="home_team" name="home_team" value={homeTeamName} onChange={e => {
              setHomeTeamName(e.target.value)
            }} />
          </div>
          <div className="relative">
            <label className="border border-gray-300 absolute text-xs font-bold bg-gray-200 rounded-full pr-2 pl-2 -top-2 left-2" htmlFor="home_team">Away team</label>
            <input placeholder="Enter away team" className="shadow-md border border-gray-200 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600" data-testid={'scoreboard__awayname'} type="text" id="away_team" name="away_team" value={awayTeamName} onChange={e => {
              setAwayTeamName(e.target.value)
            }} />
          </div>
        </div>
        <button className="shadow-md bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-600 hover:bg-green-600 rounded-md text-white font-bold p-3" data-testid={'scoreboard__create'} type="button" onClick={() => {
          createMatch(homeTeamName, awayTeamName)
          //reset fields
          setHomeTeamName("");
          setAwayTeamName("");
        }}>Create match</button>
      </div>
      <div className="mt-6 mb-6 shadow-md rounded-md border border-gray-200">
        <div className="p-3 bg-gray-200 rounded-tr-md rounded-tl-md">
          <h4>In Progress match</h4>
          <p className="text-sm text-gray-500">You can update score or end match.</p>

        </div>

        <hr />
        {
          Object.keys(matches).length === 0
            ? <div className="p-3">No &quot;In Progress&quot; match, please create one</div>
            : Object.keys(matches)
              .filter(mid => matches[mid].status === 'in_progress').length === 0
              ? <div className="p-3">No &quot;In Progress&quot; match, please create one</div>
              : <ul data-testid={'scoreboard__admin'}>
                {Object.keys(matches)
                  .filter(mid => matches[mid].status === 'in_progress')
                  .map(mid => {
                    return (
                      <li data-testid={`scoreboard__${mid}__in_progress`} key={mid} className="border-t border-gray-300">
                        <div className="sm:flex justify-between items-center pl-3 pr-3 pt-5 pb-3">
                          <div className="sm:flex justify-between items-center mb-3 sm:mb-0">
                            <div className="relative mr-3 mb-5 sm:mb-0">
                              <label className="border border-gray-300 absolute text-xs font-bold bg-gray-200 rounded-full pr-2 pl-2 -top-2 left-2" htmlFor={`${mid}__home`}>{matches[mid].homeTeam}</label>
                              <input className="scoreboard__score__home shadow-md border border-gray-200 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600" data-testid={`scoreboard__score__home__${mid}`} id={`${mid}__home`} name={`${mid}__home`} type="text" value={matches[mid].score[0]} onChange={e => {
                                if (isNaN(parseInt(e.target.value, 10))) return
                                updateMatchScore(
                                  mid,
                                  parseInt(e.target.value, 10),
                                  matches[mid].score[1]
                                )
                              }} />
                            </div>
                            <div className="relative">
                              <label className="border border-gray-300 absolute text-xs font-bold bg-gray-200 rounded-full pr-2 pl-2 -top-2 left-2" htmlFor={`${mid}__away`}>{matches[mid].awayTeam}</label>
                              <input className="scoreboard__score__away shadow-md border border-gray-200 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-green-600" data-testid={`scoreboard__score__away__${mid}`} id={`${mid}__away`} name={`${mid}__away`} type="text" value={matches[mid].score[1]} onChange={e => {
                                if (isNaN(parseInt(e.target.value, 10))) return
                                updateMatchScore(
                                  mid,
                                  matches[mid].score[0],
                                  parseInt(e.target.value, 10)
                                )
                              }}/>
                            </div>
                          </div>
                          <button className="scoreboard__end shadow-md bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-600 hover:bg-green-600 rounded-full text-white font-bold p-3" data-testid={`scoreboard__end__${mid}`} type="button" onClick={() => {
                            finishMatch(mid)
                          }}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" width="24" height="24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>

                          </button>
                        </div>
                        <div className="p-3 bg-gray-100 text-xs">
                          <div>
                            <pre>
                              {JSON.stringify(matches[mid], null, 2)}

                            </pre>
                          </div>
                        </div>

                      </li>
                    )
                  })}
              </ul>
        }
      </div>
      <div className="mt-6 mb-6 shadow-md rounded-md border border-gray-200">
        <div className="p-3 bg-gray-200 rounded-tr-md rounded-tl-md">
          <h4>Match ordered list</h4>
          <p className="text-sm text-gray-500">Match are ordered by total score, and most recent if same total score.</p>

        </div>
        <hr />
        {
          orderedMatchList.length === 0
            ? <div className="p-3">No match, please create one</div>
            : <>
              <ol data-testid="scoreboard__display">
                { orderedMatchList.map(match => {
                  return (
                    <li className="border-t border-gray-300 p-3" data-testid={`scoreboard__display__${match.id}`} key={match.id}>{match.homeTeam} {match.score[0]} - {match.awayTeam} {match.score[1]}</li>
                  )
                })}
              </ol>
              <div className="p-3 bg-gray-100 text-xs">
                <div>
                  <pre>
                    {JSON.stringify(orderedMatchList, null, 2)}

                  </pre>
                </div>
              </div>
            </>
        }
      </div>
    </section>
  )
}

export default ScoreBoard
