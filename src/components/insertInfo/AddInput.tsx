import React from 'react';
import './InsertInfo.scss';
import {Form, Button } from 'react-bootstrap';

interface AddInputProps {
    placeholder: string; // placeholder prop을 string으로 정의
}

const AddInput: React.FC<AddInputProps> = ({ placeholder }) => {
  

  return (
    <Form  >
      <Form.Group className='inputForm mx-auto' >
        <Form.Control type="text" className='inputMain' placeholder={"예) " + placeholder} />
        <Form.Control type="text" className='inputQuantity' placeholder='10(수량)' />
        <Form.Control type="text" className='inputUnit' placeholder='예) g, ml(단위)' />
        <Form.Control type="text" className='inputNote' placeholder='예) 비고' />
      </Form.Group>
    </Form>
    // <div className='addInput'>
    //     <input type='text' name='inputMain' placeholder={placeholder} />
    //     <input type='text' name='inputQuantity' placeholder='10(수량)' />
    //     <input type='text' name='inputUnit' placeholder='예) g, ml(단위)' />
    //     <input type='text' name='inputNote' placeholder='예) 비고' />
    // </div>
  );
}


export default AddInput;
