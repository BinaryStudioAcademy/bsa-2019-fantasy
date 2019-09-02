import { applyPatches } from 'immer';
import { useTranslation } from 'react-i18next';
import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';

import { RootState } from 'store/types';
import { TransferType } from 'types/transfer.type';
import { usePitchPlayers } from 'components/Pitch/use-pitch-players.hook';
import { removeTransfer, emptyChanges, addTransfer, modifyTransfer } from './actions';
import { PlayerDropHandler } from 'components/TeamSelection/types';

import FixturesContainer from 'containers/FixturesContainer';
import PlayersSelection from 'components/PlayersSelection';
import TransfersModal from './components/TransfersModal';
import TeamSelection from 'components/TeamSelection';

import header from 'styles/header.module.scss';
import { GameweekHistoryType } from 'types/gameweekHistory.type';

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
  const players = useSelector((state: RootState) => state.gameweeks.gameweeks_history);

  const { pitchPlayers, setPitch } = usePitchPlayers(players);

  useEffect(() => {
    if (transfers.length === 0) {
      setShowModal(false);
    }
  }, [transfers.length]);

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
      const in_player_id = player.player_stats.id;
      const out_player_id = target.player_stats.id;

      dispatch(
        isNewPlayer
          ? addTransfer({ in_player_id, out_player_id, immer_reverse })
          : modifyTransfer({ in_player_id, out_player_id, immer_reverse }),
      );
    }
  };

  const undisplayedPlayers = pitchPlayers.filter((p) => p.item).map((p) => p.item);

  return (
    <div>
      <TransfersModal
        transfers={transfers}
        showCondition={showModal}
        onClose={() => setShowModal(false)}
        onTransferDelete={onTransferDelete}
      />

      <div className={`${header.jumbotron} ${header.paper} mb-12 rounded pt-12`}>
        <div className={`${header.sub} ${header.title} mb-4 flex items-center`}>
          {t('Transfers.title.sub')}
        </div>
        <h2 className={`${header.title} text-secondary mb-6`}>
          {t('Transfers.title.main')}
        </h2>
        <div className={`relative ${header['jumbotron-content']} mt-8 flex`}>
          <div className='flex flex-grow flex-col mr-4'>
            <TeamSelection
              players={pitchPlayers}
              setPlayers={setPitch}
              showFixtures={false}
              hasBench={false}
              onPlayerDrop={onPlayerDrop}
              submit={{
                label: `Make Transfers (${transfers.length})`,
                canSubmit: Boolean(transfers.length),
                onSubmit: () => setShowModal(true),
              }}
            />
          </div>
          <PlayersSelection
            undisplayedPlayers={undisplayedPlayers as GameweekHistoryType[]}
          />
        </div>
      </div>
      <FixturesContainer />
    </div>
  );
};

export default Transfers;
