import React, { useState, useContext, useEffect } from "react";
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import Context from '../context/Context';


function Home() {
  const { signupData, register, setRegister, userId } = useContext(Context);
  const data = signupData?.data || [];
  const [total, setTotal] = useState(0);
  const [wallet, setWallet] = useState([]);
  const [entries, setEntries] = useState([]);

  // console.log('Token at home: ', signupData)

  useEffect(() => {
    console.log('Calculating total...')
    console.log('Entries: ', entries)
    console.log('Entries length: ', entries.length)
    setTotal(0);
    entries.length > 0 && entries.forEach(({ value, type }) => {
      return setTotal((prevState) => {
        return type === 'income' ? prevState + Number(value) : prevState - Number(value);
      });
    });
  }, [entries.length]);

  useEffect(() => {
    const userRegister = wallet.find((data) => data.userId === userId);
    setEntries(userRegister?.registers || []);

  }, [wallet.length]);

  useEffect(() => {
    const URL_REACT = process.env.REACT_APP_API_URL;
    const controller = new AbortController();
    // const { signal } = controller;

    const config = {
      headers: {
        authorization: signupData,
      },
    };

    const fetcher = async () => {
      try {
        const { data: registers } = await axios.get(`${URL_REACT}/home`, config);
        setWallet(registers);
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
  }, []);

  async function deleteRegister(target) {
    const { name } = target;
    const URL_REACT = process.env.REACT_APP_API_URL;
    const controller = new AbortController();
    // const { signal } = controller;

    const fetcher = async () => {
      try {
        const response = await axios.put(`${URL_REACT}/home`, { userId, name });
        const { data } = response;
        setEntries(data[0].registers);

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

  const navigate = useNavigate();

  return (
    <div>
      <StyledHome>
        <div>
          <h2>Olá, {data?.name}</h2>
          <img alt="vector" src="./Vector.png"></img>
        </div>

        <div>
          {
            entries.length === 0 ?
              <p className="no-register">
                Não há registros de
                entrada ou saída
              </p> :
              <>
                <ul>
                  {entries.map((data, index) => {
                    const { value, description, now, type } = data;
                    console.log(data);
                    return (
                      <li key={value + description}>
                        <div>
                          <p>{now}</p>
                          <button
                            type="button"
                            onClick={() => navigate(type === 'income' ?
                              `/editar-entrada/${userId}${index}` :
                              `/editar-saida/${userId}${index}`
                            )}
                          >{description}</button>
                        </div>
                        <div>
                          <StyledIncome type={type}>{value}</StyledIncome>
                        </div>
                        <button
                          type="button"
                          name={index}
                          onClick={({ target }) => deleteRegister(target)}
                        >
                          X
                        </button>
                      </li>
                    )
                  })}

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
  color: ${(props) => props.color};
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

          p {
              margin: 10px;
            }

          &:nth-child(1) {
            /* background-color: red; */
            width: 75%;
            
            p:first-of-type{
              color: #C6C6C6;
            }

            button {
              background-color: transparent;
              border: none;
            }
            button:hover {
              background-color: #7e35be;
              border-radius: 8px;
              border: 1px solid white;
            }
          }

          &:nth-child(2) {
            /* background-color: blue; */
            width: 25%;
            justify-content: flex-end;

            button {
              background-color: blue;
              border: none;
            }

          }

        }

        button {
          background-color: transparent;
          border: none;
          padding: 8px;
        }
        button:hover {
          background-color: red;
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
