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
import Button from 'components/Button';
import SquadSelection from './components/SquadSelection';
import Modal from 'containers/Modal';
import { SQUAD, BUDGET, CLUBS } from './helpers';

import styles from './styles.module.scss';

const InitialTeamSelection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  // Set squad drag&drop items, which accept only specific player types
  const [squad, setSquad] = useState<PlayerDroppable[]>(SQUAD);

  // Set ids of players on the squad
  const [droppedPlayerSquadIds, setdroppedPlayerSquadIds] = useState<string[]>(
    squad.map((el) => (el.lastDroppedItem.id ? el.lastDroppedItem.id : null)),
  );

  const [moneyRemaing, setMoneyRemaining] = useState(BUDGET);
  const [selectedPlayers, setSelectedPlayers] = useState(0);
  const [isMoreThree, setIsMoreThree] = useState(false);

  const saveTeam = (squad: string[]) => {
    console.log(`SQUAD PLAYERS \n  ${squad}`);
  };

  const recalculateMoney = (squad) => {
    console.log(squad);
    let currentTotal = null;
    squad.forEach((el) => {
      if (el.lastDroppedItem.price) {
        currentTotal += el.lastDroppedItem.price;
      }
    });
    return currentTotal;
  };

  const recalculatePlayers = (squad) => {
    let currentPlayers = 0;
    squad.forEach((el) => {
      if (el.lastDroppedItem.id) {
        currentPlayers++;
      }
    });
    return currentPlayers;
  };

  const checkIsMoreThree = (squad) => {
    Object.keys(CLUBS).forEach(
      (key) =>
        (CLUBS[key] = squad.filter((el) => el.lastDroppedItem.club === key).length),
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
      const playerSquadIndex = droppedPlayerSquadIds.indexOf(id);

      // When we move to the squad
      if (playerSquadIndex === -1) {
        const newSquad = update(squad, {
          [index]: {
            lastDroppedItem: {
              $set: item,
            },
          },
        });
        setSquad(newSquad);
        setMoneyRemaining(BUDGET - recalculateMoney(newSquad)!);
        setSelectedPlayers(recalculatePlayers(newSquad));
        checkIsMoreThree(newSquad);

        droppedPlayerSquadIds.splice(index, 1, id);
        setdroppedPlayerSquadIds([...droppedPlayerSquadIds]);
      }
    },
    [droppedPlayerSquadIds, squad],
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
          {squad.map(({ accept, lastDroppedItem }: PlayerDroppable, index) => {
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
          {squad.map(({ accept, lastDroppedItem }: PlayerDroppable, index) => {
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
          {squad.map(({ accept, lastDroppedItem }: PlayerDroppable, index) => {
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
          {squad.map(({ accept, lastDroppedItem }: PlayerDroppable, index) => {
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
            onClick={(e) => setIsModalOpen(true)}
            // disabled={!(moneyRemaing >= 0 && selectedPlayers === 15 && !isMoreThree)}
          >
            <p>Save Your Team</p>
          </Button>
        </div>
      </div>
      {isModalOpen && (
        <Modal
          title='Modal Title'
          content='Test modal text'
          actions='sdfsdfsdf'
          onDismiss={(e) => setIsModalOpen(false)}
        />
      )}
    </DndProvider>
  );
};

export default InitialTeamSelection;
