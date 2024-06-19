import React from 'react';
import { FaEye, FaRegHeart } from "react-icons/fa";
import { RiShoppingCartLine } from "react-icons/ri";

import '../../scss/FeatureProducts.scss'
import Rating from '../Rating';

const FeatureProducts = () => {
    return (
        <div className='feature-container'>
            <div>
                <h2>Feature Products </h2>
            </div>

            <div className='images-container'>
            {
                [1,2,3,4,5,6].map((p,i) => 
                <div key={i}>
                    <div>
                        <div>8% </div> 
                        <img src={`http://localhost:3000/public/images/products/${i+1}.webp`} alt="" />           
                            <ul>
                                <li>
                                <FaRegHeart />
                                </li>
                                <li>
                                <FaEye />
                                </li>
                                <li>
                                <RiShoppingCartLine />
                                </li>
                            </ul>    
                    </div>
                    <div>
                        <h2>Product Name </h2>
                        <div>
                            <span>$656</span>
                            <div className='flex'>
                                <Rating ratings={4.5} />
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