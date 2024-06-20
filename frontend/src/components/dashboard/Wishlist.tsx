import React from 'react';
import { FaEye, FaRegHeart } from "react-icons/fa";
import { RiShoppingCartLine } from "react-icons/ri";
import Rating from '../Rating';
import { Link } from 'react-router-dom';

const Wishlist = () => {
    return (
        <div>
          {
              [1,2,3,4].map((p, i) => <div key={i}>
              <div>
                <div>5% </div>   
                  <img src="http://localhost:3000/public/images/products/1.webp" alt="" />  
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
                  <h2>Product Name data </h2>
                  <div>
                      <span>$122</span>
                      <div>
                          <Rating ratings={5} />
                      </div>
                  </div>
              </div>    
          </div> )
          }
        </div>
    );
};

export default Wishlist;
