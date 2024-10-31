import React, { useState } from 'react';
import { ALLUSER, COMMENTS, REVIEW, sendPost, setStarMenu, URL } from '../../util/util';
import { State } from 'redux/reducer';
import { useSelector } from 'react-redux';
import { userInfoType } from 'redux/actions/ActionTypes';

interface RepleBoxProps {
    type: string;
    pageNumber : string;
}

interface SendData {
    sno: string,
    user_nm: string,
    user_email: string,
    comment?: string,// 선택적 속성
    review?: string,   // 선택적 속성
    score?: number,    // 선택적 속성
    identify?: string, // 선택적 속성
}

const RepleBox: React.FC<RepleBoxProps> = ({ type, pageNumber }) => {
    const Style: React.CSSProperties = {
        marginLeft: 40,
        marginRight: 20,
    };
    
    if (type !== ALLUSER) {
        Style.pointerEvents = "none";
    }

    const [comdState, setComdState] = useState<string>("");
    const [score, setScore] = useState<number>(0);
    const [text, setText] = useState<string>("");

    const { nick, email }  = useSelector((state:State) => state.user)
    return (
        <div className='container'>
            <div className='flex_left flex_wrap_row_center' style={{ marginLeft: 60, marginRight: 20 }}>
                <span>입력할 항목</span>
                <select
                    className='drop'
                    onChange={(e) => {
                        setComdState(e.target.value);
                        setScore(0);
                    }}
                    style={Style}
                >
                    <option value="댓글작성" selected={type === COMMENTS}>댓글작성</option>
                    <option value="후기작성" selected={type === REVIEW}>후기작성</option>
                </select>
                {comdState === "후기작성" ? setStarMenu(setScore) : null}
            </div>
            <div className='fullWidth divFlex'>
                <input
                    className='deTailPut'
                    type="text"
                    onChange={(e) => setText(e.target.value)}
                />
                <button
                    className='blueBtn bHover'
                    onClick={() => {
                        let sendData : SendData= {
                            sno : pageNumber,
                            user_nm : nick,
                            user_email : email,
                        }
                        
                        if(comdState === "댓글작성")
                        {
                            sendData.comment = text;
                            sendData.identify = "COM";
                        }
                        else{
                            sendData.identify = "REV";
                            sendData.review = text;
                            sendData.score = score;
                        }
                        // 등록 로직 추가
                        sendPost(URL+"/upLoadRC", null, sendData)
                    }}
                >
                    등록
                </button>
            </div>
        </div>
    );
};

export default RepleBox;
