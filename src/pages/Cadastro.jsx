import axios from 'axios';
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Context from '../context/Context';
import { StyledLogin } from './Login';

function Cadastro() {
  const {
    userInfos,
    setUserInfos,
  } = useContext(Context);

  const navigate = useNavigate();

  const handleClick = () => {
    console.log(userInfos)
    const { password, contextEmail, name, confirmPassword } = userInfos;
    if (password.length === 0 || contextEmail.length === 0 || name.length === 0) {
      return alert('Campos não podem estar vazios...');
    }

    if (password !== confirmPassword) {
      return alert('A confirmação da senha não bate...');
    }

    const URL_REACT = process.env.REACT_APP_API_URL;
    const payload = {
      email: userInfos.contextEmail,
      name: userInfos.name,
      password: userInfos.password,
      confirmPassword: userInfos.confirmPassword,
    };
    const controller = new AbortController();
    // const { signal } = controller;

    const fetcher = async () => {
      try {
        await axios.post(`${URL_REACT}/cadastro`, payload);
        navigate('/');

      } catch (error) {
        const { response } = error;
        if (response.status === 409) {
          return alert('Usuário já cadastrado...');
        } else {
          alert('Erro no servidor...');
          throw new Error(`Erro no servidor: ${error.message}`);
        }
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
            value={userInfos.name}
            onChange={({ target }) => setUserInfos((prevState) => ({
              ...prevState,
              name: target.value,
            }))}
          />
        </label>
        <label htmlFor="email">
          <input
            type="text"
            id="email"
            placeholder="E-mail"
            value={userInfos.contextEmail}
            onChange={({ target }) => setUserInfos((prevState) => ({
              ...prevState,
              contextEmail: target.value,
            }))}
          />
        </label>
        <label htmlFor="password">
          <input
            type="text"
            id="password"
            placeholder="Senha"
            value={userInfos.password}
            onChange={({ target }) => setUserInfos((prevState) => ({
              ...prevState,
              password: target.value,
            }))}
          />
        </label>
        <label htmlFor="confirmPassword">
          <input
            type="text"
            id="confirmPassword"
            placeholder="Confirme a senha"
            value={userInfos.confirmPassword}
            onChange={({ target }) => setUserInfos((prevState) => ({
              ...prevState,
              confirmPassword: target.value,
            }))}
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
