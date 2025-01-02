import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchUserData } from "../features/auth/authSlice";

const Protected = ({ Component }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const actionResult = await dispatch(fetchUserData());
        if (actionResult && actionResult.payload) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, [dispatch]);

  return isAuthenticated ? <Component /> : <Navigate to="/" replace />;
};

export default Protected;
