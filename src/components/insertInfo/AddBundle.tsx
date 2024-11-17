import React, { useEffect, useState } from 'react';
import AddInput from './AddInput';
import './InsertInfo.scss';
import { Button, Form } from 'react-bootstrap';

const AddBundle = () => {
    const [inputTitle, setInputTitle] = useState("재료"); // '재료'라는 기본값을 가진 inputTitle 상태 생성

    // 기본적으로 두 개의 AddInput을 보여주기 위해 두 개의 빈 객체로 초기화
    const [inputGroups, setInputGroups] = useState([
        { Main: '', Quantity: '', Unit: '', Note: '' },
        { Main: '', Quantity: '', Unit: '', Note: '' }
    ]); // 첫 번째 AddInput과 두 번째 AddInput을 위한 초기값

    const ingredients = ['돼지고기', '양배추', '참기름', '소금', '고추가루 약간']; // 기본 재료 목록

    // AddInput 그룹을 하나 추가하는 함수
    const addInputGroup = () => {
        setInputGroups([...inputGroups, { Main: '', Quantity: '', Unit: '', Note: '' }]); // 새로 추가할 AddInput을 빈 값으로 초기화
    };

    // AddInput 그룹을 하나 제거하는 함수
    const removeInputGroup = () => {
        if (inputGroups.length > 2) { // 최소 두 개의 AddInput은 유지
            setInputGroups(inputGroups.slice(0, -1)); // 마지막 요소 제거
        }
    };

    // 각 AddInput의 변경된 값을 관리하는 함수
    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>, 
        field: keyof typeof inputGroups[0], 
        index: number
    ) => {
        const newInputGroups = [...inputGroups]; // inputGroups의 복사본을 생성
        newInputGroups[index][field] = e.target.value; // 해당 필드 값을 업데이트
        setInputGroups(newInputGroups); // 상태 업데이트
    };

    // 재료명(title) 변경 함수
    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputTitle(e.target.value); // 사용자가 입력한 값으로 inputTitle 상태 업데이트
    };

    useEffect(() => {
        console.log('현재 inputGroups:', inputGroups);
        console.log('현재 inputTitle:', inputTitle);
    }, [inputGroups, inputTitle]); // inputGroups가 변경될 때마다 실행됨


    return (
        <div className="bundleContainer"> {/* 전체 컨테이너 div */}
            <div className="inputRow"> {/* 첫 번째 AddInput */}
                <Form.Control 
                    type='text' 
                    name="inputTitle"
                    value={inputTitle} // 입력 필드의 값으로 inputTitle 상태 사용
                    className='AddBundleTitle' 
                    onChange={handleTitleChange} // 값이 변경될 때 handleChange 함수 호출
                />
                {/* 첫 번째 AddInput은 기본 재료로 '돼지고기'로 고정 */}
                <AddInput
                    placeholder={ingredients[0]} 
                    value={inputGroups[0]} // 첫 번째 AddInput의 데이터
                    onChange={(e, field) => handleInputChange(e, field, 0)} // 첫 번째 AddInput 변경 시 handleInputChange 호출
                />
            </div>

            {/* 추가된 AddInput 그룹을 순차적으로 출력 */}
            {inputGroups.slice(1).map((group, index) => {
                const ingredIndex = index + 1; // ingredients 배열에서 재료 인덱스
                return (
                    <div key={index + 1} className="nestedInputs">
                        <AddInput
                            placeholder={ingredients[ingredIndex] || ingredients[(ingredIndex % ingredients.length)]}
                            value={group} // 해당 그룹의 데이터를 넘김
                            onChange={(e, field) => handleInputChange(e, field, index + 1)} // 해당 인덱스의 데이터를 업데이트
                        />
                    </div>
                );
            })}

            {/* 버튼 영역 */}
            <div className="InputAllBtn mx-auto">
                <Button variant="primary" className="cursor addBtn" onClick={addInputGroup}>추가</Button>
                {inputGroups.length > 2 && ( // inputGroups 길이가 2보다 클 때만 삭제 버튼 보이기
                    <Button variant="primary" className="cursor removeBtn" onClick={removeInputGroup}>삭제</Button>
                )}
            </div>
        </div>
    );
}

export default AddBundle;
