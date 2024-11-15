import React, { useEffect, useState } from 'react';
import './InsertRecipe.scss';
import { recipeCategory, recipeInfo } from 'util/util';
// import AddInput from 'components/inputInfo/AddInput';
import AddBundle from 'components/insertInfo/AddBundle';
import AddStep from 'components/insertInfo/AddStep';
import DropCate from 'components/insertInfo/DropCate';
import DropCkInfo from 'components/insertInfo/DropCkInfo';
import { Button, Form } from 'react-bootstrap';
// import { useDispatch, useSelector } from 'react-redux';
// import { State } from '../../redux/reducer/index';
// import { minus, Plus } from  '../../redux/actions/index';

const InsertRecipe = () => {

  // 레시피 제목
  const [rcpTtl, setRcpTtl] = useState<string>("");

  const handelRcpTtl = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRcpTtl(e.target.value)
  }

  // 요리 소개
  const [cookInfo, setCookInfo] = useState<string>("");

  const handelCookInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCookInfo(e.target.value)
  }

  useEffect(() => {
    console.log(rcpTtl);
    console.log(cookInfo);
  }, [cookInfo])


  // for 카테고리 상태를 관리
  const [categories, setCategories] = useState({
    kind: "종류별",   // 'kind'의 기본값 설정
    state: "상황별",   // 'state'의 기본값 설정
    input: "재료별",   // 'input'의 기본값 설정
    act: "방법별",     // 'act'의 기본값 설정
  });

  // typeof: 변수나 객체의 타입을 가져오는 TS연산자,  {kind : string; state : string; ...}
  // keyof: 객체 타입의 키를 유니온 타입으로 반환하는 키워드, 해당 객체의 모든 키를 문자열 리터럴로 나열 "kind"|"state"...
  // keyof typeof categories: 카테고리스 객체의 키만 허용하는 타입을 만들 수 있음
  // 선택된 카테고리를 상태에 업데이트하는 핸들러 함수

  const handleSelectC = (key: keyof typeof categories) => (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategories({
      ...categories, // 현재의 카테고리 상태를 복사
      [key]: e.target.value, // [key]는 사용자가 선택한 드롭다운 카테고리,categories의 해당 키에 새로운 값을 설정

    });
  };

  // foodType 인터페이스를 정의해 객체 구조 정의
  // 네 개의 프로퍼티, string 타입의 배열
  interface foodType {
    kind: string[];  // 종류 카테고리
    state: string[]; // 상황 카테고리
    input: string[]; // 재료 카테고리
    act: string[];   // 방법 카테고리
  }

  // foodCateDic 변수 선언, 타입은 foodtype 인터페이스
  // 각 프로퍼티는 레시피카테고리의 함수 호출 결과로 초기화
  // 데이터 끌어오고 값을 반환하지 않으면 빈 배열 할당, 없으면 오류 발생!!
  const foodCateDic: foodType = {
    kind: recipeCategory("type") || [],       // 종류별 데이터, undifined를 반환하면 빈 배열 대입
    state: recipeCategory("state") || [],     // 상황별 데이터
    input: recipeCategory("ingredient") || [], // 재료별 데이터
    act: recipeCategory("method") || [],       // 방법별 데이터
  };


  // 요리 정보 (인원, 시간, 난이도)
  const [ckInfo, setCkInfo] = useState({
    inbun: "인원",
    time: "시간",
    level: "난이도"
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
    level: recipeInfo("level") || []
  };

  // 이건 value 확인하기 위한 용!
  // useEffect(()=>{
  //   console.log(categories);
  //   console.log(ckInfo);
  // },[ckInfo, categories])


  const [bundles, setBundles] = useState([1]); //기본적으로 하나의 bundle

  const addBundle = () => {
    setBundles([...bundles, bundles.length + 1]);
  }

  const removeBundle = () => {
    if (bundles.length > 1) {
      setBundles(bundles.slice(0, -1)); // 1개 이상 있을 때 삭제 버튼 누르면 뒤에 거 짤라버리겠다.
    }
  }


  const [stepNumber, setStepNumber] = useState([<AddStep stepNum={1} />])

  const addStepFunc = () => {
    // console.log('11111111111111111111111111111');
    setStepNumber([...stepNumber, <AddStep stepNum={stepNumber.length + 1} />])
  }


  // 순서를 삭제하는 함수
  const removeStepFunc = (index: number) => {
    if (stepNumber.length > 0) {
      // 해당 인덱스를 제외한 새로운 배열 생성
      const newStepNumber = stepNumber.filter((item, i) => {
        console.log(i, " == ", index)
        if (i !== index) {
          return {
            ...item,
            stepNum: index > i ? i : i - 1
          };
        }
      }
      );
      console.log(newStepNumber)
      // 삭제 후, 남은 요소들의 stepNum을 새로 할당하여 순서를 재정렬
      // const updatedSteps = newStepNumber.map((step, i) => ({
      //   ...step,
      //   stepNum: i + 1, // stepNum을 1부터 다시 설정
      // }));

      // setStepNumber(updatedSteps);

      setStepNumber(newStepNumber)
    }

  }

  return (
    <div>
      <div className='insertHeader'>레시피 등록</div>

      <span className='first-item-title'>레시피 제목</span>
      <Form.Control
        type="text"
        // as="textarea"
        name="RCP_TTL"
        placeholder="예) 소고기 미역국"
        onChange={handelRcpTtl}
        className='form-rcpttl' />
      <br />

      <span className='first-item-title'>요리 소개</span>
      <Form.Control
        type="text"
        // as="textarea"
        name="CK_INFO"
        placeholder="요리에 대한 간단한 소개"
        onChange={handelCookInfo}
        className='form-ckinfo' />
      <br />

      {/* <span>동영상</span>
      <input type="text" name="recipe_video" placeholder="동영상 URL을 입력하세요" />
      <br /> */}

      <div className='d-flex align-items-center'>
        {/*  className='d-flex align-items-center' 카테고리랑 드롭다운을 동일하게 놓고 싶어서 한 클래스 */}
        {/* d-flex: flexbox를 활성화하여 자식 요소들이 가로로 배치되도록 합니다.
            align-items-center: 자식 요소들을 세로로 가운데 정렬합니다.  */}
        <span className='first-item-title'>카테고리</span>
        <DropCate
          categories={categories}        // 현재 선택된 카테고리 값들
          handleSelectC={handleSelectC}  // 카테고리 선택이 변경될 때 호출되는 함수
          foodCateDic={foodCateDic}      // 각 카테고리별 옵션들
        />
      </div>

      <p className='gray_info first-item-gray'>💡 분류를 바르게 설정해주시면, 이용자들이 쉽게 레시피를 검색할 수 있어요.</p>

      <div className='d-flex align-items-center'>
        <span className='first-item-title'>요리 정보</span>
        <DropCkInfo
          ckInfo={ckInfo}        // 현재 선택된 카테고리 값들
          handleSelectI={handleSelectI}  // 카테고리 선택이 변경될 때 호출되는 함수
          foodInfoDic={foodInfoDic}      // 각 카테고리별 옵션들
        />
      </div>

      <hr className='gray-boldline' />




      <div className='second-item' >
        <span className='second-item-title'>재료 정보</span> 
        <Button variant='outline-info' size='sm' className='second-btn'>+ 재료 한번에 입력</Button>
        <span className='gray_info'>※ 재료 한번에 입력 버튼을 통해 재료를 "," 쉼표로 구분하여 한 번에 입력할 수 있어요.</span>
        <p className='gray_info second-item-gray'>💡 재료가 남거나 부족하지 않도록 정확한 계량정보를 적어주세요.</p>

        {bundles.map((_, index) => (
          <AddBundle key={index} />
        ))}
        <div className='BundelBtn'>
          <Button variant='outline-info' onClick={removeBundle} className='cursor removebundle' disabled={bundles.length <= 1}>- 재료 묶음 삭제 </Button>
          {/* bundles.length가 1 이하면 삭제 버튼 비활성화 */}
          <hr />
          <p className='red_info'>※양념, 양념장, 소스, 드레싱, 토핑, 시럽, 육수 밑간 등으로 구분해서 작성해주세요.</p>

          <Button variant='outline-secondary' onClick={addBundle} className='cursor addbundle'>+ 재료 묶음 추가 </Button>
        </div>
      </div>

      <hr className='gray-boldline' />







      <p>요리순서</p>
      <p className='gray_info'>요리의 맛이 좌우될 수 있는 중요한 부분은 빠짐없지 적어주세요.</p>
      <p className='gray_info'>예) 10분간 익혀주세요 ▷ 10분간 약한불로 익혀주세요.</p>
      <p className='gray_info'>마늘편은 익혀주세요 ▷ 마늘편을 충분히 익혀주셔야 매운 맛이 사라집니다.</p>
      <p className='gray_info'>꿀을 조금 넣어주세요 ▷ 꿀이 없는 경우, 설탕 1스푼으로 대체 가능합니다.</p>


      <button onClick={addStepFunc}>순서 추가</button>
      {stepNumber.map((item, index) => (
        <div key={index}>
          {item}
          <button onClick={() => removeStepFunc(index)}>순서 삭제</button>
          {/* <AddStep stepNum={index+1}/> */}
        </div>
      ))}




    </div>

  );


};


export default InsertRecipe;
