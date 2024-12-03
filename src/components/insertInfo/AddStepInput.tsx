import React, { ChangeEvent } from 'react';

// AddStepInputProps는 상위 컴포넌트에서 전달받는 props의 타입을 정의합니다.
interface AddStepInputProps {
  index: number;
  value: string;
  onChange: (index: number, value: string) => void;
  onDelete: (index: number) => void;
}

const AddStepInput: React.FC<AddStepInputProps> = ({ index, value, onChange, onDelete }) => {
  
    // 사용자가 입력할 때마다 호출되는 함수
    const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(index, e.target.value); 
    // 상위 컴포넌트에 있는 onchange 함수에 inx랑 value 전달
    // onChange는 상위에서 받은 prop이고, 여기서 호출해서 상위 컴포넌트로 값을 전달
  };

  return (
    <div className="form-group mb-3">
      <label>Step {index + 1}</label>
      <div className="d-flex align-items-center">
        <input
          type="text"
          value={value}
          onChange={handleInputChange}
          placeholder={`Step ${index + 1}`}
          className="form-control mr-2"
        />

        <button
          onClick={() => onDelete(index)}
          className="btn btn-danger"
          disabled={index === 0} // 첫 번째 항목은 삭제 불가
        >
          -
        </button>
      </div>
    </div>
  );
};

export default AddStepInput;
