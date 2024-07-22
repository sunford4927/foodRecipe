import React from 'react';
import NullImg from '../../img/빈사진.png';
import { setScore } from '../../util/util';

function setNumber(num){
    let result = "조회수 ";
    if(num>10000)
    {
        result += parseFloat(num/10000).toFixed(1).toString() + "만";
    }
    else{
        result += parseInt(num).toString();
    }
    return result;
}

const RecipeItem = ( {item , idx}) => {
    
    return (
        <div  className='RecipeItem_Container cursor'>
            <img  src={NullImg} alt="음식사진" />
            <div className='RecipeItem_Text'>
                <p>{item.RCP_TTL}</p>

                <img  className='titleImg' src={NullImg} alt="프로필사진" />
                {item.USER_NM}
                <div>{setScore(item.SCORE_AVG)}({item.REVIEW_CNT != null ?item.REVIEW_CNT : 0}) {setNumber(item.VIEW_CNT)}</div>
            </div>
        </div>
    );
};

export default RecipeItem;