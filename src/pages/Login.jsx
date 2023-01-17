import React, { useState } from "react";
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');


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
            onClick={() => 0}
          >
            Entrar
          </button>

          <button
            type="button"
            onClick={() => 0}
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