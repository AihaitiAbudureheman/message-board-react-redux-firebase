import { auth, google_provider, facebook_provider, twitter_provider, github_provider } from '../Firebase';
export const GET_USER = 'get_user';

export function getUser() {
  return dispatch => {
    auth.onAuthStateChanged(user => {
      dispatch({
        type: GET_USER,
        payload: user
      });
    });
  };
}

export function login(email, password) {
  return dispatch => auth.signInWithEmailAndPassword(email, password);
}

export function logout() {
  return dispatch => auth.signOut();
}

export function createAccount(email, password) {
  return dispatch => auth.createUserWithEmailAndPassword(email, password);
}

export function loginWithGoogle() {
  return dispatch => auth.signInWithPopup(google_provider);
}

export function loginWithFacebook() {
  return dispatch => auth.signInWithPopup(facebook_provider);
}

export function loginWithTwitter() {
  return dispatch => auth.signInWithPopup(twitter_provider);
}

export function loginWithGithub() {
  return dispatch => auth.signInWithPopup(github_provider);
}