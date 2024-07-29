
import { Routes, Route } from 'react-router-dom';
import FrontBoard from './pages/frontBoard/FrontBoard';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { modechange } from './redux/actions';
import './style/App.css'
import dark from './img/dark.png'
import light from './img/light.png'
import Header from './components/header/Header';
import Login from './pages/login/Login';
import CreateUser from './pages/createuser/CreateUser';
import UpArrow from './img/위쪽화살표.png'
import { upScroll } from './util/util';
import RankingBoard from './pages/ranking/RankingBoard';



function App() {
    const modeState = useSelector(state => state.backMode)
    const dispatch = useDispatch();
    const state = useSelector(state => state)
    useEffect(() => {
        console.log(state)
    }, [state.user])

    return (
        <div id={modeState ? "darkMode" : "lightMode"} className='App'>
            <div id="modeBtn" >
                <img onClick={() => dispatch(modechange())} src={modeState ? dark : light} />
                <img onClick={()=>upScroll()} src={UpArrow} />
            </div>

            <Header />
            <div className='contents'>
                <Routes>
                    <Route path='/' element={<FrontBoard />}></Route>
                    <Route path='/login' element={<Login />}></Route>
                    <Route path='/join' element={<CreateUser />}></Route>
                    <Route path='/rank' element={<RankingBoard />}></Route>
                </Routes>
            </div>

        </div>
    );
}

export default App;
