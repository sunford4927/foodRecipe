import React, { useState } from 'react'; 
import AddInput from './AddInput'; 
import './InsertInfo.scss'; 
import { useSelector } from 'react-redux';
import { State } from 'redux/reducer';
import {Button} from 'react-bootstrap'

const AddBundle = () => {
    const count = useSelector((state: State)=>state.num)
    const [inputTitle, setInputTitle] = useState("재료"); // '재료'라는 기본값을 가진 inputTitle 상태 생성
    const [inputGroups, setInputGroups] = useState([0, 1]); // 총 2개의 AddInput을 위해 초기화
    const ingredients = ['돼지고기', '양배추', '참기름', '소금', '고추가루 약간']; // AddInput placeholder 기본 재료 목록

    const addInputGroup = () => {
        setInputGroups([...inputGroups, inputGroups.length]); // 기존 inputGroups 배열에 새로운 요소 추가
    };

    const removeInputGroup = () => {
        if (inputGroups.length > 2) { // 맨 처음 AddInput 포함 최소 3개는 유지
            setInputGroups(inputGroups.slice(0, -1)); // 마지막 요소 제거
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputTitle(e.target.value); // 사용자가 입력한 값으로 inputTitle 상태 업데이트z
    };

    return (
        <div className="bundleContainer"> {/* 전체 컨테이너 div */}
            <div className="inputRow"> {/* 재료 입력 필드와 AddInput을 포함하는 행 */}
                <input 
                    type='text' 
                    name="inputTitle"
                    value={inputTitle} // 입력 필드의 값으로 inputTitle 상태 사용
                    className='AddBundleTitle' 
                    // onChange={handleChange} // 값이 변경될 때 handleChange 함수 호출
                />
                <AddInput placeholder={ingredients[0]} /> {/* 첫 번째 AddInput은 '돼지고기'로 고정 */}
            </div>
            {inputGroups.map((_, index) => {
            // inputGroups 배열 순회 -> key에 +1을 하려는데 배열의 실제 값이 필요하지 않아 idx만 사용한 것이고
            // 앞 '_'이건 사용하지 않음을 나타내기 위해 붙인 것, item 안 쓰고 idx만 쓰기 위해 대충 명시해놓은 것
                const ingredIndex = index + 1; // ingredients[0](돼지고기) 이후 +1이 고정된 인덱스를 계속 넘겨줌
                return (
                    <div key={index + 1} className="nestedInputs"> {/* key 0 제외 AddInput을 감싸는 div */}
                        <AddInput //추가되는 AddInput의 placeholder를 설정 
                            placeholder={ingredients[ingredIndex] || ingredients[(ingredIndex % ingredients.length)]} 
                            // placeholder는 성분배열에 +1된 인덱스를 활용해 값 꺼내옴. 인덱스가 5라면 유효하지 않은 값이니 || 오른쪽 거로
                            // index+1 % 5 ~> 계속 순환을 거침
                        /> 
                    </div>
                );
            })}
            <Button variant="primary" className='cursor' onClick={addInputGroup}>추가</Button> 
            {inputGroups.length > 2 && ( // inputGroups 길이가 2보다 클 때만 삭제 버튼 보이기
            <button className='cursor' onClick={removeInputGroup}>삭제</button> 
        )} 
        {/* <div>{count}</div> */}
        </div>
    );
}

export default AddBundle;
