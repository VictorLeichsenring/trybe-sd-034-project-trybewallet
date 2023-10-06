import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSiglas } from '../redux/actions';
import { Dispatch, GlobalState } from '../types';

function WalletForm() {
  const [value, setValue] = useState('');
  const [description, setDescription] = useState('');
  const [currency, setCurrency] = useState('');
  const [method, setMethod] = useState('');
  const [tag, setTag] = useState('');

  const currencies = useSelector((state: GlobalState) => state.sigla.currencies || []);
  const dispatch = useDispatch<Dispatch>();

  useEffect(() => {
    dispatch(fetchSiglas());
  }, [dispatch]);

  const handleAddExpense = (event: React.FormEvent) => {
    event.preventDefault();
    // Lógica para adicionar a despesa
  };
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
    </>

  );
}

export default WalletForm;
