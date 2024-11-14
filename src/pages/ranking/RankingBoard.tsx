import React, { useEffect, useState } from 'react';
import { sendGet, setView, URL } from '../../util/util';
import './RankingBoard.scss';
import { useSelector } from 'react-redux';
import { Button, ButtonGroup } from 'react-bootstrap';

const listData: string[] = ["스크랩 순", "추천 순", "평점 순"];

const RankingBoard: React.FC = () => {
    const [dataList, setDataList] = useState<any[]>([]);
    const [curBtn, setCurBtn] = useState<HTMLButtonElement | null>(null);
    const backMode = useSelector((state: { backMode: boolean }) => state.backMode);

    useEffect(() => {
        const tag = document.getElementsByClassName('rank_menu');
        setCurBtn(tag[0] as HTMLButtonElement);

        // if (backMode) {
        //     (tag[0] as HTMLButtonElement).style.backgroundColor = "#1E90FF";
        // } else {
        //     (tag[0] as HTMLButtonElement).style.backgroundColor = "#00CED1";
        // }

        sendGet(URL + "/getrank?type=SCRAP_CNT", setDataList);
    }, []);

    // useEffect(() => {
    //     if (curBtn) {
    //         curBtn.style.backgroundColor = backMode ? "#1E90FF" : "#00CED1";
    //     }
    // }, [backMode, curBtn]);

    function ClickButton(e: React.MouseEvent<HTMLButtonElement>) {
        // if (curBtn) {
        //     curBtn.style.backgroundColor = "";
        // }

        const target = e.currentTarget;
        // // target.style.backgroundColor = backMode ? "#1E90FF" : "#00CED1";
        // // setCurBtn(target as HTMLButtonElement);

        let idx = "";
        switch (target.innerText) {
            case listData[0]: // 스크랩 순
                idx = "SCRAP_CNT";
                break;
            case listData[1]: // 추천 순
                idx = "SUG_CNT";
                break;
            case listData[2]: // 평점 순
                idx = "SCORE_AVG";
                break;
        }

        if (idx !== "") {
            sendGet(URL + "/getrank?type=" + idx, setDataList);
        }
    }

    return (
        <div className='inner'>
            <ButtonGroup size="sm" className="mb-2">
                {listData.map((item, index) => (
                    <Button
                        key={index}
                        onClick={ClickButton}
                        className='rank_menu'
                    >
                        {item}
                    </Button>
                ))}
            </ButtonGroup>

            <div className='recipeContainer'>
                {dataList.length > 0 && setView(dataList)}
            </div>
        </div>
    );
};

export default RankingBoard;
