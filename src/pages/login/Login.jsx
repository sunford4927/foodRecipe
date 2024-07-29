import React, { useEffect, useState } from 'react';
import { changeState, getCurUser, loginEmail, loginGoogle, logout } from '../../util/auth/firebase';
import './Login.scss'
import googleIcon from "../../img/구글아이콘.png"
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setuserinfo } from '../../redux/actions';

// 파이어베이스 데이터 베이스 확인 주소
// /https://console.firebase.google.com/project/testbase-9e244/overview?hl=ko


const Login = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [isLogin, setIsLogin] = useState(false);
    const dispatch = useDispatch();    
    const nav = useNavigate();

    
    function checkLogin(){
        logout();
        changeState(setIsLogin);
    }

    useEffect(()=>{
        
        checkLogin();
    },[])
    return (
        <div className='Logininner'>
            <div className='inner login'>
                <h2>로그인</h2>
                
                <input type="text" onChange={e => setEmail(e.target.value)} placeholder='아이디' name="email"/> <br/>
                <input type="password" name='pw' onChange={e => setPassword(e.target.value)}placeholder='비밀번호'/>  <br/> 
                <div style={{display: "flex", justifyContent : "space-around"}}>
                    <button className='blueBtn twoBtn bHover' onClick={(e)=>{nav("/join")}
                                                } >회원가입</button>    
                    <button className='blueBtn twoBtn bHover' onClick={()=>{
                                                        isLogin ?
                                                        logout() :
                                                        loginEmail(email,password).then(res => {
                                                            dispatch(setuserinfo(res.user));
                                                            
                                                            nav("/");
                                                        })                                                      
                                                        .catch((error) => {
                                                            console.log(error.code)
                                                            if(error.code == "auth/missing-email")
                                                            {
                                                                alert("이메일을 잘못 입력하셧습니다")
                                                            }
                                                            else if(error.message == "auth/invalid-credential")
                                                            {
                                                                alert("간편로그인으로 가입된 사용자 입니다")
                                                            }
                                                        });
                                                    }
                                                } >{isLogin?"로그아웃" : "로그인"}</button> 
                </div> 
                <br />
                <div style={{display : 'flex', justifyContent : 'center'}}>
                    <button className='bHover' onClick={()=>{
                                            loginGoogle()
                                            .then(function (result) {
                                                console.log(result);
                                                dispatch(setuserinfo(result));
                                                nav("/");
                                            })
                                            .catch(function (error) {
                                                
                                            console.error(error);
                                            })
                                        }
                                    }>
                        <img className='icon' src={googleIcon}/>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Login;