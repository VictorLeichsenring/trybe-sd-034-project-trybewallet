// import user from './user';
// import wallet from './wallet';

import { SET_EMAIL } from '../actions';

// Configure os seus reducers.
// ATENÇÃO: você obrigatoriamente tem que utilizar as chaves "user" e "wallet" no seu estado global

type ActionType = {
  type: string,
  email?:string,
};

// type StateType = {
//   user: string;
//   wallet:string;
// };

const INITIAL_STATE = {
  user: '',
  wallet: '',
};

function reducer(state = INITIAL_STATE, action: ActionType) {
  switch (action.type) {
    case SET_EMAIL:
      return { ...state, user: action.email || '' };
    default:
      return state;
  }
}

export default reducer;
// export default () => {}; // delete essa linha e configure os seus reducers
