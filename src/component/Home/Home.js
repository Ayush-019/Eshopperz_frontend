import React, { Fragment, useEffect} from "react";
import { CgMouse } from "react-icons/all";
import "./Home.css";
import Product from "./ProductCard";
import Metadata from "../layout/metadata";
import Loader from "../layout/Loader/loader";
import { clearErrors, getProduct } from "../../Actions/productAction";
import { useSelector, useDispatch } from "react-redux";
import { useAlert } from "react-alert";

const Home = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const { loading, error, products } = useSelector((state) => state.products);

    useEffect(() => {
      if (error) {
        alert.error(error);
        dispatch(clearErrors);
      }
      dispatch(getProduct());
    }, [dispatch, error, alert]);
    

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <Metadata title="Home Page" />
          <div className="banner">
            <p>Welcome to Eshopperz</p>
            <h1>The Next Generation OF Eshopperz</h1>

            <a href="#container">
              <button>
                Scroll <CgMouse />
              </button>
            </a>
          </div>

          <h2 className="homeHeading">Featured Products</h2>

          <div className="container" id="container">
            {products &&
              products.map((product) => (
                <Product key={product._id} product={product} />
              ))}
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
