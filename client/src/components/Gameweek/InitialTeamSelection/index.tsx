import React, { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import HTML5Backend from 'react-dnd-html5-backend';
import { DndProvider } from 'react-dnd';
import update from 'immutability-helper';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';

import { updateUserTeamDetails } from 'containers/Profile/actions';
import { loadAutoPickAction } from 'components/PlayersSelection/actions';
import PlayerSelectionDroppable, { PlayerDroppable } from '../PlayerSelectionDroppable';
import { PlayerDraggableProps } from '../PlayerSelection';
import { PlayerTypes } from '../PlayerSelection/types';
import { currentGameweekSelector } from 'store/selectors/current-gameweek.selector';
import Button from 'components/Button';
import SquadSelectionStatus from './components/SquadSelectionStatus';
import SaveTeamModal from './components/SaveTeamModal';
import TeamList from '../TeamList';

import { SQUAD, BUDGET, CLUBS, FULLNAMES } from './helpers';
import { getFieldPlayersUniformUrl, getGoalkeepersUniformUrl } from 'helpers/images';

import styles from './styles.module.scss';
import { RootState } from 'store/types';

type Props = RouteComponentProps;

const InitialTeamSelection = ({ history }: Props) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [view, setView] = useState<'list' | 'pitch'>('pitch');

  // Set squad drag&drop items, which accept only specific player types
  const [squad, setSquad] = useState<PlayerDroppable[]>(SQUAD);

  // Set ids of players on the squad
  const [droppedPlayerSquadIds, setdroppedPlayerSquadIds] = useState<string[]>(
    squad.map((el) => (el.lastDroppedItem.id ? el.lastDroppedItem.id : null)),
  );

  const [moneyRemaing, setMoneyRemaining] = useState<number>(BUDGET);
  const [selectedPlayers, setSelectedPlayers] = useState<number>(0);
  const [isMoreThree, setIsMoreThree] = useState<{ status: boolean; club: string }>({
    status: false,
    club: '',
  });

  useEffect(() => {
    dispatch(loadAutoPickAction());
  }, []);

  const autoPick = useSelector((state: RootState) => state.playerSelection.autoPick);
  const clubs = useSelector((state: RootState) => state.clubs.clubs);
  const currentGameweek = useSelector(currentGameweekSelector);

  const handleSaveTeam = (ev: React.SyntheticEvent) => {
    ev.preventDefault();
    const teamName = ev.target[0].value;
    const teamMemberData = droppedPlayerSquadIds.map((id, i) => ({
      player_id: id,
      is_on_bench: i % 4 === 0,
      is_captain: i === 1,
      is_vice_captain: i === 2,
    }));
    const gameweek_id = currentGameweek!.id;
    if (!teamName) {
      return;
    }
    try {
      dispatch(
        updateUserTeamDetails(
          { money: moneyRemaing, team_name: teamName },
          teamMemberData,
          gameweek_id,
        ),
      );
      history.push('/');
    } catch (err) {
      console.log(err);
    }
  };

  const recalculateMoney = (squad: PlayerDroppable[]) => {
    let currentTotal = null;
    squad.forEach((el) => {
      if (el.lastDroppedItem.price) {
        currentTotal += el.lastDroppedItem.price;
      }
    });
    return currentTotal;
  };

  const recalculatePlayers = (squad: PlayerDroppable[]) => {
    let currentPlayers = 0;
    squad.forEach((el) => {
      if (el.lastDroppedItem.id) {
        currentPlayers++;
      }
    });
    return currentPlayers;
  };

  const checkIsMoreThree = (squad: PlayerDroppable[]) => {
    Object.keys(CLUBS).forEach(
      (key) =>
        (CLUBS[key] = squad.filter((el) => el.lastDroppedItem.club === key).length),
    );

    const isMoreThanThree = (el) => CLUBS[el] > 3;

    if (Object.keys(CLUBS).some(isMoreThanThree)) {
      const club = FULLNAMES[Object.keys(CLUBS).filter(isMoreThanThree)[0]];
      setIsMoreThree({
        status: true,
        club,
      });
    } else {
      setIsMoreThree({
        status: false,
        club: '',
      });
    }
  };

  const handleResetSquad = () => {
    setSquad(SQUAD);
    setMoneyRemaining(BUDGET);
    setSelectedPlayers(0);
    setdroppedPlayerSquadIds([]);
    setIsMoreThree({ status: false, club: '' });
  };

  const handleAutoPick = useCallback(() => {
    if (autoPick.length) {
      const newAutoPickSquad = autoPick.map((el) => {
        return {
          accept: el.position,
          lastDroppedItem: {
            id: el.id,
            name: el.second_name,
            club: clubs[el.club_id - 1] ? clubs[el.club_id - 1].short_name : '',
            points: el.player_score,
            price: el.player_price,
            type: el.position,
            src:
              el.position === PlayerTypes.GOALKEEPER
                ? getGoalkeepersUniformUrl(clubs[el.club_id - 1].code)
                : getFieldPlayersUniformUrl(clubs[el.club_id - 1].code),
          },
        };
      });
      setSquad(newAutoPickSquad);
      setMoneyRemaining(BUDGET - recalculateMoney(newAutoPickSquad)!);
      setSelectedPlayers(recalculatePlayers(newAutoPickSquad));
      checkIsMoreThree(newAutoPickSquad);
      const squadIds = newAutoPickSquad.map((el) => el.lastDroppedItem.id);
      setdroppedPlayerSquadIds(squadIds);
    }
  }, [clubs, autoPick]);

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

  const Pitch = () => (
    <div className={`${styles['team-container']} relative`}>
      {/* Goalkeeper */}
      <div className={styles.team}>
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
      <div className={styles.team}>
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
      <div className={styles.team}>
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
      <div className={styles.team}>
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
    </div>
  );

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
          {t('Gameweek.pitchView')}
        </label>

        <label
          className={`${styles['team-selection-radio']} ${
            view === 'list' ? styles['is-active'] : ''
          }`}
          onClick={() => setView('list')}
        >
          <input className='hidden' type='radio' value='option3' />
          {t('Gameweek.listView')}
        </label>
      </form>
    </div>
  );

  return (
    <DndProvider backend={HTML5Backend}>
      <SquadSelectionStatus
        money={moneyRemaing}
        players={selectedPlayers}
        isMoreThree={isMoreThree}
        onResetClick={() => handleResetSquad()}
        onAutoPickClick={() => handleAutoPick()}
      />

      <div className={cn(styles['team-select-wrapper'], 'rounded bg-secondary')}>
        <ViewToggles />

        {view === 'list' ? (
          <div className='overflow-auto w-auto'>
            <TeamList starters={squad} />
          </div>
        ) : (
          <Pitch />
        )}

        <div className='w-full flex justify-center mt-3'>
          <Button
            className={`${styles.saveTeam} px-8 py-2 rounded`}
            onClick={() => setIsModalOpen(true)}
            disabled={
              !(moneyRemaing >= 0 && selectedPlayers === 15 && !isMoreThree.status)
            }
            inactive={
              !(moneyRemaing >= 0 && selectedPlayers === 15 && !isMoreThree.status)
            }
          >
            <p>{t('Gameweek.saveTeam')}</p>
          </Button>
        </div>
      </div>

      {isModalOpen && (
        <SaveTeamModal
          onDismiss={() => setIsModalOpen(false)}
          onSubmit={(ev) => handleSaveTeam(ev)}
        />
      )}
    </DndProvider>
  );
};

export default withRouter(InitialTeamSelection);
