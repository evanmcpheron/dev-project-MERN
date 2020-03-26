import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import AdminForm from './AdminForm';
import Spinner from '../layout/Spinner';
import { getTutorials } from '../../actions/admin';
import TutorialItem from './TutorialItem';

const Admin = ({ getTutorials, tutorial: { tutorials, loading } }) => {
    useEffect(() => {
        getTutorials();
    }, [getTutorials]);
    return loading ? (
        <Spinner />
    ) : (
        <Fragment>
            <AdminForm />
            <hr />
            <h1>Tutorials</h1>
            <div>
                {tutorials.map(tut => (
                    <div className="post bg-white p-1 my-1" key={tut._id}>
                        <h1>{tut.title}</h1>

                        <Link to={`/admin/tutorial/${tut._id}`}>
                            Edit Videos
                        </Link>
                    </div>
                ))}
            </div>
        </Fragment>
    );
};

Admin.propTypes = {
    getTutorials: PropTypes.func.isRequired,
    tutorial: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    tutorial: state.tutorial
});

export default connect(mapStateToProps, { getTutorials })(Admin);
