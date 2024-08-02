import React, { useState } from 'react';
import { signupEmail } from '../../util/auth/firebase';
import { updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { sendPost, URL } from '../../util/util';

const CreateUser = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [nick, setNick] = useState();

    const nav = useNavigate();
    const handleSignup = async (event) => {
        event.preventDefault();
        try {
            const userCredential = await signupEmail(email, password);
            const user = userCredential.user;
            
            sendPost(URL+"/userInfo", null, {email : email, nick : nick});
            // displayName 설정
            await updateProfile(user,{
                displayName: nick
            })
            nav(-1);
        } catch (error) {
            console.log(error.message);
        }
    };
    return (
        <div className='Logininner'>
            <div className='inner login'>
                <h2>회원가입</h2>
                <input type="email" onChange={e => setEmail(e.target.value)} placeholder='이메일' name="email"/> <br/>
                <input type="password" name='pw' onChange={e => setPassword(e.target.value)}placeholder='비밀번호'/>  <br/> 
                <input type="text" name='nick' onChange={e => setNick(e.target.value)}placeholder='닉네임'/>  <br/> 
                <div style={{display: "flex", justifyContent : "space-around"}}>
                    <button className='blueBtn oneBtn bHover' onClick={(e)=>{handleSignup(e)}
                                                } >가입</button>    

                </div> 

            </div>
        </div>
    );
};

export default CreateUser;