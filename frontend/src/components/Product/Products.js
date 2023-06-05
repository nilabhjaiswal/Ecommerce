import { Fragment, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Products.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction.js";
import { useAlert } from "react-alert";
import Loader from "../layout/Loader/Loader.js";
import ProductCard from "../Home/ProductCard.js";
import Pagination from "react-js-pagination";
import { Typography, Slider } from "@mui/material";
import MetaData from "../layout/MetaData.js";
// import StarFilter from "./StarFilter";

const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhones",
  "WashingMachine"
]

const Products = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const { keyword } = useParams();

  const { loading, products, error, productsCount, resultPerPage, filteredProductsCount } =
    useSelector((state) => state.products);

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [category , setCategory] = useState("");
  const [ratings , setRatings] = useState(0);

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };
  

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct(keyword, currentPage,price,category,ratings ));
  }, [dispatch, error, alert, keyword, currentPage, price, category, ratings ]);

  let count = filteredProductsCount;

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
        <MetaData title ="PRODUCTS --- SaVi-E-BaZaR"/>
          <h2 className="productsHeading">Products</h2>
          <div className="products">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>

          <div className="filterBox">
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={25000}
            />
            <hr />
            <Typography>Categories</Typography>
            <div className="categoryBox">
              {categories.map((category) => (
                  <li
                  className="category-link"
                  key={category}
                  onClick={() => setCategory(category)}>
                    {category}
                  </li>
                ))
              }
            </div>
<hr />
            <fieldset>
              <Typography component="legend">Ratings Above</Typography>
              <Slider
                value={ratings}
                onChange={(e, newRating) => {
                  setRatings(newRating);
                }}
                aria-labelledby="continuous-slider"
                valueLabelDisplay="auto"
                min={0}
                max={5}
              />
            </fieldset>
            
             {/*<StarFilter/> */}
            {/* <hr />
            <button>Clear Filter</button> */}
          </div>
          {resultPerPage < count && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
