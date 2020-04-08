import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addAvatar } from '../../actions/profile';

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
      console.log(res);
    });
  };

  return (
    <div className="App">
      <img src={`/api/profile/avatar/${profile.avatar}`} />
      <header className="App-header">
        <form action="#">
          <div className="flex">
            <label htmlFor="file">File</label>
            <input
              type="file"
              id="file"
              accept=".jpg"
              onChange={(event) => {
                const file = event.target.files[0];
                setFile(file);
              }}
            />
          </div>
        </form>
        <button onClick={send}>Send</button>
      </header>
    </div>
  );
};

Avatar.propTypes = {
  addAvatar: PropTypes.func.isRequired,
};

export default connect(null, { addAvatar })(Avatar);
