import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./Loading.jsx";
import { useDispatch } from "react-redux";
import { setIsAuthorized } from "../store/userPersistSlice.js";

export default function RequireAuth({ children }) {
  const location = useLocation();
  const [renderResult, setRenderResult] = useState(<Loading />);
  const dispatch = useDispatch();

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
        dispatch(setIsAuthorized(true));
        setRenderResult(children);
      } catch (e) {
        console.log(e);
        dispatch(setIsAuthorized(false));
        setRenderResult(
          <Navigate to="/login" replace state={{ path: location.pathname }} />,
        );
      }
    };
    checkAuth();
  }, [location]);

  return renderResult;
}
