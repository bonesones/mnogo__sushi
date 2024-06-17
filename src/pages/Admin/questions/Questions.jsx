import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../../../components/Loading.jsx";
import Question from "./Question.jsx";
import { Link } from "react-router-dom";
import api from "../services/api.js";

export default function Questions() {
  const [FAQs, setFAQs] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    document.title = "МногоСуши | Вопросы";
    const fetchFAQs = async () => {
      try {
        const response = await api.get("/api/question/getall");
        setFAQs(response.data);
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
          Вопрос удален!
        </div>
      )}
      <h2 className="text-2xl font-semibold">Вопрос - ответ</h2>
      <Link
        to="/admin/faq/create_question"
        className="mt-12 bg-second text-white px-5 py-1 rounded-md"
      >
        Создать вопрос - ответ
      </Link>
      <div className="mt-12 flex flex-col gap-10">
        {FAQs.map((FAQ) => (
          <Question
            key={FAQ.id}
            question={FAQ.name}
            answer={FAQ.description}
            id={FAQ.id}
            setOpenModal={setOpenModal}
            setQuestions={setFAQs}
          />
        ))}
      </div>
    </div>
  );
}
