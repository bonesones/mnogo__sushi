import {Link, useLocation, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import axios from "axios";

export default function Error_500() {
    const navigate = useNavigate()
    const { state } = useLocation()

    useEffect(() => {
        const fetchServer = async () => {
            try {
                await axios.get('/api');
            } catch (e) {
                if(e.response && e.response.status !== 500) {
                    navigate(state?.path || "/")
                }
            }
        }
        fetchServer()
    } ,[])
    return (
        <div className="absolute w-10/12 sm:w-full flex flex-col items-center top-2/4 left-2/4 -translate-x-1/2 -translate-y-1/2">
            <img
                src="/panda_404.png"
                alt="Панда"
                width="300"
                height="300"
                className="sm:w-[320px] sm:h-[320px] lg:w-[280px] lg:h-[280px]"
            />
            <h1 className="text-center mt-4 text-4xl lg:text-5xl font-semibold">
                500
                <br />
            </h1>
            <p className="text-center mt-6 text-lg lg:text-xl">
                Кажется, что-то пошло не так...
            </p>
            <p className="text-center mt-6 text-lg lg:text-xl">
                Попробуйте вернуться позднее!
            </p>
        </div>
    );
}
