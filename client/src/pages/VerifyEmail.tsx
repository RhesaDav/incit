import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const VerifyEmail: React.FC = () => {
  const [message, setMessage] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmail = async () => {
      const params = new URLSearchParams(location.search);
      const token = params.get('token');

      try {
        await axios.get(`http://localhost:3100/auth/verify-email?token=${token}`);
        setMessage('Email verified successfully');
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } catch (error) {
        setMessage('Invalid or expired token');
      }
    };

    verifyEmail();
  }, [navigate, history]);

  return <div>{message && <p>{message}</p>}</div>;
};

export default VerifyEmail;
