import React from 'react';
import '../../scss/admin/SellerDetails.scss';

const SellerDetails = () => {
    return (
        <>

            <h1 className='second-container'>Seller Details</h1>

            <div className='second-container'>
                <div className="inner-container">
                    <div className='triparte'>
                        <div className='triparte-1ersection'>
                            <div>
                                <img src="http://localhost:3000/src/assets/admin.jpeg" alt="" />
                            </div>

                        </div>

                        <div className='triparte-2emesection'>
                            <div>
                                <h2>Basic Info</h2>
                            </div>
                            <div>
                                <div>
                                    <span>Name : </span>
                                    <span>Théo SERS</span>
                                </div>
                                <div>
                                    <span>Email : </span>
                                    <span>Theo.sers@gmail.com</span>
                                </div>
                                <div>
                                    <span>Role : </span>
                                    <span>Seller </span>
                                </div>
                                <div>
                                    <span>Status : </span>
                                    <span>Active </span>
                                </div>
                                <div>
                                    <span>Payment Status : </span>
                                    <span>Active </span>
                                </div>
                            </div>
                        </div>
                        <div className='triparte-3emesection'>
                            <div>
                                <h2>Address</h2>
                            </div>
                            <div>
                                <div>
                                    <span>Shop Name : </span>
                                    <span>Easy Shop</span>
                                </div>
                                <div>
                                    <span>Division : </span>
                                    <span>Poueteu</span>
                                </div>
                                <div>
                                    <span>District : </span>
                                    <span>SelPoefjeler </span>
                                </div>
                                <div>
                                    <span>State : </span>
                                    <span>Poueteu </span>
                                </div>
                                <div>
                                    <span>Payment Status : </span>
                                    <span>Active </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='submit-part'>
                        <form action="">
                            
                                <select name="" id="">
                                    <option value="">--Select Status--</option>
                                    <option value="">Active</option>
                                    <option value="">Deactive</option>
                                </select>
                                <button>
                                    Submit
                                </button>
                            
                        </form>

                    </div>
                </div>




            </div>
        </>
    );
};

export default SellerDetails;