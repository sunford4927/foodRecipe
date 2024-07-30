import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { pathToStr } from '../../util/util';
import { useDispatch } from 'react-redux';
import { addCategory } from '../../redux/actions';

const Dummy = ({List, idx}) => {
    const data = {
        type : ["전체", "밑반찬", "국/탕", "찌개", "디저트", "면/만두", "밥/죽/떡", "퓨전", "김치/젓갈/장류", "양념/소스/잼", "양식", "샐러드", "스프", "빵", "과자", "차/음료/술", "기타"],
        state : ['전체', '일상', '초스피드', '손님접대', '술안주', '다이어트', '도시락', '영양식', '간식', '야식', '푸드스타일링', '해장', '명정', '명절', '이유식', '기타'],
        ingredient : ['전체', '소고기', '돼지고기', '닭고기', '육류', '채소류', '해물류', '달걀/유제품', '가공식품류', '쌀', '밀가루', '건어물류', '버섯류', '과일류', '콩/견과류', '곡류', '기타'],
        method : ['전체', '볶음', '끓이기', '부침', '조림', '무침', '비빔', '찜', '절임', '튀김', '삶기', '굽기', '데치기', '회', '기타']
    }[List]
    const dispatch = useDispatch();
    

    const [curValue, setCurValue] = useState("")
    function onClickCategory(e){
        curValue.className = curValue.className.replace('first_category', '');
        e.target.className += ' first_category';
        setCurValue(e.target);
    }
    useEffect(() => {
        let list = document.getElementsByClassName("category"+idx)
        for(let i =0 ; i< list.length; i++)
        {
            if(list[i].innerText == "전체")
            {
                list[i].className += " first_category"
                setCurValue(list[i])
            }
        }
  
    },[])

    useEffect(()=>{
        dispatch(addCategory(idx,curValue.innerText))
        console.log(1)
    },[curValue])
    const nav = useNavigate();
    return (
        <>
            {data && data.map((item)=>{
                if(item===1)
                {
                    return <Link key={item} to={`/category/${pathToStr(item)}`}><span onClick={(e)=>onClickCategory(e)} className={`cursor ${"category"+idx}`}>{item}</span></Link>
                    //return <span onClick={(e)=>onClickCategory(e)} className={`cursor ${"category"+idx}`}>{item}</span>
                }
                else{
                    return <Link key={item} to={`/category/${pathToStr(item)}`}><span onClick={(e)=>onClickCategory(e)} className={`cursor ${"category"+idx}`} >{item}</span></Link>
                    //return <span onClick={(e)=>onClickCategory(e)} className={`cursor ${"category"+idx}`} >{item}</span>
                }
            })}   
        </>
    );
};

export default Dummy;