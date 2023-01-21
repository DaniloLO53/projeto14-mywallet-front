import React, { useState, useContext, useEffect } from "react";
import axios from 'axios';
import dayjs from 'dayjs';
import styled from 'styled-components';
import { useNavigate, useParams } from 'react-router-dom';
import Context from '../context/Context';

// dotenv.config();

function IncomeEdit() {
  const { loading, setLoading, contextEmail } = useContext(Context);
  const [value, setValue] = useState('');
  const [description, setDescription] = useState('');
  const { signupData, email } = useContext(Context);

  console.log(contextEmail)

  const navigate = useNavigate();
  let { id } = useParams();

  console.log(id)

  function editIncome() {
    if (value.length === 0 || description.length === 0) return;

    const URL = process.env.REACT_APP_API_URL;

    const config = {
      headers: {
        authorization: signupData,
      },
    };
    const controller = new AbortController();
    // const { signal } = controller;

    setLoading(true);

    // console.log(signupData)

    const fetcher = async () => {
      const registerData = {
        now: dayjs(Date.now()).format('DD/MM'),
        value,
        description,
        type: 'income',
        userId: id.slice(0, id.length - 1),
        index: id.slice(-1),
      };

      try {
        console.log('Sending...')
        const dataFetched = await axios.put(`${URL}/editar-entrada/${id}`, registerData, config);
        console.log(dataFetched);
        // console.log(dataFetched.data)
        // setWallet(dataFetched.data);
        // setLoading(false);
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


  return (
    <div>
      <StyledIncomeEdit>
        <h2>Editar Entrada</h2>

        <form>
          <label htmlFor="value">
            <input
              type="text"
              id="value"
              placeholder="Valor"
              value={value}
              onChange={({ target }) => setValue(target.value)}
            />
          </label>
          <label htmlFor="description">
            <input
              type="text"
              id="description"
              placeholder="Descrição"
              value={description}
              onChange={({ target }) => setDescription(target.value)}
            />
          </label>

          <button
            type="button"
            onClick={editIncome}
          >
            Atualizar entrada
          </button>

        </form>
      </StyledIncomeEdit>
    </div>
  )
};

const StyledIncomeEdit = styled.div`
  background-color: #7e35be;;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;

  h2 {
    margin-bottom: 30px;
    color: white;
    width: 78%;
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

export { IncomeEdit, StyledIncomeEdit };
