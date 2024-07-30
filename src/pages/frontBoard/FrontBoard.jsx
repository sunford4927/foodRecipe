import React, { useEffect, useState } from 'react';
import Dummy from '../../components/test/Dummy';
import './FrontBoard.scss'

import Pagination from '../../components/customhook/pagination/Pagination';
import { sendGet, URL } from '../../util/util';
import { useNavigate } from 'react-router-dom';
import RecipeBox from '../../components/recipebox/RecipeBox';
import { useDispatch } from 'react-redux';
import CategoryTable from '../../components/categorytable/CategoryTable';
import { addCategoryTag, clearCategory } from '../../redux/actions';



const FrontBoard = () => {
    const [mainBoard, setMainBoard] = useState([]);
    const [totalData, setTotalData] = useState(0);
    const [maxPage, setMaxPage] = useState(0);

    const nav = useNavigate();
    const dispatch = useDispatch();

    const dummyList = [
        <Dummy List={"type"} idx={1}/>,
        <Dummy List={"state"} idx={2}/>,
        <Dummy List={"ingredient"} idx={3}/>,
        <Dummy List={"method"} idx={4}/>
    ];

    let curPage = 0;

    function initPageCount(data) {
        setTotalData(data[0].totalCnt);
        setMaxPage(Math.floor(parseInt(data[0].totalCnt) / 100));
    }

    useEffect(() => {
        sendGet(URL + "/all_info", initPageCount);
        sendGet(URL + "/MainBoard?page=1", setMainBoard);
        dispatch(clearCategory());
        dispatch(addCategoryTag(dummyList));
    }, [])

    // 비동기 post 요청 및 데이터 전송 예제
    // function test(){
    //     axios
    //     .delete("hello",{
    //         data: {
    //             key : 1,
    //             title: "플라스크제목"
    //             // 프론트가 데이터 보내는 작업 for delete
    //         }
    //     })
    //     .then((res) =>{
    //         setValue(res);

    //     }
    //     )
    // }


    // useEffect(() => {
    //     axios

    //         .get("hello")
    //         .then((res) =>{
    //             setValue(res);

    //         }
    //         )

    //         // fetch("hello")
    //         // .then((res)=> {
    //         //     console.log(res);
    //         //     res.json()
    //         //  })
    //         // .then((res)=> {
    //         //     console.log(res);


    //         // })
    //         // .catch(() => {

    //         // })
    // },[])

    function handlePageChange(e) {
        curPage = e.selected + 1;
        sendGet(URL + "/MainBoard?page=" + curPage, setMainBoard)
    }


    return (
        <div className='inner'>
            <CategoryTable />
            <RecipeBox total={totalData} data={mainBoard} />
            <Pagination
                pageCount={maxPage}
                onPageChange={(e) => handlePageChange(e)}
                currentPage={curPage}
            />

        </div>
    );
};

export default FrontBoard;