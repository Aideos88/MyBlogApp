import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom'; // Если используете React Router
import './styles/navigationStyle.css'
import AllNavs from './AllNavs';
import { ALLNEWS_URL } from './services/commonService';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // Закрыть меню при изменении размера экрана
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    // Очистить обработчик при размонтировании компонента
    return () => window.removeEventListener('resize', handleResize);
  }, [isOpen]);

  return (
    <nav className="navigation">
      <button className="toggle-menu" onClick={toggleMenu}>
        {isOpen ? 'Закрыть' : 'Меню'}
      </button>
      <ul className={`menu ${isOpen ? 'open' : ''}`}>
        {/* <AllNavs /> */}
        <li className="menu-item">
          <Link to="/">Главная</Link> </li>
        <li className="menu-item">
        <Link to="/login">Логин</Link>
        </li>
        <li className="menu-item">
          <Link to={ALLNEWS_URL}>Новости</Link>
        </li>
        <li className="menu-item">
          <Link to="/all">Поиск</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
