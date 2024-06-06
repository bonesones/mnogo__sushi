import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./Loading.jsx";

export default function CheckAuth({ children }) {
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
        localStorage.setItem("isAuthenticated", true);
        console.log("localstoraged edited");
        console.log(localStorage.getItem("isAuthenticated"));
        setRenderResult(children);
      } catch (e) {
        console.log(e);
        localStorage.clear();
        setRenderResult(children);
      }
    };
    checkAuth();
  }, []);

  return renderResult;
}
