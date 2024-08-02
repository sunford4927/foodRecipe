
import { setScore } from '../../util/util';
import Profile from '../../img/프로필.png'
const ReviewComments = ({type, data}) => {
    console.log(data.show)
    return (
        <>
            <img className='pp' src={Profile} alt="프로필" />
            <div>
                {
                type=="요리 후기"?
                <div>
                    <span>
                        {data.USER_NM + "  " + data.REVIEW_REG_DT + "  " } 
                    </span>
                    {setScore(data.REVIEW_SCORE)}
                    {data.show ? <span>답글</span>:""}
                </div>
                :
                <span>
                    {data.USER_NM + "  " + data.REVIEW_REG_DT + " | 답글 | 신고" }
                </span>
                }
                <p>{data.value}</p>
            </div>
        </>
    );
};

export default ReviewComments; 