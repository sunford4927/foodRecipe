import React, { useEffect, useState } from 'react';
import { changeState, getCurUser, loginEmail, loginGoogle, logout } from '../../util/auth/firebase';
import './Login.scss';
import googleIcon from "../../img/구글아이콘.png";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setuserinfo } from '../../redux/actions';

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isLogin, setIsLogin] = useState<boolean>(false);
    const dispatch = useDispatch();    
    const nav = useNavigate();

    function checkLogin() {
        logout();
        changeState(setIsLogin);
    }

    useEffect(() => {
        checkLogin();
    }, []);

    return (
        <div className='Logininner'>
            <div className='inner login'>
                <h2>로그인</h2>
                
                <input 
                    type="text" 
                    onChange={e => setEmail(e.target.value)} 
                    placeholder='아이디' 
                    name="email" 
                /> <br/>
                <input 
                    type="password" 
                    name='pw' 
                    onChange={e => setPassword(e.target.value)} 
                    placeholder='비밀번호' 
                />  <br/> 
                <div style={{display: "flex", justifyContent: "space-around"}}>
                    <button 
                        className='blueBtn twoBtn bHover' 
                        onClick={() => nav("/join")}
                    >
                        회원가입
                    </button>    
                    <button 
                        className='blueBtn twoBtn bHover' 
                        onClick={() => {
                            if (isLogin) {
                                logout();
                            } else {
                                loginEmail(email, password)
                                    .then(res => {
                                        dispatch(setuserinfo(res.user));
                                        nav("/");
                                    })
                                    .catch((error) => {
                                        console.log(error.code);
                                        if (error.code === "auth/missing-email") {
                                            alert("이메일을 잘못 입력하셨습니다");
                                        } else if (error.code === "auth/invalid-credential") {
                                            alert("간편로그인으로 가입된 사용자입니다");
                                        }
                                    });
                            }
                        }}
                    >
                        {isLogin ? "로그아웃" : "로그인"}
                    </button> 
                </div> 
                <br />
                <div style={{display: 'flex', justifyContent: 'center'}}>
                    <button 
                        className='bHover' 
                        onClick={() => {
                            loginGoogle()
                                .then(result => {
                                    console.log(result);
                                    dispatch(setuserinfo(result));
                                    nav("/");
                                })
                                .catch(error => {
                                    console.error(error);
                                });
                        }}
                    >
                        <img className='icon' src={googleIcon} alt="Google Icon" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;
