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
    <div className="avatar-upload">
      <header className="avatar-upload-header">
        {profile.avatar === null ? (
          <div className="avatar-container" style={{ height: '200px', width: '200px' }}>
            <div
              className="avatar-post avatar"
              style={{ backgroundImage: `url(${blankAvatar})` }}
            />
          </div>
        ) : (
          <div className="avatar-container" style={{ height: '200px', width: '200px' }}>
            <div
              className="avatar-post avatar"
              style={{ backgroundImage: `url(/api/profile/avatar/${profile.avatar})` }}
            />
          </div>
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
