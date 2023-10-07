// Coloque aqui suas actions

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
const urlAPI = 'https://economia.awesomeapi.com.br/json/all';

export function fetchSiglas() {
  return async (dispatch:Dispatch) => {
    try {
      dispatch(requestStarted());
      const response = await fetch(urlAPI);
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
      const response = await fetch(urlAPI);
      const data = await response.json();
      // Aqui você pode precisar ajustar dependendo da estrutura dos dados da sua API
      const currencyCodes = Object.keys(data).filter((key) => key !== 'USDT');

      dispatch({ type: FETCH_CURRENCIES_SUCCESS, payload: currencyCodes });
    } catch (error:any) {
      dispatch({ type: FETCH_CURRENCIES_FAILURE, payload: error.message });
    }
  };
};

interface Expense {
  value: string;
  description: string;
  currency: string;
  method: string;
  tag: string;
  exchangeRates?: any; // Considere criar uma interface para isso também
  id?: number;
}

export const ADD_EXPENSE = 'ADD_EXPENSE';

// Ação para adicionar despesa
export const addExpense = (expense: Expense) => {
  return async (
    dispatch: (arg0: {
      type: string; payload: any; }) => void,
    getState: () => { (): any; new(): any; wallet: { (): any; new(): any;
      expenses: { (): any; new(): any;
        length: any; reduce: { (arg0: (total: any, exp: any) => any, arg1: number): any;
          new(): any; }; }; }; },
  ) => {
    try {
      const response = await fetch(urlAPI);
      const exchangeRates = await response.json();

      const newExpense = {
        ...expense,
        exchangeRates,
        id: getState().wallet.expenses.length,
      };
      console.log(newExpense);

      dispatch({ type: ADD_EXPENSE, payload: newExpense });
    } catch (error) {
      console.error('Error adding expense:', error);
    }
  };
};
