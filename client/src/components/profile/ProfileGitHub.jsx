import React, { Fragment, useEffect } from 'react';
import { connect } from 'react-redux';

import { getGithubRepos } from '../../redux/actions/profile';
import { selectRepos } from '../../redux/selectors/profile';

import Spinner from '../layout/Spinner';

const ProfileGitHub = ({ username, getGithubRepos, repos }) => {
  useEffect(() => {
    getGithubRepos(username);
  }, [getGithubRepos, username]);

  return (
    <Fragment>
      {repos === null ? <Spinner /> : (
        repos.map(repo => (
          <div key={repo._id} className='repo bg-white p-1 my-1'>
            <div>
              <h4>
                <a href={repo.html_url} target='_blank' rel='noopener noreferrer'>
                  {repo.name}
                </a>
              </h4>
              <p>{repo.description}</p>
            </div>
            <div>
              <ul>
                <li clasName='badge badge-primary'>
                  Stars: {repo.stargazers_count}
                </li>
                <li clasName='badge badge-dark'>
                  Watchers: {repo.watchers_count}
                </li>
                <li clasName='badge badge-light'>
                  Forks: {repo.forks_count}
                </li>
              </ul>
            </div>
          </div>
        ))
      )}
    </Fragment>
  )
};

const mapStateToProps = state => ({
  repos: selectRepos(state)
});
  
const mapDispatchToProps = dispatch => ({
    getGithubRepos: (gitHubUsername) => dispatch(getGithubRepos(gitHubUsername))
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileGitHub);
