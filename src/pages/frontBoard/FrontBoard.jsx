import React, { useEffect, useState } from 'react';
import Dummy from '../../components/test/Dummy';
import './FrontBoard.scss'
import Up from '../../img/상승.png'
import Down from '../../img/하강.png'
import Pagination from '../../components/customhook/pagination/Pagination';
import { sendGet, URL } from '../../util/util';
import { useNavigate } from 'react-router-dom';
import RecipeBox from '../../components/recipebox/RecipeBox';



const FrontBoard = () => {
    const [viewTable, setViewTable] = useState(true);
    const [mainBoard, setMainBoard] = useState([]);
    const [totalData, setTotalData] = useState(0);
    const [maxPage, setMaxPage] = useState(0);
    
    const nav = useNavigate();
  

    let curPage = 0;
    
    function initPageCount(data){
        setTotalData(data[0].totalCnt);
        setMaxPage(Math.floor(parseInt(data[0].totalCnt)/100));     
    }

    useEffect(()=>{
        sendGet(URL+"/all_info", null, initPageCount);
        sendGet(URL+"/MainBoard?page=1", {page : 1}, setMainBoard);  
    },[])

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
    
    function handlePageChange(e){
        curPage = e.selected+1;
        sendGet(URL+"/MainBoard?page="+curPage, {page : curPage}, setMainBoard)
    }
    

    return (
        <div className='inner'>
            {viewTable ? 
            <table width={"100%"} border={1} id='table'>
                <colgroup>
                    <col style={{width:"100px"}}/>
                    <col />
                </colgroup>
                <tbody>
                    <tr>
                        <th>
                            <div><span className='cursor'>종류별</span></div>
                            <div><span className='cursor'>상황별</span></div>
                            <div><span className='cursor'>재료별</span></div>
                            <div><span className='cursor'>방법별</span></div>
                        </th>
                        <td>
                            <div className='rcp_cate st3'>
                                <div><Dummy List={"type"}/></div>
                                <div><Dummy List={"state"}/></div>
                                <div><Dummy List={"ingredient"}/></div>
                                <div><Dummy List={"method"}/></div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            :
            <></>
            }

            
            <div id='viewController' onClick={()=>{setViewTable(!viewTable)}}> 
                    {viewTable ? 
                    <div>
                        카테고리 닫기 
                        <img className='icon' src={Up} alt="" /> 
                    </div>
                    :
                    <div>
                        카테고리 열기
                        <img className='icon' src={Down} alt="" /> 
                    </div>
                    }
            </div>
            
            <RecipeBox total={totalData} data={mainBoard}/>

            <Pagination
                        pageCount={maxPage}
                        onPageChange={(e)=>handlePageChange(e)}
                        currentPage={curPage}
            />

        </div>
    );
};

export default FrontBoard;