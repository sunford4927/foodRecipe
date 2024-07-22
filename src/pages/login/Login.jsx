import React, { useState } from 'react';
import { changeState, loginEmail, loginGoogle } from '../../util/auth/firebase';
import './Login.scss'
import googleIcon from "../../img/구글아이콘.png"
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setuserinfo } from '../../redux/actions';
import { fetchSignInMethodsForEmail } from 'firebase/auth';


const Login = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [isLogin, setIsLogin] = useState(false);
    const dispatch = useDispatch();    
    const nav = useNavigate();

    function checkLogin(){
        let is = changeState()
        setIsLogin(changeState());
        console.log(is().isUnsubsoribad);
    }
    return (
        <div className='Logininner'>
            <div className='inner login'>
                <h2>로그인</h2>
                <h2>{isLogin ? "로그인 된 상태 입니다" : "로그아웃 된 상태 입니다."}</h2>
                <input type="text" onChange={e => setEmail(e.target.value)} placeholder='아이디' name="email"/> <br/>
                <input type="password" name='pw' onChange={e => setPassword(e.target.value)}placeholder='비밀번호'/>  <br/> 
                <div style={{display: "flex", justifyContent : "space-around"}}>
                    <button className='blueBtn twoBtn bHover' onClick={(e)=>{nav("/join")}
                                                } >회원가입</button>    
                    <button className='blueBtn twoBtn bHover' onClick={()=>{
                                                        loginEmail(email,password).then(res => {
                                                            dispatch(setuserinfo(res.user));
                                                            checkLogin();
                                                            
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
                                                } >로그인</button>    
                </div> 
                <br />
                <div style={{display : 'flex', justifyContent : 'center'}}>
                    <button className='bHover' onClick={()=>{
                                            loginGoogle()
                                            .then(function (result) {
                                                dispatch(setuserinfo(result.user));
                                                const email = fetchSignInMethodsForEmail(result.user,result.user.email)
                                                .then(res => console.log(res))
                                                
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