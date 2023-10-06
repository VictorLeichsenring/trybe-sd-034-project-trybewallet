// Login.tsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setEmail } from '../redux/actions';

function Login() {
  const [inputEmail, setInputEmail] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const isValidEmail = (email:string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isValidPassword = (password:string) => password.length >= 6;

  const areInputsValid = () => isValidEmail(inputEmail) && isValidPassword(inputPassword);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const emailInput = (
      event.currentTarget.elements.namedItem('email') as HTMLInputElement).value;
    dispatch(setEmail(emailInput));
    navigate('/carteira');
  };

  return (
    <>
      <div>Login Page</div>
      <form onSubmit={ handleSubmit }>
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            id="email"
            data-testid="email-input"
            onChange={ (e) => setInputEmail(e.target.value) }
            required
          />
        </label>
        <label htmlFor="password">
          Senha
          <input
            type="password"
            name="password"
            id="password"
            minLength={ 6 }
            data-testid="password-input"
            onChange={ (e) => setInputPassword(e.target.value) }
            required
          />
        </label>
        <button type="submit" disabled={ !areInputsValid() }>Entrar</button>
      </form>
    </>
  );
}

export default Login;
