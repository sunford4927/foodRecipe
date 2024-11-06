import React from 'react';
import './InsertInfo.scss';

interface AddInputProps {
    placeholder: string; // placeholder prop을 string으로 정의
}

const AddInput: React.FC<AddInputProps> = ({ placeholder }) => {
  return (
    <div className='addInput'>
        <input type='text' name='inputMain' placeholder={placeholder} />
        <input type='text' name='inputQuantity' placeholder='10(수량)' />
        <input type='text' name='inputUnit' placeholder='예) g, ml(단위)' />
        <input type='text' name='inputNote' placeholder='예) 비고' />
    </div>
  );
}

export default AddInput;
