import React from 'react';
import ReactPaginate from 'react-paginate';
import "./Pagination.scss"
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
interface pType  {
    pageCount : number;
    onPageChange : any;
    currentPage : any;
}

const Pagination : React.FC<pType> = ({ pageCount, onPageChange, currentPage }) => {
    return (
        <ReactPaginate
            pageRangeDisplayed={4}
            marginPagesDisplayed={1} // 여백에 표시할 페이지 수입니다.
            previousLabel={<FiChevronLeft />}
            nextLabel={<FiChevronRight />}
            pageCount={pageCount} // 필수. 총 페이지 수.
            onPageChange={onPageChange}
            containerClassName={"pagination"}
            renderOnZeroPageCount={currentPage}
            pageLinkClassName={"pagination__link"}
            activeLinkClassName={"pagination__link__active"}
            
        />  
    );
};

export default Pagination;