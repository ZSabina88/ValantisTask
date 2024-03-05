import { useEffect, useState } from "react";
import classes from "./ProductsList.module.css";
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  getProducts,
  //  productActions 
} from "../store/productsSlice";
// import Pagination from "./Pagination";


export default function ProductsList() {
  const {
    loading,
    products,
    error,
    // productsPerPage,
    // currentPage 
  } = useSelector((state) => state.fetchProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  console.log(products);
  // const totalPages = Math.ceil(products.length / productsPerPage);
  // const pages = [...Array(totalPages + 1).keys()].slice(1);
  // const indexOfLastPage = currentPage * productsPerPage;
  // const indexOfFirstPage = indexOfLastPage - productsPerPage;
  // const visibleProducts = products.slice(indexOfFirstPage, indexOfLastPage);
  // console.log("visibleProducts", visibleProducts);

  // function navigatePrev() {
  //   if (currentPage !== 1) {
  //     dispatch(productActions.onNavigatePrev());
  //   }
  // };

  // function navigateNext() {
  //   if (currentPage !== totalPages) {
  //     dispatch(productActions.onNavigateNext());
  //   }
  // };

  // function handleCurrentPage(p) {
  //   dispatch(productActions.onClickCurrentPage(p));
  // }


  return (
    <div className={classes.products}>
      <h1>All Products</h1>
      {loading && <p style={{ textAlign: "center", margin: "5rem auto" }}>Loading...</p>}
      {error && <p style={{ textAlign: "center", margin: "5rem auto" }}>{error}</p>}
      {!loading && products.length > 0 ?
        <ul className={classes.list}>
          {/* {visibleProducts.map((product, index) => ( */}
          {products.map((product, index) => (

            <li key={index} className={classes.item}>
              <Link to={`/products/${product.id}`}>
                <h2>{product.brand}</h2>
                <h5>{product.id}</h5>
                <p>{product.price}</p>
                <p>{product.product}</p>
              </Link>
            </li>
          ))
          }
        </ul>
        : null
      }
      {/* <Pagination
        pages={pages}
        prevClick={navigatePrev}
        pageClick={handleCurrentPage}
        nextClick={navigateNext}
        currentPage={currentPage}
      /> */}
    </div>
  );
}
