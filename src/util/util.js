import axios from 'axios'
import star from '../img/별.png'
import emptyStar from '../img/빈별.png'

export function setScore(idx){
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

export function sendGet(url, data=null, func){
    
    axios
        .get(url, {
            data : data,
        })
        .then(res => {
            func(res.data)
        })
}

//     axios
//     .delete("hello",{
//         data: {
//             key : 1,
//             title: "플라스크제목"
//             // 프론트가 데이터 보내는 작업 for delete
//         }
//     })