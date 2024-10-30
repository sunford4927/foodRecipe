import React, { useEffect, useState } from 'react';
import RecipeBox from '../../components/recipebox/RecipeBox';
import { useNavigate } from 'react-router-dom';
import { sendGet, strToPath, URL } from '../../util/util';
import { useSelector } from 'react-redux';
import CategoryTable from '../../components/categorytable/CategoryTable';
import Pagination from '../../components/customhook/pagination/Pagination';

// 데이터 경로 상수
const DATAPATH = '/category_board?&page=';
const TOTALPATH = '/category_cnt?&page=';

// 문자열 확인 함수
function strCheck(str: Record<string, string>): boolean {
    return Object.values(str).some(value => value !== "전체");
}

const CategoryRecipe: React.FC = () => {
    const dic = useSelector((state: any) => state.category);
    const [mainBoard, setMainBoard] = useState<any[]>([]);
    const [totalData, setTotalData] = useState<number>(10);
    const [maxPage, setMaxPage] = useState<number>(0);

    const nav = useNavigate();
    let curPage = 1;

    // 페이지 카운트 초기화
    function initPageCount(data: any[]): void {
        console.log(data);
        setTotalData(data[0]?.CATE_CNT || 0);
        setMaxPage(Math.floor((data[0]?.CATE_CNT || 0) / 100));
    }

    // URL 설정 함수
    function setUrl(idx: number, path: string): string {
        let url = URL + path + idx;
        for (let key in dic) {
            url += "&" + key + "=" + dic[key];
        }
        return url;
    }

    useEffect(() => {
        if (strCheck(dic)) {
            sendGet(setUrl(1, TOTALPATH), initPageCount);
            sendGet(setUrl(1, DATAPATH), setMainBoard, null);
        }
    }, []);

    useEffect(() => {
        console.log(totalData);
    }, [totalData]);

    useEffect(() => {
        console.log(dic);
        if (strCheck(dic)) {
            sendGet(setUrl(curPage, TOTALPATH), initPageCount);
            sendGet(setUrl(curPage, DATAPATH), setMainBoard, null);
        } else {
            nav('/');
        }
    }, [dic]);

    // 텍스트 설정 함수
    function setText(): string {
        return Object.values(dic)
            .filter(value => value !== "전체")
            .map(value => strToPath(value as string))
            .join(' > ');
    }

    // 페이지 변경 핸들러
    function handlePageChange1(e: { selected: number }): void {
        curPage = e.selected + 1;
        sendGet(setUrl(curPage, DATAPATH), setMainBoard);
    }

    return (
        <div className='inner'>
            <CategoryTable />
            <p>전체 {">"} {setText()}</p>
            <RecipeBox total={totalData > 0 ? totalData : 0} data={mainBoard.length > 0 ? mainBoard : []} />
            <Pagination
                pageCount={maxPage > 0 ? maxPage : 0}
                onPageChange={handlePageChange1}
                currentPage={curPage}
            />
        </div>
    );
};

export default CategoryRecipe;
