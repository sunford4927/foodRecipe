import React from 'react';
import './InsertInfo.scss';
import {Form, Button } from 'react-bootstrap';

interface AddInputProps {
    placeholder: string; // placeholder prop을 string으로 정의
    value:{
      Main :string;
      Quantity : string;
      Unit : string;
      Note : string;
    };
    onChange: (e: React.ChangeEvent<HTMLInputElement>, field: keyof AddInputProps['value']) => void; // 입력값 변경 시 부모에게 전달
}

const AddInput: React.FC<AddInputProps> = ({ placeholder, value, onChange }) => {
  

  return (
    <Form  >
      <Form.Group className='inputForm mx-auto' >
        <Form.Control type="text" className='inputMain' placeholder={"예) " + placeholder} 
        value={value.Main} onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e, 'Main')}/>

        <Form.Control type="text" className='inputQuantity' placeholder='10(수량)'
        value={value.Quantity} onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e, 'Quantity')} />

        <Form.Control type="text" className='inputUnit' placeholder='예) g, ml(단위)' 
        value={value.Unit} onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e, 'Unit')}/>

        <Form.Control type="text" className='inputNote' placeholder='예) 비고' 
        value={value.Note} onChange={(e: React.ChangeEvent<HTMLInputElement>) => onChange(e, 'Note')}/>
      </Form.Group>
    </Form>

  );
}


export default AddInput;
