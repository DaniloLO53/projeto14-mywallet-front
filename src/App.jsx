import React from "react";
import { Login } from "./pages/Login";
import { Route, Routes } from 'react-router-dom';
import ContextProvider from "./context/ContextProvider";
import Cadastro from "./pages/Cadastro";
import { Home } from "./pages/Home";
import { Income } from "./pages/Income";
import { Outcome } from "./pages/Outcome";
import { IncomeEdit } from "./pages/IncomeEdit";
import { OutcomeEdit } from "./pages/OutcomeEdit";

function App() {
  return (
    <>
      <ContextProvider>
        <Routes>
          <Route element={<Login />} path="/" />
          <Route element={<Cadastro />} path="/cadastro" />
          <Route element={<Home />} path="/home" />
          <Route element={<Income />} path="/nova-entrada" />
          <Route element={<Outcome />} path="/nova-saida" />
          <Route element={<IncomeEdit />} path="/editar-entrada/:id" />
          <Route element={<OutcomeEdit />} path="/editar-saida/:id" />
        </Routes>
      </ContextProvider>
    </>
  )
};

export default App;
