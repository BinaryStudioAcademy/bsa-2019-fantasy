import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { testAction } from './actions';

import styles from './styles.module.scss';

class Test extends React.Component {
    constructor(props) {
        super(props);
        this.state = { };
    }

    componentDidMount() {
        this.props.testAction();
    }

    render() {
        const { testRes } = this.props;
        return (
            <div className={styles.test}>
                Welcome to our React app! <br />
                The test result is: {testRes}
            </div>
        );
    }
}

Test.propTypes = {
    testRes: PropTypes.string
};

Test.defaultProps = {
    testRes: 'not received yet'
};

const mapStateToProps = rootState => ({
    testRes: rootState.test.testRes,
});

const actions = {
    testAction
};

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Test);