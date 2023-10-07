import { setEmail, SET_EMAIL } from '../redux/actions';

describe('setEmail action', () => {
  it('should create an action to set email', () => {
    const email = 'test@example.com';
    const expectedAction = {
      type: SET_EMAIL,
      payload: email,
    };
    expect(setEmail(email)).toEqual(expectedAction);
  });
});
