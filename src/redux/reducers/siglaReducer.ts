import { REQUEST_STARTED, REQUEST_SUCCESSFUL, REQUEST_FAILED } from '../actions';

type ActionType = {
  payload: string,
  type: string,
};

const initialState = {
  isFetching: false,
  sigla: [],
  errorMessage: '',
};

function siglaReducer(state = initialState, action: ActionType) {
  switch (action.type) {
    case REQUEST_STARTED:
      return {
        ...state,
        isFetching: true,
        errorMessage: '',
        sigla: '',
      };
    case REQUEST_SUCCESSFUL:
      return {
        ...state,
        isFetching: false,
        sigla: action.payload,
        errorMessage: '',
      };
    case REQUEST_FAILED:
      return {
        ...state,
        isFetching: false,
        errorMessage: action.payload,
        sigla: '',
      };
    default:
      return state;
  }
}

export default siglaReducer;
