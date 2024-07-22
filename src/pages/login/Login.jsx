import React, { useState } from 'react';
import { loginEmail, loginGoogle } from '../../util/auth/firebase';
import './Login.scss'
import googleIcon from "../../img/구글아이콘.png"
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    
    const nav = useNavigate();
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
                                                        loginEmail(email,password).then(res => {
                                                            console.log(res)
                                                        })
                                                        .catch((error) => console.log(error));
                                                    }
                                                } >로그인</button>    
                </div> 
                <br />
                <div style={{display : 'flex', justifyContent : 'center'}}>
                    <button className='bHover' onClick={()=>{
                                            loginGoogle()
                                            .then(function (result) {
                                                console.log("result", result);
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