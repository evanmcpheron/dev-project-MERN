import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addAvatar } from '../../actions/profile';
import blankAvatar from '../../img/blank-avatar.jpg';

import axios from 'axios';

const Avatar = ({ profile, addAvatar }) => {
  const [name, setName] = useState();
  const [file, setFile] = useState();

  const send = (event) => {
    addAvatar(profile._id, file);
    setFile('');
  };

  const avatarImage = () => {
    axios.get(`/api/profile/avatar/${profile.avatar}`).then((res) => {
      //   console.log(res);
    });
  };

  return (
    <div className="avatar-container">
      <header className="avatar-container-header">
        {profile.avatar === null ? (
          <img src={`${blankAvatar}`} className="avatar" />
        ) : (
          <img src={`/api/profile/avatar/${profile.avatar}`} className="avatar" />
        )}
        <form action="#">
          <div className="flex">
            <label htmlFor="file" className="btn">
              Change Profile Image
            </label>
            <input
              type="file"
              className="custom-file-input"
              id="file"
              accept=".jpg"
              onChange={(event) => {
                const file = event.target.files[0];
                setFile(file);
              }}
            />
          </div>
        </form>
        {file === undefined || file === '' ? null : (
          <button className="btn" onClick={send}>
            Upload
          </button>
        )}
        <p>*Profile photo must be a jpeg.</p>
      </header>
    </div>
  );
};

Avatar.propTypes = {
  addAvatar: PropTypes.func.isRequired,
};

export default connect(null, { addAvatar })(Avatar);
