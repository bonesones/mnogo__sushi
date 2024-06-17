import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../../../components/Loading.jsx";
import { Link } from "react-router-dom";
import Slide from "./Slide.jsx";
import api from "../services/api.js";

export default function Slides() {
  const [slides, setSlides] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    document.title = "МногоСуши | Слайды";
    const fetchFAQs = async () => {
      try {
        const response = await api.get("/api/slider/getall");
        setSlides(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    fetchFAQs().finally(() => {
      setLoaded(true);
    });
  }, []);

  if (!loaded) return <Loading />;

  return (
    <div className="mt-16 mb-16 flex flex-col items-center">
      {openModal && (
        <div className="fixed z-10 top-10 left-1/2 sm:text-lg -translate-x-1/2 bg-red-400 px-6 sm:px-10 w-fit rounded-md text-white py-5 sm:py-8">
          Слайд удален!
        </div>
      )}
      <h2 className="text-2xl font-semibold">Слайды</h2>
      <Link
        to="/admin/slides/create_slide"
        className="mt-12 bg-second text-white px-5 py-1 rounded-md"
      >
        Создать слайд
      </Link>
      <div className="mt-12 flex flex-col gap-10">
        {slides.map((slide) => (
          <Slide
            slide={slide}
            key={slide.id}
            setOpenModal={setOpenModal}
            setSlides={setSlides}
          />
        ))}
      </div>
    </div>
  );
}
