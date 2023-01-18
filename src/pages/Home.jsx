import React, { useState, useContext, useEffect } from "react";
import axios from 'axios';
// import dotenv from 'dotenv';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Context from '../context/Context';


function Home() {
  const { signupData } = useContext(Context);
  const data = signupData?.data || [];
  // console.log(data)
  const [total, setTotal] = useState(0);


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
    wallet,
  } = useContext(Context);

  useEffect(() => {
    wallet.map(({ type, value }) => setTotal((prevState) => type === 'income' ?
      prevState + Number(value) :
      prevState - Number(value))
    );
  }, [wallet.length]);

  useEffect(() => console.log(total, 'Now: ', Date.now()), [total]);

  const navigate = useNavigate();

  // console.log(wallet);
  return (
    <div>
      <StyledHome>
        <div>
          <h2>Olá, {data?.name}</h2>
          <img alt="vector" src="./Vector.png"></img>
        </div>

        <div>
          {
            wallet.length === 0 ?
              <p className="no-register">
                Não há registros de
                entrada ou saída
              </p> :
              <>
                <ul>
                  {wallet.map(({ value, description, now, type }) => (
                    <li key={value + description}>
                      <div>
                        <p>{now}</p>
                        <p>{description}</p>
                      </div>
                      <div>
                        <StyledIncome type={type}>{value}</StyledIncome>
                      </div>
                    </li>
                  ))}

                </ul>
                <div>
                  <h3>SALDO</h3>
                  <StyledTotal color={total >= 0 ? 'green' : 'red'}>{total}</StyledTotal>
                </div>
              </>
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
      </StyledHome >
    </div >
  )
};

const StyledIncome = styled.p`
  color: ${({ type }) => type === 'income' ? 'green' : 'red'};
`;

const StyledTotal = styled.h4`
  color: ${({ color }) => color};
`;

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
    justify-content: space-between;
    align-items: center;

    p[class=no-register] {
      width: 30%;
      text-align: center;
      color: #868686;
    }

    & > div {
      /* background-color: green; */
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px;
    }

    ul {
      /* background-color: green; */
      list-style-type: none;
      width: 100%;
      min-height: 100%;
      display: flex;
      flex-direction: column;

      li {
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        div {
          display: flex;
          flex-direction: row;
          background-color: white;

          p {
              margin: 10px;
            }

          &:nth-child(1) {
            /* background-color: red; */
            width: 75%;
            
            p:first-of-type{
              color: #C6C6C6;
            }
          }

          &:nth-child(2) {
            /* background-color: blue; */
            width: 25%;
            justify-content: flex-end;

            /* p {
              color: ${({ type }) => type === 'income' ? 'green' : String(type)};
            } */
          }
        }
      }
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
