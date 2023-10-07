import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../types';
import WalletForm from './WalletForm';

function Header() {
  const email = useSelector((state: RootState) => state.user.email);
  const expenses = useSelector((state: RootState) => state.wallet.expenses);
  // console.log(expenses);

  const totalExpenses = expenses.reduce((total, expense) => {
    if (
      expense &&
      expense.value &&
      expense.exchangeRates &&
      expense.currency &&
      expense.exchangeRates[expense.currency] &&
      expense.exchangeRates[expense.currency].ask
    ) {
      const expenseValueInBRL = parseFloat(expense.value) * parseFloat(expense.exchangeRates[expense.currency].ask);
      if (isNaN(expenseValueInBRL)) {
        console.error('Failed to calculate expenseValueInBRL for expense:', expense);
        return total; // Return the total so far if we can't add the current expense
      }
      return total + expenseValueInBRL;
    } else {
      return total;
    }
  }, 0);
  

  

  return (
    <header>
      <span data-testid="email-field">{email}</span>
      <span data-testid="total-field">{totalExpenses.toFixed(2)}</span>
      <span data-testid="header-currency-field">BRL</span>
      <WalletForm />
    </header>
  );
}

export default Header;
