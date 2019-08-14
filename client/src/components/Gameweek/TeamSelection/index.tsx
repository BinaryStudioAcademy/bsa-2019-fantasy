import React, { useState, useCallback } from 'react';
import uuid from 'uuidv4';
import HTML5Backend from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import update from 'immutability-helper';

import PlayerSelectionDroppable, {
  PlayerDroppable,
  BenchDroppable,
} from '../PlayerSelectionDroppable';
import { PlayerDraggableProps } from '../PlayerSelection';
import { PlayerTypes } from '../PlayerSelection/types';
import Button from '../../../components/Button';
import './styles.scss';

export interface TeamSelectionProps {
  isGameweek: boolean;
}

const BENCH = [
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
];

const PITCH = [
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
];

const TeamSelection = ({ isGameweek }: TeamSelectionProps) => {
  //set bench drag&drop items, which accept all player types
  const [bench, setBench] = useState<BenchDroppable[]>(BENCH);
  //set bench drag&drop items, which accept only specific player types
  const [pitch, setPitch] = useState<PlayerDroppable[]>(PITCH);

  //set ids of players on the pitch
  const [droppedPlayerPitchIds, setdroppedPlayerPitchIds] = useState<string[]>(
    pitch.map((el) => {
      if (el.lastDroppedItem.id) {
        return el.lastDroppedItem.id;
      } else return null;
    }),
  );
  //set ids of players on the bench
  const [droppedPlayerBenchIds, setDroppedPlayerBenchIds] = useState<string[]>(
    bench.map((el) => {
      if (el.lastDroppedItem.id) {
        return el.lastDroppedItem.id;
      } else return null;
    }),
  );
  const saveTeam = (pitch: string[], bench: string[]) => {
    console.log(`PITCH PLAYERS \n  ${pitch}`);
    console.log(`BENCH PLAYERS \n  ${bench}`);
  };
  //handles drop from bench to the pitch
  const handlePitchDrop = useCallback(
    (index: number, item: PlayerDraggableProps, benchIndex: number) => {
      const { id } = item;
      setPitch(
        update(pitch, {
          [index]: {
            lastDroppedItem: {
              $set: item,
            },
          },
        }),
      );
      droppedPlayerPitchIds.splice(index, 1, id);
      setdroppedPlayerPitchIds([...droppedPlayerPitchIds]);
      setBench(
        update(bench, {
          [benchIndex]: {
            lastDroppedItem: {
              $set: pitch[index].lastDroppedItem,
            },
          },
        }),
      );
      droppedPlayerBenchIds.splice(benchIndex, 1, pitch[index].lastDroppedItem.id);
      setDroppedPlayerBenchIds([...droppedPlayerBenchIds]);
    },
    [droppedPlayerPitchIds, droppedPlayerBenchIds, pitch, bench],
  );

  //handles drop from pitch to the bench
  const handleBenchDrop = useCallback(
    (index: number, item: PlayerDraggableProps, pitchIndex: number) => {
      const { id } = item;
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

      setPitch(
        update(pitch, {
          [pitchIndex]: {
            lastDroppedItem: {
              $set: bench[index].lastDroppedItem,
            },
          },
        }),
      );

      droppedPlayerPitchIds.splice(pitchIndex, 1, bench[index].lastDroppedItem.id);
      setdroppedPlayerPitchIds([...droppedPlayerPitchIds]);
    },
    [droppedPlayerPitchIds, droppedPlayerBenchIds, pitch, bench],
  );

  //handles drag&drop action
  const handleDrop = useCallback(
    (index: number, item: PlayerDraggableProps) => {
      //do not perform drag&drop when it is gameweek results
      if (isGameweek) {
        return;
      }

      const { id } = item;
      const playerPitchIndex = droppedPlayerPitchIds.indexOf(id);
      const playerBenchIndex = droppedPlayerBenchIds.indexOf(id);

      // when we move from the bench
      if (playerBenchIndex > -1 && pitch[index] && pitch !== undefined) {
        handlePitchDrop(index, item, playerBenchIndex);
        //when we move from the pitch
      } else if (playerPitchIndex > -1 && bench[index] && bench !== undefined) {
        handleBenchDrop(index, item, playerPitchIndex);
      }
    },
    [
      droppedPlayerPitchIds,
      droppedPlayerBenchIds,
      pitch,
      bench,
      isGameweek,
      handleBenchDrop,
      handlePitchDrop,
    ],
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <div className='relative team-container'>
        {/* Goalkeeper */}

        <div className='flex justify-around absolute team'>
          {pitch.map(({ accept, lastDroppedItem }: PlayerDroppable, index) => {
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
          {pitch.map(({ accept, lastDroppedItem }: PlayerDroppable, index) => {
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
          {pitch.map(({ accept, lastDroppedItem }: PlayerDroppable, index) => {
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
          {pitch.map(({ accept, lastDroppedItem }: PlayerDroppable, index) => {
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
        <div className='w-full h-40 top-120 absolute mt-4 flex justify-center align-center'>
          <Button
            className='w-3/12 h-12 my-3'
            onClick={(e) => saveTeam(droppedPlayerPitchIds, droppedPlayerBenchIds)}
          >
            <p>Save Your Team</p>
          </Button>
        </div>
      </div>
    </DndProvider>
  );
};

export default TeamSelection;
