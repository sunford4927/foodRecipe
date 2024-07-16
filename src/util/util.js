import star from '../img/별.png'
import emptyStar from '../img/빈별.png'

export function setScore(idx){
    let stars = []
    
    for(let i = 0; i<5; i++)
    {
        if(i<idx)
        {
            stars.push(<img className='star' src={star} alt='별'/>)
        }
        else{
            stars.push(<img className='star' src={emptyStar} alt='별'/>)
        }
    }
    return stars;
}