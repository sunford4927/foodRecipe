import React from 'react';
import NullImg from '../../../img/빈사진.gif'

interface ImgBox {
    number: Number; // placeholder prop을 string으로 정의
}


const ImgBox : React.FC<ImgBox>= ( { number } ) => {
    
    function BoxClick()
    {
        let tag = document.getElementById("inputFile"+number)
        if(tag !== null)
        {
            tag.click();
        }
        
    }

    function FileUpload( e: React.ChangeEvent<HTMLInputElement>)
    {
        let file = (e.target as HTMLInputElement).files as FileList;
        const targetFilesArray = Array.from(file);
        let tag : HTMLImageElement  = document.getElementById("viewBox"+number) as HTMLImageElement
        if(tag !== null)
        {
            tag.src  = URL.createObjectURL(targetFilesArray[0]);
        }
        
    }

    return (
        <>
    
            <input type="file" id={"inputFile" + number}style={{display:"none"}} onChange={(e) => FileUpload(e)}/> 
            <img src={NullImg} id={"viewBox"+number} alt="" onClick={BoxClick} style={{width :'200px', height:'200px'}}/>
        </>
    );
};

export default ImgBox;