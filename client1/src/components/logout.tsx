import React from 'react';
import auth from '../auth';
import apiService from '../apiService';
import { Link, useNavigate } from 'react-router-dom';

// Define the props for the Logout component
interface LogoutProps {
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

const Logout: React.FC<LogoutProps> = (props) => {
  let navigate = useNavigate();

  const handleClick = () => {
    apiService.logout();
    handleAuth();
  };

  const handleAuth = () => {
    props.setIsAuthenticated(false);
    auth.logout(() => navigate('/'));
  };

  return (
    <div>
      <h2 className='h2'>Are you sure you want to log out?</h2>
      <Link to="/">
        <button className='confirm-btn'>No</button>
      </Link>
      <button className='confirm-btn' onClick={handleClick}>Yes</button>
    </div>
  );
}

export default Logout;
