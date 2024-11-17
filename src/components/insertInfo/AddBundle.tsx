import React, { useState } from 'react';
import AddInput from './AddInput';
import { Button, Form } from 'react-bootstrap';
import { bundleType } from 'pages/insertboard/InsertRecipe';

interface AddBundleProps {
  index: number; // 각 AddBundle 컴포넌트의 인덱스
  bundle: bundleType[];
  onBundleChange: (
    index: number, 
    field: "Main" | "Quantity" | "Unit" | "Note", // 필드 이름
    value: string, // 변경된 값
    inputIndex: number // 변경된 위치
  ) => void; // 상태 업데이트 함수;
  setFunc :React.Dispatch<React.SetStateAction<bundleType[]>>
}

const AddBundle: React.FC<AddBundleProps> = ({ index, bundle, onBundleChange,setFunc }) => {
//   const [inputTitle, setInputTitle] = useState(bundle.inputTitle);
//   const [InputValue, setInputValue] = useState(bundle.InputValue);

  

  const addInputGroup = () => {
    let changeList = [...bundle];
    changeList[index].InputValue.push({ Main: '', Quantity: '', Unit: '', Note: '' })
    setFunc(changeList)
    // setInputValue([...InputValue, { Main: '', Quantity: '', Unit: '', Note: '' }]);
  };

  const removeInputGroup = () => {
    let changeList = [...bundle];
    if (changeList[index].InputValue.length > 2) {
        changeList[index].InputValue.pop();
    }
    setFunc(changeList)
  };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, field: keyof typeof InputValue[0], inputIndex: number) => {
//     const newInputValue = [...InputValue];
//     newInputValue[inputIndex][field] = e.target.value;
//     setInputValue(newInputValue);
//     // 상태가 변경되었을 때, 부모 컴포넌트로 전달
//     onBundleChange(index, { inputTitle, InputValue: newInputValue }, field, e.target.value, inputIndex);
//   };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let changeList = [...bundle];
    changeList[index].inputTitle = e.target.value
    setFunc(changeList);
  

  };

  return (
    <div className="bundleContainer">
      <div className="inputRow">
        <Form.Control 
          type='text' 
          name="inputTitle"
          value={bundle[index].inputTitle} 
          className='AddBundleTitle' 
          onChange={handleTitleChange} 
        />
        {/* 첫 번째 AddInput은 기본 재료로 '돼지고기'로 고정 */}
        <AddInput
        //   placeholder={ingredients[0]} 
        //   value={InputValue[0]} // 첫 번째 AddInput의 데이터
        //   onChange={(e, field) => handleInputChange(e, field, 0)} // 첫 번째 AddInput 변경 시 handleInputChange 호출
            index = {index}
            inputIndex = {0}
            bundle={bundle}  
            onChange={onBundleChange}
        />
      </div>

      {/* 추가된 AddInput 그룹을 순차적으로 출력 */}
      {bundle[index].InputValue.slice(1).map((_,inputIdx) => {
        const ingredIndex = inputIdx + 1; // ingredients 배열에서 재료 인덱스
        // console.log(ingredIndex)
        return (
          <div key={inputIdx} className="nestedInputs">
            <AddInput
            //   placeholder={ingredients[ingredIndex] || ingredients[(ingredIndex % ingredients.length)]}
            //   value={group} // 해당 그룹의 데이터를 넘김
                index = {index}
                inputIndex = {ingredIndex}
                bundle={bundle}  
                onChange={onBundleChange}// 해당 인덱스의 데이터를 업데이트
            />
          </div>
        );
      })}

      {/* 버튼 영역 */}
      <div className="InputAllBtn mx-auto">
        <Button variant="primary" className="cursor addBtn" onClick={addInputGroup}>추가</Button>
        {bundle[index].InputValue.length > 2 && (
          <Button variant="primary" className="cursor removeBtn" onClick={removeInputGroup}>삭제</Button>
        )}
      </div>
    </div>
  );
}

export default AddBundle;
