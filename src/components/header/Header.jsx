import React, { useEffect } from 'react';
import SearchOk from '../../img/돋보기.png'
import Profile from '../../img/프로필.png'
import MenuBtn from '../../img/메뉴.png'
import './Header.scss'
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const size ={
    width : '40px',
    height : '40px'
}

const Header = () => {
    const nav = useNavigate();
    const isLogin = useSelector(state => state.isLogin);
    console.log(isLogin)
    useEffect(()=>{
        console.log(isLogin)
    },[isLogin])
    return (
        <div id='headerLine'>
            <div id='topBox'>
                <img src="https://recipe1.ezmember.co.kr/img/logo4.png" alt="만개레시피 제목" />
                <div id='searchContainer'>
                    <input type="text" name='searchBox'  />
                    <button><img src={SearchOk} alt="reading glasses" style={size}/></button>
                </div>
                <div id='iconContainer'>
                    <img onClick={()=>{
                        // if(isLogin)
                        // {
                        //     ""
                        // }
                        // else{
                        //     nav("/login");
                        // }
                        nav("/login")
                    }} className='cursor' src={Profile} alt="프로필" style={size}/>
                    <img className='cursor' src={MenuBtn} alt="메뉴" style={size}/>
                </div>
            </div>
            <div id='menuContainer'>
                <span className='cursor'>분류</span>
                <span className='cursor'>랭킹</span>
                
            </div>
        </div>
    );
};

export default Header;