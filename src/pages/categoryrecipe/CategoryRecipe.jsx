import React from 'react';
import RecipeBox from '../../components/recipebox/RecipeBox';
import { useParams } from 'react-router-dom';
import { strToPath } from '../../util/util';
import { useSelector } from 'react-redux';
import CategoryTable from '../../components/categorytable/CategoryTable';


const CategoryRecipe = () => {
    let { value } = useParams();
    console.log(value)
    
    return (
        <div className='inner'>
            <CategoryTable/>
            <p>전체 {">"} {strToPath(value)}</p>
            {/* <RecipeBox/> */}
        </div>
    );
};


export default CategoryRecipe;

