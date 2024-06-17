import { useEffect, useState } from "react";
import Loading from "./Loading.jsx";
import axios from "axios";
import Error_404 from "../pages/404.jsx";
import { setIsAuthorized } from "../store/userPersistSlice.js";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";
import api from "../services/api.js";

export default function CheckGuest({ children }) {
  const [renderResult, setRenderResult] = useState(<Loading />);
  const dispatch = useDispatch();

  const location = useLocation();

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
        setRenderResult(<Error_404 />);
      } catch (e) {
        dispatch(setIsAuthorized(false));
        setRenderResult(children);
      }
    };
    checkAuth();
  }, [location]);

  return renderResult;
}
