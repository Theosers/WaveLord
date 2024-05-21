import React, { useLayoutEffect } from 'react';
import { MdOutlineKeyboard, MdOutlineKeyboardDoubleArrowLeft } from 'react-icons/md';

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
                <li className={`${pageNumber === i ? 'active' : ''}`}>
                    {i}
                </li>
            )
        }
        return btns;

    }
    return (
        <ul className='flex gap-3 pagination'>
            {
            pageNumber > 1 && <li className='page-item'>
                <MdOutlineKeyboardDoubleArrowLeft/>
            </li>
            }{
                createBton()
            }
            
        </ul>

    )
};

export default Pagination;