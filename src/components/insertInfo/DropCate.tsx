import React, { ChangeEvent } from 'react'

// foodType 인터페이스를 정의해 객체 구조 정의
// 네 개의 프로퍼티, string 타입의 배열
interface foodType {
    kind: string[];  // 종류 카테고리
    state: string[]; // 상황 카테고리
    input: string[]; // 재료 카테고리
    act: string[];   // 방법 카테고리
}

interface DropCateProps {
    categories: {
        kind: string;
        state: string;
        input: string;
        act: string;
    };
    handleSelectC: (key: keyof foodType) => (e: ChangeEvent<HTMLSelectElement>) => void;
    foodCateDic: foodType;
}

const DropCate: React.FC<DropCateProps> = ({ categories, handleSelectC, foodCateDic }) => {
    return (
        <div>
            {/* 카테고리 선택을 위한 div */}
            <div className="category-selects">
                {/* foodCateDic의 키를 기반으로 select 요소를 생성합니다. */}
                {/* foodCateDic 객체의 모든 키를 배열 형태로 가져옴 */}
                {Object.keys(foodCateDic).map((key, idx) => {
                    // key를 foodType의 키로 변환
                    const typeKey = key as keyof foodType;
                    // why? key는 foodCateDic을 통해 가져온 key. 이 문자열이 foodType 속성과 동일하다는 것을 명시

                    return (
                        <select
                            key={idx} // 각 select의 고유 키 (0, 1, 2, 3)
                            value={categories[typeKey]} // typeKey가 kind 라면 기본값 "종류별"
                            onChange={handleSelectC(typeKey)} // 선택이 변경될 때 실행할 핸들러
                            className="select-category" // CSS 클래스를 추가
                        >
                            {/* 기본 선택 옵션: 종류별, 상황별 등 */}
                            <option disabled>
                                {/* 사용자에게 보여지는 옵션의 텍스트 정하는 곳 */}
                                {typeKey === "kind" ? "종류별" :
                                    typeKey === "state" ? "상황별" :
                                        typeKey === "act" ? "방법별" : "재료별"}
                            </option>

                            {/* 각 카테고리의 옵션을 동적으로 생성 */}
                            {/* 카테고리 안 data 가져와서 map 함수 실행 */}
                            {foodCateDic[typeKey]
                                .filter(item => item !== "전체") // "전체"는 제외
                                .map((item, index) => (
                                    <option key={index} value={item}>{item}</option>
                                ))
                            }
                        </select>
                    );
                })}
            </div>
        </div>
    );
};

export default DropCate;