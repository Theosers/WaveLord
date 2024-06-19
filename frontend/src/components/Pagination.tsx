import React from 'react';
import { MdOutlineKeyboardDoubleArrowLeft,MdOutlineKeyboardDoubleArrowRight } from "react-icons/md";

const Pagination = ({pageNumber,setPageNumber,totalItem,parPage,showItem}) => {

    let totalPage = Math.ceil(totalItem / parPage)
    let startPage = pageNumber

    let dif = totalPage - pageNumber
    if (dif <= showItem) {
        startPage = totalPage - showItem
    }
    let endPage = startPage < 0 ? showItem : showItem + startPage

    if (startPage <= 0) {
        startPage = 1
    }

    const createBtn = () => {

        const btns = []
        for (let i = startPage; i < endPage; i++) {
            btns.push(
                <li onClick={()=>setPageNumber(i)} className={` ${pageNumber === i ? 'a' : 'b'} c `}>
                    {i}                    
                </li>
            ) 
        }
        return btns
    }

    return (
        <ul>
            {
                pageNumber > 1 && <li onClick={() => setPageNumber(pageNumber - 1)}>
                    <MdOutlineKeyboardDoubleArrowLeft />
                </li>
            }
            {
                createBtn()
            }
            {
                pageNumber < totalPage && <li onClick={() => setPageNumber(pageNumber + 1)}>
                    <MdOutlineKeyboardDoubleArrowRight  />
                </li>
            }

        </ul>
    )


};

export default Pagination;