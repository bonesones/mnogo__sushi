import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./Loading.jsx";
import { setIsAuthorized } from "../store/userPersistSlice.js";
import { useDispatch } from "react-redux";
import api from "../services/api.js";

export default function CheckAuth({ children }) {
  const [renderResult, setRenderResult] = useState(null);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
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
        setLoading(false);
        setRenderResult(children);
      } catch (e) {
        dispatch(setIsAuthorized(false));
        setLoading(false);
        setRenderResult(children);
      }
    };
    checkAuth();
  }, []);

  if (loading) return null;
  return renderResult;
}
