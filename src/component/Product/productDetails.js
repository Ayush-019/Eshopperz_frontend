import React, { Fragment, useEffect, useState } from "react";
import "./productDetails.css";
import ReviewCard from "./ReviewCard.js";
import Carousel from "react-material-ui-carousel";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct, getProductDetails } from "../../Actions/productAction";
import { newReview } from "../../Actions/reviewAction";
import { Rating } from "@material-ui/lab";
import Loader from "../layout/Loader/loader";
import { useAlert } from "react-alert";
import Metadata from "../layout/metadata";
import { addItemsToCart } from "../../Actions/cartAction";
import { NEW_REVIEW_RESET } from "../../Constants/productConstants";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import ProductCard from "../Home/ProductCard";

const ProductDetails = ({ match }) => {
  const dispatch = useDispatch();
  const alert = useAlert();
  const { products,error:productError } = useSelector((state) => state.products);
  
  const { product, loading, error } = useSelector(
    (state) => state.productDetails
  );


  const { success, error: reviewError } = useSelector(
    (state) => state.newReview
  );

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors);
    }

    if (reviewError) {
      alert.error(reviewError);
      dispatch(clearErrors);
    }

     if (productError) {
       alert.error(productError);
       dispatch(clearErrors);
     }

    if (success) {
      alert.success("Review Submitted Successfully!!");
      dispatch({ type: NEW_REVIEW_RESET });
    }
    dispatch(getProduct());
    dispatch(getProductDetails(match.params.id));
  }, [dispatch, match.params.id, alert, error, reviewError, success,productError]);

  //Options for rating component
  const options = {
    value: product.ratings,
    precision: 0.5,
    size: "large",
    readOnly: true,
  };

  const [quantity, setQunatity] = useState(1);
  const [open, setOpen] = useState(false);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const increaseQuantity = () => {
    if (product.Stock <= quantity) {
      alert.info(`only ${product.Stock} items are in Stock`);
      return;
    }
    const qt = quantity + 1;
    setQunatity(qt);
  };
  const decreaseQuantity = () => {
    if (quantity <= 1) return;
    const qt = quantity - 1;
    setQunatity(qt);
  };

  //TO open the rating entry box whenever buttion is clicked.
  const submitReviewToggle = () => {
    open ? setOpen(false) : setOpen(true);
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", match.params.id);

    dispatch(newReview(myForm));

    setOpen(false);
  };

  const addToCartHandler = () => {
    dispatch(addItemsToCart(match.params.id, quantity));
    alert.success("Item Added To Cart!");
  };

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Metadata title={`${product.name}`} />
          <div className="ProductDetails">
            <div>
              <Carousel>
                {product.images &&
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
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>
              <div className="detailsBlock-2">
                <Rating {...options} />
                <span className="detailsBlock-2-span">
                  {" "}
                  ({product.numberOfReviews} Reviews)
                </span>
              </div>
              <div className="detailsBlock-3">
                <h1>{`₹${product.price}`}</h1>
                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button onClick={decreaseQuantity}>-</button>
                    <input readOnly type="number" value={quantity} />
                    <button onClick={increaseQuantity}>+</button>
                  </div>
                  <button
                    disabled={product.Stock < 1 ? true : false}
                    onClick={addToCartHandler}
                  >
                    Add to Cart
                  </button>
                </div>
                <p>
                  Status:{" "}
                  <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                    {product.Stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>
              <div className="detailsBlock-4">
                Description : <p>{product.description}</p>
              </div>
              <button onClick={submitReviewToggle} className="submitReview">
                Submit Review
              </button>
            </div>
          </div>
          <h3 className="reviewsHeading">REVIEWS</h3>
          <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            //So that if clicked anywhere , rating entry box will get close.
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

              <textarea
                className="submitDialogTextArea"
                cols="30"
                rows="5"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>
          {product.reviews && product.reviews[0] ? (
            <div className="reviews">
              {product.reviews &&
                product.reviews.map((review) => (
                  <ReviewCard key={review._id} review={review} />
                ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}

          {/* Related Products to main products */}
          <h3 className="relatedProductsHeading">Related Products</h3>
          <div className="container" id="container">
            {
              products.map((item) =>
                (item.category === product.category &&
                item._id !== product._id) ? (
                  <ProductCard key={item._id} product={item} />
                ) : null
              )}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
