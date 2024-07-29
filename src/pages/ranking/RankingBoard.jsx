import React, { useEffect, useState } from 'react';
import { sendGet, setView, URL } from '../../util/util';
import './RankingBoard.scss'
import { useSelector } from 'react-redux';



const RankingBoard = () => {
    const [data, setData] = useState([]);
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
        
    }
    return (
        <div className='inner'>
            <div >
                <button onClick={(e)=> ClickButton(e)} className='rank_menu'>스크랩 순</button>
                <button onClick={(e)=> ClickButton(e)} className='rank_menu'>추천 순</button>
                <button onClick={(e)=> ClickButton(e)} className='rank_menu'>평점 순</button>
            </div>
            <div className='recipeContainer'>
                {/* {setView()} */}
            </div>
        </div>
    );
};

export default RankingBoard;