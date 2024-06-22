import React from 'react';
import { FaRegImage } from "react-icons/fa";
import { PropagateLoader } from 'react-spinners';
import { overrideStyle } from '../../utils/utils';

const AddBanner = () => {
  
    const loader = false
  
    return (
    <div>
        <h1>Add Banner</h1> 
        <div>

          <form>
           <div >
              <label htmlFor="image">
                  <span><FaRegImage /></span>
                  <span>Select Banner Image </span>
              </label>
              <input type="file" id='image' />
              </div>
  
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
