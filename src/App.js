
import { Routes, Route } from 'react-router-dom';
import FrontBoard from './pages/FrontBoard';
import Counter from './pages/Counter';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { modechange } from './redux/actions';
import './style/App.css'
import dark from './img/dark.png'
import light from './img/light.png'

function App() {
  const modeState = useSelector(state => state.backMode)
  const dispatch = useDispatch(modechange());

  return (
    <div id={modeState? "darkMode" : "lightMode"}>
        <button id="modeBtn" onClick={()=>dispatch(modechange())}>
          <img src={modeState? dark : light}/>

        </button>
      
        <header>
          헤더 페이지
        </header>
        <div className=''>
          <Routes>
            <Route path='/' element={<FrontBoard/>}></Route>
            <Route path='/num' element={<Counter/>}></Route>

          </Routes>
        </div>
        
    </div>
  );
}

export default App;
