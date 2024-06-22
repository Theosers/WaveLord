import React, { useEffect } from 'react';
import Carousel from 'react-multi-carousel';
import { Link } from 'react-router-dom';
import 'react-multi-carousel/lib/styles.css'
import { useDispatch, useSelector } from 'react-redux';
import { get_banners } from '../store/reducers/homeReducer';

import '../scss/Banner.scss'

const Banner = () => {

    const dispatch = useDispatch()
    const {banners} = useSelector(state => state.home)

    const responsive = {

        superLargeDesktop: {
            breakpoint: { max: 4000, min: 3000 },
            items: 1
        },
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 1
        },

        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 1
        },

        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1
        },
    }

    useEffect(() => {
        dispatch(get_banners())
    },[])

    return (
        <div className='Banner-container'>
            <div className='Banner-content'>

                <div className='carroussel'>
                    <Carousel
                        autoPlay={true}
                        infinite={true}
                        arrows={true}
                        showDots={true}
                        responsive={responsive}>
                        {
                        banners.length > 0 && banners.map((b, i) => <Link key={i} to={`product/details/${b.link}`}>
                            <img src={ b.banner} alt="" />
                        </Link> )
                        }
                    </Carousel>        
                </div>
            </div>
        </div>
    );
};

export default Banner;
