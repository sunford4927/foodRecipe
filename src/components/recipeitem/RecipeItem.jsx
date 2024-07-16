import React from 'react';
import NullImg from '../../img/빈사진.png';
import { setScore } from '../../util/util';

const RecipeItem = () => {
    return (
        <div className='RecipeItem_Container'>
            <img src={NullImg} alt="음식사진" />
            <div className='RecipeItem_Text'>
                <p>♡ 제목 ♡</p>
                <div ><img className='titleImg' src={NullImg} alt="프로필사진" />유저닉네임</div>
                <div>{setScore(3)}(32)조회수 4.3만</div>
            </div>
        </div>
    );
};

export default RecipeItem;