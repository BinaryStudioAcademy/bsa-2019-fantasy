import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { Link } from 'react-router-dom';
import { Option } from 'react-dropdown';

import { RootState } from 'store/types';
import { fetchPlayers } from './actions';
import Dropdown from 'components/Dropdown';
import PlayerHighlight from 'components/PlayerHighlight';
import SearchBar from 'components/SearchBar';
import PlayerDialog from 'components/PlayerDialog';

import './styles.scss';

type Props = {
  players: any;
  fetchPlayers: typeof fetchPlayers;
};

class PlayersPage extends React.Component<Props> {
  state = {
    players: [],
    filters: [],
    activePlayerId: '',
  };

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
    {
      name: 'Player selection',
      options: ['Lionel Messi', 'Mario Balotelli', 'Christiano Ronaldo'],
      onChange: this.onFilterChange,
      render: this.renderColumn,
    },
    {
      name: 'SortBy',
      options: ['Total score', 'Last rank'],
      onChange: this.onFilterChange,
      render: this.renderColumn,
    },
    {
      name: 'Price',
      options: ['High to low', 'Low to high'],
      onChange: this.onFilterChange,
      render: this.renderColumn,
    },
    {
      name: 'Club',
      options: ['Arsenal', 'Manchester United', 'Chelsea'],
      onChange: this.onFilterChange,
      render: this.renderColumn,
    },
  ];

  componentDidMount() {
    this.props.fetchPlayers('123');
  }

  render() {
    return (
      <>
        <PlayerHighlight />

        <section className='allStats my-6'>
          <div className='filters text-sm flex my-6'>
            {this.dropdownFilters.map(({ name, options, onChange }, index) => (
              <div className='w-1/4 flex justify-between' key={name}>
                <Dropdown {...{ placeholder: name, options, onChange }} />
                {index === 3 && <SearchBar />}
              </div>
            ))}
          </div>
          <div className='columnsWrapper flex bg-white shadow-figma rounded my-4'>
            {this.dropdownFilters.map((item) => item.render())}
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
  players: rootState.test.testRes,
});

const actions = {
  fetchPlayers,
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(PlayersPage);
