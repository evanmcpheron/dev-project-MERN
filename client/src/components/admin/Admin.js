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
            <section className="container admin-wrapper">
                <AdminForm />
                <hr />
                <h1>Tutorials</h1>
                <div className="bottom-section-admin mb2">
                    {admin.tutorials.map(tut => (
                        <div className="tutorials-container" key={tut._id}>
                            <div>
                                <img src={tut.thumbnailURL} />
                                <div className="tutorials-container-body">
                                    <h6 style={{ fontWeight: '600' }}>
                                        {tut.title}
                                    </h6>

                                    <p>{tut.description}</p>
                                </div>
                            </div>
                            <div className="btn-grid">
                                <Link
                                    className="btn btn-success"
                                    to={`/admin/tutorial/${tut._id}`}
                                >
                                    Edit Videos
                                </Link>
                                <button
                                    className="btn btn-danger"
                                    onClick={e => deleteTutorial(tut._id)}
                                    type="button"
                                >
                                    <i className="fas fa-times"></i>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
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
