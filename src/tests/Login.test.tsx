import { screen } from '@testing-library/react';

import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Testes do componente Login', () => {
  beforeEach(() => {
    renderWithRouterAndRedux(<App />);
  });

  it('Renderiza o componente', () => {
    const title = screen.getByText('Login Page');
    expect(title).toBeInTheDocument();
  });

  it('Verifica se existe um input para e-mail', () => {
    const emailInput = screen.getByTestId('email-input');
    expect(emailInput).toBeInTheDocument();
  });

  it('Verifica se existe um input para senha', () => {
    const passwordInput = screen.getByTestId('password-input');
    expect(passwordInput).toBeInTheDocument();
  });

  it('Verifica se existe um botão de "Entrar"', () => {
    const submitButton = screen.getByRole('button');
    expect(submitButton).toBeInTheDocument();
  });

  it('Verifica se o botão de "Entrar" está desabilitado quando o e-mail é inválido e a senha tem menos de 6 caracteres', async () => {
    const user = userEvent.setup();
    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const submitButton = screen.getByRole('button');
    expect(submitButton).toBeDisabled();

    await user.type(emailInput, 'victor@teste.com');
    await user.type(passwordInput, 'Victor');
    expect(submitButton).toBeEnabled();

    await user.click(submitButton);

    const titleWalletPage = screen.getByText('Wallet page');
    expect(titleWalletPage).toBeInTheDocument();
  });
});
