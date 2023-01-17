import React, { useState, useContext } from "react";
import axios from 'axios';
// import dotenv from 'dotenv';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Context from '../context/Context';


function Home() {
  const { signupData } = useContext(Context);
  const data = signupData?.data || [];
  console.log(data)

  const {
    loading,
    setLoading,
    setEmail,
    email,
    setPassword,
    password,
    name,
    setName,
    confirmPassword,
    setConfirmPassword,
    disabled,
  } = useContext(Context);

  const navigate = useNavigate();

  console.log(loading);
  return (
    <div>
      <StyledHome>
        <div>
          <h2>Olá, {data?.name}</h2>
          <img alt="vector" src="./Vector.png"></img>
        </div>

        <div>
          {
            data.length === 0 ?
              <p className="no-register">
                Não há registros de
                entrada ou saída
              </p> :
              'pru'
          }
        </div>

        <div>
          <button
            type="button"
            onClick={() => navigate('/nova-entrada')}
          >
            <img alt="add" src="./add.png"></img>
            Nova entrada
          </button>
          <button
            type="button"
            onClick={() => navigate('/nova-saida')}
          >
            <img alt="rem" src="./remove.png"></img>
            Nova saída
          </button>
        </div>
      </StyledHome>
    </div>
  )
};

const StyledHome = styled.div`
  background-color: #7e35be;;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  min-height: 100vh;

  & > div:first-of-type {
    /* background-color: red; */
    width: 100%;
    display: flex;
    color: white;
    align-items: center;
    justify-content: space-between;
    padding: 26px;
  }

  & > div:nth-of-type(2) {
    background-color: white;
    min-width: 90%;
    border-radius: 8px;
    min-height: calc(100vh - 230px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    p[class=no-register] {
      width: 30%;
      text-align: center;
      color: #868686;
    }

  }

  & > div:nth-of-type(3) {
    /* background-color: green; */
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;

    button {
      background-color: #A328D6;
      color: white;
      border: none;
      width: 190px;
      border-radius: 8px;
      height: 110px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      align-items: center;
    }

  }
`;

export { Home, StyledHome };
