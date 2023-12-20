import React, { useEffect } from 'react';
import './SideBar.css';
import {
  FaTwitter, FaFacebookF, FaVine, FaPinterestP,
} from 'react-icons/fa';
import { TiSocialGooglePlus } from 'react-icons/ti';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../Redux/Reducers/authSlice';
import Search from './Search';
import PriceFilter from './PriceFilter';
  
const SideBar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');

  const handleLogout = async () => {
    if (token) {
      await dispatch(logoutUser());
      setTimeout(() => {
        navigate('/');
      }, 200);
    }
  };

  const navLinks = [
    { url: '/', name: 'Houses' },
    token && { url: '/my_reservations', name: 'My Reservations' },
  ].filter(Boolean);

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      if (event.returnValue === null) {
        localStorage.removeItem('token');
      }
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return (
    <div>
      <div className="menu">
        <div className="logo">Casa-Hunt</div>
        <div className="content-wrapper"><PriceFilter/></div>
        <Search/>
        <ul>
          {navLinks.map(({ url, name }) => (
            <li key={name}>
              <Link to={url}>{name}</Link>
            </li>
          ))}
          {token ? (
            <li>
              <button type="button" onClick={handleLogout}>Logout</button>
            </li>
          ) : (
            <li>
              <Link to="/login">Log In</Link>
            </li>
          )}
        </ul>
        <div className="footer">
          <div className="social">
            <FaTwitter />
            <FaFacebookF />
            <TiSocialGooglePlus />
            <FaVine />
            <FaPinterestP />
          </div>
          <small>&copy; 2023 MaxHomes.ai </small>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
