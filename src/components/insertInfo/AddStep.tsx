import React, { useEffect, useState } from 'react';
import './InsertInfo.scss';
// import ImgBox from 'components/custominput/imgbox/ImgBox';
import ImgBox from './ImgBox';
import { rootCnt, rootP } from 'util/util';

interface AddStepNumber {
  stepNum : number;
}

const AddStep: React.FC<AddStepNumber> = ({stepNum}) => {
  // 입력 필드들의 placeholder를 배열로 저장
  const [inputPlh, setInputPlh] = useState<string[]>([]);

  // clicked는 각 버튼이 클릭되었는지 추적하는 set 객체로 설정함
  // 이미 클릭된 항목 기록해 중복 클릭 방지!!
  // set: 중복되지 않는 유일한 값들을 저장하는 자료구조
  const [clicked, setClicked] = useState<Set<string>>(new Set());

  const [value, setValue] = useState("");

  useEffect(()=>{
    console.log(value)
    return console.log(value);
  },[])
  // 버튼 클릭 시 추가할 placeholder 값 결정
  const BtnStepInfo = (stepInfo: string) => {
    // set.has(value) , value가 있다면 t, 없으면 f
    if (clicked.has(stepInfo)) {
      return; // 선택한 단어가 있으면 바로 리턴 ㄱ
    }
  
    // prevClicked: 이전 상태값!!, 상태 업데이트를 위한 콜백 함수 형태로 전달된 인자
    // (prevClicked) => new Set(prevClicked).add(stepInfo) 이 콜백 함수가 인자로 전달된 것
    // setClicked 함수가 실행되면 이전 상태값을 받아 새로운 set 객체 생성, 그 후 stepInfo 값 추가
    setClicked((prevClicked) => new Set(prevClicked).add(stepInfo));
    // 삽입 순서 유지하지만 순서가 중요하지 않아서 set 사용, 값은 Set(["재료", "도구"]) 이런 식으로 들어감..

    // 각 버튼에 해당하는 placeholder 값 설정
    let newInput: string = '';
    switch (stepInfo) {
      case '재료':
        newInput = '밀가루 100g, 소금 2큰술, 물 100g';
        break;
      case '도구':
        newInput = '국자, 볼';
        break;
      case '불':
        newInput = '약불';
        break;
      case '팁':
        newInput = '팁을 입력하세요';  // 팁에는 빈 문자열 대신 placeholder 추가
        break;
      default:
        return;
    }

    setInputPlh((prevInputs) => {
      // setInputPlh에 이전 상태값 인자로 전달
      const updatedInputs = [...prevInputs, newInput];
      // 이전 배열에 새 plh 추가한 새로운 updateInputs 생성
      const fixedOrder = ['밀가루 100g, 소금 2큰술, 물 100g', '국자, 볼', '약불', '팁을 입력하세요'];
      // 배열에 나타날 항목들이 항상 특정 순서대로 정렬되도록 보장
      // const filteredInputs = updatedInputs.filter((input) => input !== '');
    
      // updatedInputs 이 배열에 있는 값 중 빈 문자열 제거
      // fixedOrder 에 임의로 정해진 텍스트 순서를 필터함수를 통해 개발자가 원하는 고정 순서로 변환하여 저장하는거?
      return fixedOrder.filter((input) => updatedInputs.includes(input));
    });
  };


  return (
    <div >
      <div >
        <span className="green_step">{'Step' + stepNum}</span>
        <input type="text" className="StepInput" onChange={(e)=>setValue(e.target.value)} />
        {/* 스크롤 기능 만들기 */}
        <ImgBox number={stepNum}/>
        
        {/* 썸네일 기능, input 이미지 바꾸기, 사이즈 조정하기, Step 옆에 두기 */}
      </div>

      <div className="green_box">
        <button className="Addfunc" onClick={() => BtnStepInfo('재료')}>
          재료
        </button>
        <button className="Addfunc" onClick={() => BtnStepInfo('도구')}>
          도구
        </button>
        <button className="Addfunc" onClick={() => BtnStepInfo('불')}>
          불
        </button>
        <button className="Addfunc" onClick={() => BtnStepInfo('팁')}>
          팁
        </button>
        <button className="Addfunc">전체</button>
        <button className="Addfunc AddFunImg">추가 기능을 넣어보세요!!!</button>
        {/* 마지막은 클릭 시 이미지 띄우기 */}

        {/* `inputPlh` 배열에 있는 각 항목에 대해 input 필드를 추가 */}
        {inputPlh.map((input, index) => (
          <div key={index}>
            <input type="text" placeholder={input} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddStep;
