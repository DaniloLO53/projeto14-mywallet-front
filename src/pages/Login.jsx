import React, { useState, useContext } from "react";
import axios from 'axios';
// import dotenv from 'dotenv';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Context from '../context/Context';

// dotenv.config();

function Login() {
  const { loading, setLoading } = useContext(Context);
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const navigate = useNavigate();

  const { setSignupData } = useContext(Context);

  const handleClick = () => {
    const URL = process.env.REACT_APP_API_URL;

    console.log(URL)

    const config = {
      headers: {
        'Content-type': 'application/json',
        email,
        password,
      },
    };
    const controller = new AbortController();
    // const { signal } = controller;

    setLoading(true);

    const fetcher = async () => {
      try {
        const dataFetched = await axios.get(URL, config);
        setSignupData(dataFetched);
        setLoading(false);
        navigate('/home');
      } catch (error) {
        throw new Error(error.message);
      }
    };
    fetcher();

    return () => {
      console.log('Cleaning');
      controller.abort();
    };
  };

  console.log(loading);


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
    /* background-color: yellow; */
    display: flex;
    flex-direction: column;
    width: 80%;

    label {
      /* background-color: purple; */
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
