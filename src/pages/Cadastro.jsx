import axios from 'axios';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Context from '../context/Context';
import { StyledLogin } from './Login';

function Cadastro() {
  const {
    setContextEmail,
    contextEmail,
    setPassword,
    password,
    name,
    setName,
    confirmPassword,
    setConfirmPassword,
  } = useContext(Context);

  const navigate = useNavigate();

  const handleClick = () => {
    const URL_REACT = process.env.REACT_APP_API_URL;
    const payload = {
      email: contextEmail,
      name,
      password,
      confirmPassword,
    };
    const controller = new AbortController();
    // const { signal } = controller;

    const fetcher = async () => {
      try {
        await axios.post(`${URL_REACT}/cadastro`, payload);
        navigate('/');

      } catch (error) {
        alert(error.message);
        throw new Error(error.message);
      }
    };
    fetcher();

    return () => {
      console.log('Cleaning');
      controller.abort();
    };
  };

  return (
    <StyledLogin>
      <figure>
        <img alt="login" src="./MyWallet.png" />
      </figure>

      <form>
        <label htmlFor="name">
          <input
            type="text"
            id="name"
            placeholder="Nome"
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </label>
        <label htmlFor="email">
          <input
            type="text"
            id="email"
            placeholder="E-mail"
            value={contextEmail}
            onChange={({ target }) => setContextEmail(target.value)}
          />
        </label>
        <label htmlFor="password">
          <input
            type="text"
            id="password"
            placeholder="Senha"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>
        <label htmlFor="confirmPassword">
          <input
            type="text"
            id="confirmPassword"
            placeholder="Confirme a senha"
            value={confirmPassword}
            onChange={({ target }) => setConfirmPassword(target.value)}
          />
        </label>

        <button
          type="button"
          onClick={() => handleClick()}
        >
          {'Cadastrar'}
        </button>

        <button
          type="button"
          onClick={() => navigate('/')}
        >
          Já tem uma conta? Faça login!
        </button>
      </form>
    </StyledLogin>
  );
}

export default Cadastro;
