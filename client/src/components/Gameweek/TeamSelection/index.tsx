import React, { useState, useCallback } from 'react';
import uuid, { is } from 'uuidv4';
import HTML5Backend from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import update from 'immutability-helper';

import PlayerSelectionDroppable, {
  PlayerDroppable,
  BenchDroppable,
} from '../PlayerSelectionDroppable';
import { PlayerDraggableProps } from '../PlayerSelection';
import { PlayerTypes } from '../PlayerSelection/types';

import './styles.scss';
export interface TeamSelectionProps {
  isGameweek: boolean;
}
const TeamSelection = ({ isGameweek }: TeamSelectionProps) => {
  const [bench, setBench] = useState<BenchDroppable[]>([
    {
      accept: [
        PlayerTypes.GOALKEEPER,
        PlayerTypes.DEFENDER,
        PlayerTypes.MIDDLEFIELDER,
        PlayerTypes.FORWARD,
      ],
      lastDroppedItem: {
        id: uuid(),
        src: 'images/uniforms/goalkeepers/shirt_43_1-66.png',
        name: 'Ederson',
        club: 'TOT (A)',
        type: PlayerTypes.GOALKEEPER,
      },
    },
    {
      accept: [
        PlayerTypes.GOALKEEPER,
        PlayerTypes.DEFENDER,
        PlayerTypes.MIDDLEFIELDER,
        PlayerTypes.FORWARD,
      ],
      lastDroppedItem: {
        id: uuid(),
        src: 'images/uniforms/field-players/shirt_43-66.png',
        name: 'Laporte',
        club: 'TOT (H)',
        type: PlayerTypes.DEFENDER,
      },
    },
    {
      accept: [
        PlayerTypes.GOALKEEPER,
        PlayerTypes.DEFENDER,
        PlayerTypes.MIDDLEFIELDER,
        PlayerTypes.FORWARD,
      ],
      lastDroppedItem: {
        id: uuid(),
        src: 'images/uniforms/field-players/shirt_31-66.png',
        name: 'Townsed',
        club: 'SHU (A)',
        type: PlayerTypes.DEFENDER,
      },
    },
    {
      accept: [
        PlayerTypes.GOALKEEPER,
        PlayerTypes.DEFENDER,
        PlayerTypes.MIDDLEFIELDER,
        PlayerTypes.FORWARD,
      ],
      lastDroppedItem: {
        id: uuid(),
        src: 'images/uniforms/field-players/shirt_11-66.png',
        name: 'Calvert-Lewin',
        club: 'WAT (H)',
        type: PlayerTypes.FORWARD,
      },
    },
  ]);

  const [allPlayers, setAllPlayers] = useState<PlayerDroppable[]>([
    {
      accept: PlayerTypes.GOALKEEPER,
      lastDroppedItem: {
        id: uuid(),
        src: 'images/uniforms/goalkeepers/shirt_14_1-66.png',
        name: 'Allison',
        club: 'SOU (A)',
        type: PlayerTypes.GOALKEEPER,
      },
    },
    {
      accept: PlayerTypes.DEFENDER,
      lastDroppedItem: {
        id: uuid(),
        src: 'images/uniforms/field-players/shirt_14-66.png',
        name: 'van Dijk',
        club: 'SOU (A)',
        type: PlayerTypes.DEFENDER,
      },
    },

    {
      accept: PlayerTypes.DEFENDER,
      lastDroppedItem: {
        id: uuid(),
        src: 'images/uniforms/field-players/shirt_14-66.png',
        name: 'Aleksandr Arnold',
        club: 'SOU (A)',
        type: PlayerTypes.DEFENDER,
      },
    },

    {
      accept: PlayerTypes.DEFENDER,
      lastDroppedItem: {
        id: uuid(),
        src: 'images/uniforms/field-players/shirt_43-66.png',
        name: 'Walker',
        club: 'TOT (H)',
        type: PlayerTypes.DEFENDER,
      },
    },
    {
      accept: PlayerTypes.DEFENDER,
      lastDroppedItem: {
        id: uuid(),
        src: 'images/uniforms/field-players/shirt_3-66.png',
        name: 'David Luiz',
        club: 'BUR (H)',
        type: PlayerTypes.DEFENDER,
      },
    },
    {
      accept: PlayerTypes.MIDDLEFIELDER,
      lastDroppedItem: {
        id: uuid(),
        src: 'images/uniforms/field-players/shirt_57-66.png',
        name: 'Doucoure',
        club: 'EVE (A)',
        type: PlayerTypes.MIDDLEFIELDER,
      },
    },

    {
      accept: PlayerTypes.MIDDLEFIELDER,
      lastDroppedItem: {
        id: uuid(),
        src: 'images/uniforms/field-players/shirt_1-66.png',
        name: 'Pogba',
        club: 'WOL (A)',
        type: PlayerTypes.MIDDLEFIELDER,
      },
    },
    {
      accept: PlayerTypes.MIDDLEFIELDER,
      lastDroppedItem: {
        id: uuid(),
        src: 'images/uniforms/field-players/shirt_13-66.png',
        name: 'Perez',
        club: 'CHE (A)',
        type: PlayerTypes.MIDDLEFIELDER,
      },
    },

    {
      accept: PlayerTypes.MIDDLEFIELDER,
      lastDroppedItem: {
        id: uuid(),
        src: 'images/uniforms/field-players/shirt_39-66.png',
        name: 'Moutinho',
        club: 'MUN (H)',
        type: PlayerTypes.MIDDLEFIELDER,
      },
    },
    {
      accept: PlayerTypes.FORWARD,
      lastDroppedItem: {
        id: uuid(),
        src: 'images/uniforms/field-players/shirt_1-66.png',
        name: 'Rashford',
        club: 'WOL (A)',
        type: PlayerTypes.FORWARD,
      },
    },

    {
      accept: PlayerTypes.FORWARD,
      lastDroppedItem: {
        id: uuid(),
        src: 'images/uniforms/field-players/shirt_57-66.png',
        name: 'Deeney',
        club: 'EVE (A)',
        type: PlayerTypes.FORWARD,
      },
    },
  ]);

  const [droppedPlayerIds, setDroppedPlayerIds] = useState<string[]>(
    allPlayers.map((el) => {
      return el.lastDroppedItem.id;
    }),
  );

  const [droppedPlayerBenchIds, setDroppedPlayerBenchIds] = useState<string[]>(
    bench.map((el) => {
      return el.lastDroppedItem.id;
    }),
  );

  const handleDrop = useCallback(
    (index: number, item: PlayerDraggableProps) => {
      if (isGameweek) {
        return;
      }
      const { id } = item;

      const playerPitchIndex = droppedPlayerIds.indexOf(id);
      const playerBenchIndex = droppedPlayerBenchIds.indexOf(id);

      if (playerBenchIndex > -1 && allPlayers !== undefined) {
        setAllPlayers(
          update(allPlayers, {
            [index]: {
              lastDroppedItem: {
                $set: item,
              },
            },
          }),
        );
        droppedPlayerIds.splice(index, 1, id);
        setDroppedPlayerIds([...droppedPlayerIds]);
        setBench(
          update(bench, {
            [playerBenchIndex]: {
              lastDroppedItem: {
                $set: allPlayers[index].lastDroppedItem,
              },
            },
          }),
        );
        droppedPlayerBenchIds.splice(
          playerBenchIndex,
          1,
          allPlayers[index].lastDroppedItem.id,
        );
        setDroppedPlayerBenchIds([...droppedPlayerBenchIds]);
      } else if (playerPitchIndex > -1 && bench !== undefined && bench[index]) {
        setBench(
          update(bench, {
            [index]: {
              lastDroppedItem: {
                $set: item,
              },
            },
          }),
        );
        droppedPlayerBenchIds.splice(index, 1, id);
        setDroppedPlayerBenchIds([...droppedPlayerBenchIds]);

        setAllPlayers(
          update(allPlayers, {
            [playerPitchIndex]: {
              lastDroppedItem: {
                $set: bench[index].lastDroppedItem,
              },
            },
          }),
        );

        droppedPlayerIds.splice(playerPitchIndex, 1, bench[index].lastDroppedItem.id);
        setDroppedPlayerIds([...droppedPlayerIds]);
      }
    },
    [droppedPlayerIds, droppedPlayerBenchIds, allPlayers, bench, isGameweek],
  );
  return (
    <DndProvider backend={HTML5Backend}>
      <div className='relative team-container'>
        {/* Goalkeeper */}

        <div className='flex justify-around absolute team'>
          {allPlayers.map(({ accept, lastDroppedItem }: PlayerDroppable, index) => {
            if (accept === PlayerTypes.GOALKEEPER) {
              return (
                <PlayerSelectionDroppable
                  index={index}
                  key={index}
                  accept={accept}
                  lastDroppedItem={lastDroppedItem}
                  onDrop={(item: PlayerDraggableProps) => handleDrop(index, item)}
                />
              );
            } else {
              return null;
            }
          })}
        </div>

        {/* Defenders */}
        <div className='flex justify-between top-20 absolute team'>
          {allPlayers.map(({ accept, lastDroppedItem }: PlayerDroppable, index) => {
            if (accept === PlayerTypes.DEFENDER) {
              return (
                <PlayerSelectionDroppable
                  index={index}
                  key={index}
                  accept={accept}
                  lastDroppedItem={lastDroppedItem}
                  onDrop={(item: PlayerDraggableProps) => handleDrop(index, item)}
                />
              );
            } else {
              return null;
            }
          })}
        </div>
        {/* Middlefilders */}
        <div className='flex justify-between top-40 absolute team'>
          {allPlayers.map(({ accept, lastDroppedItem }: PlayerDroppable, index) => {
            if (accept === PlayerTypes.MIDDLEFIELDER) {
              return (
                <PlayerSelectionDroppable
                  index={index}
                  key={index}
                  accept={accept}
                  lastDroppedItem={lastDroppedItem}
                  onDrop={(item: PlayerDraggableProps) => handleDrop(index, item)}
                />
              );
            } else {
              return null;
            }
          })}
        </div>
        {/* Forwards */}
        <div className='flex justify-around top-60 absolute team'>
          {allPlayers.map(({ accept, lastDroppedItem }: PlayerDroppable, index) => {
            if (accept === PlayerTypes.FORWARD) {
              return (
                <PlayerSelectionDroppable
                  index={index}
                  key={index}
                  accept={accept}
                  lastDroppedItem={lastDroppedItem}
                  onDrop={(item: PlayerDraggableProps) => handleDrop(index, item)}
                />
              );
            } else {
              return null;
            }
          })}
        </div>

        {/* Bench */}
        <div className='flex justify-around top-80 left-0 w-full m-3 absolute team'>
          {bench.map(({ accept, lastDroppedItem }: BenchDroppable, index) => {
            return (
              <PlayerSelectionDroppable
                index={index}
                key={index}
                accept={accept}
                lastDroppedItem={lastDroppedItem}
                onDrop={(item: PlayerDraggableProps) => handleDrop(index, item)}
              />
            );
          })}
        </div>
        <img src='images/field.svg' alt='field' className='field' />
        <div className='w-full h-40 bg-gray-400 rounded-r-sm' />
      </div>
    </DndProvider>
  );
};

export default TeamSelection;
