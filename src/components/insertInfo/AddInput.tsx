import React from 'react';
import './InsertInfo.scss';
import {Form } from 'react-bootstrap';
import { bundleType } from 'pages/insertboard/InsertRecipe';
const ingredients = ['돼지고기', '양배추', '참기름', '소금', '고추가루 약간'];

interface AddInputProps {
    // placeholder: string; // placeholder prop을 string으로 정의
    // value:{
    //   Main :string;
    //   Quantity : string;
    //   Unit : string;
    //   Note : string;
    // };
    // onChange: (e: React.ChangeEvent<HTMLInputElement>, field: keyof AddInputProps['value']) => void; // 입력값 변경 시 부모에게 전달
    index : number;
    inputIndex : number;
    bundle: bundleType[];
    onChange : (
      index: number, 
      field: "Main" | "Quantity" | "Unit" | "Note", // 필드 이름
      value: string, // 변경된 값
      inputIndex: number // 변경된 위치
    ) => void; // 상태 업데이트 함수
}

const AddInput: React.FC<AddInputProps> = ({ index,inputIndex, bundle, onChange }) => {
  

  return (
    <Form  >
      <Form.Group className='inputForm mx-auto' >
        <Form.Control type="text" className='inputMain' placeholder={"예) " + ingredients[inputIndex%ingredients.length]} 
        value={bundle[index].InputValue[inputIndex].Main} onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(index, "Main", e.target.value, inputIndex)}/>

        <Form.Control type="text" className='inputQuantity' placeholder='10(수량)'
        value={bundle[index].InputValue[inputIndex].Quantity} onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(index, "Quantity", e.target.value, inputIndex)} />

        <Form.Control type="text" className='inputUnit' placeholder='예) g, ml(단위)' 
        value={bundle[index].InputValue[inputIndex].Unit} onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(index, "Unit", e.target.value, inputIndex)}/>

        <Form.Control type="text" className='inputNote' placeholder='예) 비고' 
        value={bundle[index].InputValue[inputIndex].Note} onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(index, "Note", e.target.value, inputIndex)}/>
      </Form.Group>
    </Form>

  );
}


export default AddInput;
