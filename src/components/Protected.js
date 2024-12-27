import { jwtDecode } from "jwt-decode";
import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const Protected = ({ children }) => {
  const token = Cookies.get("access_token");

  if (!token) {
    return <Navigate to="/" />;
  }

  try {
    const decodedToken = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);

    if (decodedToken.exp < currentTime) {
      Cookies.remove("access_token");
      return <Navigate to="/" />;
    }
  } catch (error) {
    Cookies.remove("access_token");
    return <Navigate to="/" />;
  }

  return children;
};

export default Protected;
