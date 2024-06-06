import { useEffect, useState } from "react";
import Loading from "./Loading.jsx";
import axios from "axios";
import Error_404 from "../pages/404.jsx";

export default function CheckGuest({ children }) {
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
        setRenderResult(<Error_404 />);
      } catch (e) {
        setRenderResult(children);
      }
    };
    checkAuth();
  }, []);

  return renderResult;
}
