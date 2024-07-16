import React from 'react';

const Dummy = () => {
    let data = [1,2,3,4,5,6,7,8,9,10]
    return (
        <>
            {data.map((item)=>{
                if(item===1)
                {
                    return <span key={item} className='first_category'>{"data"+item}</span>
                }
                else{
                    return <span key={item}>{"data"+item}</span>
                }
            })}   
        </>
    );
};

export default Dummy;