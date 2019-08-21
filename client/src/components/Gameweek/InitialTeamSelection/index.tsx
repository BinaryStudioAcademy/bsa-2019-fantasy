import React, { useState, useCallback, useEffect, useLayoutEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import HTML5Backend from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import update from 'immutability-helper';

import { RootState } from 'store/types';
import { loadPlayersAction } from 'components/PlayersSelection/actions';
import PlayerSelectionDroppable, { PlayerDroppable } from '../PlayerSelectionDroppable';
import { PlayerDraggableProps } from '../PlayerSelection';
import { PlayerTypes } from '../PlayerSelection/types';
import Button from '../../../components/Button';
import SquadSelection from './components/SquadSelection';
import { PITCH, BUDGET, CLUBS } from './helpers';

import styles from './styles.module.scss';

const InitialTeamSelection = () => {
  // Set pitch drag&drop items, which accept only specific player types
  const [pitch, setPitch] = useState<PlayerDroppable[]>(PITCH);
  // Set ids of players on the pitch
  const [droppedPlayerPitchIds, setdroppedPlayerPitchIds] = useState<string[]>(
    pitch.map((el) => {
      if (el.lastDroppedItem.id) {
        return el.lastDroppedItem.id;
      } else return null;
    }),
  );

  const [moneyRemaing, setMoneyRemaining] = useState(BUDGET);
  const [selectedPlayers, setSelectedPlayers] = useState(0);
  const [isMoreThree, setIsMoreThree] = useState(false);

  const saveTeam = (pitch: string[]) => {
    console.log(`PITCH PLAYERS \n  ${pitch}`);
  };

  const recalculateMoney = (pitch) => {
    console.log(pitch);
    let currentTotal = null;
    pitch.forEach((el) => {
      if (el.lastDroppedItem.price) {
        currentTotal += el.lastDroppedItem.price;
      }
    });
    return currentTotal;
  };

  const recalculatePlayers = (pitch) => {
    let currentPlayers = 0;
    pitch.forEach((el) => {
      if (el.lastDroppedItem.id) {
        currentPlayers++;
      }
    });
    return currentPlayers;
  };

  const checkIsMoreThree = (pitch) => {
    Object.keys(CLUBS).forEach(
      (key) =>
        (CLUBS[key] = pitch.filter((el) => el.lastDroppedItem.club === key).length),
    );

    const isMoreThanThree = (el) => CLUBS[el] > 3;

    if (Object.keys(CLUBS).some(isMoreThanThree)) {
      setIsMoreThree(true);
    } else {
      setIsMoreThree(false);
    }
  };

  // Handles drag&drop action
  const handleDrop = useCallback(
    (index: number, item: PlayerDraggableProps) => {
      const { id } = item;
      const playerPitchIndex = droppedPlayerPitchIds.indexOf(id);

      // When we move to the pitch
      if (playerPitchIndex === -1) {
        const newPitch = update(pitch, {
          [index]: {
            lastDroppedItem: {
              $set: item,
            },
          },
        });
        setPitch(newPitch);
        setMoneyRemaining(BUDGET - recalculateMoney(newPitch)!);
        setSelectedPlayers(recalculatePlayers(newPitch));
        checkIsMoreThree(newPitch);

        droppedPlayerPitchIds.splice(index, 1, id);
        setdroppedPlayerPitchIds([...droppedPlayerPitchIds]);
      }
    },
    [droppedPlayerPitchIds, pitch],
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <SquadSelection
        money={moneyRemaing}
        players={selectedPlayers}
        isMoreThree={isMoreThree}
      />
      <div className={`${styles.teamContainer} relative`}>
        {/* Goalkeeper */}
        <div
          className={`${styles.team} flex justify-around absolute team`}
          style={{ top: '6%' }}
        >
          {pitch.map(({ accept, lastDroppedItem }: PlayerDroppable, index) => {
            if (accept === PlayerTypes.GOALKEEPER) {
              return (
                <PlayerSelectionDroppable
                  index={index}
                  key={index}
                  accept={accept}
                  lastDroppedItem={lastDroppedItem}
                  onDrop={(item: PlayerDraggableProps) => handleDrop(index, item)}
                  isGameweek={false}
                  onOpen={() => false}
                />
              );
            } else {
              return null;
            }
          })}
        </div>

        {/* Defenders */}
        <div
          className={`${styles.team} flex justify-between absolute`}
          style={{ top: '29%' }}
        >
          {pitch.map(({ accept, lastDroppedItem }: PlayerDroppable, index) => {
            if (accept === PlayerTypes.DEFENDER) {
              return (
                <PlayerSelectionDroppable
                  index={index}
                  key={index}
                  accept={accept}
                  lastDroppedItem={lastDroppedItem}
                  onDrop={(item: PlayerDraggableProps) => handleDrop(index, item)}
                  isGameweek={false}
                  onOpen={() => false}
                />
              );
            } else {
              return null;
            }
          })}
        </div>

        {/* Middlefilders */}
        <div
          className={`${styles.team} flex justify-between absolute`}
          style={{ top: '54%' }}
        >
          {pitch.map(({ accept, lastDroppedItem }: PlayerDroppable, index) => {
            if (accept === PlayerTypes.MIDDLEFIELDER) {
              return (
                <PlayerSelectionDroppable
                  index={index}
                  key={index}
                  accept={accept}
                  lastDroppedItem={lastDroppedItem}
                  onDrop={(item: PlayerDraggableProps) => handleDrop(index, item)}
                  isGameweek={false}
                  onOpen={() => false}
                />
              );
            } else {
              return null;
            }
          })}
        </div>

        {/* Forwards */}
        <div
          className={`${styles.team} flex justify-around top-60 absolute`}
          style={{ top: '79%' }}
        >
          {pitch.map(({ accept, lastDroppedItem }: PlayerDroppable, index) => {
            if (accept === PlayerTypes.FORWARD) {
              return (
                <PlayerSelectionDroppable
                  index={index}
                  key={index}
                  accept={accept}
                  lastDroppedItem={lastDroppedItem}
                  onDrop={(item: PlayerDraggableProps) => handleDrop(index, item)}
                  isGameweek={false}
                  onOpen={() => false}
                />
              );
            } else {
              return null;
            }
          })}
        </div>
        <img src='images/field.svg' alt='field' className='field' />
        <div className='w-full h-24 absolute flex justify-center'>
          <Button
            className={`${styles.saveTeam} w-3/12 h-12 mt-3`}
            onClick={(e) => saveTeam(droppedPlayerPitchIds)}
            disabled={!(moneyRemaing >= 0 && selectedPlayers === 15 && !isMoreThree)}
          >
            <p>Save Your Team</p>
          </Button>
        </div>
      </div>
    </DndProvider>
  );
};

export default InitialTeamSelection;
