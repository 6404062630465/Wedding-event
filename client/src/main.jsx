import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./components/Login/Login.jsx";
import LoginAdmin from "./components/Login/Login-admin/LoginAdmin.jsx";
import Roomdetail from "./components/Roomdetail/Roomdetail.jsx";
import Venue from "./pages/Venue.jsx";
import EditProflie from "./components/EditProflie/EditProflie.jsx";
import Booking from "./pages/Booking.jsx";
import PaymentMethod from "./pages/PaymentMethod.jsx";
import Payment from "./pages/Payment.jsx";
import Thankyou from "./pages/Thankyou.jsx";
import Status from "./pages/Status.jsx";
import BookingList from "./components/admin/BookingList.jsx";
import VenueList from "./components/admin/VenueList.jsx";
import Music from "./components/admin/Music.jsx";
import Photographer from "./components/admin/Photographer.jsx";
import User from "./components/admin/User.jsx";
import Home from "./components/Home/Home-user/Home.jsx";
import Profile from "./components/Profile/Profile.jsx";
// import Review from "./components/admin/Review.jsx";
import AdminUser from "./components/admin/AdminUser.jsx";
import StarRating from "./components/StarRating/StarRating.jsx";
import Review from "./components/StarRating/Review.jsx";
import AdminReview from "./components/admin/AdminReview.jsx"
import Protected from './components/protected.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/home",
    element: <Protected element = {<Home/>}/>,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/login-admin",
    element: <LoginAdmin />,
  },
  {
    path: "roomdetail/:roomId",
    element: <Roomdetail />,
  },
  {
    path: "/venue",
    element: <Venue />,
  },
  {
    path: "editprofile",
    element: <Protected element = {<EditProflie />}/>,
  },
  {
    path: "profile",
    element: <Protected element = {<Profile />}/>,
  },
  {
    path: "booking",
    element: <Protected element = {<Booking />}/>,
  },
  {
    path: "/paymentMethod",
    element: <PaymentMethod/>
  },
  {
    path: "EditProflie",
    element: <EditProflie/>
  },
  {
    path: "/payment/:paymentMethod",
    element: <Payment />,
  },
  {
    path: "/thankyou",
    element: <Thankyou />,
  },
  {
    path: "/status",
    element: <Status />,
  },
  {
    path: "/admin",
    element: <BookingList />,
  },
  {
    path: "/booking-list",
    element: <BookingList />,
  },
  {
    path: "/venue-list",
    element: <VenueList />,
  },
  {
    path: "/music-genre",
    element: <Music />,
  },
  {
    path: "/photographer",
    element: <Photographer />,
  },
  {
    path: "/user-list",
    element: <User />,
  },
  {
  path: "/Adminreview",
    element: <AdminReview />,
  },
  {
    path: "/adminUser",
    element: <AdminUser />,
  },
  {
    path: "/starrating",
    element: <StarRating />,
  },
  {
    path: "/review",
    element: <Review />,
  }

]);


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
