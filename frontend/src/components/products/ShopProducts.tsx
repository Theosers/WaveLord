import React from 'react';
import { FaEye, FaRegHeart } from "react-icons/fa";
import { RiShoppingCartLine } from "react-icons/ri";
import Rating from '../Rating';

const ShopProducts = ({styles,products}) => {
    return (
        <div>
            {
                products.map((p, i)=> <div key={i}>

                    <div>
                        <img src={p.images[0]} alt="" />
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
                        <h2>{p.name}</h2>
                        <div>
                            <span>${p.price}</span>
                            <div>
                                <Rating ratings={p.rating} />
                            </div>

                        </div>
                    </div>    
                </div>)
            }
        </div>
    );
};

export default ShopProducts;