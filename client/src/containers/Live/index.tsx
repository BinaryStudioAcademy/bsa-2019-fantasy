import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import socketIOClient from 'socket.io-client';
import moment from 'moment';

import Modal from 'containers/Modal';
import Dropdown from 'react-dropdown';
import Button from 'components/Button';

import { loadCurrentGame } from './actions';

import { RootState } from 'store/types';
import { Club } from 'types/club.type';

import field from 'assets/images/field.svg';
import { Game } from 'types/game.types';
import 'react-dropdown/style.css';

type Props = {
  loadCurrentGame: typeof loadCurrentGame;
  clubs: Club[];
  currentGame: Game;
};
type State = {
  isModalActive: boolean;
  isSimulating: boolean;
  matchStarted: boolean;
  events: any[];
  homeClub: Club | undefined;
  awayClub: Club | undefined;
  timeout: number;
  score: number[];
};
type RenderFixture = {
  homeClub: Club;
  awayClub: Club;
  score?: number[];
  start?: string;
};

const endpoint = 'http://localhost:5004';
const timeoutOptions = [1, 2, 5, 10, 15].map((item) => ({
  label: `${item} min`,
  value: String(item),
}));

class Live extends React.Component<Props, State> {
  // static defaultProps = {
  //   testRes: 'not received yet',
  // };
  socket: any;

  constructor(props: Props) {
    super(props);
    this.state = {
      isModalActive: false,
      isSimulating: false,
      matchStarted: false,
      events: [],
      homeClub: undefined,
      awayClub: undefined,
      timeout: 5,
      score: [0, 0],
    };
  }

  componentDidMount() {
    this.socket = socketIOClient(endpoint);
    this.socket.on('event', this.handleSocketEvent);
    this.props.loadCurrentGame();
  }

  handleSocketEvent = (event) => {
    const newState = { ...this.state };
    newState.events = [...newState.events, event];

    switch (event.name) {
      case 'goal':
        newState.score = event.score;
        break;
      case 'start-game':
        newState.matchStarted = true;
    }

    this.setState(newState);
  };

  simulate = () => {
    this.onModalDismiss();
    this.setState({ isSimulating: true });
    const { homeClub, awayClub, timeout } = this.state;
    this.socket.emit('simulate', {
      homeClub: homeClub!.id,
      awayClub: awayClub!.id,
      timeout,
    });
  };

  stopSimulation = () => {
    this.socket.emit('stop-simulation', {});
    this.setState({ isSimulating: false });
  };

  showModal = () => {
    this.setState({ isModalActive: true });
  };

  onModalDismiss = () => {
    this.setState({ isModalActive: false });
  };

  getClubById = (id) => {
    return this.props.clubs.find((club) => club.id === Number(id));
  };

  renderEvent(event) {
    console.log(event);
    const { homeClub, awayClub } = this.state;
    switch (event.name) {
      case 'start-game':
        return (
          <>
            The match {homeClub && homeClub.name} - {awayClub && awayClub.name} started.
          </>
        );
      case 'start-time':
        return <>Time {event.time} started.</>;
      case 'end-time':
        return <>Time {event.time} ended with score .</>;
      default:
        return <>{event.text}</>;
    }
  }

  renderScore = (score) => (
    <div className='flex'>
      <p className='home-score score text-white font-bold bg-green-900'>{score[0]}</p>
      <p className='away-score score text-white font-bold bg-green-900'>{score[1]}</p>
    </div>
  );

  renderStartTime = (start) => (
    <p className='font-bold text-white'>{moment(start).format('HH:mm')}</p>
  );

  renderFixture = ({ homeClub, awayClub, score, start }: RenderFixture) => {
    if (homeClub && awayClub) {
      return (
        <div className='flex items-center p-3'>
          <div className='first-team team justify-end'>
            <img
              className='logo order-1'
              src={`images/club-logos/badge_${homeClub.code}_200.png`}
              alt='logo home'
            />
            <h5 className='font-bold'>{homeClub.name}</h5>
          </div>
          <div className='time p-3 py-2 rounded mx-2 play-time bg-green-900'>
            {this.state.matchStarted
              ? this.renderScore(score)
              : this.renderStartTime(start)}
          </div>
          <div className='text-left team'>
            <img
              className='logo'
              src={`images/club-logos/badge_${awayClub.code}_200.png`}
              alt='logo'
            />
            <h5 className='font-bold'>{awayClub.name}</h5>
          </div>
        </div>
      );
    }
  };

