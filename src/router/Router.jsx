import React from "react";
import { Route, Routes, useNavigate } from "react-router";
import Signup from "../componentes/signup/Signup";
import DefaultLayout from "../layout/DefaultLayout";
import NotFound from "../componentes/NotFound/NoteFound";
import Coupons from "../pages/Coupons/Coupons";
import AddCoupon from "../pages/Coupons/AddCoupon";
import Orders from "../pages/Orders/Orders";
import RestaurantsOrders from "../pages/Orders/RestaurantOrders";
import Payments from "../pages/Payments/Payments";
import Home from "../pages/home/Home";
import Login from "../componentes/Login/Login";
import User from "../pages/Users/Users";
import Pickles from "../pages/Restaurant/AllRestaurant";
import EditPickle from "../pages/Restaurant/EditRestaurant";

const AdminRouter = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/*"
          element={
            <DefaultLayout>
              <Routes>
                <Route
                  path="/home"
                  element={<Home pageTitle="Dashboard" />}
                />
                <Route
                  path="/pickles"
                  element={<Pickles pageTitle="Pickles" />}
                />
                <Route
                  path="/edit-Pickle"
                  element={<EditPickle pageTitle="Edit Pickle" />}
                />
                <Route 
                  path="/coupons"
                  element={< Coupons  pageTitle="Available Coupons" />}
                />
                <Route 
                  path="/add-coupon"
                  element={< AddCoupon  pageTitle="Add Coupon" />}
                />
                <Route 
                  path="/restaurantsOrders"
                  element={<RestaurantsOrders  pageTitle="RestaurantsOrders" />}
                />
                <Route 
                  path="/orders/:id"
                  element={< Orders pageTitle="Orders" />}
                />
                <Route 
                  path="/payments"
                  element={<Payments pageTitle="Payment History" />}
                />
                <Route 
                  path="/users"
                  element={<User pageTitle="Users" />}
                />
                <Route path="*" element={<NotFound pageTitle="404 - Not Found" />} />
              </Routes>
            </DefaultLayout>
          }
        />
      </Routes>
    </div>
  );
};

export default AdminRouter;
