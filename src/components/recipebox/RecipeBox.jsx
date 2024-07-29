import React from 'react';
import { setView } from '../../util/util';

const RecipeBox = ( {total, data} ) => {
    return (
        <>
            <p>총 {total}개의 맛있는 레시피가 있습니다.</p>
            <div className='recipeContainer'>
                    {data.length > 0 &&  setView(data)}
            </div>
        </>
    );
};

export default RecipeBox;