import React from 'react';
import { setScore } from '../../util/util';
import Profile from '../../img/프로필.png';

interface ReviewCommentsProps {
    type: string;
    data: {
        USER_NM: string;
        REVIEW_REG_DT: string;
        REVIEW_SCORE?: number;
        value: string;
        show?: boolean;
    } ;
}

const ReviewComments: React.FC<ReviewCommentsProps> = ({ type, data }) => {
    return (
        <>
            <img className='pp' src={Profile} alt="프로필" />
            <div>
                {type === "요리 후기" ? (
                    <div>
                        <span>
                            {data.USER_NM + "  " + data.REVIEW_REG_DT + "  "}
                        </span>
                        {setScore(data.REVIEW_SCORE)}
                        {data.show ? <span>답글</span> : ""}
                    </div>
                ) : (
                    <span>
                        {data.USER_NM + "  " + data.REVIEW_REG_DT + " | 답글 | 신고"}
                    </span>
                )}
                <p>{data.value}</p>
            </div>
        </>
    );
};

export default ReviewComments;
