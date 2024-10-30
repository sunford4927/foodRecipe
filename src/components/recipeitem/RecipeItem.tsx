import React from 'react';
import NullImg from '../../img/빈사진.png';
import { setScore } from '../../util/util';
import { useNavigate } from 'react-router-dom';

interface RecipeItemProps {
    item: {
        RCP_SNO: string;
        RCP_TTL: string;
        USER_NM: string;
        SCORE_AVG: number;
        REVIEW_CNT: number | null;
        VIEW_CNT: number;
    };
    idx: number;
}

function setNumber(num: number): string {
    let result = "조회수 ";
    if (num > 10000) {
        result += parseFloat((num / 10000).toFixed(1)).toString() + "만";
    } else {
        result += num.toString();
    }
    return result;
}

const RecipeItem: React.FC<RecipeItemProps> = ({ item }) => {
    const nav = useNavigate();

    function itemClick() {
        nav('/recipe/' + item.RCP_SNO);
    }

    return (
        <div className='RecipeItem_Container cursor' onClick={itemClick}>
            <img src={NullImg} alt="음식사진" />
            <div className='RecipeItem_Text'>
                <p>{item.RCP_TTL}</p>
                <img className='titleImg' src={NullImg} alt="프로필사진" />
                {item.USER_NM}
                <div>
                    {setScore(item.SCORE_AVG)}({item.REVIEW_CNT !== null ? item.REVIEW_CNT : 0}) {setNumber(item.VIEW_CNT)}
                </div>
            </div>
        </div>
    );
};

export default RecipeItem;
