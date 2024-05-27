import React from 'react';
import { NavItem, NavLink } from "reactstrap";
import { ALLNEWS_URL, ALLUSERS_URL, LOGIN_URL, PROFILE_URL, isUserOnline } from "./services/commonService";
import { Link } from 'react-router-dom';

const AllNavs = () => {
  let navs = [
    <NavItem key="home">
      <NavLink tag={Link} className="text-dark" to="/">Домой</NavLink>
    </NavItem>
  ];

  if (isUserOnline()) {
    navs.push(
      <NavItem key="news">
        <NavLink tag={Link} className="text-dark" to={ALLNEWS_URL}>Стена</NavLink>
      </NavItem>,
      <NavItem key="users">
        <NavLink tag={Link} className="text-dark" to={ALLUSERS_URL}>Поиск</NavLink>
      </NavItem>,
      <NavItem key="profile">
        <NavLink tag={Link} className="text-dark" to={PROFILE_URL}>Мой профиль</NavLink>
      </NavItem>
    );
  } else {
    navs.push(
      <NavItem key="login">
        <NavLink tag={Link} className="text-dark" to={LOGIN_URL}>Логин</NavLink>
      </NavItem>
    );
  }

  return (
    <ul className="navbar-nav flex-grow d-flex">
      {navs}
    </ul>
  );
};

export default AllNavs;
