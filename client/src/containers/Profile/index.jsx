import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';


const Profile = ({ user }) => (
    <div>Current user name is: ${user.username}</div>
);

Profile.propTypes = {
    user: PropTypes.objectOf(PropTypes.any)
};

Profile.defaultProps = {
    user: {}
};

const mapStateToProps = rootState => ({
    user: rootState.profile.user
});


export default connect(
    mapStateToProps
)(Profile);
