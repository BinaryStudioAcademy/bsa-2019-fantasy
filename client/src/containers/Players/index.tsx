import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { Link } from 'react-router-dom';
import { Option } from 'react-dropdown';
import ReactTable from 'react-table';

import { RootState } from 'store/types';
import { Player } from 'types/player.types';
import { fetchPlayers } from './actions';
import Dropdown from 'components/Dropdown';
import PlayerHighlight from 'components/PlayerHighlight';
import SearchBar from 'components/SearchBar';
import PlayerDialog from 'components/PlayerDialog';

import './styles.scss';

type Props = {
  players: [Player?];
  loading: boolean;
  error: string | null;
  fetchPlayers: typeof fetchPlayers;
};

type State = {
  filters: any;
};

class PlayersPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      filters: {
        sortBy: 'price',
        sortDirection: 'DESC',
      },
    };
  }

  filtersData = [
    {
      name: 'Sort by',
      options: ['player_price', 'first_name', 'second_name'],
      onChange: (value: any) => this.setState({ filters: { sortBy: value } }),
    },
    {
      name: 'Sort order',
      options: ['ASC', 'DESC'],
      onChange: (value: any) => this.setState({ filters: { sortDirection: value } }),
    },
  ];
  allPlayers = [
    {
      id: 'id1',
      shirt: '/images/uniforms/field-players/shirt_1-66.png',
      name: 'Lionel Messi',
    },
    {
      id: 'id2',
      shirt: '/images/uniforms/field-players/shirt_3-66.png',
      name: 'Mario Balotelli',
    },
    {
      id: 'id3',
      shirt: '/images/uniforms/field-players/shirt_4-66.png',
      name: 'Zlatan Ibrahimovic',
    },
    {
      id: 'id4',
      shirt: '/images/uniforms/field-players/shirt_1-66.png',
      name: 'Lionelo Messi',
    },
    {
      id: 'id5',
      shirt: '/images/uniforms/field-players/shirt_3-66.png',
      name: 'Mariotto Balotelli',
    },
    {
      id: 'id6',
      shirt: '/images/uniforms/field-players/shirt_4-66.png',
      name: 'Zlatanus Ibrahimovic',
    },
  ];

<<<<<<< HEAD
  readonly columns = [
    {
      Header: 'img',
      accessor: 'club_id',
      //Cell: (props: any) => <img className='w-5 mr-4' src={props.value} alt='Shirt' />, // Custom cell components!
    },
    {
      Header: 'First Name',
      accessor: 'first_name',
      Cell: (props: any) => (
        <Link className='mr-4 font-semibold' to='#'>
          {props.value}
        </Link>
      ),
    },
    {
      Header: 'Last Name',
      accessor: 'second_name',
      Cell: (props: any) => (
        <Link className='mr-4 font-semibold' to='#'>
          {props.value}
        </Link>
      ),
    },
=======
  onFilterChange = (opt: Option) => console.log(opt);

  showModal = (id: string) => this.setState({ activePlayerId: id });
  onModalDismiss = () => this.setState({ activePlayerId: '' });

  renderColumn = () => (
    <div className='columnByScore w-1/4 p-6'>
      <div className='column-header mb-4 font-semibold text-xs text-secondary2'>
        All Players
      </div>
      {this.allPlayers.map((player) => (
        <div className='item flex items-center my-3' key={player.name}>
          <img className='w-5 mr-4' src={player.shirt} alt='Shirt' />
          <Link className='mr-4 font-semibold' to='#'>
            {player.name}
          </Link>
          <button
            onClick={() => this.setState({ activePlayerId: player.id })}
            className='w-4 h-4 justify-center leading-none flex ml-auto bg-background rounded-full text-xs font-semibold'
          >
            i
          </button>
        </div>
      ))}
    </div>
  );

  dropdownFilters = [
>>>>>>> dev
    {
      Header: 'Price',
      accessor: 'player_price',
    },
    {
      Header: 'Score',
      accessor: 'player_score',
    },
    {
      Header: 'Position',
      accessor: 'position',
    },
    {
      Header: 'Info',
      //accessor: 'name',
      Cell: () => (
        <button className='w-4 h-4 justify-center leading-none flex ml-auto bg-background rounded-full text-xs font-semibold'>
          i
        </button>
      ),
    },
  ];

  onFilterChange = (opt: Option) => console.log(opt);

  onFetchData = (state: any, instance: any) => {};

  componentDidMount() {
    const req = { order_field: 'player_price', order_direction: 'DESC', limit: '10' };
    this.props.fetchPlayers(req);
  }

  componentDidUpdate() {
    console.log('componentDidUpdate');
    console.log(this.props.players);
  }

  renderTable() {
    if (this.props.players.length < 1) return 'spinner';
    console.log(this.props.players);
    const playerTableData = this.props.players.map((player) => {
      if (!player) return;
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
        // pages={this.state.pages} // should default to -1 (which means we don't know how many pages we have)
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
            {this.filtersData.map(({ name, options, onChange }, index) => (
              <div className='filter' key={name}>
                <Dropdown {...{ placeholder: name, options, onChange }} />
              </div>
            ))}
            <SearchBar />
          </div>
<<<<<<< HEAD
          <div className='bg-white shadow rounded my-4 p-6'>
            <div className='column-header mb-4 font-semibold text-xs text-secondary2'>
              All Players
            </div>
            {this.renderTable()}
=======
          <div className='columnsWrapper flex bg-white shadow-figma rounded my-4'>
            {this.dropdownFilters.map((item) => item.render())}
>>>>>>> dev
          </div>
          {this.state.activePlayerId !== '' ? (
            <PlayerDialog
              id={this.state.activePlayerId}
              onDismiss={this.onModalDismiss}
            />
          ) : null}
        </section>
      </>
    );
  }
}

const mapStateToProps = (rootState: RootState) => ({
  players: rootState.players.players,
  loading: rootState.players.loading,
  error: rootState.players.error,
  /*clubs: rootState.clubs,*/
});

const actions = {
  fetchPlayers,
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PlayersPage);
