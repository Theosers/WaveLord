import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Link } from 'react-router-dom';
import { IoIosArrowForward } from "react-icons/io";
import { Range } from 'react-range';
import {AiFillStar} from 'react-icons/ai'
import {CiStar} from 'react-icons/ci'
import Products from '../components/products/Products';
import {BsFillGridFill} from 'react-icons/bs'
import {FaThList} from 'react-icons/fa'
import ShopProducts from '../components/products/ShopProducts';
import Pagination from '../components/Pagination';

const Shops = () => {

    const [filter, setFilter] = useState(true)
    const categorys = [
        'Mobiles',
        'Laptops',
        'Speakers',
        'Top wear',
        'Footwear',
        'Watches',
        'Home Decor',
        'Smart Watches'
    ]
    const [state, setState] = useState({values: [50, 1500]})
    const [rating, setRating] = useState('')
    const [styles, setStyles] = useState('grid')
    const [parPage, setParPage] = useState(1)
    const [pageNumber, setPageNumber] = useState(1)
    
    return (
        <div>
           <Header/>
           <section>
            <div>
                <div>
                    <div>
                    <h2>Shop Page </h2>
                        <div>
                            <Link to='/'>Home</Link>
                            <span><IoIosArrowForward /></span>
                            <span>Shop</span>
                        </div>
                    </div>
                </div>
            </div>
           </section>
           <section>
            <div>
            <div>
                <button onClick={() => setFilter(!filter)}>Filter Product</button> 
            </div>

            <div>
                <div>
                    <h2>Category </h2>
                    <div>
                        {
                        categorys.map((c,i) => <div>
                            <input type="checkbox" id={c} />
                            <label htmlFor={c}>{c}</label>
                        </div>)
                        }
                    </div>

                    <div>
                        <h2>Price</h2>

                        <Range
                            step={5}
                            min={50}
                            max={1500}
                            values={(state.values)}
                            onChange={(values) => setState({values})}
                            renderTrack={({props,children}) => (
                                <div {...props}>
                                    {children}
                                </div>
                            )}
                            renderThumb={({ props }) => (
                                <div {...props} />

                            )} 
                        />  
                    </div>
                    <span>${Math.floor(state.values[0])} - ${Math.floor(state.values[1])}</span>            
                </div>
            </div>

            <div>
            <h2>Rating </h2>
            <div>
                 <div onClick={() => setRating(5)}>
                    <span><AiFillStar/> </span>
                    <span><AiFillStar/> </span>
                    <span><AiFillStar/> </span>
                    <span><AiFillStar/> </span>
                    <span><AiFillStar/> </span>
                  </div>

                  <div onClick={() => setRating(4)}>
                    <span><AiFillStar/> </span>
                    <span><AiFillStar/> </span>
                    <span><AiFillStar/> </span>
                    <span><AiFillStar/> </span>
                    <span><CiStar/> </span>
                  </div>

                  <div onClick={() => setRating(3)}>
                    <span><AiFillStar/> </span>
                    <span><AiFillStar/> </span>
                    <span><AiFillStar/> </span>
                    <span><CiStar/> </span>
                    <span><CiStar/> </span>
                  </div>

                  <div onClick={() => setRating(2)}>
                    <span><AiFillStar/> </span>
                    <span><AiFillStar/> </span>
                    <span><CiStar/> </span>
                    <span><CiStar/> </span>
                    <span><CiStar/> </span>
                  </div>

                  <div onClick={() => setRating(1)}>
                    <span><AiFillStar/> </span>
                    <span><CiStar/> </span>
                    <span><CiStar/> </span>
                    <span><CiStar/> </span>
                    <span><CiStar/> </span>
                  </div>

                  <div>
                  <span><CiStar/> </span>
                  <span><CiStar/> </span>
                  <span><CiStar/> </span>
                  <span><CiStar/> </span>
                  <span><CiStar/> </span>
                  </div>

            </div> 
         </div>
         <div>
            <Products title='Latest Product' />
         </div>

        <div>
            <h2>14 Products </h2>
            <div>
                <select name="" id="">
                    <option value="">Sort By</option>
                    <option value="low-to-high">Low to High Price</option>
                    <option value="high-to-low">High to Low Price </option>
                </select>
                <div>
                    <div onClick={()=> setStyles('grid')} >
                        <BsFillGridFill/>  
                    </div>
                    <div onClick={()=> setStyles('list')}>
                        <FaThList/>  
                    </div>
                </div>
            </div>
        </div>
        <div className='pb-8'>
                  <ShopProducts styles={styles} />  
         </div>
         <div>
            <Pagination pageNumber={pageNumber} setPageNumber={setPageNumber} totalItem={10} parPage={parPage} showItem={Math.floor(10 / 3 )} />
         </div>
 

            </div> 
           </section>
           <Footer/>
        </div>
    );
};

export default Shops;