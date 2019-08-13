import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { Link } from 'react-router-dom';
import { Option } from 'react-dropdown';
import ReactTable from 'react-table';
import _ from 'lodash';

import { RootState } from 'store/types';
import { Player } from 'types/player.types';
import { fetchPlayers } from './actions';
import Dropdown from 'components/Dropdown';
import PlayerHighlight from 'components/PlayerHighlight';
import SearchBar from 'components/SearchBar';
import PlayerDialog from 'components/PlayerDialog';
import { getClubLogoUrl } from 'helpers/images';

import './styles.scss';

type Props = {
  players: [Player?];
  loading: boolean;
  error: string | null;
  fetchPlayers: typeof fetchPlayers;
  clubs: any;
};

type State = {
  //filters: any;
  activePlayerId?: string | undefined;
};

const CLUB_LOGOS_ROUTE = '/images/club-logos/';

class PlayersPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      activePlayerId: undefined,
    };
  }

  readonly columns = [
    {
      accessor: 'club_id',
      width: 70,

      Cell: (props: any) => {
        return (
          <img className='px-2' src={getClubLogoUrl(props.value, '80')} alt='Shirt' />
        );
      }, // Custom cell components!
    },
    {
      Header: 'Name',
      className: 'flex items-center',
      accessor: 'first_name',
      Cell: (props: any) => (
        <Link className='mr-4 font-semibold' to='#'>
          {props.value} {props.row.second_name}
        </Link>
      ),
    },
    {
      Header: 'Last Name',
      accessor: 'second_name',
      show: false,
    },
    {
      Header: 'Price',
      accessor: 'player_price',
      className: 'flex items-center',
    },
    {
      Header: 'Score',
      accessor: 'player_score',
      className: 'flex items-center',
    },
    {
      Header: 'Position',
      accessor: 'position',
      className: 'flex items-center',
    },
    {
      Header: 'Club',
      accessor: 'club_id',
      className: 'flex items-center',
      Cell: (props: any) => {
        const club = this.props.clubs.clubs.find(({ id }: any) => id == props.value);
        if (club) {
          return (
            <Link className='mr-4 font-semibold' to='#'>
              {club.name}
            </Link>
          );
        }
        return null;
      },
    },
    {
      Header: 'Info',
      //accessor: 'name',
      className: 'flex items-center',
      Cell: () => (
        <button className='w-4 h-4 justify-center leading-none flex ml-auto bg-background rounded-full text-xs font-semibold'>
          i
        </button>
      ),
    },
  ];

  onFilterChange = (opt: Option) => console.log(opt);
  onFetchData = ({ page, pageSize, sorted }: any) => {
    console.log('data fetch');
    const defaultSort = { order_field: 'player_price', order_direction: 'DESC' };
    const sort = sorted[0]
      ? { order_field: sorted[0].id, order_direction: sorted[0].desc ? 'DESC' : 'ASC' }
      : defaultSort;
    this.props.fetchPlayers({
      offset: page * pageSize,
      limit: pageSize,
      ...sort,
    });
    console.log(this.state);
  };

  showModal = (id: string) => this.setState({ activePlayerId: id });
  onModalDismiss = () => this.setState({ activePlayerId: undefined });

  renderTable() {
    //if (!this.props.players.length) return 'spinner';
    const playerTableData = this.props.players.map((player) => {
      if (!player) return {};
      const {
        first_name,
        second_name,
        player_price,
        player_score,
        position,
        club_id,
      } = player;
      return { first_name, second_name, player_price, player_score, position, club_id };
    });
    return (
      <ReactTable
        data={playerTableData}
        pageSize={10}
        pages={10} // should default to -1 (which means we don't know how many pages we have)
        manual
        columns={this.columns}
        onFetchData={this.onFetchData}
      />
    );
  }

  render() {
    if (this.props.loading) return 'spinner';

    return (
      <>
        <PlayerHighlight />

        <section className='allStats my-6'>
          <div className='filters text-sm flex my-6'>
            <SearchBar />
          </div>
          <div className='bg-white shadow rounded my-4 p-6'>
            <div className='column-header mb-4 font-semibold text-secondary2'>
              All Players
            </div>
            {this.renderTable()}
          </div>
          {this.state.activePlayerId && (
            <PlayerDialog
              id={this.state.activePlayerId}
              onDismiss={this.onModalDismiss}
            />
          )}
        </section>
      </>
    );
  }
}

const mapStateToProps = (rootState: RootState) => ({
  players: rootState.players.players,
  loading: rootState.players.loading,
  error: rootState.players.error,
  clubs: rootState.clubs,
});

const actions = {
  fetchPlayers,
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PlayersPage);
