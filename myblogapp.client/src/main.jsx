import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
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
import './custom.css';
import { LOGIN_URL, PROFILE_URL, SIGNUP_URL, ALLUSERS_URL, ALLNEWS_URL } from './services/commonService.jsx';
import SearchUser from './components/users/SearchUser.jsx';
import Navigation from './NavigationMenu.jsx';
import { NewsByUser, NewsForUser } from './components/news/News.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div className='content'>
        <Navigation />
        <h1>Hello World</h1>
        <h2>My simple blog app!</h2>
        <p>Created by Dmitry Serykh</p>
        <a href='https://github.com/Aideos88/MyBlogApp'>GutHub</a>
      </div>
    ),
  },
  {
    path: LOGIN_URL,
    element:
      <div className='content'>
        <Navigation />
        <Login />
      </div>
  },
  {
    path: PROFILE_URL,
    element:
      <div className='content'>
        <Navigation />
        <UserProfile />
      </div>
  },
  {
    path: SIGNUP_URL,
    element:
      <div className='content'>
        <Navigation />
        <SignUp />
      </div>
  },
  {
    path: '/all',
    element:
      <div className='content'>
        <Navigation />
        <SearchUser />
      </div>
  },
  {
    path: `${ALLUSERS_URL}/:userId`,
    element:
      <div className='content'>
        <Navigation />
        <UserPublicView />
      </div>
  },
  {
    path: ALLNEWS_URL,
    element:
    <div className='content'>
        <Navigation />
        <NewsForUser />
      </div>
  },

]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
