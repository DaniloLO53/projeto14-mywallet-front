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
    setEmail,
    email,
    setPassword,
    password,
    name,
    setName,
    disabled,
  } = useContext(Context);

  const navigate = useNavigate();

  const handleClick = () => {
    const URL = 'https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up';
    const payload = {
      email,
      name,
      password,
    };
    const controller = new AbortController();
    // const { signal } = controller;

    setLoading(true);

    const fetcher = async () => {
      try {
        const dataFetched = await axios.post(URL, payload);
        // console.log(dataFetched);
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
        <img alt="login" src="./logo.png" />
      </figure>

      <form>
        <label htmlFor="email">
          <input
            type="text"
            id="email"
            disabled={loading}
            placeholder="Email"
            value={email}
            onChange={({ target }) => setEmail(target.value)}
          />
        </label>
        <label htmlFor="password">
          <input
            type="text"
            id="password"
            disabled={loading}
            placeholder="Password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>
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

        <button
          type="button"
          // disabled={disabled}
          onClick={() => handleClick()}
        >
          {loading ? <Loading /> : 'Cadastrar'}
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
