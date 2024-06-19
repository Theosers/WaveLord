import React, { useState,useEffect } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import { price_range_product,query_products } from '../store/reducers/homeReducer';

const Shops = () => {

    const dispatch = useDispatch()
    const {products,categorys,priceRange,latest_product,totalProduct,parPage} = useSelector(state => state.home)
    useEffect(() => { 
        dispatch(price_range_product())
    },[])
    useEffect(() => { 
        setState({
            values: [priceRange.low, priceRange.high]
        })
    },[priceRange])

    const [filter, setFilter] = useState(true) 

    const [state, setState] = useState({values: [priceRange.low, priceRange.high]})
    const [rating, setRating] = useState('')
    const [styles, setStyles] = useState('grid')
    const [pageNumber, setPageNumber] = useState(1)

    const [sortPrice, setSortPrice] = useState('')
    const [category, setCategory] = useState('')
    const queryCategory = (e, value) => {
        if (e.target.checked) {
            setCategory(value)
        } else {
            setCategory('')
        }
    }

    useEffect(() => { 
        dispatch(
            query_products({
                low: state.values[0],
                high: state.values[1],
                category,
                rating,
                sortPrice,
                pageNumber
            })
         )
    },[state.values[0],state.values[1],category,rating,sortPrice,pageNumber])

    const resetRating = () => {
        setRating('')
        dispatch(
            query_products({
                low: state.values[0],
                high: state.values[1],
                category,
                rating: '',
                sortPrice,
                pageNumber
            })
         )
    }
    
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
                        categorys.map((c,i) => <div key={i}>
                            <input checked={category === c.name ? true : false} onChange={(e)=>queryCategory(e,c.name)} type='checkbox' name={c.name} id={c.name} value={c.name} />
                            <label htmlFor={c.name}>{c.name}</label>
                        </div>)
                        }
                    </div>

                    <div>
                        <h2>Price</h2>

                        <Range
                            step={5}
                            min={priceRange.low}
                            max={priceRange.high}
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

                  <div onClick={resetRating}>
                  <span><CiStar/> </span>
                  <span><CiStar/> </span>
                  <span><CiStar/> </span>
                  <span><CiStar/> </span>
                  <span><CiStar/> </span>
                  </div>

            </div> 
         </div>
         <div>
         <Products title='Latest Product' products={latest_product} />
         </div>

        <div>
            <h2>{totalProduct} </h2>
            <div>
                <select onChange={(e)=>setSortPrice(e.target.value)} name="" id="">
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
        <div>
            <ShopProducts products={products} styles={styles} />
         </div>
         <div>
         {
             totalProduct > parPage &&  <Pagination pageNumber={pageNumber} setPageNumber={setPageNumber} totalItem={totalProduct} parPage={parPage} showItem={Math.floor(totalProduct / parPage )} />
           }
         </div>
 

            </div> 
           </section>
           <Footer/>
        </div>
    );
};

export default Shops;