import React from 'react';
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from 'react-icons/md';

interface PaginationProps {
  pageNumber: number;
  setPageNumber: (page: number) => void;
  totalItem: number;
  parPage: number;
  showItem: number;
}

const Pagination: React.FC<PaginationProps> = ({ pageNumber, setPageNumber, totalItem, parPage, showItem }) => {
  const totalPage = Math.ceil(totalItem / parPage);
  let startPage = pageNumber;
  const dif = totalPage - pageNumber;
  
  if (dif <= showItem) {
    startPage = totalPage - showItem;
  }
  const endPage = startPage < 0 ? showItem : showItem + startPage;
  
  if (startPage <= 0) {
    startPage = 1;
  }

  const createBton = () => {
    const btns = [];
    for (let i = startPage; i <= endPage; i++) {
      btns.push(
        <li 
          key={i}
          onClick={() => setPageNumber(i)}
          className={`${pageNumber === i ? 'active-pagination' : 'others-pagination'} pagination`}
        >
          {i}
        </li>
      );
    }
    return btns;
  };

  return (
    <ul className='pagination-container'>
      {pageNumber > 1 && (
        <li onClick={() => setPageNumber(pageNumber - 1)} className='page-item'>
          <MdKeyboardDoubleArrowLeft className='keyboard-double-arrow-icon-left' />
        </li>
      )}
      {createBton()}
      {pageNumber < totalPage && (
        <li onClick={() => setPageNumber(pageNumber + 1)} className='page-item'>
          <MdKeyboardDoubleArrowRight className='keyboard-double-arrow-icon-right' />
        </li>
      )}
    </ul>
  );
};

export default Pagination;
