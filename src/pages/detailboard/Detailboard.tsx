import React, { useEffect, useState } from 'react';
import NullImg from '../../img/빈사진.png';
import Profile from '../../img/프로필.png';
import { useParams } from 'react-router-dom';
import './DetailBoard.scss';
import TOGETHER from '../../img/인분.png';
import LEVEL from '../../img/난이도.png';
import TIME from '../../img/시계.png';
import KAKAO from '../../img/카카오톡.png';
import FACEBOOK from '../../img/페이스북.png';
import TWITER from '../../img/트위터.png';
import { ALLUSER, COMMENTS, REVIEW, sendGet, strDivide, URL } from '../../util/util.tsx';
import ReviewComments from '../../components/reviewcomments/ReviewComments';
import { useSelector } from 'react-redux';
import RepleBox from '../../components/replebox/RepleBox';

interface InputList {
    USER_NM: string;
    RCP_TTL: string;
    CK_INFO: string;
    CK_INBUN_NM: string;
    CK_TIME_NM: string;
    CK_LEVEL_NM: string;
    CK_INPUT_CON: {
        inputName: string[];
        inputCount: string[];
    };
}

const Detailboard: React.FC = () => {
    const [inputList, setInputList] = useState<InputList>({
        USER_NM: '',
        RCP_TTL: '',
        CK_INFO: '',
        CK_INBUN_NM: '',
        CK_TIME_NM: '',
        CK_LEVEL_NM: '',
        CK_INPUT_CON: {
            inputName: [],
            inputCount: []
        }
    });

    const [reviewList, setReviewList] = useState<any[]>([]);
    const [comdList, setComdList] = useState<any[]>([]);
    const { pathNo } = useParams<{ pathNo: string }>();

    useEffect(() => {
        sendGet(`${URL}/detail_board?sno=${pathNo}`, initData, null);
        sendGet(`${URL}/getReview?rcp_sno=${pathNo}`, setReviewList);
        sendGet(`${URL}/getComment?rcp_sno=${pathNo}`, setComdList);
    }, [pathNo]);

    useEffect(() => {
        console.log(reviewList);
    }, [reviewList]);

    const Name = useSelector((state: any) => state.user);
    
    const [isCheck, setIsCheck] = useState<boolean>(false);
    
    useEffect(() => {
        if (inputList.USER_NM === Name?.displayName) {
            setIsCheck(true);
        }
    }, [inputList, Name]);

    function initData(data: any) {
        console.log(data)
        const result: InputList = { ...data[0], CK_INPUT_CON: strDivide(data[0].CK_INPUT_CON) };
        setInputList(result);
    }

    return (
        <div className='inner'>
            <div className='container'>
                <div>
                    <img className='mp' src={NullImg} alt="상세 음식사진" />
                </div>
                <div className='userBox_row'>
                    <img className='pp cursor' src={Profile} alt="프로필 사진" />
                    <span>{inputList.USER_NM}</span>
                </div>
                <h2>{inputList.RCP_TTL}</h2>
                <p>{inputList.CK_INFO}</p>
                <div className='divFlex'>
                    <div className='divFlexRow'>
                        <img className='sp' src={TOGETHER} alt="인분" />
                        <span>{inputList.CK_INBUN_NM}</span>
                    </div>
                    <div className='divFlexRow'>
                        <img className='sp' src={TIME} alt="시간" />
                        <span>{inputList.CK_TIME_NM}</span>
                    </div>
                    <div className='divFlexRow'>
                        <img className='sp' src={LEVEL} alt="난이도" />
                        <span>{inputList.CK_LEVEL_NM}</span>
                    </div>
                </div>
                <div className='divFlex'>
                    <img className='sp circle cursor' src="https://recipe1.ezmember.co.kr/img/mobile/icon_url_copy.gif" alt="URL복사" />
                    <img className='sp cursor' src={KAKAO} alt="카카오톡" />
                    <img className='sp cursor' src={FACEBOOK} alt="페이스북" />
                    <img className='sp cursor' src={TWITER} alt="트위터" />
                </div>
                <div className='divFlex'>
                    <img className='cursor' src="https://recipe1.ezmember.co.kr/img/btn2_id.png" alt="아이디확인" />
                    <img className='cursor' src="https://recipe1.ezmember.co.kr/img/btn2_note.png" alt="메모" />
                    <img className='cursor' src="https://recipe1.ezmember.co.kr/img/btn2_error.png" alt="오류신고" />
                    <img className='cursor' src="https://recipe1.ezmember.co.kr/img/btn2_print.png" alt="레시피출력" />
                </div>
            </div>

            <div className='container'>
                <h2>재료</h2>
                <p>[재료]</p>
                <div className='middleWidth flex_justify flex_wrap'>
                    {inputList.CK_INPUT_CON.inputName.map((item, idx) => (
                        <div key={idx} className='divFlex_between'>
                            <span>{item}</span>
                            <span>{inputList.CK_INPUT_CON.inputCount[idx]}</span>
                            <span>구매</span>
                        </div>
                    ))}
                </div>
                <h2>조리도구</h2>
            </div>

            <div className='container'>
                <h2>조리순서</h2>
            </div>
            <div className='container'>
                <h2>레시피 작성자</h2>
                <div className='flex_wrap flex_left'>
                    <img className='pp' src={Profile} alt="프로필" />
                    <span>{inputList.USER_NM}</span>
                </div>
            </div>

            <div className='container'>
                <h2>{REVIEW} <span>{reviewList.length}</span></h2>
                {reviewList.length > 0 && reviewList.map((item, index) => (
                    <div key={index} className='flex_wrap flex_left border_bottom fullWidth'>
                        <ReviewComments 
                            type={REVIEW} 
                            data={{
                                USER_NM: item.USER_NM,
                                REVIEW_REG_DT: item.REVIEW_REG_DT,
                                REVIEW_SCORE: item.REVIEW_SCORE,
                                value: item.REVIEW_COMMENT,
                                show: isCheck
                            }} 
                        />
                    </div>
                ))}
            </div>

            <div className='container'>
                <h2>{COMMENTS} <span>{comdList.length}</span></h2>
                {comdList.length > 0 && comdList.map((item, index) => (
                    <div key={index} className='flex_wrap flex_left border_bottom fullWidth'>
                        <ReviewComments 
                            type={COMMENTS} 
                            data={{
                                USER_NM: item.USER_NM,
                                REVIEW_REG_DT: item.COMMENTS_REG_DT,
                                value: item.COMMENTS
                            }} 
                        />
                    </div>
                ))}
            </div>

            {!isCheck && <RepleBox type={ALLUSER} />}
        </div>
    );
};

export default Detailboard;
