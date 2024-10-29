import React from 'react';
import { setView } from '../../util/util';
import PropTypes from 'prop-types';


const RecipeBox = ( {total, data} ) => {
    return (
        <>
            {total != 0 && <p>총 {total}개의 맛있는 레시피가 있습니다.</p>}
            <div className='recipeContainer'>
                    {data.length > 0 &&  setView(data)}
            </div>
        </>
    );
};

RecipeBox.defaultProps = {
    total : 30,
    data : []
};

RecipeBox.propTypes = {
    total : PropTypes.number,
    data : PropTypes.array
}
export default RecipeBox;

