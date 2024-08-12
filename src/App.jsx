import React, { useEffect, useState } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import LoginPage from './pages/login';
import BookPage from './pages/book';
import { Outlet } from "react-router-dom";
import Header from './components/Header';
import Footer from './components/Footer/index';
import Home from './components/Home/index';
import Register from './pages/register';
import './app.scss'
import { notification, message } from 'antd';
import { getFetchAccount } from './services/apiService';
import { useDispatch } from 'react-redux';
import { doGetAccountAction } from './redux/account/accountSlide';

notification.config({
  placement: 'topRight',
  top: 30,
  duration: 3,
  // rtl: true, // Loại bỏ cấu hình rtl ở đây
  showProgress: true,
  pauseOnHover: true,
  closeIcon: true,
});

message.config({
  top: 30,
  duration: 3,
  maxCount: 3,
  // rtl: true, // Loại bỏ cấu hình rtl ở đây
});
const Layout = () => {
  return (
    <div>
      <div id="layout-app">
        {/* <Header /> */}
        <Outlet />
        {/* <Footer /> */}
      </div>
    </div>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <div>404 Not Found!</div>,
    children: [
      { index: true, element: <Home /> },
      {
        path: "contact",
        // element: <Contact />,
      },
      {
        path: "book",
        element: <BookPage />,
      },
    ],
  },
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "register",
    element: <Register />,
  },
]);

export default function App() {
  const dispatch = useDispatch();
  const getAccount = async () => {
    const res = await getFetchAccount();
    if (res && res.data) {
      dispatch(doGetAccountAction(res.data));
    }
  }
  useEffect(() => {
    getAccount();
  }, [])
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
