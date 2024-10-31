import React, { useState } from 'react';
import { signupEmail } from '../../util/auth/firebase';
import { updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { DEVALOPTYPE, inputRegexs, sendPost, URL } from '../../util/util.tsx';

interface inputValueType {
    emailId: string, // 입력된 이메일 아이디 데이터
    emailAddress: string, // 선택된 이메일 도메인 데이터
    validEmail: boolean, // 이메일 인증 여부
    pw: string // 입력된 패스워드 데이터
    validPw: boolean, // 패스워드 정규식 충족여부
    pwCheck: string, // 입력된 패스워드 확인 데이터
    correctPwCheck: boolean,  // 패스워드 데이터와 일치하는지 여부
    nickName: string, // 입력된 사용자 이름 데이터
    validNickName: boolean, // 닉네임 정규식 중복확인 여부
    nonNickNameDuplication: boolean // 닉네임 중복확인 여부
}

// 회원가입 페이지
const CreateUser: React.FC = () => {
    const [inputValue, setInputValue] = useState<inputValueType>({
        emailId: "", // 입력된 이메일 아이디 데이터
        emailAddress: "", // 선택된 이메일 도메인 데이터
        validEmail: false, // 이메일 인증 여부 
        pw: "", // 입력된 패스워드 데이터
        validPw: false, // 패스워드 정규식 충족여부
        pwCheck: "", // 입력된 패스워드 확인 데이터
        correctPwCheck: false,  // 패스워드 데이터와 일치하는지 여부
        nickName: "", // 입력된 사용자 이름 데이터
        validNickName: false, // 닉네임 정규식 중복확인 여부
        nonNickNameDuplication: true // 닉네임 중복확인 여부
    })

    // 조건에 부합하지 않는 경우 빨간글씨 경고 문구
    const [alertMessage, setAlertMessage] = useState({
        email: "사용할 수 없는 이메일 입니다.",
        pw: "사용할 수 없는 비밀번호 입니다.",
        pwCheck: "비밀번호가 일치하지 않습니다.",
        nickname: "사용할 수 없는 닉네임 입니다.",
    });

    // 조건에 부합할 경우 초록글씨 경고 문구
    const [passMessage, setPassMessage] = useState({
        email: "사용할 수 있는 이메일 입니다.",
        pw: "사용할 수 있는 비밀번호 입니다.",
        pwCheck: "비밀번호가 일치 합니다.",
        nickname: "사용할 수 있는 닉네임 입니다.",
    });

    const submitRequirements: boolean =
        Boolean(inputValue.emailId) &&
        Boolean(inputValue.emailAddress) &&
        inputValue.validEmail &&
        Boolean(inputValue.pw) &&
        Boolean(inputValue.validPw) &&
        Boolean(inputValue.pwCheck) &&
        inputValue.correctPwCheck &&
        Boolean(inputValue.nickName) &&
        inputValue.validNickName &&
        inputValue.nonNickNameDuplication;


    const nav = useNavigate();

    const handleSignup = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const userCredential = await signupEmail(inputValue.emailId + "@" + inputValue.emailAddress, inputValue.pw);
            const user = userCredential.user;

            await sendPost(URL + "/userInfo", null, { email: inputValue.emailId + "@" + inputValue.emailAddress, nick: inputValue.nickName });

            // displayName 설정
            await updateProfile(user, {
                displayName: inputValue.nickName
            });
            nav(-1);
        } catch (error: unknown) {
            if (error instanceof Error) {
                console.log(error.message); // Error 객체일 경우
            } else {
                console.log('Unknown error:', error); // 다른 타입의 에러
            }
        }
    };

    return (
        <div className='Logininner'>
            <div className='inner login'>
                <h2>회원가입</h2>
                <form onSubmit={handleSignup} >
                    <input
                        type="text"
                        onChange={e => {
                            
                            // 이메일 아이디 정규식 코드
                            let check = false;
                            if(DEVALOPTYPE === 0)
                            {
                                check = true;
                            }
                            else if(DEVALOPTYPE === 1)
                            {
                                check = inputRegexs.idRegex.test(e.target.value);
                            }

                            setInputValue(
                                {
                                    ...inputValue,
                                    emailId: e.target.value,
                                    validEmail: check
                                }
                            )
                        }
                        }
                        placeholder='이메일'
                        name="emailId"

                    /> &nbsp; @ &nbsp;
                    <select name="emailAddress" onChange={e => {
                        setInputValue(
                            {
                                ...inputValue,
                                emailAddress: e.target.value
                            }
                        )
                    }
                    }
                    
                    >
                        <option value="naver.com">naver.com</option>
                        <option value="kakao.com">kakao.com</option>
                        <option value="gmail.com">gmail.com</option>
                    </select> {inputValue.validEmail ? passMessage.email: alertMessage.email} 
                    <br />
                    <input
                        type="password"
                        name='pw'
                        onChange={e => {
                            // 비밀번호 정규식 코드
                            let check = false;
                            if(DEVALOPTYPE === 0)
                            {
                                check = true;
                            }
                            else if(DEVALOPTYPE === 1)
                            {
                                check = inputRegexs.pwRegex.test(e.target.value);
                            }
                            

                            setInputValue(
                                {
                                    ...inputValue,
                                    pw: e.target.value,
                                    validPw: check
                                }
                            )
                        }
                        }
                        placeholder='비밀번호'
                        // required
                    />  
                    &nbsp; {inputValue.validPw ? passMessage.pw: alertMessage.pw}
                    <br/>
                    <input
                        type="password"
                        name='pwCheck'
                        onChange={e => {
                            // 비밀번호 확인 유효성 검사 코드
                            let check = false;
                            if(DEVALOPTYPE === 0)
                            {
                                check = true;
                            }
                            else if(DEVALOPTYPE === 1)
                            {
                                if (inputValue.pw === e.target.value)
                                    {
                                        check = true;
                                    }
                            }
                            
                            



                            setInputValue(
                                {
                                    ...inputValue,
                                    pwCheck: e.target.value,
                                    correctPwCheck : check
                                }
                            )
                        }
                        }
                        placeholder='비밀번호 확인'
                        // required
                    /> 
                    &nbsp; {inputValue.correctPwCheck ? passMessage.pwCheck: alertMessage.pwCheck}
                    <br />
                    <input
                        type="text"
                        name='nick'
                        onChange={e => {
                            // 닉네임 정규식 코드
                            let check = false;
                            if(DEVALOPTYPE === 0)
                            {
                                check = true;
                            }
                            else if(DEVALOPTYPE === 1)
                            {
                                check = inputRegexs.nicknameRegex.test(e.target.value);
                            }
                            
                            setInputValue(
                                {
                                    ...inputValue,
                                    nickName: e.target.value,
                                    validNickName: check
                                }
                            )
                        }
                        }
                        placeholder='닉네임'
                        // required
                    />  
                    &nbsp; {inputValue.nickName ? passMessage.nickname: alertMessage.nickname}
                    <br />
                    <div style={{ display: "flex", justifyContent: "space-around" }}>
                        <button
                            type="submit"
                            className='blueBtn oneBtn bHover'
                            disabled={!submitRequirements}
                            
                        >
                            가입
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateUser;
