import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Up from '../../img/상승.png'
import Down from '../../img/하강.png'
import { State } from 'redux/reducer';
import Dummy from 'components/test/Dummy';
import './CategoryTable.scss'
import { checkScreenSize, VIEWTYPE3 } from 'util/util';

interface collapse {
    collapse1: boolean;
    collapse2: boolean;
    collapse3: boolean;
    collapse4: boolean;
}
const CategoryTable: React.FC = () => {

    const [viewTable, setViewTable] = useState<boolean>(true);
    const [viewSize, setViewSize] = useState<number>(checkScreenSize());
    const [collapse, setCollapse] = useState<collapse>({
        collapse1: false,
        collapse2: false,
        collapse3: false,
        collapse4: false,
    })
    const titleList: string[] = ["종류별", "상황별", "재료별", "방법별"]

    const dummyList = useSelector((state: State) => state.categoryTag)
    // const dummyList

    function changeCollapse(type: number) {
        switch (type) {
            case 0:
                setCollapse({
                    ...collapse,
                    collapse1: !collapse.collapse1
                })
                break;
            case 1:
                setCollapse({
                    ...collapse,
                    collapse2: !collapse.collapse2
                })
                break;
            case 2:
                setCollapse({
                    ...collapse,
                    collapse3: !collapse.collapse3
                })
                break;
            case 3:
                setCollapse({
                    ...collapse,
                    collapse4: !collapse.collapse4
                })
                break;

        }
    }
    
    useEffect(() => {
        function sizeEvent() {

            // [이벤트 함수 호출]
            setViewSize(checkScreenSize());
        };
        window.onresize = sizeEvent;
        return () => {
            window.removeEventListener('resize', sizeEvent); // 이벤트 리스너 제거
        };
    }, [])


    return (
        <div className='container' style={{ paddingLeft: 0, paddingRight: 0 }}>

            {viewTable ?
                viewSize >= VIEWTYPE3 ?
                    <table id='table' className='table table-striped'>
                        <tbody>
                            {dummyList.map((item, idx) => {


                                return (
                                    <>
                                        <tr>
                                            <td style={{ width: "80px", textAlign: "center", height: "60px", lineHeight: "40px" }}>
                                                {titleList[idx]}
                                            </td>
                                            <td>
                                                <div>
                                                    <Dummy List={item.List} idx={idx + 1} />
                                                    <br />
                                                </div>
                                            </td>
                                        </tr>
                                    </>
                                )



                            }
                            )}

                        </tbody>

                    </table>

                    :
                    <>
                        {dummyList.map((item, idx) => {
                            let check = false;
                            switch(idx){
                                case 0:
                                    check = collapse.collapse1;
                                    break;
                                case 1:
                                    check = collapse.collapse2;
                                    break;
                                case 2:
                                    check = collapse.collapse3;
                                    break;
                                case 3:
                                    check = collapse.collapse4;
                                    break;
                            }
                            return (
                                <>
                                    {/* 각 항목을 collapse로 감싸서 드롭다운처럼 보이게 */}
                                    <button
                                        className="btn btn-outline-primary w-100"
                                        type="button"
                                        aria-expanded="false"
                                        aria-controls={`collapseExample${idx}`}
                                        onClick={()=>changeCollapse(idx)}
                                    >
                                        {titleList[idx]}
                                    </button>



                                    {/* 해당 항목의 드롭다운 내용 */}
                                    <div id={`collapseExample${idx}`} className={`collapse multi-collapse ${check ? "show":""}`}>
                                        <div className="card card-body">
                                            {/* Dummy 컴포넌트에 올바르게 데이터 전달 */}
                                            <Dummy List={item.List} idx={idx + 1} />
                                        </div>
                                    </div>
                                </>
                            )
                        }
                        )}
                    </>

                :
                <></>
            }
            <div id='viewController ' onClick={() => { setViewTable(!viewTable) }}>
                {viewTable ?
                    <div className='text-center'>
                        카테고리 닫기
                        <img className='icon' src={Up} alt="" />
                    </div>
                    :
                    <div className='text-center'>
                        카테고리 열기
                        <img className='icon' src={Down} alt="" />
                    </div>
                }
            </div>
            
        </div>
    );
};

export default CategoryTable;
