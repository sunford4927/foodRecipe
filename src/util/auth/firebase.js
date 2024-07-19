
import { initializeApp } from "firebase/app";
import { getAuth,// authentication 설정
    signInWithPopup, //google 로그인을 팝업창에 띄우기 위해
    GoogleAuthProvider, //google login 기능
    signInWithEmailAndPassword,// email 로그인
    createUserWithEmailAndPassword,
    getRedirectResult,
    updateProfile, 
} from "firebase/auth";  


// 회원가입 순서에따른 상태가 다름
// 이메일과 비밀번호로 회원가입을 하면 : 구글 로그인 연동가능
// 구글 api 로 회원가입을 하면 비밀번호 로그인이 안됨

const firebaseConfig = {
    apiKey: "AIzaSyDLg5H8T3GT__N2UaCUE5DBh8wgy4NsegI",
    authDomain: "testbase-9e244.firebaseapp.com",
    projectId: "testbase-9e244",
    storageBucket: "testbase-9e244.appspot.com",
    messagingSenderId: "607789824772",
    appId: "1:607789824772:web:7eb011307f23626caeae51"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth();

//Email 로그인
export const signupEmail = (email, password) => {
    console.log(auth.name);
    
    return createUserWithEmailAndPassword(auth, email, password);
};
  
  //Email 회원가입
export const loginEmail = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
};

const provider = new GoogleAuthProvider();
export const loginGoogle = () => {
  return signInWithPopup(auth, provider);
};