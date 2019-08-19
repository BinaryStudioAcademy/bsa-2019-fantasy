import React, { useCallback, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import update from 'immutability-helper';

import HTML5Backend from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';

import { RootState } from 'store/types';
import { GameweekType } from 'types/gameweek.type';
import { PlayerTypes } from '../PlayerSelection/types';

import PlayerSelectionDroppable, {
  PlayerDroppable,
  BenchDroppable,
} from '../PlayerSelectionDroppable';
import { PlayerDraggableProps } from '../PlayerSelection';

import { getFieldPlayersUniformUrl, getGoalkeepersUniformUrl } from 'helpers/images';
import { postGameweekHistory } from 'containers/Routing/fetchGameweeks/actions';

import Button from 'components/Button';
import Spinner from 'components/Spinner';

import './styles.scss';

export interface GameweekSelectionProps {
  currentGameweek: GameweekType;
  userId: string;
}
export interface TeamSelectionProps {
  isGameweek: boolean;
  onOpen?: (id: string, isCaptain: boolean, isViceCaptain: boolean, name: string) => void;
  captainId?: string;
  viceCaptainId?: string;
  players: any;
  currentGameweek: GameweekType;
  userId: string;
}

const TeamSelection = ({
  isGameweek,
  captainId,
  viceCaptainId,
  onOpen,
  players,
  currentGameweek,
  userId,
}: TeamSelectionProps) => {
  const dispatch = useDispatch();
  const clubs = useSelector((state: RootState) => state.clubs.clubs);

  const [playersOnBench, setBench] = useState<Array<any>>([
    {
      accept: [
        PlayerTypes.GOALKEEPER,
        PlayerTypes.DEFENDER,
        PlayerTypes.MIDDLEFIELDER,
        PlayerTypes.FORWARD,
      ],
      lastDroppedItem: null,
    },
    {
      accept: [
        PlayerTypes.GOALKEEPER,
        PlayerTypes.DEFENDER,
        PlayerTypes.MIDDLEFIELDER,
        PlayerTypes.FORWARD,
      ],
      lastDroppedItem: null,
    },
    {
      accept: [
        PlayerTypes.GOALKEEPER,
        PlayerTypes.DEFENDER,
        PlayerTypes.MIDDLEFIELDER,
        PlayerTypes.FORWARD,
      ],
      lastDroppedItem: null,
    },
    {
      accept: [
        PlayerTypes.GOALKEEPER,
        PlayerTypes.DEFENDER,
        PlayerTypes.MIDDLEFIELDER,
        PlayerTypes.FORWARD,
      ],
      lastDroppedItem: null,
    },
  ]);

  const [playersOnPitch, setPitch] = useState<Array<any>>([
    {
      accept: PlayerTypes.GOALKEEPER,
      lastDroppedItem: null,
    },
    {
      accept: PlayerTypes.DEFENDER,
      lastDroppedItem: null,
    },

    {
      accept: PlayerTypes.DEFENDER,
      lastDroppedItem: null,
    },

    {
      accept: PlayerTypes.DEFENDER,
      lastDroppedItem: null,
    },
    {
      accept: PlayerTypes.DEFENDER,
      lastDroppedItem: null,
    },

    {
      accept: PlayerTypes.MIDDLEFIELDER,
      lastDroppedItem: null,
    },

    {
      accept: PlayerTypes.MIDDLEFIELDER,
      lastDroppedItem: null,
    },
    {
      accept: PlayerTypes.MIDDLEFIELDER,
      lastDroppedItem: null,
    },

    {
      accept: PlayerTypes.MIDDLEFIELDER,
      lastDroppedItem: null,
    },
    {
      accept: PlayerTypes.FORWARD,
      lastDroppedItem: null,
    },

    {
      accept: PlayerTypes.FORWARD,
      lastDroppedItem: null,
    },
  ]);

  const [droppedPlayerBenchIds, setPlayerBenchIds] = useState<Array<any>>([]);
  const [droppedPlayerPitchIds, setPlayerPitchIds] = useState<Array<any>>([]);

  //sets fetched players to the corresponding places
  useEffect(() => {
    if (players.length) {
      setBench(
        players
          .filter((el) => el.is_on_bench)
          .map((el) => {
            return {
              accept: [
                PlayerTypes.GOALKEEPER,
                PlayerTypes.DEFENDER,
                PlayerTypes.MIDDLEFIELDER,
                PlayerTypes.FORWARD,
              ],
              lastDroppedItem: {
                ...el.player_stats,
                id: el.player_stats.id,
                name: el.player_stats.second_name,
                club: clubs[el.player_stats.club_id - 1].short_name,
                points: el.player_stats.player_score,
                type: el.player_stats.position,
                src:
                  el.player_stats.position === PlayerTypes.GOALKEEPER
                    ? getGoalkeepersUniformUrl(clubs[el.player_stats.club_id - 1].code)
                    : getFieldPlayersUniformUrl(clubs[el.player_stats.club_id - 1].code),
              },
            };
          }),
      );
      setPitch(
        players
          .filter((el) => !el.is_on_bench)
          .map((el) => {
            return {
              accept: el.player_stats.position,
              lastDroppedItem: {
                ...el.player_stats,
                id: el.player_stats.id,
                name: el.player_stats.second_name,
                club: clubs[el.player_stats.club_id - 1].short_name,
                points: el.player_stats.player_score,
                type: el.player_stats.position,
                src:
                  el.player_stats.position === PlayerTypes.GOALKEEPER
                    ? getGoalkeepersUniformUrl(clubs[el.player_stats.club_id - 1].code)
                    : getFieldPlayersUniformUrl(clubs[el.player_stats.club_id - 1].code),
              },
            };
          }),
      );

      setPlayerPitchIds(
        players.filter((el) => !el.is_on_bench).map((el) => el.player_stats.id),
      );

      setPlayerBenchIds(
        players.filter((el) => el.is_on_bench).map((el) => el.player_stats.id),
      );
    }
  }, [players]);

  //saves team to database
  const saveTeam = (pitch: string[], bench: string[]) => {
    const query = [
      ...pitch.map((el) => {
        return {
          is_on_bench: false,
          is_captain: el === captainId ? true : false,
          player_id: el,
        };
      }),
      ...bench.map((el) => {
        return {
          is_on_bench: true,
          is_captain: el === captainId ? true : false,
          player_id: el,
        };
      }),
    ];

    dispatch(postGameweekHistory(userId, currentGameweek.id, query));
  };

  //handles drop from bench to the pitch
  const handlePitchDrop = useCallback(
    (index: number, item: PlayerDraggableProps, benchIndex: number) => {
      const { id } = item;

      setPitch(
        update(playersOnPitch, {
          [index]: {
            lastDroppedItem: {
              $set: item,
            },
          },
        }),
      );
      droppedPlayerPitchIds.splice(index, 1, id);

      setPlayerPitchIds([...droppedPlayerPitchIds]);
      setBench(
        update(playersOnBench, {
          [benchIndex]: {
            lastDroppedItem: {
              $set: playersOnPitch[index].lastDroppedItem,
            },
          },
        }),
      );

      droppedPlayerBenchIds.splice(
        benchIndex,
        1,
        playersOnPitch[index].lastDroppedItem.id,
      );
      setPlayerBenchIds([...droppedPlayerBenchIds]);
    },
    [droppedPlayerPitchIds, droppedPlayerBenchIds, playersOnPitch, playersOnBench],
  );

  //handles drop from pitch to the bench
  const handleBenchDrop = useCallback(
    (index: number, item: PlayerDraggableProps, pitchIndex: number) => {
      const { id } = item;
      setBench(
        update(playersOnBench, {
          [index]: {
            lastDroppedItem: {
              $set: item,
            },
          },
        }),
      );
      droppedPlayerBenchIds.splice(index, 1, id);
      setPlayerBenchIds([...droppedPlayerBenchIds]);
      setPitch(
        update(playersOnPitch, {
          [pitchIndex]: {
            lastDroppedItem: {
              $set: playersOnBench[index].lastDroppedItem,
            },
          },
        }),
      );
      droppedPlayerPitchIds.splice(
        pitchIndex,
        1,
        playersOnBench[index].lastDroppedItem.id,
      );
      setPlayerPitchIds([...droppedPlayerPitchIds]);
    },
    [droppedPlayerPitchIds, droppedPlayerBenchIds, playersOnPitch, playersOnBench],
  );

  //handles drag&drop action
  const handleDrop = useCallback(
    (index: number, item: PlayerDraggableProps) => {
      //do not perform drag&drop when it is gameweek results
      if (isGameweek) {
        return;
      }
      console.log(item);
      const { id } = item;
      const playerPitchIndex = droppedPlayerPitchIds.indexOf(id);
      const playerBenchIndex = droppedPlayerBenchIds.indexOf(id);

      // when we move from the bench
      if (
        playerBenchIndex > -1 &&
        playerPitchIndex[index] &&
        playersOnPitch !== undefined
      ) {
        handlePitchDrop(index, item, playerBenchIndex);
        //when we move from the pitch
      } else if (
        playerPitchIndex > -1 &&
        playersOnBench[index] &&
        playersOnBench !== undefined
      ) {
        handleBenchDrop(index, item, playerPitchIndex);
        //when we move from the list
      } else if (playerBenchIndex === -1 && playerPitchIndex === -1) {
        setPitch(
          update(playersOnPitch, {
            [index]: {
              lastDroppedItem: {
                $set: item,
              },
            },
          }),
        );
        droppedPlayerPitchIds.splice(index, 1, id);
        setPlayerPitchIds([...droppedPlayerPitchIds]);
      }
    },
    [
      droppedPlayerPitchIds,
      droppedPlayerBenchIds,
      playersOnPitch,
      playersOnBench,
      isGameweek,
      handleBenchDrop,
      handlePitchDrop,
    ],
  );

  return (
    <DndProvider backend={HTML5Backend}>
      {playersOnBench && playersOnPitch ? (
        <div className='relative team-container'>
          {/* Goalkeeper */}

          <div className='flex justify-around absolute team'>
            {playersOnPitch.map(({ accept, lastDroppedItem }: PlayerDroppable, index) => {
              if (accept === PlayerTypes.GOALKEEPER) {
                return (
                  <PlayerSelectionDroppable
                    index={index}
                    key={index}
                    accept={accept}
                    lastDroppedItem={lastDroppedItem}
                    onDrop={(item: PlayerDraggableProps) => handleDrop(index, item)}
                    isGameweek={isGameweek}
                    onOpen={onOpen}
                    captainId={captainId}
                    viceCaptainId={viceCaptainId}
                  />
                );
              } else {
                return null;
              }
            })}
          </div>

          {/* Defenders */}
          <div className='flex justify-between top-20 absolute team'>
            {playersOnPitch.map(({ accept, lastDroppedItem }: PlayerDroppable, index) => {
              if (accept === PlayerTypes.DEFENDER) {
                return (
                  <PlayerSelectionDroppable
                    index={index}
                    key={index}
                    accept={accept}
                    lastDroppedItem={lastDroppedItem}
                    onDrop={(item: PlayerDraggableProps) => handleDrop(index, item)}
                    isGameweek={isGameweek}
                    onOpen={onOpen}
                    captainId={captainId}
                    viceCaptainId={viceCaptainId}
                  />
                );
              } else {
                return null;
              }
            })}
          </div>

          {/* Middlefilders */}
          <div className='flex justify-between top-40 absolute team'>
            {playersOnPitch.map(({ accept, lastDroppedItem }: PlayerDroppable, index) => {
              if (accept === PlayerTypes.MIDDLEFIELDER) {
                return (
                  <PlayerSelectionDroppable
                    index={index}
                    key={index}
                    accept={accept}
                    lastDroppedItem={lastDroppedItem}
                    onDrop={(item: PlayerDraggableProps) => handleDrop(index, item)}
                    isGameweek={isGameweek}
                    onOpen={onOpen}
                    captainId={captainId}
                    viceCaptainId={viceCaptainId}
                  />
                );
              } else {
                return null;
              }
            })}
          </div>
          {/* Forwards */}
          <div className='flex justify-between top-60 absolute team'>
            {playersOnPitch.map(({ accept, lastDroppedItem }: PlayerDroppable, index) => {
              if (accept === PlayerTypes.FORWARD) {
                return (
                  <PlayerSelectionDroppable
                    index={index}
                    key={index}
                    accept={accept}
                    lastDroppedItem={lastDroppedItem}
                    onDrop={(item: PlayerDraggableProps) => handleDrop(index, item)}
                    isGameweek={isGameweek}
                    onOpen={onOpen}
                    captainId={captainId}
                    viceCaptainId={viceCaptainId}
                  />
                );
              } else {
                return null;
              }
            })}
          </div>
          {/* Bench */}
          <div className='flex justify-around top-80 left-0 w-full m-3 absolute team'>
            {playersOnBench.map(({ accept, lastDroppedItem }: BenchDroppable, index) => {
              return (
                <PlayerSelectionDroppable
                  index={index}
                  key={index}
                  accept={accept}
                  lastDroppedItem={lastDroppedItem}
                  onDrop={(item: PlayerDraggableProps) => handleDrop(index, item)}
                  isGameweek={isGameweek}
                  onOpen={onOpen}
                  captainId={captainId}
                  viceCaptainId={viceCaptainId}
                />
              );
            })}
          </div>
          <img src='images/field.svg' alt='field' className='field' />
          <div className='w-full h-40 bg-gray-400 rounded-r-sm' />
          {isGameweek ? null : (
            <div className='w-full h-24 absolute flex justify-center'>
              <Button
                className='w-3/12 h-12 mt-3'
                onClick={(e) => saveTeam(droppedPlayerPitchIds, droppedPlayerBenchIds)}
              >
                <p>Save Your Team</p>
              </Button>
            </div>
          )}
        </div>
      ) : (
        <Spinner />
      )}
    </DndProvider>
  );
};
export default TeamSelection;
