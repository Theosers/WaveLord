import React from 'react';
import { FaEye, FaRegHeart } from "react-icons/fa";
import { RiShoppingCartLine } from "react-icons/ri";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { add_to_card,add_to_wishlist,messageClear } from '../../store/reducers/cardReducer';

import '../../scss/FeatureProducts.scss'
import Rating from '../Rating';

const FeatureProducts = ({products}) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    //const {userInfo } = useSelector(state => state.auth)

    const add_wishlist = (pro) => {
        dispatch(add_to_wishlist({
            userId: userInfo.id,
            productId: pro._id,
            name: pro.name,
            price: pro.price,
            image: pro.images[0],
            discount: pro.discount,
            rating: pro.rating,
            slug: pro.slug
        }))
    }

    return (
        <div className='feature-container'>
            <div>
                <h2>Feature Products </h2>
            </div>

            <div className='images-container'>
            {
                products.map((p,i) => 
                <div key={i}>
                    <div>
                    p.discount ? <div>{p.discount}% </div> : ''
                        <img src={p.images[0]} alt="" />           
                            <ul>
                                <li onClick={() => add_wishlist(p)}>
                                <FaRegHeart />
                                </li>
                                <Link to='/product/details/new'>
                                    <FaEye />
                                </Link>
                                <li>
                                <RiShoppingCartLine />
                                </li>
                            </ul>    
                    </div>
                    <div>
                        <h2>{p.name}</h2>
                        <div>
                            <span>${p.price}</span>
                            <div className='flex'>
                                <Rating ratings={p.rating}z />
                            </div>
                        </div>
                    </div>    
                </div>)
            }

            </div>
        </div>
    );
};

export default FeatureProducts;
