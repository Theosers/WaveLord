import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Pagination from '../Pagination';
import '../../scss/Pagination.scss'
import '../../scss/admin/Category.scss'
import {FaEdit, FaImage, FaTrash} from 'react-icons/fa'
import { PropagateLoader } from 'react-spinners';
import { overrideStyle } from '../../utils/utils';
import { categoryAdd, messageClear, get_category } from '../../store/Reducers/categoryReducer';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import Search from '../components/Search';

const Category = () => {

    const dispatch = useDispatch()
    const {loader,successMessage,errorMessage} = useSelector(state=> state.category)

    const [currentPage, setCurrentPage] = useState(1);
    const [searchValue, setSearchValue] = useState('');
    const [parPage, setParPage] = useState(5);
    const [show, setShow] =  useState(false);
    const [imageShow, setImage] = useState('')

    const [state, setState] = useState({

        name: '',
        image: ''

    })


    const imageHandle = (e) => {
        let files = e.target.files 
        if (files.length > 0) {
            setImage(URL.createObjectURL(files[0]))
            setState({
                ...state,
                image: files[0]
            })
        }
    }

    const add_category = (e) => {
        e.preventDefault()
        dispatch(categoryAdd(state))
        console.log(state)
    }

    const loader = false

    useEffect(() => {

        if (successMessage) {
            toast.success(successMessage)
            dispatch(messageClear()) 
            setState({
                name: '',
                image: ''
            }) 
            setImage('')

        }
        if (errorMessage) {
            toast.error(errorMessage)
            dispatch(messageClear())
        }


    },[successMessage,errorMessage])

    useEffect(() => {
        const obj = {
            parPage: parseInt(parPage),
            page: parseInt(currentPage),
            searchValue
        }
        dispatch(get_category(obj))

    },[searchValue, currentPage,parPage])

    return (
        <div className='category-container'>
            <div className='category-second-container'>
                <div className='gauche-container'>
                    <Search setParPage={setParPage} setSearchValue={setSearchValue} searchValue={searchValue}  />

                    <div className='table-container'>
                    <table>
                        <thead>
                        <tr>
                            <th>N°</th>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            [1,2,3,4,5].map((d, i) => (
                            <tr key={i}>
                                <td scope='row'>#{d}</td>
                                <td scope='row'>
                                    <img src="http://localhost:3000/src/assets/admin.jpeg" alt="" />
                                    
                                </td>
                    
                                <td>{d.payment_status}Tshirt</td>
                                
                                <td>
                                    <div className='actions-container'>
                                        <Link> <FaEdit className='fa-action'/> </Link>
                                        <Link> <FaTrash className='fa-action'/> </Link>
                                    </div>
                                </td>
                            </tr>
                            
                            ))
                        }
                        </tbody>
                    </table>
                        </div>

                        <Pagination
                            pageNumber= {currentPage}
                            setPageNumber= {setCurrentPage}
                            totalItem= {50}
                            parPage= {parPage}
                            showItem= {3}
                        />
                </div>
                

                <div className='droite'>
                    <h1>Add Category</h1>
                    <form onSubmit={add_category} action="">
                        <div className='form-container'>
                            <label htmlFor="name">Category Name</label>
                            <input value={state.name} onChange={(e)=>setState({...state,name : e.target.value})} type="text" id='name' name='category_name'
                            placeholder='Category Name' />
                        </div>

                        <div>
                            <label className='image-container' htmlFor='image'>
                                <span><FaImage/></span>
                                <span>Select Image</span>
                            </label>
                            <input onChange={imageHandle} type="file" name="file" id="image" />

                            <div>
                                <button>Add</button> //Ici faire la modif du bouton
                            </div>



                        </div>
                    </form>
                </div>
            </div>
            
        </div>
    );
};

export default Category;
