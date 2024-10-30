import React, { useState } from 'react';
import { signupEmail } from '../../util/auth/firebase';
import { updateProfile } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { sendPost, URL } from '../../util/util';

const CreateUser: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [nick, setNick] = useState<string>('');

    const nav = useNavigate();

    const handleSignup = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            const userCredential = await signupEmail(email, password);
            const user = userCredential.user;

            await sendPost(URL + "/userInfo", null, { email: email, nick: nick });
            
            // displayName 설정
            await updateProfile(user, {
                displayName: nick
            });
            nav(-1);
        } catch (error : unknown) {
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
                <form onSubmit={handleSignup}>
                    <input 
                        type="email" 
                        onChange={e => setEmail(e.target.value)} 
                        placeholder='이메일' 
                        name="email" 
                        required 
                    /> <br />
                    <input 
                        type="password" 
                        name='pw' 
                        onChange={e => setPassword(e.target.value)} 
                        placeholder='비밀번호' 
                        required 
                    />  <br /> 
                    <input 
                        type="text" 
                        name='nick' 
                        onChange={e => setNick(e.target.value)} 
                        placeholder='닉네임' 
                        required 
                    />  <br /> 
                    <div style={{ display: "flex", justifyContent: "space-around" }}>
                        <button 
                            type="submit" 
                            className='blueBtn oneBtn bHover'
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
