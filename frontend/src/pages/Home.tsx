import React from 'react';
import Header from '../components/Header';
import Banner from '../components/Banner';
import Categorys from '../components/Categorys';
import FeatureProducts from '../components/products/FeatureProducts';
import Products from '../components/products/Products';
import Footer from '../components/Footer';

import '../../src/scss/pages/Home.scss'

const Home = () => {
    return (
        <div>
            <Header/>
            <Banner/>
            <Categorys/>
            <FeatureProducts/>

            <div>
                <div>
                    <div className='multiple-products-container'>
                        <div>
                            <Products title='Latest Product'/>
                        </div>

                        <div>
                            <Products title='Top Rated Product'/>
                        </div>

                        <div>
                            <Products title='Discount Product'/>
                        </div>

                    </div> 
                </div> 
            </div>
            <Footer/>
        </div>
    )
}
export default Home;