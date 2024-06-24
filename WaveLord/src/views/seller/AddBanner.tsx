import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import { FaRegImage } from "react-icons/fa";
import { PropagateLoader } from 'react-spinners';
import { overrideStyle } from '../../utils/utils';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { add_banner, get_banner, messageClear, update_banner } from '../../store/Reducers/bannerReducer';
import toast from 'react-hot-toast';
import { RootState, AppDispatch } from '../../store';

const AddBanner: React.FC = () => {
    const { productId } = useParams<{ productId: string }>();
    const dispatch = useDispatch<AppDispatch>();

    const { loader, successMessage, errorMessage, banner } = useSelector((state: RootState) => state.banner);
    const [imageShow, setImageShow] = useState<string>('');
    const [image, setImage] = useState<File | null>(null);

    useEffect(() => {
        if (successMessage) {
            toast.success(successMessage);
            dispatch(messageClear());
        }
        if (errorMessage) {
            toast.error(errorMessage);
            dispatch(messageClear());
        }
    }, [successMessage, errorMessage, dispatch]);

    const imageHandle = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files.length > 0) {
            setImage(files[0]);
            setImageShow(URL.createObjectURL(files[0]));
        }
    };

    const add = (e: FormEvent) => {
        e.preventDefault();
        if (productId && image) {
            const formData = new FormData();
            formData.append('productId', productId);
            formData.append('mainban', image);
            dispatch(add_banner(formData));
        }
    };

    const update = (e: FormEvent) => {
        e.preventDefault();
        if (banner && image) {
            const formData = new FormData();
            formData.append('mainban', image);
            dispatch(update_banner({ info: formData, bannerId: banner._id }));
        }
    };

    useEffect(() => {
        if (productId) {
            dispatch(get_banner(productId));
        }
    }, [productId, dispatch]);

    return (
        <div>
            <h1>Add Banner</h1>
            <div>
                {!banner && (
                    <div>
                        <form onSubmit={add}>
                            <div>
                                <label htmlFor="image">
                                    <span><FaRegImage /></span>
                                    <span>Select Banner Image</span>
                                </label>
                                <input required onChange={imageHandle} type="file" id='image' />
                            </div>
                            {imageShow && (
                                <div>
                                    <img src={imageShow} alt="" />
                                </div>
                            )}
                            <button disabled={loader ? true : false}>
                                {loader ? <PropagateLoader color='#fff' cssOverride={overrideStyle} /> : 'Add Banner'}
                            </button>
                        </form>
                    </div>
                )}

                {banner && (
                    <div>
                        <div>
                            <img src={banner.banner} alt="" />
                        </div>
                        <form onSubmit={update}>
                            <div>
                                <label htmlFor="image">
                                    <span><FaRegImage /></span>
                                    <span>Select Banner Image</span>
                                </label>
                                <input required onChange={imageHandle} type="file" id='image' />
                            </div>
                            {imageShow && (
                                <div>
                                    <img src={imageShow} alt="" />
                                </div>
                            )}
                            <button disabled={loader ? true : false}>
                                {loader ? <PropagateLoader color='#fff' cssOverride={overrideStyle} /> : 'Update Banner'}
                            </button>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AddBanner;
