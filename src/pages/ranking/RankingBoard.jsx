import React, { useEffect, useState } from 'react';
import { sendGet, setView, URL } from '../../util/util';
import './RankingBoard.scss'
import { useSelector } from 'react-redux';

const listData = ["스크랩 순", "추천 순", "평점 순"]

const RankingBoard = () => {
    const [dataList, setDataList] = useState([]);
    const [curBtn, setCurBtn] = useState(null);
    //let curBtn = null;
    let backMode = useSelector(state => state.backMode)
    useEffect(() =>{
        let tag = document.getElementsByClassName('rank_menu');
        setCurBtn(tag[0]);
        
        if(backMode)
        {
            tag[0].style.backgroundColor = "#1E90FF"
        }
        else
        {
            tag[0].style.backgroundColor = "#00CED1"
        }
        
        //sendGet(,setData);
    },[])
    
    
    useEffect(()=>{
        if(curBtn)
        {
            if(backMode)
            {
                curBtn.style.backgroundColor = "#1E90FF"
            }
            else
            {
                curBtn.style.backgroundColor = "#00CED1"
            }
        }
    }, [backMode])
    function ClickButton(e){
        if(curBtn)
        {
            curBtn.style.backgroundColor = "";
        }
        if(backMode)
        {
            e.target.style.backgroundColor = "#1E90FF"
        }
        else
        {
            e.target.style.backgroundColor = "#00CED1"
        }
        setCurBtn(e.target);

        let idx = 0;
        switch(e.target.innerText)
        {
            case listData[0]: // 스크랩 순
                idx = 1;
                break;
            case listData[1]: // 추천 순
                idx = 2;
                break;
            case listData[2]: // 평점 순
                idx = 3;
                break;
        }

        if(idx != 0)
        {
            sendGet(URL+"/getrank?type="+idx, setDataList);
        }
        
    }
    return (
        <div className='inner'>
            <div >
                <button onClick={(e)=> ClickButton(e)} className='rank_menu'>{listData[0]}</button>
                <button onClick={(e)=> ClickButton(e)} className='rank_menu'>{listData[1]}</button>
                <button onClick={(e)=> ClickButton(e)} className='rank_menu'>{listData[2]}</button>
            </div>
            <div className='recipeContainer'>
                {dataList.length > 0  && setView(dataList)}
            </div>
        </div>
    );
};

export default RankingBoard;