import React from 'react';
import { useSelector } from 'react-redux';
import { Expense, RootState } from '../types'; // Importe o tipo do seu estado global

function Table() {
  const expenses = useSelector((state: RootState) => state.wallet.expenses);
  function getCurrencyName(expense: Expense) {
    // Encontrar a chave que corresponde à moeda da despesa
    const currencyKey = Object.keys(expense.exchangeRates).find(
      (key) => expense.exchangeRates[key].code === expense.currency,
    );

    // Retornar o nome da moeda, ou uma string vazia se não for encontrada
    return currencyKey ? expense.exchangeRates[currencyKey].name : '';
  }

  return (
    <table>
      <thead>
        <tr>
          <th>Descrição</th>
          <th>Tag</th>
          <th>Método de pagamento</th>
          <th>Valor</th>
          <th>Moeda</th>
          <th>Câmbio utilizado</th>
          <th>Valor convertido</th>
          <th>Moeda de conversão</th>
          <th>Editar/Excluir</th>
        </tr>
      </thead>
      <tbody>
        {expenses.map((expense, index) => (
          <tr key={ index }>
            <td>{expense.description}</td>
            <td>{expense.tag}</td>
            <td>{expense.method}</td>
            <td>{parseFloat(expense.value).toFixed(2)}</td>
            <td>{getCurrencyName(expense)}</td>
            <td>{parseFloat(expense.exchangeRates[expense.currency].ask).toFixed(2)}</td>
            <td>
              {(parseFloat(expense.value)
            * parseFloat(expense.exchangeRates[expense.currency].ask)).toFixed(2)}

            </td>
            <td>Real</td>
            <td>
              {/* Botões de editar/excluir */}
              <button>Editar</button>
              <button>Excluir</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default Table;
