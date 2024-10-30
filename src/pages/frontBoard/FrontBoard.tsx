import React, { useEffect, useState } from 'react';
import Dummy from '../../components/test/Dummy';
import './FrontBoard.scss';
import Pagination from '../../components/customhook/pagination/Pagination';
import { sendGet, URL } from '../../util/util';
import { useNavigate } from 'react-router-dom';
import RecipeBox from '../../components/recipebox/RecipeBox';
import { useDispatch } from 'react-redux';
import CategoryTable from '../../components/categorytable/CategoryTable';
import { addCategoryTag, clearCategory } from '../../redux/actions';

interface DummyItem {
    List: string;
    idx: number;
}

const FrontBoard: React.FC = () => {
    const [mainBoard, setMainBoard] = useState<any[]>([]);
    const [totalData, setTotalData] = useState<number>(0);
    const [maxPage, setMaxPage] = useState<number>(0);
    
    const nav = useNavigate();
    const dispatch = useDispatch();

    const dummyList: DummyItem[] = [
        { List: "type", idx: 1 },
        { List: "state", idx: 2 },
        { List: "ingredient", idx: 3 },
        { List: "method", idx: 4 }
    ];

    let curPage = 1;

    function initPageCount(data: any) {
        setTotalData(data[0].totalCnt);
        setMaxPage(Math.ceil(parseInt(data[0].totalCnt) / 100));
    }

    useEffect(() => {
        sendGet(`${URL}/all_info`, initPageCount); // 전체 데이터 개수
        sendGet(`${URL}/MainBoard?page=1`, setMainBoard); // 현 페이지의 데이터 100개 
        dispatch(clearCategory());
        dispatch(addCategoryTag(dummyList));
    }, [dispatch]);

    function handlePageChange(e: { selected: number }) {
        curPage = e.selected + 1;
        sendGet(`${URL}/MainBoard?page=${curPage}`, setMainBoard);
    }

    return (
        <div className='inner'>
            <CategoryTable />
            <RecipeBox total={totalData} data={mainBoard} />
            <Pagination
                pageCount={maxPage}
                onPageChange={handlePageChange}
                currentPage={curPage}
            />
        </div>
    );
};

export default FrontBoard;
