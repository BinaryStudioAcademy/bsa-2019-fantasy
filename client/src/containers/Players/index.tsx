import React, { SyntheticEvent } from 'react';
import { connect } from 'react-redux';
import { withTranslation } from 'react-i18next';
import { bindActionCreators, Dispatch } from 'redux';
import { Link, Redirect } from 'react-router-dom';
import ReactTable from 'react-table';

import { RootState } from 'store/types';
import { PlayerType } from 'types/player.types';
import {
  fetchPlayers,
  fetchDataForPlayer,
  resetPlayerDialogData,
  PlayerDataType,
} from './actions';
import PlayerHighlight from 'components/PlayerHighlight';
import SearchBar from 'components/SearchBar';
import PlayerDialog from 'components/PlayerDialog';
import { getClubLogoUrl } from 'helpers/images';
import { Club } from 'types/club.type';

import { FaPlus, FaTimes } from 'react-icons/fa';

type Props = {
  players: PlayerType[];
  loading: boolean;
  error: string | null;
  fetchPlayers: typeof fetchPlayers;
  clubs: Club[];
  fetchDataForPlayer: typeof fetchDataForPlayer;
  dialogLoading: boolean;
  resetPlayerDialogData: typeof resetPlayerDialogData;
  playerData: PlayerDataType;
  t: any;
};

type State = {
  playerHighlightData: any;
  comparisonData: any;
  currentPlayer?: PlayerType;
  searchBarText: string;
  redirect: boolean;
};

class PlayersPage extends React.Component<Props, State> {
  state: State = {
    playerHighlightData: {},
    comparisonData: [],
    searchBarText: '',
    redirect: false,
  };
  table: any;

  constructor(props: Props) {
    super(props);
    this.table = React.createRef();
    this.onFetchData = this.onFetchData.bind(this);
  }

  onFetchData = async ({ page, pageSize, sorted }: any) => {
    const defaultSort = { order_field: 'player_price', order_direction: 'DESC' };
    const sort = sorted[0]
      ? { order_field: sorted[0].id, order_direction: sorted[0].desc ? 'DESC' : 'ASC' }
      : defaultSort;
    await this.props.fetchPlayers({
      offset: page * pageSize,
      limit: pageSize,
      search: this.state.searchBarText,
      ...sort,
    });
    if (Object.keys(this.state.playerHighlightData).length === 0) {
      const playerOfTheWeek = this.props.players[0] && this.props.players[0].id;
      playerOfTheWeek && this.setPlayerHighlight(playerOfTheWeek);
    }
  };

  onComparisonAdd = async (props: any) => {
    if (props.original) {
      const player = this.props.players.find(
        (player) => player && props.original.id === player.id,
      );

      if (this.state.comparisonData.length) {
        const playerIndex = this.state.comparisonData.findIndex(
          (player: any) => player && props.original.id === player.id,
        );

        if (this.state.comparisonData.length == 2 && playerIndex === -1) {
          return;
        }

        if (playerIndex !== -1) {
          const preparedHighlightsArray = [...this.state.comparisonData];
          preparedHighlightsArray.splice(playerIndex, 1);
          /* eslint-disable */
          this.setState({
            ...this.state,
            comparisonData: [...preparedHighlightsArray],
          });

          return;
        }
      }

      await this.props.fetchDataForPlayer(props.original.id, props.original.club_id);
      player!.gameweeks_stats = this.props.playerData.history;

      this.setState({
        ...this.state,
        comparisonData: [...this.state.comparisonData, player],
      });
    }
  };

  onComparisonRedirect = () => {
    this.setState({ ...this.state, redirect: true });
  };

  componentDidMount = () => {
    document.title = 'Players | Fantasy Football League';
  };

  onModalDismiss = () => {
    this.props.resetPlayerDialogData();
    this.setState({ currentPlayer: undefined });
  };

  setPlayerHighlight = (id: string) => {
    const player = this.props.players.find((player) => player && player.id === id);
    this.setState({
      playerHighlightData: player,
    });
    const scrollElement = document.querySelector('#root>.flex>.flex-1');
    scrollElement && scrollElement.scrollTo({ top: 0, behavior: 'smooth' });
  };

  getClubById = (id: number) => {
    return this.props.clubs.find((club: Club | undefined) => club && club.id === id);
  };

  getClubNameById = (club_id: number) => {
    const club = this.getClubById(club_id);
    return (club && club.name) || undefined;
  };

  getClubImageById = (id: number) => {
    const club = this.getClubById(id);
    const url = club && club.code && getClubLogoUrl(club.code, 80);
    return url || '';
  };

