import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Up from '../../img/상승.png'
import Down from '../../img/하강.png'

interface RootState {
    categoryTag: string[]; // Redux 상태에서 categoryTag의 타입을 정의
}


const CategoryTable : React.FC = () => {

    const [viewTable, setViewTable] = useState<boolean>(true);
    
    const dummyList = useSelector((state : RootState) => state.categoryTag)


    return (
        <div>
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
                                {dummyList.length > 0 && dummyList.map((item, idx)=>{
                                    return <div key={idx}>{item}</div>
                                })}    
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
        </div>
    );
};

export default CategoryTable;
