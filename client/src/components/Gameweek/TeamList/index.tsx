import React from 'react';

import './styles.scss';
import TeamItem from '../TeamItem';
import info from 'assets/images/info.svg';
import TeamItemHeader from '../TeamItemHeader/TeamItemHeader';

const TeamList = ({
  starters,
  substitutes,
  isGameweek,
  onOpen,
  captainId,
  viceCaptainId,
}: any) => {
  const displayPlayers = (arr) =>
    arr.map(({ lastDroppedItem }) => (
      <TeamItem
        id={lastDroppedItem.id}
        info={info}
        name={lastDroppedItem.name}
        imageURL={lastDroppedItem.src}
        club={lastDroppedItem.club}
        position={lastDroppedItem.type}
        form={lastDroppedItem.form}
        gameweek_points={lastDroppedItem.gameweek_points}
        total_points={lastDroppedItem.points}
        fixture={lastDroppedItem.fixture}
        isGameweek={isGameweek}
        onOpen={arr.length === starters.length ? onOpen : undefined}
        captainId={captainId}
        viceCaptainId={viceCaptainId}
      />
    ));

  return (
    <table className='team-list'>
      <TeamItemHeader name='Starters' />
      <tbody className='w-3/4 bg-white p-3'>{displayPlayers(starters)}</tbody>
      <TeamItemHeader name='Substitutes' />
      <tbody className='w-3/4 bg-white p-3'>{displayPlayers(substitutes)}</tbody>
    </table>
  );
};

export default TeamList;
