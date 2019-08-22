import React, { useEffect, useState } from 'react';
import ReactSearchBox from 'react-search-box';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { loadPlayersAction } from '../../components/PlayersSelection/actions';
import { RootState } from 'store/types';
import { PlayerType } from 'types/player.types';
import { sortedBy, filteredBy, maxPrice } from './constants';

import { PlayerList } from '../PlayersList/index';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

type Props = {
  loadPlayersAction: typeof loadPlayersAction;
  players?: PlayerType[];
};

const PlayersSelection = ({ loadPlayersAction, players }: Props) => {
  const { t } = useTranslation();

  const [query, setQuery] = useState({
    limit: 10,
    order_direction: 'DESC',
    order_field: 'player_score',
    position: undefined,
    club_id: undefined,
    search: undefined,
    max_price: undefined,
  });

  const [sortSelect, setSortSelect] = useState({
    value: 'player_score',
    label: 'Total points',
  });
  const [filterSelect, setFilterSelect] = useState({
    value: '',
    label: 'All players',
  });
  const [search, setSearch] = useState({
    value: '',
  });
  const [maxPriceSelect, setMaxPriceSelect] = useState({
    value: '125',
    label: '125',
  });

  useEffect(() => {
    loadPlayersAction({ ...query });
  }, [query]);

  const onSortChange = (item: any) => {
    setSortSelect(item);
    setQuery({ ...query, order_field: item.value });
    loadPlayersAction({ ...query });
  };
  const onFilterSelectChange = (item: any) => {
    setFilterSelect(item);
    setQuery({ ...query, position: undefined, club_id: undefined, ...item.value });
    loadPlayersAction({ ...query });
  };
  const onSearchChange = (item: any) => {
    setSearch(item);
    setQuery({ ...query, search: item });
    loadPlayersAction({ ...query });
  };
  const onMaxPriceChange = (item: any) => {
    setMaxPriceSelect(item);
    setQuery({ ...query, max_price: item.value });
    loadPlayersAction({ ...query });
  };

  return (
    <div className='bg-gray-200 px-4 py-4'>
      <h3 className='font-bold'>{t('Transfers.playerSelection.title')}</h3>
      <form>
        <div className='mt-2'>
          <div className='font-bold'>
            <span>{t('Transfers.playerSelection.view')}</span>
          </div>
          <Dropdown
            options={filteredBy as any}
            onChange={onFilterSelectChange}
            value={filterSelect}
          />
        </div>
        <div className='mt-2'>
          <div className='font-bold'>
            <span>{t('Transfers.playerSelection.sort')}</span>
          </div>
          <Dropdown options={sortedBy} onChange={onSortChange} value={sortSelect} />
        </div>
        <div className='mt-2'>
          <div className='font-bold'>
            <span>{t('Transfers.playerSelection.search')}</span>
          </div>
          <ReactSearchBox onChange={onSearchChange} value={search} />
        </div>
        <div className='mt-2'>
          <div className='font-bold'>
            <span>{t('Transfers.playerSelection.maxCost')}</span>
          </div>
          <br />
          <div>
            <span>{t('Transfers.playerSelection.maxCostBetween')}</span>
          </div>
          <Dropdown
            options={maxPrice}
            onChange={onMaxPriceChange}
            value={maxPriceSelect}
          />
        </div>
      </form>

      <p className='w-full mt-4 text-center'>
        <strong>10</strong> {t('Transfers.playerSelection.shown')}
      </p>

      {players && <PlayerList players={players} />}
    </div>
  );
};

const mapStateToProps = (rootState: RootState) => ({
  players: rootState.playerSelection.players,
});

const actions = { loadPlayersAction };
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PlayersSelection);
