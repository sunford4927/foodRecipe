import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { recipeCategory, pathToStr, strToPath } from '../../util/util';
import { useDispatch, useSelector } from 'react-redux';
import { addCategory } from '../../redux/actions';
import { State } from 'redux/reducer'; 


interface DummyType {
    List: string;
    idx: number;
}

const Dummy: React.FC<DummyType> = ({ List, idx }) => {
    const data = recipeCategory(List)


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
