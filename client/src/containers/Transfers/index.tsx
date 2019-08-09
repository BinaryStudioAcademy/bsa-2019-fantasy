import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { testAction } from './actions';
import { RootState } from 'store/types';

//import styles from "./styles.module.scss";

type Props = {
  testRes: string;
  testAction: typeof testAction;
};

class Transfers extends React.Component<Props> {
  static defaultProps = {
    testRes: 'not received yet',
  };

  componentDidMount() {
    this.props.testAction();
  }

  render() {
    const { testRes } = this.props;
    return (
      <div className='h-64 bg-white shadow rounded-sm p-12'>
        Transfers page <br />
        The test result is: {testRes}
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
)(Transfers);
