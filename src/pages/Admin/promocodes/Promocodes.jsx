import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../../../components/Loading.jsx";
import { Link } from "react-router-dom";
import Promocode from "./Promocode.jsx";

export default function Promocodes() {
  const [promocodes, setPromocodes] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    document.title = "МногоСуши | Промокоды";
    const fetchPromocodes = async () => {
      const response = await axios.get("/api/promocode/getall", {
        withCredentials: true,
      });
      setPromocodes(response.data);
    };
    fetchPromocodes().finally(() => {
      setLoaded(true);
    });
  }, []);

  if (!loaded) return <Loading />;

  return (
    <div className="mt-16 mb-16 flex flex-col items-center">
      {openModal && (
        <div className="fixed top-10 left-1/2 sm:text-lg -translate-x-1/2 bg-red-400 px-6 sm:px-10 w-fit rounded-md text-white py-5 sm:py-8">
          Промокод удален!
        </div>
      )}
      <h2 className="text-2xl font-semibold">Промокоды</h2>
      <Link
        to="/admin/promocodes/create_promocode"
        className="mt-12 bg-second text-white px-5 py-1 rounded-md"
      >
        Создать промокод
      </Link>
      <div className="mt-12 w-full flex flex-col gap-12 max-w-[50rem]">
        {promocodes.length > 0 ? (
          promocodes.map((promocode) => (
            <Promocode
              key={promocode.id}
              promocode={promocode}
              setPromocodes={setPromocodes}
              setOpenModal={setOpenModal}
            />
          ))
        ) : (
          <h2 className="text-xl text-center mt-12 mb-12 font-semibold">
            Актуальные промокоды отсутствуют
          </h2>
        )}
      </div>
    </div>
  );
}
