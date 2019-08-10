import React, { useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';

import { testAction } from './actions';
import { RootState } from 'store/types';

import Fixtures from 'components/Fixtures/Fixtures';

//import styles from "./styles.module.scss";

type Props = {
  testRes: string;
  testAction: typeof testAction;
};

const FixturesContainer = () => {
  const [gameweekId, setGameweekId] = useState(1);

  return (
    <div>
      <button className='btn'>Prev</button>
      <button className='btn'>Next</button>
      <Fixtures />
    </div>
  );
};

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
)(FixturesContainer);
