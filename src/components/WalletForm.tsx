import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSiglas, fetchCurrencies, addExpense } from '../redux/actions';
import { Dispatch, GlobalState } from '../types';

function WalletForm() {
  const [value, setValue] = useState('');
  const [description, setDescription] = useState('');
  const [currency, setCurrency] = useState('USD');
  const [method, setMethod] = useState('Dinheiro');
  const [tag, setTag] = useState('Alimentação');

  const currencies = useSelector((
    state: GlobalState,
  ) => state.wallet.currencies || []);
  const dispatch = useDispatch<Dispatch>();

  const totalExpenses = useSelector((state: GlobalState) => state.wallet.expenses.reduce((total, expense) => total + parseFloat(expense.value), 0));

  useEffect(() => {
    // dispatch(fetchSiglas());
    console.log("API is being called");
    dispatch(fetchCurrencies());
  }, [dispatch]);

  const handleAddExpense = (event: React.FormEvent) => {
    event.preventDefault();
    const expense = {
      value: value.toString(),
      description,
      currency,
      method,
      tag,
    };
    dispatch(addExpense(expense));
    // Limpar os campos de valor e descrição
    setValue('');
    setDescription('');
  };
  let formattedTotal = '0.00'; // valor padrão

  if (typeof totalExpenses === 'number') {
    formattedTotal = totalExpenses.toFixed(2);
  } else {
    console.error('totalExpenses is not a number:', totalExpenses);
  }
  return (
    <>
      <div>WalletForm</div>
      <form onSubmit={ handleAddExpense }>
        <label htmlFor="value">
          Valor:
          <input
            type="number"
            name="value"
            data-testid="value-input"
            value={ value }
            onChange={ (e) => setValue(e.target.value) }
          />
        </label>

        <label htmlFor="currency">
          Moeda:
          <select
            id="currency"
            name="currency"
            data-testid="currency-input"
            value={ currency }
            onChange={ (e) => setCurrency(e.target.value) }
          >
            {currencies && currencies.length > 0 ? (
              currencies.map((cur) => (
                <option key={ cur } value={ cur }>
                  {cur}
                </option>
              ))
            ) : (
              <option disabled>Loading...</option>
            )}
          </select>
        </label>

        <label htmlFor="description">
          Descrição:
          <input
            type="text"
            name="description"
            data-testid="description-input"
            value={ description }
            onChange={ (e) => setDescription(e.target.value) }
          />
        </label>

        <label htmlFor="method">
          Método de Pagamento:
          <select
            id="method"
            name="method"
            data-testid="method-input"
            value={ method }
            onChange={ (e) => setMethod(e.target.value) }
          >
            <option value="Dinheiro">Dinheiro</option>
            <option value="Cartão de crédito">Cartão de crédito</option>
            <option value="Cartão de débito">Cartão de débito</option>
          </select>
        </label>

        <label htmlFor="tag">
          Categoria:
          <select
            id="tag"
            name="tag"
            data-testid="tag-input"
            value={ tag }
            onChange={ (e) => setTag(e.target.value) }
          >
            <option value="Alimentação">Alimentação</option>
            <option value="Lazer">Lazer</option>
            <option value="Trabalho">Trabalho</option>
            <option value="Transporte">Transporte</option>
            <option value="Saúde">Saúde</option>
          </select>
        </label>

        <button type="submit">
          Adicionar despesa
        </button>
      </form>
      {/* <p>
        Total de despesas:
        {' '}
        {totalExpenses.toFixed(2)}
      </p> */}
    </>

  );
}

export default WalletForm;
