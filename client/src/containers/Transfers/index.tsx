import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { applyPatches } from 'immer';

import { RootState } from 'store/types';
import { TransferType } from 'types/transfer.type';
import { removeTransfer, emptyChanges } from './actions';
import { usePitchPlayers } from './use-pitch.hook';

import FixturesContainer from 'containers/FixturesContainer';
import PlayersSelection from 'components/PlayersSelection';
import TransfersModal from './components/TransfersModal';
import TransfersTeamSelection from './components/TransfersTeamSelection';

import header from 'styles/header.module.scss';

const Transfers = () => {
  useEffect(() => {
    document.title = 'Transfers | Fantasy Football League';
  }, []);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [showModal, setShowModal] = useState(false);

  const { transfers, changes } = useSelector((state: RootState) => state.transfers);
  const { pitchPlayers, setPitch } = usePitchPlayers();

  useEffect(() => {
    if (transfers.length === 0) {
      setShowModal(false);
    }
  }, [transfers.length]);

  useEffect(() => {
    setPitch((p) => applyPatches(p, changes));
    dispatch(emptyChanges());
  }, [changes.length]);

  const onTransferDelete = (t: TransferType) => {
    setPitch((p) => applyPatches(p, t.immer_reverse));
    dispatch(removeTransfer(t));
  };

  return (
    <div className='transfers-page'>
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
        <div className={`${header['jumbotron-content']} mt-8 flex`}>
          <div className='flex flex-grow flex-col mr-4'>
            <TransfersTeamSelection
              players={pitchPlayers}
              setPlayers={setPitch}
              canSubmit={!!transfers.length}
              onSubmit={() => setShowModal(true)}
            />
          </div>
          <PlayersSelection />
        </div>
      </div>
      <FixturesContainer />
    </div>
  );
};

export default Transfers;
