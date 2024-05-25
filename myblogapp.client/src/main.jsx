import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  Link,
  Outlet,
  RouterProvider,
  createBrowserRouter
} from "react-router-dom";
import Login from './components/users/Login.jsx';
import SignUp from './components/users/SignUp.jsx';
import UserProfile from './components/users/UserProfile.jsx';
import UserPublicView from './components/users/UserPublicView.jsx';
import './index.css';
import { LOGIN_URL, PROFILE_URL, SIGNUP_URL, ALLUSERS_URL } from './services/commonService.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <h1>Hello World</h1>
        <Link to="login">Login</Link>
      </div>
    ),
  },
  {
    path: LOGIN_URL,
    element: <Login />
  },
  {
    path: PROFILE_URL,
    element: <UserProfile />
  },
  {
    path: SIGNUP_URL,
    element: <SignUp />
  },
  {
    path: '/all',
    element: <div>Все пользователи</div>
  },
  {
    path: `${ALLUSERS_URL}/:userId`,
    element: <UserPublicView />
  },

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
