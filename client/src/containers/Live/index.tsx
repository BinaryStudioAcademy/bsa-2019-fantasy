import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import socketIOClient from 'socket.io-client';

import Modal from 'containers/Modal';
import Dropdown from 'react-dropdown';
import Button from 'components/Button';
import { loadGameweeksAction, loadGamesAction } from '../FixturesContainer/actions';

import { RootState } from 'store/types';
import { Club } from 'types/club.type';

import field from 'assets/images/field.svg';
import 'react-dropdown/style.css';

type Props = {
  testRes: string;
  loadGameweeksAction: typeof loadGameweeksAction;
  loadGamesAction: typeof loadGamesAction;
  clubs: Club[];
};

const endpoint = 'http://localhost:5004';
const timeoutOptions = [1, 2, 5, 10, 15].map((item) => ({
  label: `${item} min`,
  value: String(item),
}));

class Live extends React.Component<Props> {
  static defaultProps = {
    testRes: 'not received yet',
  };
  socket: any;
  homeClub?: Club;
  awayClub?: Club;

  state = {
    isModalActive: false,
    isSimulating: false,
    matchStarted: false,
    events: [],
    homeClubId: 2,
    awayClubId: 3,
    timeout: 5,
    score: [0, 0],
  };

  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    this.socket = socketIOClient(endpoint);
    this.socket.on('event', this.handleSocketEvent);
  }

  handleSocketEvent = (event) => {
    const events = [...this.state.events, event];
    const update: { score?: [number, number]; matchStarted?: boolean } = {};

    switch (event.name) {
      case 'goal':
        update.score = event.score;
        break;
      case 'start-game':
        update.matchStarted = true;
    }

    this.setState({ events, ...update });
  };

  simulate = () => {
    this.onModalDismiss();
    this.setState({ isSimulating: true });
    const { homeClubId, awayClubId, timeout } = this.state;
    this.socket.emit('simulate', { homeClubId, awayClubId, timeout });
    this.homeClub = this.getClubById(homeClubId);
    this.awayClub = this.getClubById(awayClubId);
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
    return this.props.clubs.find((club) => club.id === id);
  };

  renderEvent(event) {
    console.log(event);
    switch (event.name) {
      case 'start-game':
        return (
          <>
            The match {this.homeClub!.name} - {this.awayClub!.name} started.
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

  renderScore = () => {
    if (this.state.matchStarted) {
      return (
        <div className='flex'>
          <p className='home-score score text-white font-bold bg-green-900'>
            {this.state.score[0]}
          </p>
          <p className='away-score score text-white font-bold bg-green-900'>
            {this.state.score[1]}
          </p>
        </div>
      );
    } else {
      return <p>Match start time{/*moment(match.start).format('HH:mm')*/}</p>;
    }
  };

  renderFixture = () => {
    return (
      <div className='flex items-center p-3'>
        <div className='first-team team justify-end'>
          <img
            className='logo order-1'
            src={`images/club-logos/badge_${this.homeClub && this.homeClub.code}_200.png`}
            alt='logo home'
          />
          <h5 className='font-bold'>{this.homeClub ? this.homeClub.name : 'Hometeam'}</h5>
        </div>
        <div className='time p-3 py-2 rounded mx-2 play-time bg-green-900'>
          {this.renderScore()}
        </div>
        <div className='text-left team'>
          <img
            className='logo'
            src={`images/club-logos/badge_${this.awayClub && this.awayClub.code}_200.png`}
            alt='logo'
          />
          <h5 className='font-bold'>{this.awayClub ? this.awayClub.name : 'Awayteam'}</h5>
        </div>
      </div>
    );
  };

  renderModal = () => {
    const options = this.props.clubs.map(({ name, id }) => {
      return { label: name, value: String(id) };
    });
    const { homeClubId, awayClubId, timeout } = this.state;

    return (
      <Modal onDismiss={this.onModalDismiss}>
        <div className='p-4'>
          <h3 className='font-bold text-2xl mb-4'>Select clubs</h3>
          <div className='flex -mx-4 mb-8'>
            <div className='w-1/3 px-2'>
              <label className='font-semibold text-l'>Home club</label>
              <Dropdown
                options={options}
                value={String(homeClubId)}
                className='w-40'
                onChange={({ value }) => this.setState({ homeClubId: value })}
              ></Dropdown>
            </div>
            <div className='w-1/3 px-2'>
              <label className='font-semibold text-l'>Away club</label>
              <Dropdown
                options={options}
                value={String(awayClubId)}
                className='w-40'
                onChange={({ value }) => this.setState({ awayClubId: value })}
              ></Dropdown>
            </div>
            <div className='w-1/3 px-2'>
              <label className='font-semibold text-l'>Timeout</label>
              <Dropdown
                options={timeoutOptions}
                value={String(timeout)}
                className='w-40'
                onChange={({ value }) => this.setState({ timeout: value })}
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
            {this.renderFixture()}
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
  gameweeks: rootState.gameweeks.gameweeks,
});

const actions = {
  loadGamesAction,
  loadGameweeksAction,
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Live);
