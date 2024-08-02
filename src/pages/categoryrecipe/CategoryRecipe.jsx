import React, { useEffect, useState } from 'react';
import RecipeBox from '../../components/recipebox/RecipeBox';
import { useNavigate, useParams } from 'react-router-dom';
import { sendGet, strToPath, URL } from '../../util/util';
import { useSelector } from 'react-redux';
import CategoryTable from '../../components/categorytable/CategoryTable';
import Pagination from '../../components/customhook/pagination/Pagination';

const DATAPATH = '/category_board?&page=';
const TOTALPATH = '/category_cnt?&page=';

function strCheck(str){
    let isCheck = false;
    for(let key in str)
    {
        if(str[key]!= "전체")
        {
            isCheck = true;
            break;
        }
    }
    return isCheck;
}


const CategoryRecipe = () => {
    //let { value } = useParams();
    const dic = useSelector(state => state.category)
    const [mainBoard, setMainBoard] = useState([]);
    const [totalData, setTotalData] = useState(10);
    const [maxPage, setMaxPage] = useState(0);

    const nav = useNavigate();

    let curPage = 1;

    function initPageCount(data) {
        console.log(data);
        setTotalData(data[0].CATE_CNT);
        setMaxPage(Math.floor(parseInt(data[0].CATE_CNT) / 100));
    }

    function setUrl(idx, path){
        let url = URL+path+ parseInt(idx);
        for(let key in dic)
        {
            url += "&" + key + "=" + dic[key];
        }
        return url;
    }
    useEffect(()=>{
        if(strCheck(dic))
        {
            sendGet(setUrl(1, TOTALPATH), initPageCount);
            sendGet(setUrl(1, DATAPATH), setMainBoard, null)
        }
        
    },[])

    useEffect(()=>{
        console.log(totalData);
    },[totalData])
    useEffect(()=>{
        console.log(dic)
        let isCheck = strCheck(dic)
        if(isCheck)
        {
            sendGet(setUrl(curPage, TOTALPATH), initPageCount);
            sendGet(setUrl(curPage,DATAPATH), setMainBoard, null)
        }
        else{
            //sendGet(URL + "/MainBoard?page=1", setMainBoard);
            nav('/');
        }
        

    }, [dic])

    function setText()
    {
        let isCheck = false;
        let value = "";
        for(let key in dic)
        {
            if(dic[key]!= "전체")
            {
                if(!isCheck)
                {
                    value += strToPath(dic[key]);
                    isCheck = true; 
                }
                else
                {
                    value += " > " + strToPath(dic[key]);
                }
            }
        }
        return value;
    }


    function handlePageChange1(e) {
        curPage = e.selected + 1;
        sendGet(setUrl(curPage, DATAPATH), setMainBoard)
    }

    return (
        <div className='inner'>
            <CategoryTable/>
            <p>전체 {">"} {setText()}</p>
            <RecipeBox total={totalData > 0 && totalData} data={mainBoard.length > 0 &&mainBoard} />
            <Pagination
                pageCount={maxPage > 0 && maxPage}
                onPageChange={(e) => handlePageChange1(e)}
                currentPage={curPage}
            />
        </div>
    );
};


export default CategoryRecipe;

