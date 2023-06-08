import { LOAD_REPOS, LOAD_REPOS_SUCCESS, LOAD_REPOS_ERROR, RECEIVE_LOGIN } from './constants';


export function loadRepos() {
  return {
    type: LOAD_REPOS,
  };
}

export function reposLoaded(repos, username) {
  return {
    type: LOAD_REPOS_SUCCESS,
    repos,
    username,
  };
}

export function repoLoadingError(error) {
  return {
    type: LOAD_REPOS_ERROR,
    error,
  };
}

export function receiveLogin(token, user) {
  return {
    type: RECEIVE_LOGIN,
    token,
    user
  };
}
