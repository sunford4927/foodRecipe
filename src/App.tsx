import React from 'react';
import { Routes, Route } from 'react-router-dom';
import FrontBoard from './pages/frontBoard/FrontBoard';
import { useSelector, useDispatch } from 'react-redux';
import { modechange } from './redux/actions';
import './style/App.css';
import dark from './img/dark.png';
import light from './img/light.png';
import Header from './components/header/Header';
import Login from './pages/login/Login';
import CreateUser from './pages/createuser/CreateUser';
import UpArrow from './img/위쪽화살표.png';
import { upScroll } from './util/util';
import RankingBoard from './pages/ranking/RankingBoard';
import CategoryRecipe from './pages/categoryrecipe/CategoryRecipe';
import Test from './Test';
import Detailboard from './pages/detailboard/Detailboard';

const App: React.FC = () => {
    const modeState = useSelector((state: { backMode: boolean }) => state.backMode);
    const dispatch = useDispatch();

    return (
        <div id={modeState ? "darkMode" : "lightMode"} className='App'>
            <div id="modeBtn">
                <img 
                    onClick={() => dispatch(modechange())} 
                    src={modeState ? dark : light} 
                    alt="mode toggle" 
                />
                <img 
                    onClick={() => upScroll()} 
                    src={UpArrow} 
                    alt="scroll to top" 
                />
            </div>

            <Header />
            <div className='contents'>
                <Routes>
                    <Route path='/' element={<FrontBoard />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/join' element={<CreateUser />} />
                    <Route path='/rank' element={<RankingBoard />} />
                    <Route path='/category/:value' element={<CategoryRecipe />} />
                    <Route path='/recipe/:pathNo' element={<Detailboard />} />
                    <Route path='/test' element={<Test />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
