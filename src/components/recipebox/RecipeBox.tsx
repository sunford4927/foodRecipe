import React from 'react';
import { setView } from '../../util/util';

interface RecipeBoxProps {
    total?: number;
    data?: Array<any>; // 데이터의 구조에 맞게 수정 필요
}

const RecipeBox: React.FC<RecipeBoxProps> = ({ total = 30, data = [] }) => {
    return (
        <>
            {total !== 0 && <p>총 {total}개의 맛있는 레시피가 있습니다.</p>}
            <div className='recipeContainer'>
                {data.length > 0 && setView(data)}
            </div>
        </>
    );
};

export default RecipeBox;
