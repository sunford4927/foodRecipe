import React, { useEffect, useState } from 'react';
import './InsertRecipe.scss';
import { recipeCategory, recipeInfo } from 'util/util';
// import AddInput from 'components/inputInfo/AddInput';
import AddBundle from 'components/insertInfo/AddBundle';
import DropCate from 'components/insertInfo/DropCate';
import DropCkInfo from 'components/insertInfo/DropCkInfo';
import { Button, Form } from 'react-bootstrap';
import AddStepInput from 'components/insertInfo/AddStepInput';
import AddStepForm from 'components/insertInfo/AddStepForm';
// import { useDispatch, useSelector } from 'react-redux';
// import { State } from '../../redux/reducer/index';
// import { minus, Plus } from  '../../redux/actions/index';


interface inputType {
  Main: string;
  Quantity: string;
  Unit: string;
  Note: string;
}
export interface bundleType {
  inputTitle: string;
  InputValue: inputType[];
}

const InsertRecipe = () => {

  // 레시피 제목
  const [rcpTtl, setRcpTtl] = useState<string>("");

  const handelRcpTtl = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRcpTtl(e.target.value);
  }

  // 요리 소개
  const [cookInfo, setCookInfo] = useState<string>("");

  const handelCookInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCookInfo(e.target.value);
  }

  useEffect(() => {
    console.log(rcpTtl);
    console.log(cookInfo);
  }, [cookInfo]);

  // 카테고리 상태 관리
  const [categories, setCategories] = useState({
    kind: "종류별",
    state: "상황별",
    input: "재료별",
    act: "방법별",
  });

  const handleSelectC = (key: keyof typeof categories) => (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategories({
      ...categories,
      [key]: e.target.value,
    });
  };

  // foodType 인터페이스 정의
  interface foodType {
    kind: string[];
    state: string[];
    input: string[];
    act: string[];
  }

  const foodCateDic: foodType = {
    kind: recipeCategory("type") || [],
    state: recipeCategory("state") || [],
    input: recipeCategory("ingredient") || [],
    act: recipeCategory("method") || [],
  };


  // 요리 정보 상태 관리
  const [ckInfo, setCkInfo] = useState({
    inbun: "인원",
    time: "시간",
    level: "난이도",
  });

  const handleSelectI = (key: keyof typeof ckInfo) => (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCkInfo({
      ...ckInfo,
      [key]: e.target.value,
    });
  };

  interface infoType {
    inbun: string[];
    time: string[];
    level: string[];
  }

  const foodInfoDic: infoType = {
    inbun: recipeInfo("inbun") || [],
    time: recipeInfo("time") || [],
    level: recipeInfo("level") || [],
  };



  // 재료 정보 상태 관리
  const [bundles, setBundles] = useState([
    { inputTitle: "재료", InputValue: [{ Main: "", Quantity: "", Unit: "", Note: "" }, { Main: "", Quantity: "", Unit: "", Note: "" }] }
  ]);

  // handleBundleChange 수정: field는 "Main" | "Quantity" | "Unit" | "Note"만 가능
  const handleBundleChange = (
    index: number,
    field: "Main" | "Quantity" | "Unit" | "Note",
    value: string,
    inputIndex: number
  ) => {
    let changeList = [...bundles];
    // 이벤트가 발생한 인풋 종류 구분하기위한 type
    if (field === "Main") {
      // index 는 재료 묶음 인덱스
      // idx 는 InputValue의 인덱스
      // updatedBundles[index].InputValue[idx].Main = e.target.value;
      // setBundles(updatedBundles[index])
      changeList[index].InputValue[inputIndex].Main = value
    }
    else if (field === "Quantity") {
      changeList[index].InputValue[inputIndex].Quantity = value
    }
    else if (field === "Unit") {
      changeList[index].InputValue[inputIndex].Unit = value
    }
    else if (field === "Note") {
      changeList[index].InputValue[inputIndex].Note = value
    }
    setBundles(changeList);
  };

  const addBundle = () => {
    setBundles([
      ...bundles,
      { inputTitle: "재료", InputValue: [{ Main: "", Quantity: "", Unit: "", Note: "" }, { Main: "", Quantity: "", Unit: "", Note: "" }] }
    ]);
  };

  const removeBundle = () => {
    if (bundles.length > 1) {
      setBundles(bundles.slice(0, -1)); // 마지막 bundle 삭제
    }
  };

  
  // 초기 데이터 상태 관리
  const [stepInput, setStepInput] = useState<string[]>([""]);

  // 스텝 추가 함수
  const handleAddStep = () => {
    setStepInput([...stepInput, ""]);
  };

  // 입력값 변경 함수
  const handleChangeInput = (index:number, value:string) => {
    const updatedStep = [...stepInput]
    updatedStep[index] = value;
    setStepInput(updatedStep);
  }

  // 스텝 삭제 함수
  // 하위 컴포넌트에서 전달된 인덱스를 제외한 값들로 새로운 배열 생성
  const handleDeleteStep = (index:number) => {
    const updatedStep = stepInput.filter((_, idx) => idx !== index);
    setStepInput(updatedStep);
  }

  
  useEffect(() => {
    console.log("stepInput : ", stepInput);
  }, [stepInput]);
  
  
  
  



  return (
    <div>
      <div className='insertHeader'>레시피 등록</div>

      <span className='first-item-title'>레시피 제목</span>
      <Form.Control
        type="text"
        name="RCP_TTL"
        placeholder="예) 소고기 미역국"
        onChange={handelRcpTtl}
        className='form-rcpttl' />
      <br />

      <span className='first-item-title'>요리 소개</span>
      <Form.Control
        type="text"
        name="CK_INFO"
        placeholder="요리에 대한 간단한 소개"
        onChange={handelCookInfo}
        className='form-ckinfo' />
      <br />

      <div className='d-flex align-items-center'>
        <span className='first-item-title'>카테고리</span>
        <DropCate
          categories={categories} //state 함수
          handleSelectC={handleSelectC} // 핸들러 함수
          foodCateDic={foodCateDic} // 드롭다운에 보여줄 데이터
        />
      </div>

      <p className='gray_info first-item-gray'>💡 분류를 바르게 설정해주시면, 이용자들이 쉽게 레시피를 검색할 수 있어요.</p>

      <div className='d-flex align-items-center'>
        <span className='first-item-title'>요리 정보</span>
        <DropCkInfo
          ckInfo={ckInfo}
          handleSelectI={handleSelectI}
          foodInfoDic={foodInfoDic}
        />
      </div>

      <hr className='gray-boldline' />

      <div className='second-item'>
        <span className='second-item-title'>재료 정보</span>
        <Button variant='outline-info' size='sm' className='second-btn'>+ 재료 한번에 입력</Button>
        <span className='gray_info'>※ 재료 한번에 입력 버튼을 통해 재료를 "," 쉼표로 구분하여 한 번에 입력할 수 있어요.</span>
        <p className='gray_info second-item-gray'>💡 재료가 남거나 부족하지 않도록 정확한 계량정보를 적어주세요.</p>

        {bundles.map((_, index) => (
          <AddBundle
            key={index}
            index={index}
            bundle={bundles}
            onBundleChange={handleBundleChange}  // 부모 컴포넌트에서 데이터 변경 함수 전달
            setFunc={setBundles}
          />
        ))}

        <div className='BundelBtn'>
          <Button variant='outline-info' onClick={removeBundle} className='cursor removebundle' disabled={bundles.length <= 1}>- 재료 묶음 삭제 </Button>
          <hr />
          <p className='red_info'>※ 양념, 양념장, 소스, 드레싱, 토핑, 시럽, 육수 밑간 등으로 구분해서 작성해주세요.</p>
          <Button variant='outline-secondary' onClick={addBundle} className='cursor addbundle'>+ 재료 묶음 추가 </Button>
        </div>
      </div>

      <hr className='gray-boldline' />

      <div className='third-item'>
        <span className='third-item-title'>요리순서</span> <Button variant='outline-info' size='sm' className='second-btn'>+ 순서 사진 한번에 넣기</Button>
        <p className='gray_info'>요리의 맛이 좌우될 수 있는 중요한 부분은 빠짐없이 적어주세요.</p>
        <p className='gray_info'>예) 10분간 익혀주세요 ▷ 10분간 약한불로 익혀주세요.</p>
        <p className='gray_info'>마늘편은 익혀주세요 ▷ 마늘편을 충분히 익혀주셔야 매운 맛이 사라집니다.</p>
        <p className='gray_info'>꿀을 조금 넣어주세요 ▷ 꿀이 없는 경우, 설탕 1스푼으로 대체 가능합니다.</p>
        
        {stepInput.map((step, index) => (
          <AddStepForm
            key={index}
            index={index}
            value={step}
            onChange={handleChangeInput}
            onDelete={handleDeleteStep}
          />
        ))}
        <Button onClick={handleAddStep}>
          스텝추가
        </Button>



      </div>
    </div>
  );
};

export default InsertRecipe;
