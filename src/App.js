
import { Routes, Route } from 'react-router-dom';
import FrontBoard from './pages/frontBoard/FrontBoard';

import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { modechange } from './redux/actions';
import './style/App.css'
import dark from './img/dark.png'
import light from './img/light.png'
import Header from './components/header/Header';

function App() {
  const modeState = useSelector(state => state.backMode)
  const dispatch = useDispatch(modechange());
  
  return (
    <div id={modeState? "darkMode" : "lightMode"} className='App'>
        <div id="modeBtn" onClick={()=>dispatch(modechange())}>
          <img src={modeState? dark : light}/>
        </div>

        <Header/>
        <div className=''>
          <Routes>
            <Route path='/' element={<FrontBoard/>}></Route>
            

          </Routes>
        </div>
        
    </div>
  );
}

export default App;
