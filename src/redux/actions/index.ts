// Coloque aqui suas actions

import { ThunkAction } from 'redux-thunk/es/types';
import { Dispatch } from '../../types';

export const SET_EMAIL = 'SET_EMAIL';

export function setEmail(email: string) {
  return {
    type: SET_EMAIL,
    payload: email,
  };
}

export const REQUEST_STARTED = 'REQUEST_STARTED';
export const REQUEST_SUCCESSFUL = 'REQUEST_SUCCESSFUL';
export const REQUEST_FAILED = 'REQUEST_FAILED';

function requestStarted() {
  return { type: REQUEST_STARTED };
}

function requestSuccessful(currencies: string[]) {
  return {
    type: REQUEST_SUCCESSFUL,
    payload: currencies,
  };
}

function requestFailed(error: string) {
  return {
    type: REQUEST_FAILED,
    payload: error,
  };
}

export function fetchSiglas() {
  return async (dispatch:Dispatch) => {
    try {
      dispatch(requestStarted());
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data = await response.json();
      const currencies = Object.keys(data).filter((key) => key !== 'USDT');
      dispatch(requestSuccessful(currencies));
    } catch (error:any) {
      dispatch(requestFailed(error.message));
    }
  };
}

// actionTypes.ts
export const FETCH_CURRENCIES_REQUEST = 'FETCH_CURRENCIES_REQUEST';
export const FETCH_CURRENCIES_SUCCESS = 'FETCH_CURRENCIES_SUCCESS';
export const FETCH_CURRENCIES_FAILURE = 'FETCH_CURRENCIES_FAILURE';

export const fetchCurrencies = () => {
  return async (dispatch:Dispatch) => {
    dispatch({ type: FETCH_CURRENCIES_REQUEST });

    try {
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const data = await response.json();
      // Aqui você pode precisar ajustar dependendo da estrutura dos dados da sua API
      const currencyCodes = Object.keys(data).filter((key) => key !== 'USDT');

      dispatch({ type: FETCH_CURRENCIES_SUCCESS, payload: currencyCodes });
    } catch (error:any) {
      dispatch({ type: FETCH_CURRENCIES_FAILURE, payload: error.message });
    }
  };
};

// Defina a forma de uma despesa
interface Expense {
  value: number;
  description: string;
  currency: string;
  method: string;
  tag: string;
  exchangeRates?: any; // ou um tipo mais específico dependendo da sua API
  id?: number;
}

// Defina a forma do estado global
interface RootState {
  wallet: {
    expenses: Expense[];
    // ... outras propriedades
  };
  // ... outros slices do estado
}

// Defina a forma da ação
interface AddExpenseAction {
  type: typeof ADD_EXPENSE;
  payload: Expense;
}

export const ADD_EXPENSE = 'ADD_EXPENSE';

interface Expense {
  value: number;
  description: string;
  currency: string;
  method: string;
  tag: string;
  // ... outros campos que você espera que uma despesa tenha
}

// Ação para adicionar despesa
export const addExpense = (expense) => {
  return async (dispatch, getState) => {
    try {
      const response = await fetch('https://economia.awesomeapi.com.br/json/all');
      const exchangeRates = await response.json();

      const newExpense = {
        ...expense,
        exchangeRates,
        id: getState().wallet.expenses.length,
      };
      
      console.log('Adding new expense:', newExpense);
      
      dispatch({ type: ADD_EXPENSE, payload: newExpense });
      
      const newTotal = getState().wallet.expenses.reduce((total, exp) => {
        const expenseValueInBRL = parseFloat(exp.value) * parseFloat(exp.exchangeRates[exp.currency].ask);
        return total + expenseValueInBRL;
      }, 0);
      
      console.log('New total:', newTotal);
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };
};

