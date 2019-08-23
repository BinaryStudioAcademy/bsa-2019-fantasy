import React, { Ref, ReactNode, RefObject } from 'react';
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
import { Game } from 'types/game.types';

import fieldEvents from './fieldEvents';
import renderComment from './commentary';

import field from 'assets/images/field.svg';
import Fade from 'react-reveal/Fade';
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
  socketConnected: boolean;
  events: any[];
  homeClub: Club | undefined;
  awayClub: Club | undefined;
  timeout: number;
  score: number[];
  elapsed: number | undefined;
};
type RenderFixture = {
  homeClub: Club;
  awayClub: Club;
  content: any;
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
  eventsLog: RefObject<HTMLDivElement>;

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
      elapsed: undefined,
      socketConnected: false,
    };

    this.eventsLog = React.createRef();
  }

  componentDidMount() {
    this.socket = socketIOClient(endpoint);
    this.socket.on('connect', this.handleSocketConnect);
    this.socket.on('status', this.handleStatusEvent);
    this.socket.on('event', this.handleSocketEvent);
    this.socket.on('disconnect', this.handleSocketDisconnect);
    this.props.loadCurrentGame();
  }

  componentDidUpdate = () => {
    if (this.eventsLog) {
      const current = this.eventsLog.current;
      if (current) current.scrollTop = current.scrollHeight;
    }
  };

  handleSocketConnect = () => {
    this.setState({ socketConnected: true });
  };

  handleStatusEvent = (data) => {
    console.log(data);
    const { gameStarted } = data;
    this.setState({ isSimulating: gameStarted });
  };

  handleSocketDisconnect = () => {
    this.handleSocketEvent({ name: 'disconnect' });
  };

  handleSocketEvent = (event) => {
    const newState = { ...this.state };
    if (event.name !== 'nothing') newState.events = [...newState.events, event];
    newState.elapsed = event.elapsed;

    switch (event.name) {
      case 'goal':
        newState.score = event.score;
        break;
      case 'startGame':
        newState.matchStarted = true;
        newState.score = [0, 0];
        break;
      case 'endGame':
        newState.isSimulating = false;
      case 'disconnect':
        newState.socketConnected = false;
        break;
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
    this.socket.emit('stopSimulation', {});
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

  renderElapsed = (elapsed = 0) => {
    const formatted = moment.utc(elapsed).format('mm:ss');
    return <div className='time p-3 py-2 rounded bg-gray-200'>{formatted}</div>;
  };

  renderScore = (score) => (
    <div className='flex'>
      <p className='home-score score text-white font-bold bg-green-900'>{score[0]}</p>
      <p className='away-score score text-white font-bold bg-green-900'>{score[1]}</p>
    </div>
  );

  renderStartTime = (start) => (
    <p className='font-bold text-white'>{moment(start).format('HH:mm')}</p>
  );

  renderFixture = ({ homeClub, awayClub, content }: RenderFixture) => {
    if (homeClub && awayClub) {
      return (
        <div className='flex items-center justify-center p-3 w-full'>
          <div className='flex justify-end items-center'>
            <h5 className='font-bold mx-2'>{homeClub.name}</h5>
            <img
              className='w-16'
              src={`images/club-logos/badge_${homeClub.code}_200.png`}
              alt='logo home'
            />
          </div>
          <div className='time p-3 py-2 rounded mx-4 bg-green-900'>{content}</div>
          <div className='flex items-center'>
            <img
              className='w-16'
              src={`images/club-logos/badge_${awayClub.code}_200.png`}
              alt='logo'
            />
            <h5 className='font-bold mx-2'>{awayClub.name}</h5>
          </div>
        </div>
      );
    }
  };

  renderFixtureLive = () => {
    const { homeClub, awayClub, score, elapsed = 0 } = this.state;
    const content = (
      <div className='flex'>
        <p className='text-white font-bold bg-green-900 w-8'>
          {score[0]} : {score[1]}
        </p>
      </div>
    );
    return (
      <>
        {this.renderElapsed(elapsed)}
        {homeClub && awayClub && this.renderFixture({ homeClub, awayClub, content })}
      </>
    );
  };

  renderFixtureNext = () => {
    if (!this.props.currentGame) return 'loading';
    const { hometeam_id, awayteam_id, start } = this.props.currentGame;
    const homeClub = this.getClubById(hometeam_id);
    const awayClub = this.getClubById(awayteam_id);
    const content = (
      <p className='font-bold text-white'>{moment(start).format('DD.MM')}</p>
    );

    return (
      <>
        <h2 className='font-semibold text-xl mb-2'>Next match</h2>
        {homeClub && awayClub && this.renderFixture({ homeClub, awayClub, content })}
      </>
    );
  };

  renderModal = () => {
    const options = this.props.clubs.map(({ name, id }) => {
      return { label: name, value: String(id) };
    });
    const { homeClub, awayClub, timeout } = this.state;

    return (
      <Modal onDismiss={this.onModalDismiss}>
        <div className='p-8'>
          <h3 className='font-bold text-2xl mb-4'>Select clubs</h3>
          <div className='flex -mx-2 mb-8'>
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

  renderField() {
    const { events } = this.state;
    const lastEvent = events[events.length - 1] || false;
    const defaultAnimationProps = {
      duration: 500,
      opposite: true,
      distance: '50%',
    };
    const positionRight = { top: '15%', left: '55%' };
    const positionLeft = { top: '15%', right: '55%' };

    const home = lastEvent.team === 'home';
    const direction = home ? { left: true } : { right: true };

    return (
      <div className='relative mt-16'>
        {fieldEvents.map((event) => (
          <div className='absolute' style={event.style}>
            <Fade
              {...event.direction}
              when={
                lastEvent &&
                lastEvent.name === event.name &&
                lastEvent.team === event.team
              }
              {...defaultAnimationProps}
            >
              <img src={event.img} alt={`${event.name} - ${event.team}`} />
            </Fade>
          </div>
        ))}

        <img src={field} alt='Football field' />
      </div>
    );
  }

  render() {
    const { isSimulating, isModalActive, events } = this.state;
    const simulateButton = isSimulating ? (
      <Button onClick={this.stopSimulation} className='bg-red'>
        Stop simulation
      </Button>
    ) : (
      <Button onClick={this.showModal}>Simulate</Button>
    );
    const socketNotConnected = (
      <div className='flex items-center'>
        <Button inactive>Simulate</Button>
        <p className='text-red-600 ml-4'>Cannot connect to event server</p>
      </div>
    );

    return (
      <div className='bg-white text-secondary shadow-figma rounded-sm p-12'>
        <div className='flex -mx-4'>
          <div className='w-1/2 mx-4'>
            <h2 className='font-semibold text-5xl mt-4 leading-none mb-8'>Live page</h2>
            <div
              className='h-64 overflow-auto bg-gray-200 rounded p-4'
              ref={this.eventsLog}
            >
              {events.map((event) => (
                <div key={event.elapsed}>{renderComment(event, this.state)}</div>
              ))}
            </div>
          </div>
          <div className='w-1/2 pt-4 mx-4 h-64 flex flex-col items-center'>
            {isSimulating ? this.renderFixtureLive() : this.renderFixtureNext()}
            {this.renderField()}
          </div>
        </div>
        <div className='mt-8'>
          {this.state.socketConnected ? simulateButton : socketNotConnected}
        </div>
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
