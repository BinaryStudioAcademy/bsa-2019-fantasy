import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import TeamSelection from 'components/Gameweek/TeamSelection';
import StatusPlayerModal from 'components/StatusPlayerModal';
import { GameweekHistoryType } from 'types/gameweekHistory.type';

import styles from './styles.module.scss';
import header from 'styles/header.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from 'store/types';

import { fetchGameweeksHistorySuccess } from 'containers/Routing/fetchGameweeks/actions';

const MyTeam = () => {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = 'Home | Fantasy Football League';
  }, []);

  const [showModal, setShowModal] = useState(false);

  const [isCaptain, setIsCaptain] = useState(false);
  const [isViceCaptain, setIsViceCaptain] = useState(false);

  const [currentId, setCurrentId] = useState('');
  const [currentName, setCurrentName] = useState('');

  const [captainId, setCaptainId] = useState('');
  const [viceCaptainId, setViceCaptainId] = useState('');

  const [playerToSwitch, setPlayerToSwitch] = useState<GameweekHistoryType | undefined>(
    undefined,
  );
  const dispatch = useDispatch();
  const players = useSelector((state: RootState) => state.gameweeks.gameweeks_history);

  if (players.length > 0) {
    if (captainId === '') {
      const givenCaptain = players.find((p) => p.is_captain);
      setCaptainId(givenCaptain!.player_stats.id);
    }
    if (viceCaptainId === '') {
      const givenViceCaptain = players.find((p) => p.is_vice_captain);
      setViceCaptainId(givenViceCaptain!.player_stats.id);
    }
  }

  const setCurrentPlayerForSwitching = (id: string) => {
    const player = players.find((p) => p.player_stats.id === id);
    setPlayerToSwitch(player);
  };

  const switchWith = (secondId: string) => {
    const newPlayers = players.map((player) => {
      const {
        player_stats: { id },
      } = player;
      if (id === playerToSwitch!.player_stats.id || id === secondId) {
        return {
          ...player,
          is_on_bench: !player.is_on_bench,
        };
      }
      return player;
    });

    dispatch(fetchGameweeksHistorySuccess(newPlayers));
  };

  const onClose = () => {
    setShowModal(false);
  };

  const onSetCaptain = () => {
    if (currentId === viceCaptainId) {
      setViceCaptainId(captainId);
    }
    setCaptainId(currentId);
    setShowModal(false);
  };

  const onSetViceCaptain = () => {
    if (currentId === captainId) {
      setCaptainId(viceCaptainId);
    }
    setViceCaptainId(currentId);
    setShowModal(false);
  };

  const onOpen = (
    id: string,
    isCaptain: boolean,
    isViceCaptain: boolean,
    name: string,
  ) => {
    setShowModal(true);
    setCurrentId(id);
    setCurrentName(name);
    setIsCaptain(isCaptain);
    setIsViceCaptain(isViceCaptain);
  };

  const canSwitch = !playerToSwitch || playerToSwitch.player_stats.id !== currentId;

  const onSetPlayerForSwitching = () => {
    if (playerToSwitch) {
      switchWith(currentId);
      setCurrentPlayerForSwitching('');
    } else {
      setCurrentPlayerForSwitching(currentId);
    }
    setShowModal(false);
  };

  const onCancelPlayerForSwitching = () => {
    setCurrentPlayerForSwitching('');
    setShowModal(false);
  };

  useEffect(() => {
    document.title = 'My Team | Fantasy Football League';
  }, []);

  return (
    <div className={styles['team-page']}>
      <div
        className={`${header.jumbotron} ${header.paper} mb-12 rounded flex items-end justify-between pt-6`}
      >
        <div className={`${header['jumbotron-content']} mt-16`}>
          <h2 className={`${header.title} text-secondary mb-6`}>
            <div className={`${header.sub} ${header.title} mb-4 flex items-center`}>
              {t('MyTeamPage.title.sub')}
            </div>
            {t('MyTeamPage.title.main')}
          </h2>
        </div>
      </div>
      <div className='p-3'>
        <TeamSelection
          isGameweek={false}
          onOpen={onOpen}
          captainId={captainId}
          viceCaptainId={viceCaptainId}
          playerToSwitch={playerToSwitch}
          setPlayerForSwitching={setCurrentPlayerForSwitching}
          switchWith={switchWith}
        />
      </div>
      {showModal && (
        <StatusPlayerModal
          isCaptain={isCaptain}
          isViceCaptain={isViceCaptain}
          onClose={onClose}
          onSetCaptain={onSetCaptain}
          onSetViceCaptain={onSetViceCaptain}
          name={currentName}
          funcForSwitching={
            canSwitch ? onSetPlayerForSwitching : onCancelPlayerForSwitching
          }
          toSwitch={canSwitch}
        />
      )}
    </div>
  );
};

export default MyTeam;
