

import React, { useState, useMemo } from 'react';
import styled from "styled-components";
import bg from './img/bg.png';
import './App.css';
import { MainLayout } from './styles/Layouts';
import Orb from './components/Orb/Orb';
import Navigation from './components/Navigation/Navigation';
import Dashboard from './components/Dashboard/Dashboard';
import Income from './components/Incomes/Income';
import Expenses from './components/Expenses/Expenses';

import Login from './components/User/Login';
import Register from './components/User/Register';
import Alltransactions from './components/Alltransactions/Alltransactions';

import { BrowserRouter, Routes, Route,useNavigate } from 'react-router-dom';
import Reg from './components/HomePage/Reg';
import Log from './components/HomePage/Log';
import Insights from './components/insights/Insights';

function App() {

  

  const [active, setActive] = useState(1);

  const orbMemo = useMemo(() => <Orb />, []);

  const displayData = () => {
    switch (active) {
      case 1:
        return <Dashboard />;
      case 2:
        return <Alltransactions />;
      case 3:
        return <Income />;
      case 4:
        return <Expenses />;
      case 5:
          return <Insights />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <AppStyled bg={bg} className="App">
      {orbMemo}
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <MainLayout>
                <Navigation active={active} setActive={setActive} />
                <main>{displayData()}</main>
              </MainLayout>
            }
          />
          <Route path="/register" element={<Reg/>} />
          <Route path="/login" element={<Log/>} />
        </Routes>
      </BrowserRouter>
    </AppStyled>
  );
}

const AppStyled = styled.div`
  height: 100vh;
  background-image: url(${props => props.bg});
  position: relative;
  main {
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 32px;
    overflow-x: hidden;
    &::-webkit-scrollbar {
      width: 0;
    }
  }
`;

export default App;
