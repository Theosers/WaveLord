import React, { useState } from 'react';
import { FaRegImage } from "react-icons/fa";
import { PropagateLoader } from 'react-spinners';
import { overrideStyle } from '../../utils/utils';

const AddBanner = () => {
  
    const loader = false
    const [imageShow, setImageShow] = useState('')
      const [image, setImage] = useState('')
  
      const imageHandle = (e) => {
          const files = e.target.files 
          const length = files.length
  
          if (length > 0) {
              setImage(files[0])
              setImageShow(URL.createObjectURL(files[0]))
          } 
      }
  
      const add = (e) => {
          e.preventDefault()
      }
  

  
    return (
    <div>
        <h1>Add Banner</h1> 
        <div>

          <form onSubmit={add}>
           <div >
              <label htmlFor="image">
                  <span><FaRegImage /></span>
                  <span>Select Banner Image </span>
              </label>
              <input required onChange={imageHandle} type="file" id='image' />
              </div>
                {
                    imageShow && <div>
                        <img src={imageShow} alt="" />
                    </div>
                }
  
              <button disabled={loader ? true : false}>
              {
                 loader ? <PropagateLoader color='#fff' cssOverride={overrideStyle} /> : 'Add Banner'
              } 
              </button>
  
          </form> 

        </div>
    </div>
    );
};

export default AddBanner;
