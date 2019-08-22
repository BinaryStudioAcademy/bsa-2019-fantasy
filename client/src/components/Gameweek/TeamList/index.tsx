import React from 'react';

import styles from './styles.module.scss';
import TeamItem from '../TeamItem';
import info from 'assets/images/info.svg';
import TeamItemHeader from '../TeamItemHeader/TeamItemHeader';

type Props = {
  starters: any; // can be change to type real data
  substitutes?: any; // can be change to type real data
  isGameweek?: boolean;
  onOpen?: (id: string, isCaptain: boolean, isViceCaptain: boolean, name: string) => void;
  captainId?: string;
  viceCaptainId?: string;
};

const TeamList = ({
  starters,
  substitutes,
  isGameweek = false,
  onOpen,
  captainId,
  viceCaptainId,
}: Props) => {
  const displayPlayers = (arr: any) =>
    arr.map(({ lastDroppedItem }, idx) => {
      if (!lastDroppedItem) {
        return null;
      }
      return (
        <TeamItem
          key={`teamlist-item-${lastDroppedItem.id}-${lastDroppedItem.id || idx}`}
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
      );
    });

  return (
    <table className={styles['team-list']}>
      <TeamItemHeader name='Starters' />
      <tbody className='w-3/4 bg-white p-3'>{displayPlayers(starters)}</tbody>
      {!!substitutes && (
        <>
          <TeamItemHeader name='Substitutes' />
          <tbody className='w-3/4 bg-white p-3'>{displayPlayers(substitutes)}</tbody>
        </>
      )}
    </table>
  );
};

export default TeamList;
