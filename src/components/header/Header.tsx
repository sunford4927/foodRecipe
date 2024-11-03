import React, { useEffect } from 'react';
import SearchOk from '../../img/돋보기.png';
import Profile from '../../img/프로필.png';
import MenuBtn from '../../img/메뉴.png';
import logo from '../../img/logo.png';
import './Header.scss';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { userInfoType } from 'redux/actions/ActionTypes';
import { usePreventRefresh } from 'components/customhook/refresh/Refresh';

const size = {
    width: '40px',
    height: '40px'
};

const Header: React.FC = () => {
    const nav = useNavigate();
    const isLogin = useSelector((state: any) => state.isLogin);
    const user = useSelector((state: { user: userInfoType}) => state.user);
    usePreventRefresh();
    useEffect(() => {
        console.log(user.nick);
    }, [isLogin]);

    return (
        <div id='headerLine'>
            <div id='topBox'>
                <img 
                    className='cursor' 
                    src={logo} 
                    onClick={() => nav('/')} 
                    alt="만개레시피 제목" 
                    style={{ width: 280, height: 90 }} 
                />
                <div id='searchContainer'>
                    <input type="text" name='searchBox' />
                    <button>
                        <img src={SearchOk} alt="search icon" style={size} />
                    </button>
                </div>
                <div id='iconContainer'>
                    <p>{user.nick !== ""  ? `${user.nick} 님 환영합니다` : ""}</p>
                    <img 
                        onClick={() => nav("/login")} 
                        className='cursor' 
                        src={Profile} 
                        alt="프로필" 
                        style={size} 
                    />
                    <img className='cursor' src={MenuBtn} alt="메뉴" style={size} />
                </div>
            </div>
            <div id='menuContainer'>
                <span className='cursor' onClick={() => nav('/')}>분류</span>
                <span className='cursor' onClick={() => nav('/rank')}>랭킹</span>
            </div>
        </div>
    );
};

export default Header;
