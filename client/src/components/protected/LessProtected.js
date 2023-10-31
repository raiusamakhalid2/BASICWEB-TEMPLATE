import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';
import AuthContext from '../../context/AuthContext';

export default function LessProtected({ children }) {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user || user.userId === null || user.userId === undefined) {
      navigate('/login');
    }
  }, [user, navigate]);
  

  return user ? children : null;
}
