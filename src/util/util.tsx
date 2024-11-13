import axios from 'axios'
import star from '../img/별.png'
import emptyStar from '../img/빈별.png'
import RecipeItem from '../components/recipeitem/RecipeItem'



export function recipeCategory(List : string){
    const data = {
        type: ["전체", "밑반찬", "메인반찬", "국/탕", "찌개", "디저트", "면/만두", "밥/죽/떡", "퓨전", "김치/젓갈/장류", "양념/소스/잼", "양식", "샐러드", "스프", "빵", "과자", "차/음료/술", "기타"],
        state: ['전체', '일상', '초스피드', '손님접대', '술안주', '다이어트', '도시락', '영양식', '간식', '야식', '푸드스타일링', '해장', '명정', '명절', '이유식', '기타'],
        ingredient: ['전체', '소고기', '돼지고기', '닭고기', '육류', '채소류', '해물류', '달걀/유제품', '가공식품류', '쌀', '밀가루', '건어물류', '버섯류', '과일류', '콩/견과류', '곡류', '기타'],
        method: ['전체', '볶음', '끓이기', '부침', '조림', '무침', '비빔', '찜', '절임', '튀김', '삶기', '굽기', '데치기', '회', '기타']
    }[List]
    return data;
}

export function recipeInfo(List : string){
    const data = {
        inbun: ["1인분", "2인분", "3인분", "4인분", "5인분", "6인분 이상"],
        time: ['5분이내', '10분이내', '15분이내', '20분이내', '30분이내', '60분이내', '90분이내', '2시간이내', '2시간이상'],
        level: ['아무나', '초급', '중급', '고급', '신의경지']
    }[List]
    return data;
}

// 로컬 스토리지에 저장할 이메일 정보에 대한 키값
export const LOCALEMAIL : string = "EMAIL"

export function setScore(idx : any){
    let stars = []
    
    for(let i = 0; i<5; i++)
    {
        if(i<idx)
        {
            stars.push(<img key={i} className='star' src={star} alt='별'/>)
        }
        else{
            stars.push(<img key={i} className='star' src={emptyStar} alt='별'/>)
        }
    }
    return stars;
}

export function sendGet(url : string, func : any = null , data : any =null){
    
    axios
        .get(url, {
            data : data,
        })
        .then(res => {
            
            if(func != null)
            {
                func(res.data)
            }
        })
}



export function sendPost(url : string, func=null, data : any)
{
    axios
        .post(url, {
            data : data
        })
        .then(res => {
            // func(res.data)
        })
        
}

export function sendDel(url : string, func=null, data=null)
{
    axios
        .delete(url, {
            data : data
        })
        .then(res => {
            // func(res.data)
        })
}


// export const URL = "http://192.168.1.69:5000"; //상현ip
export const URL = "http://192.168.1.23:5000"; //지원ip



export function setView(list : any){
    
    const result = list.map((item : any, i : number)=>{
        return <RecipeItem key={item.RCP_SNO} item={item} idx ={i} />
    })
    return result;
}

export function upScroll() {
    window.scrollTo(0, 0)
}

export function pathToStr(str : string){
    return str.replaceAll("/","$");
}

export function strToPath(str : string){
    return str.replaceAll("$","/");
}

interface Result {
    inputName: string[];
    inputCount: string[];
}


export function strDivide(str : string){
    let result : Result= {
        inputName : [],
        inputCount : [],
    }
    str.replace("[재료]","").split("|").map((item)=>{
        let list : string[]= item.split(" ");
        result.inputName.push(list[1])
        result.inputCount.push(list[2])
    })
    return result
}

export function setStarMenu(func :any)
{
    let List = []
    for(let i =1; i< 6; i++)
    {
        List.push(<img key={i} className={'star comdStar'} src={emptyStar} onClick={(e)=>{
            func(i);
            changeStar(List,i);
        }}/>)
    }
    return List;
}

function changeStar(list : any, idx : any)
{
    let before : HTMLCollectionOf<HTMLImageElement> = document.getElementsByClassName('comdStar') as HTMLCollectionOf<HTMLImageElement>;

    for(let i = 0; i< before.length; i++)
    {
        if(i<idx)
        {
            before[i].src  = star;
        }
        else
        {
            before[i].src = emptyStar;
        }

    }
}


export const REVIEW = "요리 후기";
export const COMMENTS = "댓글";
export const TOCOMMENTS = "대댓글";
export const ALLUSER = "모든유저";

// 회원가입 정규식
export const inputRegexs = {
    // 아이디 : 문자로 시작하여, 영문자, 숫자, 하이픈(-), 언더바(_)를 사용하여 3~20자 이내
    idRegex: /^[a-zA-Z][a-zA-Z0-9_-]{2,19}$/,
    // 비밀번호 : 최소 8자 이상, 최소한 하나의 대문자, 하나의 소문자, 하나의 숫자, 하나의 특수문자를 포함, 공백 허용하지 않음
    pwRegex: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=!])(?!.*\s).{8,}$/,
    // 닉네임 : 영어 대/소문자, 숫자, 한글 자모음 조합, 2~10자 이내
    nicknameRegex: /^[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣]{2,10}$/,
};


// 0 개발, 1 배포
export const DEVALOPTYPE :number = 0;

// recipeTitle
// cookIntro
// movieURL
// category : 종류별///상황별///재료별///방법별
// cookInfo
// 재료정보
// 요리순서
// list , setList , index 
// const list =[{
//     inputTitle : "",
//     value : [{
//         이름 : "",
//         수량 : "",
//         단위 : "",
//         비고 : ""
//     }]
// },,,]
