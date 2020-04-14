import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { getGithubRepos } from '../../actions/profile';

const ProfileGithub = ({ username, getGithubRepos, repos }) => {
  useEffect(() => {
    getGithubRepos(username);
  }, [getGithubRepos]);

  return (
    <div className="experience-profile">
      <h2>Github Repos</h2>
      <div className="github-wrapper">
        {repos === null ? (
          <Spinner />
        ) : (
          repos.map((repo) => (
            <div key={repo.node_id}>
              <div>
                <h4>
                  <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                    {repo.name}
                  </a>
                </h4>
                <p>{repo.desciption}</p>
              </div>
              <div>
                <ul>
                  <li>
                    <p>Stars: {repo.stargazers_count}</p>
                  </li>
                  <li>
                    <p>Watchers: {repo.watchers_count}</p>
                  </li>
                  <li>
                    <p>Forks: {repo.forks_count}</p>
                  </li>
                </ul>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

ProfileGithub.propTypes = {
  getGithubRepos: PropTypes.func.isRequired,
  repos: PropTypes.array.isRequired,
  username: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({
  repos: state.profile.repos,
});

export default connect(mapStateToProps, { getGithubRepos })(ProfileGithub);