  onSearchChange = (e: React.FormEvent<HTMLInputElement>) => {
    this.setState({ searchBarText: e.currentTarget.value }, () =>
      this.onFetchData({ ...this.table.current.state, page: 0 }),
    );
  };
  /* eslint-enable */
  readonly columns = [
    {
      Header: () => this.renderHeader(this.props.t('Players.clubLogo')),
      accessor: 'club_id',
      className: 'flex justify-center bg-white rounded-l',
      style: { marginLeft: '5px' },
      Cell: (props: any) => this.renderClubImageCell(props),
    },
    {
      Header: () => this.renderHeader(this.props.t('Players.name')),
      accessor: 'first_name',
      className: 'flex items-center bg-white',
      Cell: (props: any) => this.renderNameCell(props),
    },
    {
      Header: () => this.renderHeader(this.props.t('Players.price')),
      accessor: 'player_price',
      className: 'flex items-center bg-white',
    },
    {
      Header: () => this.renderHeader(this.props.t('Players.score')),
      accessor: 'player_score',
      className: 'flex items-center bg-white',
    },
    {
      Header: () => this.renderHeader(this.props.t('Players.position')),
      accessor: 'position',
      className: 'flex items-center bg-white',
    },
    {
      Header: () => this.renderHeader(this.props.t('Players.club')),
      accessor: 'club_id',
      className: 'flex items-center bg-white',
      Cell: (props: any) => this.renderClubCell(props),
    },
    {
      Header: () => this.renderHeader(this.props.t('Players.info')),
      className: 'flex items-center justify-end bg-white rounded-r',
      Cell: (props: any) => this.renderComparisonCell(props),
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

  renderClubImageCell = (props: any) => (
    <div className='rounded-full shadow-figma p-1 bg-white w-10'>
      <img className='w-full' src={this.getClubImageById(props.value)} alt='Club logo' />
    </div>
  );

  renderComparisonCell = (props: any) => {
    const addedToComparison = this.state.comparisonData.find(
      (player: any) => player.id === props.original.id,
    );
    return (
      <>
        <button
          className='w-6 h-6 justify-center mr-4 leading-none flex bg-background rounded-full'
          onClick={() => this.onComparisonAdd(props)}
        >
          {addedToComparison ? <FaTimes /> : <FaPlus />}
        </button>
        <button
          className='w-6 h-6 justify-center mr-4 leading-none flex bg-background rounded-full text-s font-bold'
          onClick={() => {
            this.setState({
              currentPlayer: this.props.players.find(
                (p: any) => p && props.original.id === p.id,
              ),
            });
            this.props.fetchDataForPlayer(props.original.id, props.original.club_id);
          }}
        >
          i
        </button>
      </>
    );
  };

  renderNameCell = (props) => (
    <div
      className='mr-4 font-semibold hover:text-secondary2 cursor-pointer'
      role='presentation'
      onClick={() => this.setPlayerHighlight(props.original.id)}
    >
      {props.original.first_name} {props.original.second_name}
    </div>
  );

  renderClubCell = (props) => (
    <Link className='mr-4 font-semibold' to='#'>
      {this.getClubNameById(props.value)}
    </Link>
  );

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
        ref={this.table as any}
        style={this.tableStyle}
        data={playerTableData}
        pageSize={playerTableData.length > 10 ? playerTableData.length : 10}
        pages={10} // should default to -1 (which means we don't know how many pages we have)
        manual
        columns={this.columns}
        onFetchData={this.onFetchData}
      />
    );
  }

  render() {
    if (this.props.loading) return 'spinner';
    const { t } = this.props;

    return (
      <>
        {this.state.redirect && (
          <Redirect
            to={{
              pathname: '/players-comparison',
              state: {
                comparisonData: this.state.comparisonData,
              },
            }}
          />
        )}
        <PlayerHighlight player={this.state.playerHighlightData} />

        <section className='allStats my-6'>
          <div className='filters text-sm flex mt-6 mb-1'>
            <div className='font-semibold'>
              {this.state.comparisonData.length === 2 ? (
                <button
                  className='bg-yellow-400 text-white font-bold py-2 px-4 rounded'
                  onClick={() => this.onComparisonRedirect()}
                >
                  {t('Players.compare')}
                </button>
              ) : (
                <button className='bg-primary text-white font-bold py-2 px-4 rounded opacity-50 cursor-not-allowed'>
                  {t('Players.compareQueue')}: {this.state.comparisonData.length} (
                  {t('Players.need')} 2)
                </button>
              )}
            </div>
            <div className='ml-auto'>
              <SearchBar
                onChange={this.onSearchChange}
                value={this.state.searchBarText}
              />
            </div>
          </div>
          {this.renderTable()}

          {this.state.currentPlayer && (
            <PlayerDialog
              playerDialogData={this.props.playerData}
              onDismiss={this.onModalDismiss}
              loading={this.props.dialogLoading}
              player={this.state.currentPlayer}
              clubName={this.getClubNameById(this.state.currentPlayer.club_id)}
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
  playerData: rootState.players.playerData,
  dialogLoading: rootState.players.dialogLoading,
});

const actions = {
  fetchPlayers,
  fetchDataForPlayer,
  resetPlayerDialogData,
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actions, dispatch);
/* eslint-disable */
export default withTranslation()(
  // @ts-ignore
  connect(
    mapStateToProps,
    mapDispatchToProps,
  )(PlayersPage),
);
