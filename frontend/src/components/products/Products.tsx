import React from 'react';
import Carousel from 'react-multi-carousel';
import { Link } from 'react-router-dom';
import 'react-multi-carousel/lib/styles.css' 
import { IoIosArrowBack,IoIosArrowForward } from "react-icons/io";

import 'react-multi-carousel/lib/styles.css'

const Products = ({title,products}) => {
    

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

    const ButtonGroup = ({next,previous}) => {
        return (
            <div>
                <div> {title} </div>
                <div>
                    <button onClick={()=>previous()}>
                        <IoIosArrowBack />
                    </button>
                    <button onClick={()=>next()} >
                        <IoIosArrowForward /> 
                    </button>
                </div>

            </div>
        )
    }

    return (
        <div>
            <Carousel
                    autoPlay={false}
                    infinite={false}
                    arrows={false} 
                    responsive={responsive}
                    transitionDuration={500}
                    renderButtonGroupOutside={true}
                    customButtonGroup={<ButtonGroup/>}>

                {
                    products.map((p,i)=> {
                        return(
                            <div key={i}>
                            {
                            p.map((pl, j) =>  <Link ey={j} to='#'>
                                <img src={pl.images[0]} alt="" />
                                <div>
                                    <h2>{pl.name}</h2>
                                    <span>${pl.price}</span> 
                                </div>  
                                    
                                </Link>)
                            }
                            </div>
                        )
                    })
                }
            </Carousel>   
        </div>
    );
};

export default Products;