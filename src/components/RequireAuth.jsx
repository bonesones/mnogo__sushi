import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./Loading.jsx";
import { useDispatch } from "react-redux";
import { setIsAuthorized } from "../store/userPersistSlice.js";
import api from "../services/api.js";

export default function RequireAuth({ children }) {
  const location = useLocation();
  const [renderResult, setRenderResult] = useState(<Loading />);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        await api.post(
          "/api/user/check",
          {},
          {
            withCredentials: true,
          },
        );
        dispatch(setIsAuthorized(true));
        setRenderResult(children);
      } catch (e) {
        if (e.response && e.response.status === 500) {
          <Navigate to="/500" replace state={{ path: location.pathname }} />;
        } else {
          dispatch(setIsAuthorized(false));
          setRenderResult(
            <Navigate
              to="/login"
              replace
              state={{ path: location.pathname }}
            />,
          );
        }
      }
    };
    checkAuth();
  }, [location]);

  return renderResult;
}
