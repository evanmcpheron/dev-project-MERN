import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const AdminRoute = ({
    component: Component,
    auth: { isAuthenticated, isAdmin, loading },
    ...rest
}) => (
    <Route
        {...rest}
        render={props =>
            !isAdmin && !loading ? (
                <Redirect to="/dashboard" />
            ) : (
                <Component {...props} />
            )
        }
    />
);

AdminRoute.propTypes = {
    auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(AdminRoute);
