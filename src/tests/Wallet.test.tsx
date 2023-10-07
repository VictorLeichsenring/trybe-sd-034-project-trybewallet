import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import mockData from './helpers/mockData';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

const emailTeste = 'victor@teste.com';
const initialState = {
  user: {
    email: emailTeste,
  },
  wallet: {
    isFetching: false,
    currencies: Object.keys(mockData), // Usando mockData aqui
    expenses: [],
    errorMessage: '',
    isEditing: false,
    editedId: null,
  },
};
const emailInputName = 'email-input';
const passwordInputName = 'password-input';

describe('Testes do componente Wallet', () => {
  beforeEach(() => {
    renderWithRouterAndRedux(<App />, { initialState }); // Passando initialState aqui
  });

  it('Renderiza o componente', () => {
    const title = screen.getByText('Login Page');
    expect(title).toBeInTheDocument();
  });

  it('Verifica se existe um input para e-mail', () => {
    const emailInput = screen.getByTestId(emailInputName);
    expect(emailInput).toBeInTheDocument();
  });

  it('Verifica se existe um input para senha', () => {
    const passwordInput = screen.getByTestId(passwordInputName);
    expect(passwordInput).toBeInTheDocument();
  });

  it('Verifica se existe um botão de "Entrar"', () => {
    const submitButton = screen.getByRole('button');
    expect(submitButton).toBeInTheDocument();
  });

  it('Verifica se o botão de "Entrar" está desabilitado quando o e-mail é inválido e a senha tem menos de 6 caracteres', async () => {
    const user = userEvent.setup();
    const emailInput = screen.getByTestId(emailInputName);
    const passwordInput = screen.getByTestId(passwordInputName);
    const submitButton = screen.getByRole('button');
    expect(submitButton).toBeDisabled();

    await user.type(emailInput, emailTeste);
    await user.type(passwordInput, 'Victor');
    expect(submitButton).toBeEnabled();
  });

  it('Verifica se a pagina é redirecionada', async () => {
    const user = userEvent.setup();
    const emailInput = screen.getByTestId(emailInputName);
    const passwordInput = screen.getByTestId(passwordInputName);
    const submitButton = screen.getByRole('button');
    await user.type(emailInput, 'victor@teste.com');
    await user.type(passwordInput, 'Victor');
    expect(submitButton).toBeEnabled();

    await user.click(submitButton);
    waitFor(() => expect(global.window.location.pathname).toEqual('/carteira'));
  });
});
