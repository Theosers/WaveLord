import React from 'react';
import { FaEye, FaRegHeart } from "react-icons/fa";
import { RiShoppingCartLine } from "react-icons/ri";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { add_to_card } from '../../store/reducers/cardReducer';

import '../../scss/FeatureProducts.scss'
import Rating from '../Rating';

const FeatureProducts = ({products}) => {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    //const {userInfo } = useSelector(state => state.auth)

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
                                <li>
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