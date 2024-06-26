import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../types';

function Header() {
  const email = useSelector((state: RootState) => state.user.email);
  const expenses = useSelector((state: RootState) => state.wallet.expenses);

  const totalExpenses = expenses.reduce((total, expense) => {
    if (
      expense
      && typeof expense.value === 'string'
      && expense.exchangeRates
      && expense.currency
      && expense.exchangeRates[expense.currency]
      && expense.exchangeRates[expense.currency].ask
    ) {
      const expenseValueInBRL = parseFloat(expense.value)
      * parseFloat(expense.exchangeRates[expense.currency].ask);
      if (Number.isNaN(expenseValueInBRL)) {
        console.error('Failed to calculate expenseValueInBRL for expense:', expense);
        return total; // Return the total so far if we can't add the current expense
      }
      return total + expenseValueInBRL;
    }
    return total;
  }, 0);

  return (
    <header>
      <span data-testid="email-field">{email}</span>
      <span data-testid="total-field">{totalExpenses.toFixed(2)}</span>
      <span data-testid="header-currency-field">BRL</span>
    </header>
  );
}

export default Header;
