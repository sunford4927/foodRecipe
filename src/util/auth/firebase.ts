
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
    linkWithPopup,
    UserCredential
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
export const signupEmail = (email: string, password: string) => {


    return createUserWithEmailAndPassword(auth, email, password);
};

//Email 회원가입
export const loginEmail = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
};

const provider = new GoogleAuthProvider();
export const loginGoogle = async () => {
    let curUser = getCurUser();
    // 이메일로 등록된 계정이 있는지 확인

    if (curUser) {
        // 로그인이 되어있을 시 자격증명 연결
        linkWithPopup(curUser, provider)

        
        return curUser;
    }
    else {
        // 비로그인 상태일 땐 구글로그인 
        const googleResult = await signInWithPopup(auth, provider)

        return googleResult.user
    }
};


export const logout = async () => {
    try {
        await signOut(auth);
        //setAuthInfo(initialState);
    } catch (error:any) {
        checkError(error.code);
    }
};

export const changeState = async (func: (state: boolean) => void) => {
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

export function checkError(code : string)
{
    switch (code) {
        case 'auth/invalid-email':
            alert('잘못된 이메일 형식입니다.');
            break;
        case 'auth/user-disabled':
            alert('해당 사용자가 비활성화되었습니다.');
            break;
        case 'auth/user-not-found':
            alert('사용자 정보를 찾을 수 없습니다.');
            break;
        case 'auth/wrong-password':
            alert('비밀번호 또는 이메일이 올바르지 않습니다.');
            break;
        case 'auth/email-already-in-use':
            alert('이 이메일 주소는 이미 사용 중입니다.');
            break;
        case 'auth/operation-not-allowed':
            alert('이 작업이 허용되지 않습니다.');
            break;
        case 'auth/weak-password':
            alert('비밀번호가 너무 약합니다.');
            break;
        case 'auth/too-many-requests':
            alert('너무 많은 요청이 발생했습니다. 잠시 후 다시 시도하십시오.');
            break;
        case 'not-found':
            alert('요청한 문서나 컬렉션을 찾을 수 없습니다.');
            break;
        case 'invalid-argument':
            alert('잘못된 인수가 포함되어 있습니다.');
            break;
        case 'deadline-exceeded':
            alert('요청의 기한이 초과되었습니다.');
            break;
        case 'permission-denied':
            alert('권한이 없어서 요청이 거부되었습니다.');
            break;
        case 'disconnected':
            alert('서버에 연결되어 있지 않습니다.');
            break;
        case 'operation-failed':
            alert('작업이 실패했습니다.');
            break;
        case 'storage/unauthorized':
            alert('요청이 허가되지 않았습니다.');
            break;
        case 'storage/canceled':
            alert('요청이 취소되었습니다.');
            break;
        case 'storage/unknown':
            alert('알 수 없는 오류가 발생했습니다.');
            break;
        case 'auth/invalid-credential':
            alert('비밀번호 또는 이메일이 올바르지 않습니다.');
            break;
        default:
            console.error('알 수 없는 오류:', code);
    }
}