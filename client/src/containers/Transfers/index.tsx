import { applyPatches } from 'immer';
import { useTranslation } from 'react-i18next';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import cn from 'classnames';

import { RootState } from 'store/types';
import { TransferType } from 'types/transfer.type';
import { usePitchPlayers } from 'components/Pitch/use-pitch-players.hook';
import { removeTransfer, emptyChanges, addTransfer, modifyTransfer } from './actions';
import { PlayerDropHandler } from 'components/TeamSelection/types';

import FixturesContainer from 'containers/FixturesContainer';
import PlayersSelection from 'components/PlayersSelection';
import TransfersModal from './components/TransfersModal';
import TopTransfers from '../../components/TopTransfers/index';
import TeamSelection from 'components/TeamSelection';

import header from 'styles/header.module.scss';
import { GameweekHistoryType } from 'types/gameweekHistory.type';
import { feedback } from 'react-feedbacker';

const Transfers = () => {
  useEffect(() => {
    document.title = 'Transfers | Fantasy Football League';
  }, []);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [showModal, setShowModal] = useState(false);

  const { transfers, changes } = useSelector(
    (state: RootState) => state.transfers,
    shallowEqual,
  );
  const user = useSelector((state: RootState) => state.profile.user);
  const players = useSelector((state: RootState) => state.gameweeks.gameweeks_history);

  const { pitchPlayers, setPitch } = usePitchPlayers(players);

  useEffect(() => {
    if (changes.length > 0) {
      setPitch((p) => applyPatches(p, changes));
      dispatch(emptyChanges());
    }
  }, [changes.length]);

  const onTransferDelete = (t: TransferType) => {
    setPitch((p) => applyPatches(p, t.immer_reverse));
    dispatch(removeTransfer(t));
  };

  const onPlayerDrop: PlayerDropHandler = (
    target,
    player,
    immer_reverse,
    isNewPlayer,
  ) => {
    if (target) {
      const newTransfer = {
        in_player_id: player.player_stats.id,
        out_player_id: target.player_stats.id,
        immer_reverse,
      };

      const playerTeamMembersAmount = pitchPlayers.filter(
        ({ item }) => item && item.player_stats.club_id === player.player_stats.club_id,
      ).length;

      if (
        playerTeamMembersAmount < 3 ||
        target.player_stats.club_id === player.player_stats.club_id
      ) {
        dispatch(isNewPlayer ? addTransfer(newTransfer) : modifyTransfer(newTransfer));
      } else {
        return (newPlayers) => {
          feedback.error('You cannot have more than 3 players from the same team!');
          setPitch(applyPatches(newPlayers, immer_reverse));
        };
      }
    }
  };

  const undisplayedPlayers = pitchPlayers.filter((p) => p.item).map((p) => p.item);

  return (
    <div>
      <TransfersModal
        transfers={transfers}
        showCondition={transfers.length > 0 && showModal}
        onClose={() => setShowModal(false)}
        onTransferDelete={onTransferDelete}
      />

      <div className={`${header.jumbotron} ${header.paper} mb-12 rounded pt-12`}>
        <h2 className={`${header.title} text-secondary mb-6`}>
          {t('Transfers.title.main')}
        </h2>
        <div className={`relative ${header['jumbotron-content']} mt-8 flex`}>
          <div className='flex flex-col flex-grow mr-4'>
            <div className='flex-grow'>
              <TeamSelection
                players={pitchPlayers}
                setPlayers={setPitch}
                showFixtures={false}
                hasBench={false}
                onPlayerDrop={onPlayerDrop}
                submit={{
                  label: `${t('TransfersTeamSelection.submit')} (${transfers.length})`,
                  canSubmit: Boolean(transfers.length),
                  onSubmit: () => setShowModal(true),
                }}
              />
            </div>
          </div>
          <PlayersSelection
            undisplayedPlayers={undisplayedPlayers as GameweekHistoryType[]}
          />
        </div>
      </div>
      <FixturesContainer />
      <div className={cn(header.paper, 'px-8', 'py-8', 'rounded', 'mt-4')}>
        <TopTransfers />
      </div>
    </div>
  );
};

export default Transfers;
