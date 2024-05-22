import React, { useLayoutEffect } from 'react';
import { MdKeyboardDoubleArrowLeft, MdKeyboardDoubleArrowRight } from 'react-icons/md';

const Pagination = ({pageNumber, setPageNumber, totalItem, parPage, showItem}) => {
    
    let totalPage = Math.ceil(totalItem/parPage);
    let startPage = pageNumber;

    let dif = totalPage - pageNumber;
    
    if(dif <= showItem){
        startPage = totalPage - showItem;
    }
    let endPage = startPage < 0 ? showItem : showItem + startPage;

    if (startPage <= 0) {
        startPage = 1
    }

    const createBton = () => {

        const btns = [];
        for (let i = startPage; i <= endPage; i++) {
            btns.push(
                <li onClick={() => setPageNumber(i)} className={`${pageNumber === i ? 'active-pagination' : 'others-pagination'}
                                                                pagination`} >
                    {i}
                </li>
            )
        }
        return btns;

    }
    return (
        <ul className='pagination-container'>
            {
            pageNumber > 1 && <li onClick={() => setPageNumber(pageNumber - 1)} className='page-item'>
                <MdKeyboardDoubleArrowLeft/>
            </li>
            }{
                createBton()
            }
            {
            pageNumber < totalPage && <li onClick={() => setPageNumber(pageNumber + 1)} className='page-item'>
                <MdKeyboardDoubleArrowRight/>
            </li>
            }
            
        </ul>

    )
};

export default Pagination;