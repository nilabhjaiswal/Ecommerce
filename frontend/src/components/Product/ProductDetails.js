import React, { Fragment, useEffect, useState } from "react";
// import { useMatch } from "react-router-dom";
import { useParams } from "react-router-dom";
// we can use useParams in react-router-dom also in place useMatch both do same thing...
import "./ProductDetails.css";
import Carousel from "react-material-ui-carousel";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProductDetails } from "../../actions/productAction.js";
import ReactStars from "react-rating-stars-component";
import MetaData from "../layout/MetaData.js";
import ReviewCard from "./ReviewCard.js";
import Loader from "../layout/Loader/Loader.js";
import { useAlert } from "react-alert";

const ProductDetails = () => {
  const dispatch = useDispatch();
  const alert = useAlert();
  // const match = useMatch("/product/:id");
  const { id } = useParams();

  const ProductDetails = useSelector((state) => state.productDetails) || {};
  const { product, loading, error } = ProductDetails;
  
  const options = {
    size: window.innerWidth < 600 ? 20 : 25,
    color: "rgba(20,20,20,0.1)",
    activeColor: "tomato",
    value: product && product.ratings,
    isHalf: true,
  };

  const [quantity , setQuantity] = useState(1);

  const increaseQuantity = () => {
    if (product && product.Stock <= quantity) return;

    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;

    const qty = quantity - 1;
    setQuantity(qty);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(
    () => {
      if (error) {
        alert.error(error);
        dispatch(clearErrors());
      }
      // dispatch(getProductDetails(match.params.id));
      dispatch(getProductDetails(id));
    },
    // [dispatch, match.params.id,error,alert]
    [dispatch, id, error, alert]
  );
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${product && product.name} -- SaVi-E-BaZaR`} />
          <div className="ProductDetails">
            <div>
              <Carousel>
                {product &&
                  product.images.map((item, i) => (
                    <img
                      className="CarouselImage"
                      key={item.url}
                      src={item.url}
                      alt={`${i} Slide`}
                    />
                  ))}
              </Carousel>
            </div>

            <div>
              <div className="detailsBlock-1">
                <h2>{product && product.name}</h2>
                <p>Product # {product && product._id}</p>
              </div>
              <div className="detailsBlock-2">
                <ReactStars {...options} />
                <span className="detailsBlock-2-span">
                  {" "}
                  ({product && product.numOfReviews} Reviews)
                </span>
              </div>
              <div className="detailsBlock-3">
                <h1>{`₹${product && product.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity}>-</button>
                    <input readOnly value="1" type="number" />
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                  <button
                    disabled={product && product.Stock < 1 ? true : false}
                  >
                    Add to Cart
                  </button>
                </div>

                <p>
                  Status:{" "}
                  <b
                    className={
                      product && product.Stock < 1 ? "redColor" : "greenColor"
                    }
                  >
                    {product && product.Stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>

              <div className="detailsBlock-4">
                Description : <p>{product && product.descriptions}</p>
              </div>

              <button className="submitReview">Submit Review</button>
            </div>
          </div>
          <h3 className="reviewsHeading">REVIEWS</h3>
          {product && product.reviews[0] ? (
            <div className="reviews">
              {product &&
                product.reviews.map((review) => (
                  <ReviewCard key={review.id} review={review} />
                ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
