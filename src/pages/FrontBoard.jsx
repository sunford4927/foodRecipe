import React, { useEffect, useState } from 'react';
import axios from 'axios'

const FrontBoard = () => {
    const [value, setValue] = useState([]);
    useEffect(() => {
        axios
            .get("hello")
            .then((res) =>{
                setValue(res);

            }
            )
        
            // fetch("hello")
            // .then((res)=> {
            //     console.log(res);
            //     res.json()
            //  })
            // .then((res)=> {
            //     console.log(res);
                
                
            // })
            // .catch(() => {
    
            // })
    },[])
    
    useEffect(() => {
        console.log(value)
    },[value])

    return (
        <div>
            프론트 게시판입니다.
            <form action="hello" method="post">
                <input type="text" name="id_jw" />
                <input type="submit" />
            </form>

        </div>
    );
};

export default FrontBoard;