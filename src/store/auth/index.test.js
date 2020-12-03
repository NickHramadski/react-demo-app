import reducer from './';
import * as actionTypes from './actions';

const USER_EMAIL = 'test@test.com';

describe('STORE - auth reducer', () => {
  it('sets user authenticated and sets user email on LOGIN_SUCCESS action', () => {
    expect(reducer(undefined, { type: actionTypes.LOGIN_SUCCESS, payload: USER_EMAIL })).toEqual({
      loggedIn: true,
      userEmail: USER_EMAIL,
      loginError: null
    });
  });
});