import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import Header from '../components/Header'; // Atualize com o caminho correto
import { rootReducer } from '../redux'; // Atualize com o caminho correto
import { JSX } from 'react/jsx-runtime';

// Mock de um estado inicial
const initialState = {
  user: {
    email: 'test@example.com',
  },
  wallet: {
    expenses: [
      {
        value: '10',
        currency: 'USD',
        exchangeRates: {
          USD: {
            ask: '1',
          },
        },
      },
      {
        value: '20',
        currency: 'EUR',
        exchangeRates: {
          EUR: {
            ask: '0.5',
          },
        },
      },
    ],
  },
};

// Função auxiliar para renderizar o componente com o provider do Redux
const renderWithRedux = (
  component: string | number | boolean | JSX.Element | Iterable<React.ReactNode> | null | undefined,
  { store = createStore(rootReducer, initialState) } = {},
) => {
  return {
    ...render(<Provider store={ store }>{component}</Provider>),
    store,
  };
};

describe('Header Component', () => {
  test('renders with email and total expenses', () => {
    renderWithRedux(<Header />, { initialState });

    // Verifica se o e-mail é renderizado
    expect(screen.getByTestId('email-field')).toHaveTextContent('test@example.com');

    // Verifica se o total de despesas é calculado e renderizado corretamente
    expect(screen.getByTestId('total-field')).toHaveTextContent('20.00');

    // Verifica se a moeda é renderizada
    expect(screen.getByTestId('header-currency-field')).toHaveTextContent('BRL');
  });
});
