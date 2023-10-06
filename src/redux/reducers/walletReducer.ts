import { FETCH_CURRENCIES_REQUEST,
  FETCH_CURRENCIES_SUCCESS,
  FETCH_CURRENCIES_FAILURE } from '../actions';
// walletReducer.ts
const initialState = {
  currencies: [],
  loading: false,
  error: null,
};

const walletReducer = (state = initialState, action: { type: any; payload: any; }) => {
  switch (action.type) {
    case FETCH_CURRENCIES_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_CURRENCIES_SUCCESS:
      return { ...state, loading: false, currencies: action.payload };
    case FETCH_CURRENCIES_FAILURE:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default walletReducer;
