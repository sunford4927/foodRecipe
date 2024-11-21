import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import FrontBoard from './pages/frontBoard/FrontBoard';
import { useSelector, useDispatch } from 'react-redux';
import {  setuserinfo } from './redux/actions';import './style/App.css';
import dark from './img/dark.png';
import light from './img/light.png';
import Header from './components/header/Header';
import Login from './pages/login/Login';
import CreateUser from './pages/createuser/CreateUser';
import UpArrow from './img/위쪽화살표.png';
import { LOCALEMAIL, upScroll } from './util/util';
import RankingBoard from './pages/ranking/RankingBoard';
import CategoryRecipe from './pages/categoryrecipe/CategoryRecipe';
import Test from './Test';
import Detailboard from './pages/detailboard/Detailboard';
import InsertRecipe from './pages/insertboard/InsertRecipe';
import { State } from 'redux/reducer';
import { auth, getCurUser } from 'util/auth/firebase';
import { userInfoType } from 'redux/actions/ActionTypes';
import { onAuthStateChanged } from 'firebase/auth';
import 'bootstrap/dist/css/bootstrap.min.css';


const App: React.FC = () => {
    const modeState = useSelector((state: { backMode: boolean }) => state.backMode);
    const dispatch = useDispatch();

    const user = useSelector((state : State) => state.user)
    // 브라우저에 렌더링 시 한 번만 실행하는 코드
    useEffect(() => {
        // 세션에 저장된 이메일 정보가 있고 리덕스에 저장된 이메일이 없으면 다시 리덕스에 유저정보저장
        const email = localStorage.getItem(LOCALEMAIL);
        if(email && user.email==="")
        {
            onAuthStateChanged (auth, (user) =>{
                if(user){
                    const userInfo : userInfoType= {
                        nick : String(user.displayName),
                        email : String(user.email)
                    }
                    dispatch(setuserinfo(userInfo));
                }
            })           
        }
    },[auth]);

    return (
        <div className='App col-xs-12 col-sm-9 col-md-7 col-lg-8'>
            <div id="modeBtn">
                <img 
                    className='img_size_fix '
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
                    <Route path='/insertrecipe' element={<InsertRecipe />} />
                    <Route path='/test' element={<Test />} />
                </Routes>
            </div>
        </div>
    );
}

export default App;
