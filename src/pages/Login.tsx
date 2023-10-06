// Login.tsx
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setEmail } from '../redux/actions';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
            required
          />
        </label>
        <button type="submit">Entrar</button>
      </form>
    </>
  );
}

export default Login;
