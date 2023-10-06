import { REQUEST_STARTED, REQUEST_SUCCESSFUL, REQUEST_FAILED } from '../actions';

type ActionType = {
  payload: string | Record<string, any>,
  type: string,
};

const initialState = {
  isFetching: false,
  currencies: [],
  errorMessage: '',
};

function siglaReducer(state = initialState, action: ActionType) {
  switch (action.type) {
    case REQUEST_STARTED:
      return {
        ...state,
        isFetching: true,
        errorMessage: '',
        currencies: [],
      };
    case REQUEST_SUCCESSFUL:
      return action.payload;
      // return {
      //   ...state,
      //   isFetching: false,
      //   currencies: action.payload,
      //   errorMessage: '',
      // };

    case REQUEST_FAILED:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
        currencies: [],
      };
    default:
      return state;
  }
}

export default siglaReducer;
