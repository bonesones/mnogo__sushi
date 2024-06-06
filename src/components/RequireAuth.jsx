import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./Loading.jsx";

export default function RequireAuth({ children }) {
  const location = useLocation();
  const [renderResult, setRenderResult] = useState(<Loading />);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await axios.post(
          "/api/user/check",
          {},
          {
            withCredentials: true,
          },
        );
        setRenderResult(children);
      } catch (e) {
        console.log(e);
        setRenderResult(
          <Navigate to="/login" replace state={{ path: location.pathname }} />,
        );
      }
    };
    checkAuth();
  }, []);

  return renderResult;
}