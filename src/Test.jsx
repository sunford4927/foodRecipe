import React, { useEffect } from 'react';
import { sendPost } from './util/util';

const Test = () => {
    useEffect(()=>{
        sendPost("11", null, { type : 1, data :2})
    },[])
    return (
        <div>
            Test 화면        
        </div>
    );
};

export default Test;