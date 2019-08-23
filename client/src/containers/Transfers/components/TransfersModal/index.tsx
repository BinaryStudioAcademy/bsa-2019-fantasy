import React from 'react';
import cn from 'classnames';
import { FaTimes } from 'react-icons/fa';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from 'store/types';
import { TransferType } from 'types/transfer.type';
import { applyTransfers } from 'containers/Transfers/actions';
import { usePlayers } from 'containers/Transfers/use-players.hook';

import Modal from 'components/Modal';
import Spinner from 'components/Spinner';

type Props = {
  transfers: TransferType[];

  showCondition: boolean;
  onClose: () => void;
  onTransferDelete: (t: TransferType) => void;
};

const TransfersModal = ({
  transfers,
  showCondition,
  onClose,
  onTransferDelete,
}: Props) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const user = useSelector((state: RootState) => state.profile.user);
  const { players, loading } = usePlayers();

  if (!user) return null;

  if (loading) {
    return (
      <Modal showCondition={showCondition} onClose={onClose}>
        <Spinner />
      </Modal>
    );
  }

  const transfersFull = transfers.map((tf) => ({
    ...tf,
    in_player: players.find((p) => p.id === tf.in_player.id)!,
    out_player: players.find((p) => p.id === tf.out_player.id)!,
  }));

  const totalCost = transfers.reduce((prev, t) => prev + t.cost, 0);
  const totalMoneyCost = transfersFull.reduce(
    (prev, t) => prev + t.in_player.player_price,
    0,
  );

  const canSubmit = totalCost <= user.score && totalMoneyCost <= user.money;

  return (
    <Modal className='justify-between' showCondition={showCondition} onClose={onClose}>
      <h2 className='text-5xl text-secondary'>{t('TransfersModal.title')}</h2>
      <span className='mt-6'>
        {t('TransfersModal.statement.a')}{' '}
        <span className='font-bold'>{user.free_transfers}</span>{' '}
        {t('TransfersModal.statement.b')},{' '}
        <span className='font-bold'>{user.score - totalCost}</span> pts{' '}
        {t('TransfersModal.statement.c')} £
        <span className='font-bold'>{user.money - totalMoneyCost}</span>{' '}
        {t('TransfersModal.statement.d')}.
      </span>
      <table className='mt-6'>
        <thead>
          <tr className='border-b-2 border-secondary'>
            <td>{t('TransfersModal.table.in')}</td>
            <td>{t('TransfersModal.table.out')}</td>
            <td>£</td>
            <td>{t('TransfersModal.table.scoreCost')}</td>
          </tr>
        </thead>
        <tbody>
          {transfersFull.map((tf) => (
            <tr
              className={'relative border-b-2 border-gray-400'}
              key={`transfer-in-modal-${tf.id}`}
              role='presentation'
            >
              <td className='truncate'>{`${tf.in_player.first_name} ${tf.in_player.second_name}`}</td>
              <td className='truncate'>{`${tf.out_player.first_name} ${tf.out_player.second_name}`}</td>
              <td className='truncate'>{tf.in_player.player_price}</td>
              <td>
                <span className={cn(tf.cost === 0 && 'text-green-700')}>
                  {tf.cost} pts
                </span>
                <button
                  className='absolute left-0 mt-1 ml-2 text-red-600 opacity-25 hover:opacity-100'
                  onClick={() => onTransferDelete(tf)}
                >
                  <FaTimes title={t('TransfersModal.table.discardTransfer')} />
                </button>
              </td>
            </tr>
          ))}
          <tr
            className={cn(
              (totalCost > user.score || totalMoneyCost > user.money) && 'text-red-500',
              'font-bold',
            )}
          >
            <td />
            <td>{t('TransfersModal.table.total')}:</td>
            <td>{totalMoneyCost}</td>
            <td>{totalCost} pts</td>
          </tr>
        </tbody>
      </table>

      <div>
        <button
          className={cn(
            !canSubmit && 'opacity-75 cursor-not-allowed',
            'mt-8 w-full px-4 py-2 font-bold text-white bg-secondary border-2 border-transparent rounded shadow',
          )}
          onClick={() => dispatch(applyTransfers())}
          disabled={!canSubmit}
        >
          {t('TransfersModal.submit')}
        </button>
        <button
          className='mt-2 -mb-2 w-full px-4 py-2 font-bold text-secondary bg-transparent rounded opacity-75 hover:opacity-100'
          onClick={onClose}
        >
          {t('TransfersModal.cancel')}
        </button>
      </div>
    </Modal>
  );
};

export default TransfersModal;
