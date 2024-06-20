import React, { useEffect, useState } from 'react';
import Rating from './Rating';
import RatingTemp from './RatingTemp';
import Pagination from './Pagination';
import { Link } from 'react-router-dom';
import RatingReact from 'react-rating'
import { FaStar } from 'react-icons/fa';
import { CiStar } from 'react-icons/ci';
import { useDispatch, useSelector } from 'react-redux';
import { customer_review, get_reviews, messageClear, product_details } from '../store/reducers/homeReducer';
import toast from 'react-hot-toast';


const Reviews = ({product}) => {

    const dispatch = useDispatch()
   const [parPage, setParPage] = useState(10)
    const [pageNumber, setPageNumber] = useState(1)
    const {userInfo } = useSelector(state => state.auth)
    const {successMessage,reviews,rating_review,totalReview } = useSelector(state => state.home)

    const [rat, setRat] = useState('')
    const [re, setRe] = useState('')

    const review_submit = (e) => {
        e.preventDefault()
        const obj = {
            name: userInfo.name,
            review: re,
            rating : rat,
            productId: product._id
        }
        dispatch(customer_review(obj))
    }

        useEffect(() => { 
        if (successMessage) {
            toast.success(successMessage) 
            dispatch(get_reviews({
                productId: product._id,
                pageNumber
            }))
            dispatch(product_details(product.slug))
            setRat('')
            setRe('')
            dispatch(messageClear())
        }  
    },[successMessage])

    useEffect(() => {
        if (product._id) {
            dispatch(get_reviews({
                productId: product._id,
                pageNumber
            }))
        }
    },[pageNumber,product])

    return (
        <>
        <div>
            <div>
                <div>
                    <span>{product.rating}</span>
                    <span>/5</span>
                </div>
                <div>
                    <Rating ratings={product.rating} />
                </div>
                <p>({totalReview}) Reviews</p>
            </div>

            <div>
                <div>
                    <RatingTemp rating={5} />
                </div>
                
            </div>
            <div style={{ width: `${Math.floor(( 100 * (rating_review[0]?.sum || 0)) / totalReview )}%` }}> 
                </div> 
            <div>
                <p>{rating_review[0]?.sum }</p>
            </div>
            <div>
                <div>
                <RatingTemp rating={4} />
                </div>
                <div style={{ width: `${Math.floor(( 100 * (rating_review[1]?.sum || 0)) / totalReview )}%` }}>
                    </div>
                <p>{rating_review[1]?.sum }</p>
            </div>

            <div>
                <div>
                    <RatingTemp rating={3} />
                </div>
                <p>{rating_review[2]?.sum }</p>
            </div>

            <div>
                <div>
                    <RatingTemp rating={2} />
                </div>
                <p>{rating_review[3]?.sum }</p>
            </div>

            <div>
                <div>
                    <RatingTemp rating={1} />
                </div>
                <p>{rating_review[4]?.sum }</p>
            </div>

            <div>
                <div>
                    <RatingTemp rating={0} />
                </div>
                <p>0</p>
            </div>
            
        </div> 
       
        <h2>Product Review ({totalReview})</h2>

        <div>
            {
                reviews.map((r,i) => <div key={i}>
                        <div>
                            <div>
                                <RatingTemp rating={r.rating} />
                            </div>
                            <span>{r.date}</span>
                        </div>
                        <span>{r.name}</span>
                        <p>{r.review}</p>
                    </div>
                )
            }
            <div>
                {
                    totalReview > 5 && <Pagination pageNumber={pageNumber} setPageNumber={setPageNumber}  totalItem={totalReview} parPage={parPage} showItem={Math.floor(totalReview / 3)} />
                }
            </div>










        </div>


        <div>
            {
            userInfo ? <div>
                    <div>
                        <RatingReact 
                        onChange={(e) => setRat(e)}
                        initialRating={rat}
                        emptySymbol={<span><CiStar/></span>}
                        fullSymbol={<span><FaStar/></span>}/> 
                    </div> 
                    <form onSubmit={review_submit}>
                        <textarea value={re} onChange={(e) => setRe(e.target.value)} required name="" id="" cols="30" rows="5"></textarea>
                        <div>
                            <button>Submit</button>
                        </div>
                    </form>
            </div> 
            : <div>
                <Link to='/login'> Login First </Link>
              </div>
            }
        </div>
        
        </>
    );
};

export default Reviews;
