import React, { ChangeEvent } from 'react'
import { Dropdown } from 'react-bootstrap';
import './InsertInfo.scss'

interface infoType {
    inbun: string[];
    time: string[];
    level: string[];
}

interface DropInfoProps {
    ckInfo: {
        inbun: string;
        time: string;
        level: string;
    };
    handleSelectI: (key: keyof infoType) => (e: ChangeEvent<HTMLSelectElement>) => void;
    foodInfoDic: infoType;
}


const DropCkInfo: React.FC<DropInfoProps> = ({ ckInfo, handleSelectI, foodInfoDic }) => {
    // const InfoLabels = ["인원", "시간", "난이도"]
    return (
        <div>
            <div className="d-flex flex-row gap-2">
            {/* <div> */}
                {Object.keys(foodInfoDic).map((key, idx) => {
                    const typeKey = key as keyof infoType;  // key를 InfoType의 타입으로 변환

                    return (
                        <div >
                            {/* 라벨 */}
                            {/* <label>{InfoLabels[idx]}</label> */}

                            {/* 드롭다운 컴포넌트 */}
                            <Dropdown key={idx} className="dropdown-main" >
                                {/* toggle은 드롭다운 여는 버튼 역할 */}
                                <Dropdown.Toggle variant="dark" id={`dropdown-${typeKey}`} className='dropdown-toggle'>
                                    {/* 기본적으로 표시할 값 */}
                                    {ckInfo[typeKey] || (typeKey === "inbun" ? "인원" : 
                                        typeKey === "time" ? "시간" : "난이도")}
                                </Dropdown.Toggle>

                                {/* 드롭다운 메뉴, 항목들 포함하는 영역 */}
                                <Dropdown.Menu className='dropdown-menu'>
                                    {/* 각 항목 */}
                                    {foodInfoDic[typeKey].map((item, index) => (
                                        <Dropdown.Item
                                            key={index}
                                            as="button" // 각 항목을 버튼으로 표시
                                            className='dropdown-item'
                                            onClick={() => handleSelectI(typeKey)({ target: { value: item } } as ChangeEvent<HTMLSelectElement>)}
                                        >
                                            {item}
                                        </Dropdown.Item>
                                    ))}
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
// 기존 코드
// <div className="category-selects">
//     {Object.keys(foodInfoDic).map((key, idx) => {
//         const typeKey = key as keyof infoType;
//         const InfoLabels = ["인원", "시간", "난이도"]

//         return (
//             <div key={idx} className="select-category">
//                 <label>{InfoLabels[idx]}</label>
//                 <select
//                     value={ckInfo[typeKey]}
//                     onChange={handleSelectI(typeKey)}
//                 >
//                     <option
//                         disabled
//                     >
//                         {typeKey === "inbun" ? "인원" :
//                             typeKey === "time" ? "시간" : "난이도"}
//                     </option>
//                     {foodInfoDic[typeKey].map((item, index) => (
//                         <option key={index} value={item}>{item}</option>
//                     ))}
//                 </select>
//             </div>
//         );
//     })}
// </div>
//     );
// };


export default DropCkInfo;