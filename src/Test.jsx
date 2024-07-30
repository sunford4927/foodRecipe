import React, { useEffect, useState } from 'react';
import { sendDel, sendPost, URL } from './util/util';





const Test = () => {
    const [value1 ,setValue1] = useState("");
    const [value2 ,setValue2] = useState("");
    const [value3 ,setValue3] = useState("");
    const [value4 ,setValue4] = useState("");
    // useEffect(()=>{
    //     sendDel(URL + "/HelloTest", null, 
    //         { name:"test6"})
    // },[])



    function sendGreenLite(){
        sendPost(
            URL + "/HelloTest",
            null, 
            {name:value1, id:value2 , pw:value3 , nm:value4}
        )
        console.log(1)
        // console.log(value1);
    }
    // /test

    return (
        <div>
            <input type="text" onChange={(e)=> setValue1(e.target.value)} />
            <input type="text" onChange={(e)=> setValue2(e.target.value)} />
            <input type="text" onChange={(e)=> setValue3(e.target.value)} />
            <input type="text" onChange={(e)=> setValue4(e.target.value)} />
            <button onClick={sendGreenLite}>제출</button>
            Test 화면        
        </div>
    );
};

export default Test;