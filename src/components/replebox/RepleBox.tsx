import React, { useState } from 'react';
import { ALLUSER, COMMENTS, REVIEW, setStarMenu, TOCOMMENTS } from '../../util/util';


const RepleBox = ({type}) => {
    const Style = {
        marginLeft:40,
        marginRight:20
    }
    if(type != ALLUSER)
    {
        Style.pointerEvents = "none";
    }
    
    const [comdState, setComdState] = useState("");
    const [score, setScore] = useState(0);
    const [text, setText] = useState("");

    return (
    <div className='container'>
        <div className='flex_left flex_wrap_row_center' style={{marginLeft:60, marginRight:20}}>
            <span>입력할 항목</span>
            <select className='drop' onChange={(e)=>{
                setComdState(e.target.value);
                setScore(0);
            }
                } style={Style}>
                <option value="댓글작성" selected={type == COMMENTS ? true : false}>댓글작성</option>
                <option value="후기작성" selected={type == REVIEW ? true : false}>후기작성</option>
            </select>
            {comdState == "후기작성" ? setStarMenu(setScore) :""}

        </div>
        <div className='fullWidth divFlex'>
            <input className='deTailPut' type="text" onChange={(e)=> setText(e.target.value)}/>
            <button className='blueBtn bHover' onClick={() => {

            }}>등록</button>

        </div>

    </div>
    );
};

export default RepleBox;