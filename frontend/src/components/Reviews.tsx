import React, { useState } from 'react';
import Rating from './Rating';
import RatingTemp from './RatingTemp';
import Pagination from './Pagination';
import { Link } from 'react-router-dom';
import RatingReact from 'react-rating'
import { FaStar } from 'react-icons/fa';
import { CiStar } from 'react-icons/ci';
import { useDispatch, useSelector } from 'react-redux';
import { customer_review } from '../store/reducers/homeReducer';


const Reviews = ({product}) => {

    const dispatch = useDispatch()
    const [parPage, setParPage] = useState(1)
    const [pageNumber, setPageNumber] = useState(10)
    const {userInfo } = useSelector(state => state.auth)

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

    return (
        <>
        <div>
            <div>
                <div>
                    <span>4.5</span>
                    <span>/5</span>
                </div>
                <div>
                    <Rating ratings={4.5} />
                </div>
                <p>15 Reviews</p>
            </div>

            <div>
                <div>
                    <RatingTemp rating={5} />
                </div>
                
            </div>

            <div>
                <p>10</p>
            </div>
            <div>
                <div>
                <RatingTemp rating={4} />
                </div>
                <p>20</p>
            </div>

            <div>
                <div>
                    <RatingTemp rating={3} />
                </div>
                <p>8</p>
            </div>

            <div>
                <div>
                    <RatingTemp rating={2} />
                </div>
                <p>5</p>
            </div>

            <div>
                <div>
                    <RatingTemp rating={1} />
                </div>
                <p>3</p>
            </div>

            <div>
                <div>
                    <RatingTemp rating={0} />
                </div>
                <p>0</p>
            </div>
            
        </div> 
       
        <h2>Product Review 10</h2>

        <div>
            {
                [1,2,3,4,5].map((r,i) => <div key={i}>
                        <div>
                            <div>
                                <RatingTemp rating={4} />
                            </div>
                            <span>8 Jan 2024</span>
                        </div>
                        <span>Kazi Ariyan</span>
                        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,</p>
                    </div>
                )
            }
            <div>
                {
                    <Pagination pageNumber={pageNumber} setPageNumber={setPageNumber}  totalItem={10} parPage={parPage} showItem={Math.floor(10 / 3)} />
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
