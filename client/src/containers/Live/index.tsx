import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import socketIOClient from 'socket.io-client';

import Modal from 'containers/Modal';
import Button from 'components/Button';
import { testAction } from './actions';
import { RootState } from 'store/types';

import field from 'assets/images/field.svg';
//import styles from "./styles.module.scss";

type Props = {
  testRes: string;
  testAction: typeof testAction;
};

const endpoint = 'http://localhost:5004';
class Live extends React.Component<Props> {
  static defaultProps = {
    testRes: 'not received yet',
  };
  socket: any;

  state = {
    isModalActive: false,
    messages: [],
  };

  componentDidMount() {
    this.socket = socketIOClient(endpoint);
    this.socket.on('event', (data) => {
      console.log(data);
      this.setState({ messages: [...this.state.messages, data] });
    });
  }

  simulate = () => {
    console.log(this.socket);
    this.socket.emit('simulate', { homeClubId: 2, awayClubId: 3, timeout: 5 });
  };

  showModal = () => {
    this.setState({ isModalActive: true });
  };
  onModalDismiss = () => {
    this.setState({ isModalActive: false });
  };

  render() {
    const { testRes } = this.props;
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
            {this.state.messages.map((message) => (
              <p>{message}</p>
            ))}
          </div>
          <div className='w-1/2 h-64'>
            <img className='h-64' src={field} alt='Football field' />
          </div>
        </div>
        <Button onClick={this.simulate}>Simulate</Button>
        {this.state.isModalActive && (
          <Modal
            title='Modal Title'
            content='Test modal text'
            onDismiss={this.onModalDismiss}
          />
        )}
      </div>
    );
  }
}

const mapStateToProps = (rootState: RootState) => ({
  testRes: rootState.test.testRes,
});

const actions = {
  testAction,
};

const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(actions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Live);
