import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { pathToStr, strToPath } from '../../util/util';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory } from '../../redux/actions';
import { State } from 'redux/reducer'; 

interface DummyType {
    List: string;
    idx: number;
}

const Dummy: React.FC<DummyType> = ({ List, idx }) => {
    const data = {
        type: ["전체", "밑반찬", "메인반찬", "국/탕", "찌개", "디저트", "면/만두", "밥/죽/떡", "퓨전", "김치/젓갈/장류", "양념/소스/잼", "양식", "샐러드", "스프", "빵", "과자", "차/음료/술", "기타"],
        state: ['전체', '일상', '초스피드', '손님접대', '술안주', '다이어트', '도시락', '영양식', '간식', '야식', '푸드스타일링', '해장', '명정', '명절', '이유식', '기타'],
        ingredient: ['전체', '소고기', '돼지고기', '닭고기', '육류', '채소류', '해물류', '달걀/유제품', '가공식품류', '쌀', '밀가루', '건어물류', '버섯류', '과일류', '콩/견과류', '곡류', '기타'],
        method: ['전체', '볶음', '끓이기', '부침', '조림', '무침', '비빔', '찜', '절임', '튀김', '삶기', '굽기', '데치기', '회', '기타']
    }[List];

    const dispatch = useDispatch();
    const selectdic = useSelector((state: State) => state.category);
    
    const [curValue, setCurValue] = useState<HTMLElement | null>(null);

    const onClickCategory = (e: React.MouseEvent<HTMLElement>) => {
        if (curValue) {
            curValue.className = curValue.className.replaceAll('first_category', '');
        }
        const target = e.currentTarget as HTMLElement; // e.target을 HTMLElement로 캐스팅
        target.className += ' first_category';
        setCurValue(target);
        dispatch(addCategory(idx, pathToStr(target.innerText)));
    };

    useEffect(() => {
        // Initial effect
    }, []);

    useEffect(() => {
        if (curValue) {
            curValue.className = curValue.className.replaceAll('first_category', '');
        }
        
        let value: keyof typeof selectdic | undefined; // selectdic의 키 중 하나로 타입을 정의합니다.
        switch (idx) {
            case 1:
                value = "CK_KIND_NM";
                break;
            case 2:
                value = "CK_STA_NM";
                break;
            case 3:
                value = "CK_INPUT_NM";
                break;
            case 4:
                value = "CK_ACT_NM";
                break;
            default:
                break;
        }
        if(value === undefined)
        {
            return;
        }
        const list : any= document.getElementsByClassName("category" + idx);
        for (let i = 0; i < list.length; i++) {
            if (list[i].innerText === strToPath(selectdic[value])) {
                list[i].className += " first_category";
                setCurValue(list[i] as HTMLElement);
                break;
            }
        }
    }, [selectdic]);

    const nav = useNavigate();

    return (
        <>
            {data && data.map((item, index) => {
                return (
                    <Link key={item} to={`/category/${"&" + pathToStr(item)}`}>
                        <span onClick={onClickCategory} className={`Text cursor category${idx}`}>
                            {item}
                        </span>
                    </Link>
                );
            })}
        </>
    );
};

export default Dummy;
