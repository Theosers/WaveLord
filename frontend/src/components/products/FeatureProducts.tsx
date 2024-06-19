import React from 'react';
import { FaEye, FaRegHeart } from "react-icons/fa";
import { RiShoppingCartLine } from "react-icons/ri";
import { Link } from 'react-router-dom';

import '../../scss/FeatureProducts.scss'
import Rating from '../Rating';

const FeatureProducts = ({products}) => {
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
                                <Rating ratings={p.rating} />
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