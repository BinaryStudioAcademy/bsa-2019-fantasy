import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Test from 'src/containers/Test';
import NotFound from 'src/scenes/NotFound';
import PrivateRoute from 'src/containers/PrivateRoute';
import { loadCurrentUser, logout, login, registration } from 'src/containers/Profile/actions';
import PropTypes from 'prop-types';

class Routing extends React.Component {
    componentDidMount() {
        this.props.loadCurrentUser();
    }

    render() {
        const { isLoading, isAuthorized, user, ...props } = this.props;
        return (
            isLoading
                ? <div>SPINNER</div>
                : (
                    <div className="fill">
                        {isAuthorized && (
                            <header>
                                HEADER
                            </header>
                        )}
                        <main className="fill">
                            <Switch>
                                <Route exact path="/" component={Test} />
                                <PrivateRoute exact path="/private" component={Test} />
                                <Route path="*" exact component={NotFound} />
                            </Switch>
                        </main>
                    </div>
                )
        );
    }
}

Routing.propTypes = {
    isAuthorized: PropTypes.bool,
    logout: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    registration: PropTypes.func.isRequired
};

Routing.defaultProps = {
    isAuthorized: false,
    user: {},
    isLoading: true,
    userId: undefined
};

const actions = { loadCurrentUser, login, logout, registration };

const mapStateToProps = rootState => ({
    isAuthorized: rootState.profile.isAuthorized,
    user: rootState.profile.user,
    isLoading: rootState.profile.isLoading,
    userId: rootState.profile.user && rootState.profile.user.id
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Routing);
