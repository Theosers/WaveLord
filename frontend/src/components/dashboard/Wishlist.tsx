import React, { useEffect } from 'react';
import { FaEye, FaRegHeart } from "react-icons/fa";
import { RiShoppingCartLine } from "react-icons/ri";
import Rating from '../Rating';
import { Link } from 'react-router-dom';
import { useDispatch,useSelector } from 'react-redux';
import { get_wishlist_products } from '../../store/reducers/cardReducer';
import { get_wishlist_products, remove_wishlist,messageClear } from '../../store/reducers/cardReducer';
import toast from 'react-hot-toast';

const Wishlist = () => {

    const dispatch = useDispatch()
    const {userInfo } = useSelector(state => state.auth)
    const {wishlist,successMessage } = useSelector(state => state.card)
    
    useEffect(() => {
        dispatch(get_wishlist_products(userInfo.id))
    },[])

    useEffect(() => { 
        if (successMessage) {
            toast.success(successMessage)
            dispatch(messageClear())  
        }   
    },[successMessage])

    
    return (
        <div>
          {
             wishlist.map((p, i) => <div key={i}>
              <div>
                <div>5% </div>   
                  <img src={p.image} alt="" />  
                  <ul>
                    <li onClick={() => dispatch(remove_wishlist(p._id))}>
                      <FaRegHeart />
                    </li>
                    <Link to={`/product/details/${p.slug}`}
                      <FaEye />
                    </Link>
                    <li>
                      <RiShoppingCartLine />
                    </li>
                 </ul>    
              </div>

              <div>
                  <h2>{p.name} </h2>
                  <div>
                      <span>${p.price}</span>
                      <div>
                          <Rating ratings={p.rating} />
                      </div>
                  </div>
              </div>    
          </div> )
          }
        </div>
    );
};

export default Wishlist;
