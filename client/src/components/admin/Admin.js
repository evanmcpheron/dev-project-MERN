import React, { useEffect, Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import AdminForm from './AdminForm';
import Spinner from '../layout/Spinner';
import { getTutorials, deleteTutorial, addTutorial, updateTutorial } from '../../actions/admin';
import TutorialItem from './TutorialItem';

const Admin = (
  { getTutorials, addTutorial, updateTutorial, admin, deleteTutorial, setAlert, isAuthenticated },
  props,
  state
) => {
  useEffect(() => {
    getTutorials();
  }, [getTutorials]);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    thumbnailURL: '',
    status: '',
    id: '',
  });

  const { title, description, thumbnailURL, status, id } = formData;

  const onChange = (event) => setFormData({ ...formData, [event.target.name]: event.target.value });

  const onSubmit = (event) => {
    event.preventDefault();
    setFormData({
      title: '',
      description: '',
      thumbnailURL: '',
      status: '',
      id: '',
    });
    getTutorials();
    addTutorial({ title, description, thumbnailURL, status });
  };

  const [editMode, setEditMode] = useState({
    editModeState: 'normal-mode',
  });

  const { editModeState } = editMode;

  const editing = (event) => {
    setFormData({
      title: '',
      description: '',
      thumbnailURL: '',
      status: '',
      id: '',
    });

    if (editModeState === 'normal-mode') {
      setEditMode({
        editModeState: 'edit-mode',
      });
    } else {
      setEditMode({
        editModeState: 'normal-mode',
      });
    }
  };

  const editTutorial = (event, tut) => {
    event.preventDefault();
    setFormData({
      title: tut.title,
      description: tut.description,
      thumbnailURL: tut.thumbnailURL,
      status: tut.status,
      id: tut._id,
    });
  };

  return admin.loading ? (
    <Spinner />
  ) : (
    <Fragment>
      <section className="container admin-wrapper">
        <Fragment>
          <h1>Create a new tutorial</h1>

          {editModeState === 'edit-mode' ? (
            <form
              onSubmit={(event) => {
                event.preventDefault();
                setFormData({
                  title: '',
                  description: '',
                  thumbnailURL: '',
                  status: 'Choose Status',
                  id: '',
                });
                updateTutorial({ title, description, thumbnailURL, status }, id);
              }}
            >
              <div>
                <input
                  type="text"
                  placeholder="Title"
                  name="title"
                  value={title}
                  onChange={(event) => onChange(event)}
                  required
                ></input>
                <input
                  type="text"
                  placeholder="Description"
                  name="description"
                  value={description}
                  onChange={(event) => onChange(event)}
                  required
                ></input>
                <input
                  type="text"
                  placeholder="Tutorial Thumbnail URL"
                  value={thumbnailURL}
                  onChange={(event) => onChange(event)}
                  name="thumbnailURL"
                  required
                ></input>
                <select
                  type="text"
                  placeholder="Tutorial Thumbnail URL"
                  value={status}
                  onChange={(event) => onChange(event)}
                  name="status"
                  required
                >
                  <option>Choose Status</option>
                  <option>Published</option>
                  <option>Draft</option>
                </select>
                <input
                  className="btn btn-success admin-submit-btn"
                  type="submit"
                  value="Update Tutorial"
                  onClick={() => {
                    getTutorials();
                    setTimeout(() => {
                      setEditMode({ editModeState: 'normal-mode' });
                    }, 500);
                  }}
                />
              </div>
            </form>
          ) : (
            <form
              onSubmit={(event) => {
                event.preventDefault();
                setFormData({
                  title: '',
                  description: '',
                  thumbnailURL: '',
                  status: 'Choose Status',
                });
                addTutorial({ title, description, thumbnailURL, status });
              }}
            >
              <div>
                <input
                  type="text"
                  placeholder="Title"
                  name="title"
                  value={title}
                  onChange={(event) => onChange(event)}
                  required
                ></input>
                <input
                  type="text"
                  placeholder="Description"
                  name="description"
                  value={description}
                  onChange={(event) => onChange(event)}
                  required
                ></input>
                <input
                  type="text"
                  placeholder="Tutorial Thumbnail URL"
                  value={thumbnailURL}
                  onChange={(event) => onChange(event)}
                  name="thumbnailURL"
                  required
                ></input>
                <select
                  type="text"
                  placeholder="Tutorial Thumbnail URL"
                  value={status}
                  onChange={(event) => onChange(event)}
                  name="status"
                  required
                >
                  <option>Choose Status</option>
                  <option>Published</option>
                  <option>Draft</option>
                </select>
                <input
                  className="btn btn-success admin-submit-btn"
                  type="submit"
                  value="Create Tutorial"
                  onClick={getTutorials}
                />
              </div>
            </form>
          )}
        </Fragment>
        <button onClick={editing} className="btn">
          Edit Tutorials
        </button>
        <hr />
        <h1>Tutorials</h1>
        <div className="bottom-section-admin mb2">
          {admin.tutorials.map((tut) => (
            <div className="tutorials-container" key={tut._id}>
              {editModeState === 'edit-mode' ? (
                <button onClick={(event) => editTutorial(event, tut)}>
                  <div>
                    <img className="edit-mode" src={tut.thumbnailURL} />
                  </div>
                </button>
              ) : (
                <Link to={`/admin/tutorial/${tut._id}`}>
                  <div>
                    <img src={tut.thumbnailURL} />
                  </div>
                </Link>
              )}
            </div>
          ))}
        </div>
      </section>
    </Fragment>
  );
};

Admin.propTypes = {
  deleteTutorial: PropTypes.func.isRequired,
  updateTutorial: PropTypes.func.isRequired,
  getTutorials: PropTypes.func.isRequired,
  admin: PropTypes.object.isRequired,
  addTutorial: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  admin: state.admin,
});

export default connect(mapStateToProps, {
  getTutorials,
  updateTutorial,
  deleteTutorial,
  addTutorial,
})(Admin);
