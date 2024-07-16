import React, { useEffect, useState } from 'react';
import axios from 'axios'
import Dummy from '../../components/test/Dummy';
import './FrontBoard.scss'
import Up from '../../img/상승.png'
import Down from '../../img/하강.png'
import RecipeItem from '../../components/recipeitem/RecipeItem';

function setTag(){
    let list = []
    for (let i =0; i< 30; i++)
    {
        list.push(<RecipeItem/>)
    }
    return list;
}

const FrontBoard = () => {
    const [viewTable, setViewTable] = useState(true);

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
                            <div><span>종류별</span></div>
                            <div><span>상황별</span></div>
                            <div><span>재료별</span></div>
                            <div><span>방법별</span></div>
                        </th>
                        <td>
                            <div className='rcp_cate st3'>
                                <div><Dummy/></div>
                                <div><Dummy/></div>
                                <div><Dummy/></div>
                                <div><Dummy/></div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            :
            ""
            }

            
            <div id='viewController' onClick={()=>{setViewTable(!viewTable)}}> 
                    {viewTable ? 
                    <div>
                        카테고리 닫기 
                        <img src={Up} alt="" /> 
                    </div>
                    :
                    <div>
                        카테고리 열기
                        <img src={Down} alt="" /> 
                    </div>
                    }
            </div>

            <div className='recipeContainer'>
                    {setTag()}
            </div>

        </div>
    );
};

export default FrontBoard;