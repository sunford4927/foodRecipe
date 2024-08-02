
import { initializeApp } from "firebase/app";
import { // authentication 설정

    getAuth,
    signInWithPopup,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    fetchSignInMethodsForEmail,
    linkWithCredential,
    EmailAuthProvider,
    signOut,
    onAuthStateChanged,
    AuthCredential,
    getRedirectResult,
    linkWithPopup
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

const auth = getAuth(app);

//Email 로그인
export const signupEmail = (email, password) => {
    

    return createUserWithEmailAndPassword(auth, email, password);
};

//Email 회원가입
export const loginEmail = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
};

const provider = new GoogleAuthProvider();
export const loginGoogle = async () => {
    let curUser = getCurUser();
    // 이메일로 등록된 계정이 있는지 확인

    if (curUser) {
        // 로그인이 되어있을 시 자격증명 연결
        linkWithPopup(curUser, provider)

        console.log("계정연결 완료")
        return curUser;
    }
    else{
        // 비로그인 상태일 땐 구글로그인 
        const googleResult = await signInWithPopup(auth, provider)
        console.log("google Login Success")
        return googleResult.user
    }
};


export const logout = async () => {


    try {
        await signOut(auth);
        //setAuthInfo(initialState);
    } catch ({ code, message }) {
        alert("로그아웃 오류 발생");
    }
};

export const changeState = async (func) => {
    // onAuthStateChanged 는 auth객체에 로그인 유무에대한 이벤트를 등록한다
    // func 에 setState 함수를 받아서 불리언데이터를 변경시킴
    return onAuthStateChanged(auth, (humen) => {
        if (humen) {
            func(true);
        }
        else {
            func(false);
        }
    })
}

export const getCurUser = () => {
    return auth.currentUser;
}