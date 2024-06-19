import React, { useEffect } from 'react';
import Header from '../components/Header';
import Banner from '../components/Banner';
import Categorys from '../components/Categorys';
import FeatureProducts from '../components/products/FeatureProducts';
import Products from '../components/products/Products';
import Footer from '../components/Footer';
import { useDispatch, useSelector } from 'react-redux';
import { get_category,get_products } from '../store/reducers/homeReducer';

import '../../src/scss/pages/Home.scss'

const Home = () => {

    const dispatch = useDispatch()
    const {products,latest_product,topRated_product,discount_product} = useSelector(state => state.home)
    useEffect(() => {
        dispatch(get_products())
    },[])

    return (
        <div>
            <Header/>
            <Banner/>
            <Categorys/>
            <FeatureProducts products={products} />

            <div>
                <div>
                    <div className='multiple-products-container'>
                        <div>
                            <Products title='Latest Product' products={latest_product}/>
                        </div>

                        <div>
                            <Products title='Top Rated Product' products={topRated_product}/>
                        </div>

                        <div>
                            <Products title='Discount Product' products={discount_product}/>
                        </div>

                    </div> 
                </div> 
            </div>
            <Footer/>
        </div>
    )
}
export default Home;