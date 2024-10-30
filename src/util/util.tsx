import axios from 'axios'
import star from '../img/별.png'
import emptyStar from '../img/빈별.png'
import RecipeItem from '../components/recipeitem/RecipeItem'

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

interface postData {
    email: string;
    nick: string;
}


export function sendPost(url : string, func=null, data : postData)
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

//export const URL = "http://192.168.219.111:5000";
// export const URL = "http://192.168.56.1:5000";
export const URL = "http://192.168.1.69:5000"; //상현ip



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
export const COMMENTS = "댓글"
export const TOCOMMENTS = "대댓글"
export const ALLUSER = "모든유저"
//     axios
//     .delete("hello",{
//         data: {
//             key : 1,
//             title: "플라스크제목"
//             // 프론트가 데이터 보내는 작업 for delete
//         }
//     })