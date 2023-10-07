// actions.test.ts

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';
import { addExpense, ADD_EXPENSE } from '../redux/actions';// Ajuste o caminho conforme necessário

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('addExpense action', () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it('should dispatch ADD_EXPENSE ', () => {
    const mockResponse = {
      USD: { ask: '1.00' },
      // ... other currencies
    };
    const urlAPI = 'https://economia.awesomeapi.com.br/json/all';
    fetchMock.getOnce(urlAPI, {
      body: mockResponse,
      headers: { 'content-type': 'application/json' },
    });

    const expense = {
      value: '100',
      description: 'Test expense',
      currency: 'USD',
      method: 'Credit card',
      tag: 'Test',
    };

    const expectedActions = [
      {
        type: ADD_EXPENSE,
        payload: {
          ...expense,
          exchangeRates: mockResponse,
          id: 0, // assuming this is the first expense and thus, id will be 0
        },
      },
    ];

    const initialState = {
      wallet: {
        expenses: [],
        // ... other state
      },
    };

    const store = mockStore(initialState);

    return store.dispatch<any>(addExpense(expense)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });
});
