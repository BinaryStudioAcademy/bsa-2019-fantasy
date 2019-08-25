import cn from 'classnames';
import { produce } from 'immer';
import { DndProvider } from 'react-dnd';
import { useTranslation } from 'react-i18next';
import HTML5Backend from 'react-dnd-html5-backend';
import React, { useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { PlayerTypes } from 'components/Gameweek/PlayerSelection/types';
import { addTransfer, modifyTransfer } from 'containers/Transfers/actions';
import { RootState } from 'store/types';

import PlayerSelectionDroppable, {
  PlayerDroppable,
} from 'components/Gameweek/PlayerSelectionDroppable';
import { PlayerDraggableProps } from 'components/Gameweek/PlayerSelection';

import Spinner from 'components/Spinner';
import TeamList from 'components/Gameweek/TeamList';
import TransfersTeamList from './../../components/TransfersTeamList';

import styles from './styles.module.scss';

type DroppablePlayer = { accept: string; lastDroppedItem: any };

type Props = {
  captainId?: string;
  viceCaptainId?: string;
  players: DroppablePlayer[];
  setPlayers: React.Dispatch<React.SetStateAction<DroppablePlayer[]>>;
  onOpen?: (id: string, isCaptain: boolean, isViceCaptain: boolean, name: string) => void;
  canSubmit: boolean;
  onSubmit: () => void;
};

const TransfersTeamSelection = ({
  captainId,
  viceCaptainId,
  onOpen,
  players,
  setPlayers,
  canSubmit,
  onSubmit,
}: Props) => {
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const transfersLength = useSelector(
    (state: RootState) => state.transfers.transfers.length,
  );

  const [view, setView] = useState<'list' | 'pitch'>('pitch');

  const handleDrop = useCallback(
    (index: number, { price: _, ...item }: PlayerDraggableProps) => {
      const { id } = item;

      const playerOnPitchIdx = players.findIndex((p) => p.lastDroppedItem.id === id);

      const in_player_id = id;
      const out_player_id = players[index].lastDroppedItem.id;

      if (playerOnPitchIdx === -1) {
        let immer_reverse;

        const newPlayers = produce(
          players,
          (draft) => {
            draft[index].lastDroppedItem = item;
          },
          (_, reversePatches) => {
            immer_reverse = reversePatches;
          },
        );

        dispatch(addTransfer({ in_player_id, out_player_id, immer_reverse }));

        setPlayers(newPlayers);
      } else {
        if (playerOnPitchIdx === index) {
          return;
        }
        setPlayers((p) =>
          produce(
            p,
            (draft) => {
              const placeholder = draft[index].lastDroppedItem;
              draft[index].lastDroppedItem = item;
              draft[playerOnPitchIdx].lastDroppedItem = placeholder;
            },
            (_, immer_reverse) => {
              dispatch(modifyTransfer({ in_player_id, out_player_id, immer_reverse }));
            },
          ),
        );
      }
    },
    [players],
  );

  const Pitch = () => {
    return (
      <div className={styles['team-container']}>
        {/* Goalkeepers */}
        <div className={styles.team}>
          {players.map(({ accept, lastDroppedItem }: PlayerDroppable, index) => {
            if (accept === PlayerTypes.GOALKEEPER) {
              return (
                <PlayerSelectionDroppable
                  index={index}
                  key={`team-player-${index}`}
                  accept={accept}
                  lastDroppedItem={lastDroppedItem}
                  onDrop={(item: PlayerDraggableProps) => handleDrop(index, item)}
                  isGameweek={false}
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
        <div className={styles.team}>
          {players.map(({ accept, lastDroppedItem }: PlayerDroppable, index) => {
            if (accept === PlayerTypes.DEFENDER) {
              return (
                <PlayerSelectionDroppable
                  index={index}
                  key={`team-player-${index}`}
                  accept={accept}
                  lastDroppedItem={lastDroppedItem}
                  onDrop={(item: PlayerDraggableProps) => handleDrop(index, item)}
                  isGameweek={false}
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
        <div className={styles.team}>
          {players.map(({ accept, lastDroppedItem }: PlayerDroppable, index) => {
            if (accept === PlayerTypes.MIDDLEFIELDER) {
              return (
                <PlayerSelectionDroppable
                  index={index}
                  key={`team-player-${index}`}
                  accept={accept}
                  lastDroppedItem={lastDroppedItem}
                  onDrop={(item: PlayerDraggableProps) => handleDrop(index, item)}
                  isGameweek={false}
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
        <div className={styles.team}>
          {players.map(({ accept, lastDroppedItem }: PlayerDroppable, index) => {
            if (accept === PlayerTypes.FORWARD) {
              return (
                <PlayerSelectionDroppable
                  index={index}
                  key={`team-player-${index}`}
                  accept={accept}
                  lastDroppedItem={lastDroppedItem}
                  onDrop={(item: PlayerDraggableProps) => handleDrop(index, item)}
                  isGameweek={false}
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
      </div>
    );
  };

  const ViewToggles = () => (
    <div className='flex justify-center mb-4'>
      <form className={styles['form-team']}>
        <label
          className={`${styles['team-selection-radio']} ${
            view === 'pitch' ? styles['is-active'] : ''
          }`}
          onClick={() => setView('pitch')}
        >
          <input className='hidden' type='radio' value='option2' />
          {t('TransfersTeamSelection.switch.pitch')}
        </label>

        <label
          className={`${styles['team-selection-radio']} ${
            view === 'list' ? styles['is-active'] : ''
          }`}
          onClick={() => setView('list')}
        >
          <input className='hidden' type='radio' value='option3' />
          {t('TransfersTeamSelection.switch.list')}
        </label>
      </form>
    </div>
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={cn(styles['team-select-wrapper'], 'rounded bg-secondary')}>
        <ViewToggles />
        {players ? (
          <React.Fragment>
            {view === 'list' && (
              <div className='w-full'>
                <TransfersTeamList
                  players={players}
                  onOpenInfo={(a, b) => {
                    console.log('dialog');
                  }}
                />
                {/* <TeamList
                  starters={players}
                  isGameweek={false}
                  onOpen={onOpen}
                  captainId={captainId}
                  viceCaptainId={viceCaptainId}
                /> */}
              </div>
            )}
            {view === 'pitch' && <Pitch />}
          </React.Fragment>
        ) : (
          <Spinner />
        )}
        <div className='w-full flex justify-center mt-4 relative'>
          <button
            className={cn(
              'rounded px-12 py-2 font-bold text-white',
              canSubmit
                ? 'bg-green-600 opacity-100'
                : 'bg-gray-600 opacity-50 cursor-not-allowed',
            )}
            disabled={!canSubmit}
            onClick={onSubmit}
          >
            {t('TransfersTeamSelection.submit')} ({transfersLength})
          </button>
        </div>
      </div>
    </DndProvider>
  );
};
export default TransfersTeamSelection;
