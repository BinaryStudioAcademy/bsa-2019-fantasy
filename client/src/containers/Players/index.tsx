import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { Link } from 'react-router-dom';
import { Option } from 'react-dropdown';
import ReactTable from 'react-table';
import { animateScroll as scroll } from 'react-scroll';

// import { ReactTableDefaults } from 'react-table';
// import _ from 'lodash';

import { RootState } from 'store/types';
import { Player } from 'types/player.types';
import { fetchPlayers } from './actions';
import PlayerHighlight from 'components/PlayerHighlight';
import SearchBar from 'components/SearchBar';
import PlayerDialog from 'components/PlayerDialog';
import { getClubLogoUrl } from 'helpers/images';
import { Club } from 'types/club.types';

import './styles.scss';

type Props = {
  players: [Player?];
  loading: boolean;
  error: string | null;
  fetchPlayers: typeof fetchPlayers;
  clubs: [Club?];
};

type State = {
  //filters: any;
  playerDialogData?: string | undefined;
  playerHighlightData: any;
};

class PlayersPage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      playerDialogData: undefined,
      playerHighlightData: {},
    };
  }

  onFetchData = async ({ page, pageSize, sorted }: any) => {
    console.log('data fetch');
    const defaultSort = { order_field: 'player_price', order_direction: 'DESC' };
    const sort = sorted[0]
      ? { order_field: sorted[0].id, order_direction: sorted[0].desc ? 'DESC' : 'ASC' }
      : defaultSort;
    await this.props.fetchPlayers({
      offset: page * pageSize,
      limit: pageSize,
      ...sort,
    });
    if (Object.keys(this.state.playerHighlightData).length === 0) {
      const playerOfTheWeek = this.props.players[0] && this.props.players[0].id;
      playerOfTheWeek && this.setPlayerHighlight(playerOfTheWeek);
    }
  };

  showModal = (id: string) => this.setState({ playerDialogData: id });
  onModalDismiss = () => this.setState({ playerDialogData: undefined });

  setPlayerHighlight = (id: string) => {
    console.log(window);
    const player = this.props.players.find((player) => player && player.id === id);
    this.setState({
      playerHighlightData: player,
    });
    console.log('animate');
    const scrollElement = document.querySelector('#root>.flex>.flex-1');
    scrollElement && scrollElement.scrollTo({ top: 0, behavior: 'smooth' });
  };

  getClubNameById = (club_id: string) => {
    const club = this.props.clubs.find(
      (club: Club | undefined) => club && club.id === club_id,
    );
    return (club && club.name) || undefined;
  };

  readonly columns = [
    {
      accessor: 'club_id',
      width: 70,
      className: 'flex justify-center bg-white rounded-l',
      style: { marginLeft: '5px' },
      Cell: (props: any) => {
        return (
          <div className='rounded-full shadow-figma p-1 bg-white w-10'>
            <img
              className='w-full'
              src={getClubLogoUrl(props.value, '80')}
              alt='Club logo'
            />
          </div>
        );
      },
    },
    {
      Header: () => this.renderHeader('Name'),
      accessor: 'first_name',
      className: 'flex items-center bg-white',

      Cell: (props: any) => (
        <div
          className='mr-4 font-semibold hover:text-secondary2 cursor-pointer'
          role='presentation'
          onClick={() => this.setPlayerHighlight(props.original.id)}
        >
          {props.original.first_name} {props.original.second_name}
        </div>
      ),
    },
    {
      Header: () => this.renderHeader('Price'),
      accessor: 'player_price',
      className: 'flex items-center bg-white',
    },
    {
      Header: () => this.renderHeader('Score'),
      accessor: 'player_score',
      className: 'flex items-center bg-white',
    },
    {
      Header: () => this.renderHeader('Position'),
      accessor: 'position',
      className: 'flex items-center bg-white',
    },
    {
      Header: () => this.renderHeader('Club'),
      accessor: 'club_id',
      className: 'flex items-center bg-white',
      Cell: (props: any) => {
        return (
          <Link className='mr-4 font-semibold' to='#'>
            {this.getClubNameById(props.value)}
          </Link>
        );
      },
    },
    {
      Header: () => this.renderHeader('Info'),
      className: 'flex items-center bg-white rounded-r',
      Cell: (props: any) => (
        <button
          className='w-4 h-4 justify-center leading-none flex ml-auto bg-background rounded-full text-xs font-semibold'
          onClick={() => {
            this.setState({ playerDialogData: props.original.id });
            console.log('props');
            console.log(props);
          }}
        >
          i
        </button>
      ),
    },
  ];

  readonly tableStyle = {
    border: 'none',
    boxShadow: 'none',
  };

  renderHeader = (child: string) => {
    return (
      <div className='bg-white shadow-figma font-semibold text-sm rounded border border-greyBorder relative py-2 px-4'>
        {child}
      </div>
    );
  };

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
        id,
      } = player;
      return {
        first_name,
        second_name,
        player_price,
        player_score,
        position,
        club_id,
        id,
      };
    });
    return (
      <ReactTable
        style={this.tableStyle}
        data={playerTableData}
        pageSize={10}
        pages={10} // should default to -1 (which means we don't know how many pages we have)
        manual
        columns={this.columns}
        //column={this.columnProps}
        onFetchData={this.onFetchData}
      />
    );
  }

  render() {
    if (this.props.loading) return 'spinner';

    return (
      <>
        <PlayerHighlight player={this.state.playerHighlightData} />

        <section className='allStats my-6'>
          <div className='filters text-sm flex mt-6 mb-1'>
            <div className='ml-auto'>
              <SearchBar />
            </div>
          </div>
          {this.renderTable()}

          {this.state.playerDialogData && (
            <PlayerDialog
              id={this.state.playerDialogData}
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
  clubs: rootState.clubs.clubs,
});

const actions = {
  fetchPlayers,
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PlayersPage);
