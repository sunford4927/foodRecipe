
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
    onAuthStateChanged
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
    console.log(auth.name);
    
    return createUserWithEmailAndPassword(auth, email, password);
};
  
  //Email 회원가입
export const loginEmail = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
};

const provider = new GoogleAuthProvider();
// export const loginGoogle = () => {
//     console.log(app)

//     return signInWithPopup(auth, provider);
// };

export const loginGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const googleUser = result.user;

    // 이메일로 등록된 계정이 있는지 확인
    const signInMethods = await fetchSignInMethodsForEmail(auth, googleUser.email);
    console.log(signInMethods)
    console.log(auth)
    if (signInMethods.length > 0 && !signInMethods.includes(GoogleAuthProvider.PROVIDER_ID)) {
      // 이메일로 등록된 계정이 있으며 Google 로그인이 아닌 다른 방식으로 등록된 경우 계정 연결
      const existingUser = await signInWithEmailAndPassword(auth, googleUser.email, prompt("Enter your password"));
      await linkWithCredential(existingUser.user, GoogleAuthProvider.credentialFromResult(result));
      console.log("Google 계정이 이메일 계정에 연결되었습니다.");
    } else {
      console.log("Google 로그인이 성공적으로 이루어졌습니다.");
    }
  } catch (error) {
    if (error.code === 'auth/credential-already-in-use') {
      const pendingCredential = GoogleAuthProvider.credentialFromError(error);
      const email = error.customData.email;

      const signInMethods = await fetchSignInMethodsForEmail(auth, email);
      if (signInMethods.includes(EmailAuthProvider.EMAIL_PASSWORD_SIGN_IN_METHOD)) {
        const password = promptUserForPassword();
        const emailUser = await signInWithEmailAndPassword(auth, email, password);
        await linkWithCredential(emailUser.user, pendingCredential);
        console.log("이메일과 비밀번호로 로그인한 후 Google 계정이 연결되었습니다.");
      } else {
        console.error("이미 존재하는 계정과 연결할 수 없습니다.");
      }
    } else {
      console.error('Google 로그인 중 오류가 발생했습니다:', error);
    }
  }
};

// 비밀번호를 사용자로부터 입력받는 함수
const promptUserForPassword = () => {
  return prompt("Enter your password for your existing account:");
};

export const logout = async () => {


  try {
    const auth = getAuth();
    await signOut(auth);
    //setAuthInfo(initialState);
  } catch ({ code, message }) {
    alert("로그아웃 오류 발생");
  }
};

export const changeState =() => {
  const is =onAuthStateChanged(auth, (humen) => {
    console.log("humen :", humen)
    if (humen)
    {
      console.log("true in");
      return true;
    }
    else 
    {
      console.log("false in");
      return false;
    }
  })
  return is;
}