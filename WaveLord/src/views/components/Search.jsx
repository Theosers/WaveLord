import React from 'react';
import '../../scss/components/Search.scss'

const Search = ({setParPage}) => {
    return (
        <div className='controls'>
            <select onChange={(e) => setParPage(parseInt(e.target.value))}>
                <option value="5">5</option>
                <option value="10">10</option>
                <option value="20">20</option> 
            </select>
            <input type="text" placeholder='search'/>
        </div>
    )
}

export default Search;