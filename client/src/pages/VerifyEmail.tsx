import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { verifyEmail } from '../service/auth';

const VerifyEmail: React.FC = () => {
  const [message, setMessage] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyEmails = async () => {
      const params = new URLSearchParams(location.search);
      const token = params.get('token');

      try {
        await verifyEmail(token as string)
        setMessage('Email verified successfully');
        setTimeout(() => {
          navigate('/login');
        }, 3000);
      } catch (error) {
        setMessage('Invalid or expired token');
      }
    };

    verifyEmails();
  }, [navigate, history]);

  return <div>{message && <p>{message}</p>}</div>;
};

export default VerifyEmail;
