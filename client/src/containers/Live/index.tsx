import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import Modal from 'containers/Modal';
import { testAction } from './actions';
import { RootState } from 'store/types';

//import styles from "./styles.module.scss";

type Props = {
  testRes: string;
  testAction: typeof testAction;
};

class Live extends React.Component<Props> {
  static defaultProps = {
    testRes: 'not received yet',
  };

  state = {
    isModalActive: false,
  };

  componentDidMount() {
    //this.props.testAction();
  }

  showModal = () => {
    this.setState({ isModalActive: true });
  };
  onModalDismiss = () => {
    this.setState({ isModalActive: false });
  };

  render() {
    const { testRes } = this.props;
    return (
      <div className='h-64 bg-white shadow rounded-sm p-12'>
        Live page <br />
        The test result is: {testRes}
        <button className='bg-primary rounded mx-5' onClick={this.showModal}>
          Show modal
        </button>
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
