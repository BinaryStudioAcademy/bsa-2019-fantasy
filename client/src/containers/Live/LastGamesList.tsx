import React from 'react';
import Spinner from 'components/Spinner';
import { Fixture } from './Fixture';
import _ from 'lodash';

export const LastGamesList = ({ games, getClubById, onClick, value }) => {
  if (games.length === 0) return <Spinner />;

  const gamesGrouped = _.chain(games)
    .groupBy('gameweek_id')
    .value();

  const gamesList = Object.keys(gamesGrouped)
    .reverse()
    .map((gw) => {
      return (
        <div key={gw}>
          <h4 className='text-xl font-bold mt-8 mb-2'>Gameweek {gw}</h4>
          <div className='flex flex-wrap -mx-2'>
            {gamesGrouped[gw].map((game) => {
              const {
                id,
                hometeam_score,
                awayteam_score,
                gameweek_id,
                hometeam_id,
                awayteam_id,
              } = game;
              const homeClub = getClubById(hometeam_id);
              const awayClub = getClubById(awayteam_id);
              const centerContent = (
                <div>
                  {hometeam_score}:{awayteam_score}
                </div>
              );
              const background = value === id ? 'bg-gray-300' : '';
              return (
                <div className='my-2 px-2 w-1/2' key={id}>
                  <div className={`shadow-figma p-2 rounded ${background}`}>
                    <Fixture
                      {...{ homeClub, awayClub, centerContent, onClick: onClick(game) }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    });
  return <div className=''>{gamesList}</div>;
};
