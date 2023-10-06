// Esse reducer será responsável por tratar as informações da pessoa usuária
import { SET_EMAIL } from '../actions';

type ActionType = {
  type: string;
  payload: string;
};

const initialState = {
  email: '',
};

export function userReducer(state = initialState, action: ActionType) {
  switch (action.type) {
    case SET_EMAIL:
      return { ...state, email: action.payload };
    default:
      return state;
  }
}
