import React, { ChangeEvent } from 'react'

interface infoType {
    inbun: string[];
    time: string[];
    level: string[];
}

interface DropInfoProps {
    ckInfo: {
        inbun: string;
        time: string;
        level: string;
    };
    handleSelectI: (key: keyof infoType) => (e: ChangeEvent<HTMLSelectElement>) => void;
    foodInfoDic: infoType;
}


const DropCkInfo: React.FC<DropInfoProps> = ({ ckInfo, handleSelectI, foodInfoDic }) => {
    return (
        <div className="category-selects">
            {Object.keys(foodInfoDic).map((key, idx) => {
                const typeKey = key as keyof infoType;
                const InfoLabels = ["인원", "시간", "난이도"]

                return (
                    <div key={idx} className="select-category">
                        <label>{InfoLabels[idx]}</label>
                        <select
                            value={ckInfo[typeKey]}
                            onChange={handleSelectI(typeKey)}
                        >
                            <option
                                disabled
                            >
                                {typeKey === "inbun" ? "인원" :
                                    typeKey === "time" ? "시간" : "난이도"}
                            </option>
                            {foodInfoDic[typeKey].map((item, index) => (
                                <option key={index} value={item}>{item}</option>
                            ))}
                        </select>
                    </div>
                );
            })}
        </div>
    );
};


export default DropCkInfo