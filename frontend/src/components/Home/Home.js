import React, { Fragment, useEffect } from "react";
import { CgMouse } from "react-icons/cg";
import "./Home.css";
import ProductCard from "./ProductCard.js";
import MetaData from "../layout/MetaData";
import { clearErrors, getProduct } from "../../actions/productAction.js";
import { useSelector, useDispatch } from "react-redux";
import Loader from "../layout/Loader/Loader.js";
import { useAlert } from "react-alert";

const Home = () => {
  const dispatch = useDispatch();
  const alert = useAlert();

  const Home = useSelector((state) => state.products || {});
  const { loading, error, products }  = Home;

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    dispatch(getProduct());
  }, [dispatch, error, alert]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="SaVi-E-BaZaR" />

          <div className="banner">
            <p>welcome to SaVi-E-mArT</p>
            <h1>FIND AMAZING PRODUCT BELOW</h1>

            <a href="#container">
              <button>
                Scroll <CgMouse />
              </button>
            </a>
          </div>

          <h1 className="homeHeading">Featured Products</h1>
          <div className="container" id="container">
            {products &&
              products.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
