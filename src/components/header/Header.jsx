import React from 'react';
import SearchOk from '../../img/돋보기.png'
import Profile from '../../img/프로필.png'
import MenuBtn from '../../img/메뉴.png'
import './Header.scss'

const size ={
    width : '40px',
    height : '40px'
}

const Header = () => {
    return (
        <div id='headerLine'>
            <div id='topBox'>
                <img src="https://recipe1.ezmember.co.kr/img/logo4.png" alt="만개레시피 제목" />
                <div id='searchContainer'>
                    <input type="text" name='searchBox'  />
                    <button><img src={SearchOk} alt="reading glasses" style={size}/></button>
                </div>
                <div id='iconContainer'>
                    <img src={Profile} alt="프로필" style={size}/>
                    <img src={MenuBtn} alt="메뉴" style={size}/>
                </div>
            </div>
            <div id='menuContainer'>
                <span>분류</span>
                <span>랭킹</span>
                
            </div>
        </div>
    );
};

export default Header;