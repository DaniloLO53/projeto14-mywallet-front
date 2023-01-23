import React, { useState, useContext } from "react";
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Context from '../context/Context';

function Login() {
  const { setUserInfos } = useContext(Context);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const navigate = useNavigate();

  const handleClick = () => {
    const URL = process.env.REACT_APP_API_URL;

    const controller = new AbortController();

    const fetcher = async () => {
      try {
        const dataFetched = await axios.post(URL, {
          email,
          password,
        });
        const { data } = dataFetched;
        setUserInfos((prevState) => ({
          ...prevState,
          contextEmail: email,
          name: data.name,
          signupData: data.token,
          userId: data.userId,
        }));
        // setContextEmail(email);
        // setName(data.name)
        // setSignupData(data.token);
        // setUserId(data.userId);
        navigate('/home');

      } catch (error) {
        const { response } = error;
        if (response.status === 403) {
          return alert('Usuário não existe...');
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
    <div>
      <StyledLogin>
        <figure>
          <img alt="login" src="./MyWallet.png" />
        </figure>

        <form>
          <label htmlFor="email">
            <input
              type="text"
              id="email"
              placeholder="E-mail"
              value={email}
              onChange={({ target }) => setEmail(target.value)}
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

          <button
            type="button"
            onClick={handleClick}
          >
            Entrar
          </button>

          <button
            type="button"
            onClick={() => navigate('/cadastro')}
          >
            Primeira vez? Cadastre-se!
          </button>
        </form>
      </StyledLogin>
    </div>
  )
};

const StyledLogin = styled.div`
  background-color: #7e35be;;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;

  figure {
    margin-bottom: 30px;    
  }
  form {
    display: flex;
    flex-direction: column;
    width: 80%;

    label {
      width: 100%;
      display: flex;
      justify-content: center;
      input {
        width: 100%;
        height: 40px;
        border-radius: 4px;
        padding: 0 7px 0 7px;
        border: 1px solid #d4d4d4;
        margin: 5px;
      }
    }
    button:first-of-type {
      background-color: #A328D6;
      min-height: 40px;
      font-size: 20px;
      padding: 10px;
      color: white;
      margin-top: 5px;
      border: none;
      border-radius: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    button:nth-of-type(2) {
      background-color: transparent;
      color: white;
      text-decoration: none;
      border: none;
      margin-top: 30px;
    }
  }
`;

export { Login, StyledLogin };
