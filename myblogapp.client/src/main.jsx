import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Login from './components/users/Login.jsx'
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import { LOGIN_URL, PROFILE_URL, SIGNUP_URL } from './services/commonService.jsx';
import UserProfile from './components/users/UserProfile.jsx';
import SignUp from './components/users/SignUp.jsx';

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
    element: <Login />,
  },
  {
    path: PROFILE_URL,
    element: <UserProfile />,
  },
  {
    path: SIGNUP_URL,
    element: <SignUp />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);