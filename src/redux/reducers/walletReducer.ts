import {
  FETCH_CURRENCIES_REQUEST,
  FETCH_CURRENCIES_SUCCESS,
  FETCH_CURRENCIES_FAILURE,
  ADD_EXPENSE,
  DELETE_EXPENSE,
} from '../actions';
// walletReducer.ts
const initialState = {
  currencies: [],
  loading: false,
  error: null,
  expenses: [],
};

const walletReducer = (state = initialState, action: { type: any; payload: any; }) => {
  switch (action.type) {
    case FETCH_CURRENCIES_REQUEST:
      return { ...state, loading: true, error: null };
    case FETCH_CURRENCIES_SUCCESS:
      return { ...state, loading: false, currencies: action.payload };
    case FETCH_CURRENCIES_FAILURE:
      return { ...state, loading: false, error: action.payload };
    case ADD_EXPENSE:
      return { ...state, expenses: [...state.expenses, action.payload] };
    case DELETE_EXPENSE:
      return {
        ...state,
        expenses: state.expenses.filter((expense) => expense.id !== action.id),
      };
    default:
      return state;
  }
};

export default walletReducer;
