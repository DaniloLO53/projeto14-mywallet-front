import React from "react";
import { Login } from "./pages/Login";
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <>
      <Routes>
        <Route element={<Login />} path="/" />
      </Routes>
    </>
  )
};

export default App;
