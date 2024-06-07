import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./Loading.jsx";
import { setIsAuthorized } from "../store/userPersistSlice.js";
import { useDispatch } from "react-redux";

export default function CheckAuth({ children }) {
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
        dispatch(setIsAuthorized(false));
        setRenderResult(children);
      }
    };
    checkAuth();
  }, []);

  return renderResult;
}
