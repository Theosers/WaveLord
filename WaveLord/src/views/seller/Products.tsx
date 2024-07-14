import React, { useEffect, useState } from 'react';
import Search from "../components/Search";
import { Link } from 'react-router-dom';
import Pagination from '../Pagination';
import '../../scss/Pagination.scss';
import '../../scss/admin/Category.scss';
import { FaEdit, FaEye, FaTrash } from 'react-icons/fa';
import '../../scss/seller/Products.scss';
import { useDispatch, useSelector } from 'react-redux';
import { get_products } from '../../store/Reducers/productReducer';
import { LuImageMinus } from "react-icons/lu";
import { RootState, AppDispatch } from '../../store'; // Adjust the path to your store

interface Product {
  _id: string;
  images: string[];
  name: string;
  category: string;
  brand: string;
  price: number;
  discount: number;
  stock: number;
}

const Products: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, totalProduct } = useSelector((state: RootState) => state.product);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchValue, setSearchValue] = useState<string>('');
  const [parPage, setParPage] = useState<number>(5);

  useEffect(() => {
    const obj = {
      parPage,
      page: currentPage,
      searchValue,
    };
    dispatch(get_products(obj));
  }, [searchValue, currentPage, parPage, dispatch]);

  return (
    <div className='orders-container'>
      <div className='orders-box'>
        <h1 className="récupérerLeH1deCategory">All Products</h1>

        <Search setParPage={setParPage} setSearchValue={setSearchValue} searchValue={searchValue} />

        <div className='gauche-container'>
          <div className='table-container'>
            <table>
              <thead>
                <tr>
                  <th>N°</th>
                  <th>Image</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Brand</th>
                  <th>Price</th>
                  <th>Discount</th>
                  <th>Stock</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {products.map((d: Product, i: number) => (
                  <tr key={i}>
                    <td scope='row'>{i + 1}</td>
                    <td scope='row'>
                      {d.images && d.images[0] && <img src={d.images[0]} alt="" />}
                    </td>
                    <td>{d.name.length > 15 ? `${d.name.slice(0, 15)}...` : d.name}</td>
                    <td>{d.category}</td>
                    <td>{d.brand}</td>
                    <td>${d.price}</td>
                    <td>
                      {d.discount === 0 ? <span>No Discount</span> : <span>%{d.discount}</span>}
                    </td>
                    <td>{d.stock}</td>
                    <td>
                      <div className='actions-container'>
                        <Link to={`/seller/dashboard/edit-product/${d._id}`}> <FaEdit className='fa-action' /> </Link>
                        <Link to={`/seller/dashboard/remove-image/${d._id}`}> <LuImageMinus className='fa-action' /> </Link>
                        <Link to={`/seller/dashboard/view-product/${d._id}`}> <FaEye className='fa-action' /> </Link>
                        <Link to={`/seller/dashboard/delete-product/${d._id}`}> <FaTrash className='fa-action' /> </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {totalProduct > parPage && (
            <Pagination
              pageNumber={currentPage}
              setPageNumber={setCurrentPage}
              totalItem={totalProduct}
              parPage={parPage}
              showItem={3}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Products;
