import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import AdminForm from './AdminForm';
import Spinner from '../layout/Spinner';
import { getTutorials, deleteTutorial } from '../../actions/admin';
import TutorialItem from './TutorialItem';

const Admin = ({ getTutorials, deleteTutorial, admin }, props, state) => {
    useEffect(() => {
        getTutorials();
        console.log('GET TUTORIALS: ', admin);
    }, [getTutorials]);

    console.log(state, ' ', props);

    return admin.loading ? (
        <Spinner />
    ) : (
        <Fragment>
            <AdminForm />
            <hr />
            <h1>Tutorials</h1>
            <div>
                {admin.tutorials.map(tut => (
                    <div key={tut._id}>
                        <h1>{tut.title}</h1>

                        <p>{tut.description}</p>

                        <Link to={`/admin/tutorial/${tut._id}`}>
                            Edit Videos
                        </Link>
                        <button
                            onClick={e => deleteTutorial(tut._id)}
                            type="button"
                        >
                            <i className="fas fa-times"></i>
                        </button>
                    </div>
                ))}
            </div>
        </Fragment>
    );
};

Admin.propTypes = {
    deleteTutorial: PropTypes.func.isRequired,
    getTutorials: PropTypes.func.isRequired,
    tutorial: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    admin: state.admin
});

export default connect(mapStateToProps, { getTutorials, deleteTutorial })(
    Admin
);
