import React, { useEffect, useState } from 'react';
import { FaRegImage } from "react-icons/fa";
import { PropagateLoader } from 'react-spinners';
import { overrideStyle } from '../../utils/utils';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { add_banner,get_banner,messageClear, update_banner } from '../../store/Reducers/bannerReducer';
import toast from 'react-hot-toast';


const AddBanner = () => {
  
    const loader = false
    const {productId} = useParams()    
    const dispatch = useDispatch()

    const { loader,successMessage,errorMessage,banner } = useSelector(state => state.banner)  
    const [imageShow, setImageShow] = useState('')
      const [image, setImage] = useState('')


  useEffect(() => {
        if (successMessage) {
            toast.success(successMessage)
            dispatch(messageClear())
        }
        if (errorMessage) {
            toast.error(errorMessage)
            dispatch(messageClear())
        }
    },[successMessage,errorMessage])
  
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
          const formData = new FormData()
          formData.append('productId',productId)
          formData.append('mainban',image)
          dispatch(add_banner(formData))
      }

  const update = (e) => {
      e.preventDefault()
      const formData = new FormData()
      formData.append('mainban',image)
      dispatch(update_banner({info:formData,bannerId: banner._id}))
    }


    useEffect(() => {
        dispatch(get_banner(productId))
    },[productId])



  

  
    return (
    <div>
        <h1>Add Banner</h1> 
        <div>
      {
        !banner && <div>
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
        }

        {
          banner && <div>
            {
              <div>
                <img src={banner.banner} alt="" />
              </div>
            }

        <form onSubmit={update}>
         <div>
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
               loader ? <PropagateLoader color='#fff' cssOverride={overrideStyle} /> : 'Update Banner'
            } 
          </button>
        </form> 

            </div>
        }

        </div>
    </div>
    );
};

export default AddBanner;
