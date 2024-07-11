import React, { useEffect, useState } from 'react';
import axios from 'axios'

const FrontBoard = () => {
    const [value, setValue] = useState([]);
    function test(){
        axios
        .delete("hello",{
            data: {
                key : 1,
                title: "플라스크제목"
                // 프론트가 데이터 보내는 작업 for delete
            }
        })
        .then((res) =>{
            setValue(res);

        }
        )
    }

    
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
            {/* <form action="hello" method="post">
                ID : <input type="text" name="id" /> <br/>
                PW : <input type="text" name="pw" /> <br/>
                NM : <input type="text" name="nm" /> <br/>
                Img: <input type="text" name="img" />
                <input type="submit" />
            </form> */}

            {/* <form action="hello" method="get">
                GET TEST <input type="text" name="test" /> <br/> 
             
                <input type="submit" />
            </form> */}

               <form action="hello" method="delete">
                DELETE TEST <input type="text" name="delTest" /> <br/> 
             
                <input type="submit" />
                <button onClick={test}>11111</button>
            </form>


        </div>
    );
};

export default FrontBoard;