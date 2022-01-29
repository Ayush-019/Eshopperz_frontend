import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import axios from "axios";
import webFont from "webfontloader";
import Header from "./component/layout/Header/Header.js";
import Footer from "./component/layout/Footer/footer";
import Home from "./component/Home/Home.js";
// // import Loader from './component/layout/Loader/loader';
import ProductDetails from "./component/Product/productDetails.js";
import Products from "./component/Product/Product";
import SearchBar from "./component/Product/SearchBar";
import LoginAndSignUp from "./component/user/loginAndSingup";
import store from "./store";
import { loadUser } from "./Actions/userAction";
import UserOptions from "./component/layout/Header/UserOptions";
import AuthenticatedRoute from "./component/Route/authenticatedRoute";
import { useSelector } from "react-redux";
import Profile from "./component/user/Profile.js";
import UpdateProfile from "./component/user/UpdateProfile";
import UpdatePassword from "./component/user/UpdatePassword.js";
import ForgotPassword from "./component/user/ForgotPassword";
import ResetPassword from "./component/user/ResetPassword";
import Cart from "./component/Cart/Cart";
import Shipping from "./component/Cart/Shipping";
import ConfirmOrder from "./component/Cart/ConfirmOrder";
import Payment from "./component/Cart/Payment";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import OrderSuccess from "./component/Cart/OrderSuccess";
import MyOrders from "./component/Order/MyOrders";
import MyOrderDetails from "./component/Order/MyOrderDetails";
import Dashboard from "./component/admin/Dashboard";
import AllProducts from "./component/admin/AllProducts";
import NewProduct from "./component/admin/NewProduct";
import UpdateProduct from "./component/admin/UpdateProduct";
import OrderList from "./component/admin/orderList";
import ProcessOrder from "./component/admin/processOrder";
import AllUsers from "./component/admin/AllUsers";
import UpdateUser from "./component/admin/UpdateUser";
import ProductReviews from "./component/admin/ProductReviews";
import NotFound from "./component/layout/Not Found/NotFound.js";
import { BASE_URL } from "./Constants/apiConstants";


function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");

  async function getStripeApiKey() {
    const { data } = await axios.get(`${BASE_URL}stripeapikey`);

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(() => {
    webFont.load({
      google: {
        families: ["Roborto", "Courier", "cursise"],
      },
    });

    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);

  // Stops inspecting page
  // window.addEventListener("contextmenu", (e) => e.preventDefault());


  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
          <AuthenticatedRoute
            exact
            path="/process/payment"
            component={Payment}
          />
        </Elements>
      )}

      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/product/:id" component={ProductDetails} />
        <Route exact path="/products" component={Products} />
        <Route exact path="/search" component={SearchBar} />
        <Route path="/products/:keyword" component={Products} />
        <Route exact path="/login" component={LoginAndSignUp} />
        <AuthenticatedRoute exact path="/account" component={Profile} />
        <AuthenticatedRoute exact path="/me/update" component={UpdateProfile} />
        <AuthenticatedRoute
          exact
          path="/password/update"
          component={UpdatePassword}
        />
        <Route exact path="/password/forgot" component={ForgotPassword} />
        <Route exact path="/password/reset/:token" component={ResetPassword} />
        <Route exact path="/cart" component={Cart} />
        <AuthenticatedRoute exact path="/shipping" component={Shipping} />
        <AuthenticatedRoute
          exact
          path="/order/confirm"
          component={ConfirmOrder}
        />
        <AuthenticatedRoute
          exact
          path="/order/:id"
          component={MyOrderDetails}
        />
        <AuthenticatedRoute exact path="/success" component={OrderSuccess} />
        <AuthenticatedRoute exact path="/orders" component={MyOrders} />
        <AuthenticatedRoute
          isAdmin={true}
          exact
          path="/admin/dashboard"
          component={Dashboard}
        />
        <AuthenticatedRoute
          isAdmin={true}
          exact
          path="/admin/products"
          component={AllProducts}
        />
        <AuthenticatedRoute
          isAdmin={true}
          exact
          path="/admin/product"
          component={NewProduct}
        />
        <AuthenticatedRoute
          isAdmin={true}
          exact
          path="/admin/product/:id"
          component={UpdateProduct}
        />
        <AuthenticatedRoute
          isAdmin={true}
          exact
          path="/admin/orders"
          component={OrderList}
        />
        <AuthenticatedRoute
          isAdmin={true}
          exact
          path="/admin/order/:id"
          component={ProcessOrder}
        />
        <AuthenticatedRoute
          isAdmin={true}
          exact
          path="/admin/users"
          component={AllUsers}
        />
        <AuthenticatedRoute
          isAdmin={true}
          exact
          path="/admin/user/:id"
          component={UpdateUser}
        />
        <AuthenticatedRoute
          isAdmin={true}
          exact
          path="/admin/reviews"
          component={ProductReviews}
        />
        {/* If any path not found in above Routes, it will give Not Found */}
        {/* /process/payment is added bcoz this path is not switch component.So if not dound 
        render NotFound */}
        <Route
          component={
            window.location.pathname === "/process/payment" ? null : NotFound
          }
        />
      </Switch>

      <Footer />
    </Router>
  );
}

export default App;
