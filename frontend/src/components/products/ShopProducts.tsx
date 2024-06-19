import React from 'react';
import { FaEye, FaRegHeart } from "react-icons/fa";
import { RiShoppingCartLine } from "react-icons/ri";
import Rating from '../Rating';

const ShopProducts = ({styles}) => {
    return (
        <div>
            {
                [1,2,3,4,5,6].map((p, i)=> <div key={i}>

                    <div>
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
                            <div>
                                <Rating ratings={4.5} />
                            </div>

                        </div>
                    </div>    
                </div>)
            }
        </div>
    );
};

export default ShopProducts;