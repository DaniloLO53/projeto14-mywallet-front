import axios from 'axios';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';
import Context from '../context/Context';
import { StyledLogin } from './Login';

function Cadastro() {
  const {
    loading,
    setLoading,
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
    console.log(process.env)
    const payload = {
      email: contextEmail,
      name,
      password,
      confirmPassword,
    };
    const controller = new AbortController();
    // const { signal } = controller;

    setLoading(true);

    const fetcher = async () => {
      try {
        await axios.post(`${URL_REACT}/cadastro`, payload);
        setLoading(false);
        navigate('/');
      } catch (error) {
        setLoading(false);
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
            disabled={loading}
            onChange={({ target }) => setName(target.value)}
          />
        </label>
        <label htmlFor="email">
          <input
            type="text"
            id="email"
            disabled={loading}
            placeholder="E-mail"
            value={contextEmail}
            onChange={({ target }) => setContextEmail(target.value)}
          />
        </label>
        <label htmlFor="password">
          <input
            type="text"
            id="password"
            disabled={loading}
            placeholder="Senha"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>
        <label htmlFor="confirmPassword">
          <input
            type="text"
            id="confirmPassword"
            disabled={loading}
            placeholder="Confirme a senha"
            value={confirmPassword}
            onChange={({ target }) => setConfirmPassword(target.value)}
          />
        </label>

        <button
          type="button"
          // disabled={disabled}
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
