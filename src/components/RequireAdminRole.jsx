import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "./Loading.jsx";

export default function RequireAdminRole({ children }) {
    const location = useLocation();
    const [renderResult, setRenderResult] = useState(<Loading />);
    const navigate = useNavigate();

    useEffect(() => {
        const checkAdminRole = async () => {
            try {
                const response = await axios.post(
                    "/api/user/getrole",
                    {},
                    {
                        withCredentials: true,
                    },
                );
                if(response.data.role === 'ADMIN') {
                    setRenderResult(children);
                } else {
                    console.log('this!')
                    throw new Error('Недостаточно прав')
                }
            } catch (e) {
                console.log(e)
                if(e.response && e.response.status === 500) {
                    navigate("/500", {replace: true, state: { path: location.pathname }} )
                } else {
                    navigate("/404", {replace: true} )
                }
            }
        };
        checkAdminRole();
    }, [location]);

    return renderResult;
}