  renderFixtureLive = () => {
    const { homeClub, awayClub, score } = this.state;
    if (homeClub && awayClub) {
      return this.renderFixture({ homeClub, awayClub, score });
    }
  };

  renderFixtureNext = () => {
    if (!this.props.currentGame) return 'loading';
    const {
      hometeam_id,
      awayteam_id,
      hometeam_score,
      awayteam_score,
    } = this.props.currentGame;
    console.log(this.props);
    const homeClub = this.getClubById(hometeam_id);
    const awayClub = this.getClubById(awayteam_id);
    const score = [hometeam_score, awayteam_score];
    if (homeClub && awayClub) return this.renderFixture({ homeClub, awayClub, score });
  };

  renderModal = () => {
    const options = this.props.clubs.map(({ name, id }) => {
      return { label: name, value: String(id) };
    });
    const { homeClub, awayClub, timeout } = this.state;

    return (
      <Modal onDismiss={this.onModalDismiss}>
        <div className='p-4'>
          <h3 className='font-bold text-2xl mb-4'>Select clubs</h3>
          <div className='flex -mx-4 mb-8'>
            <div className='w-1/3 px-2'>
              <label className='font-semibold text-l'>Home club</label>
              <Dropdown
                options={options}
                value={homeClub && String(homeClub.id)}
                className='w-40'
                onChange={({ value }) =>
                  this.setState({ homeClub: this.getClubById(value) })
                }
              ></Dropdown>
            </div>
            <div className='w-1/3 px-2'>
              <label className='font-semibold text-l'>Away club</label>
              <Dropdown
                options={options}
                value={awayClub && String(awayClub.id)}
                className='w-40'
                onChange={({ value }) =>
                  this.setState({ awayClub: this.getClubById(value) })
                }
              ></Dropdown>
            </div>
            <div className='w-1/3 px-2'>
              <label className='font-semibold text-l'>Timeout</label>
              <Dropdown
                options={timeoutOptions}
                value={String(timeout)}
                className='w-40'
                onChange={({ value }) => this.setState({ timeout: Number(value) })}
              ></Dropdown>
            </div>
          </div>
          <div className=''>
            <Button className='mr-4 text-sm' styling='primary' onClick={this.simulate}>
              Start simulation
            </Button>
            <Button className='text-sm' styling='secondary' onClick={this.onModalDismiss}>
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    );
  };

  render() {
    const { isSimulating, isModalActive, events } = this.state;
    return (
      <div className='bg-white shadow-figma rounded-sm p-12'>
        <h2
          className='playerName font-bold text-3xl xl:text-5xl mt-4 leading-none'
          style={{ maxHeight: '2em', width: '400px' }}
        >
          Live page
        </h2>
        <div className='flex'>
          <div className='w-1/2 h-64 overflow-auto'>
            {events.map((event) => (
              <div>{this.renderEvent(event)}</div>
            ))}
          </div>
          <div className='w-1/2 h-64'>
            {isSimulating ? this.renderFixtureLive() : this.renderFixtureNext()}
            <img className='h-64' src={field} alt='Football field' />
          </div>
        </div>
        {isSimulating ? (
          <Button onClick={this.stopSimulation} className='bg-red'>
            Stop simulation
          </Button>
        ) : (
          <Button onClick={this.showModal}>Simulate</Button>
        )}
        {isModalActive && this.renderModal()}
      </div>
    );
  }
}

const mapStateToProps = (rootState: RootState) => ({
  clubs: rootState.clubs.clubs,
  currentGame: rootState.currentGame.next,
});

const actions = {
  loadCurrentGame,
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Live);
