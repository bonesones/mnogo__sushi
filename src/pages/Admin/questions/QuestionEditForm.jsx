import { Link, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../../../components/Loading.jsx";
import api from "../../../services/api.js";

export default function QuestionEditForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { questionId } = useParams();
  const [question, setQuestion] = useState(null);
  const [loaded, setLoaded] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = "МногоСуши | Редактирование вопроса";
    const fetchQuestion = async () => {
      try {
        const response = await api.get(`/api/question/getone/${questionId}`);
        setQuestion(response.data);
      } catch (e) {
        setError(e.response?.data?.message);
        console.log(e);
      }
    };
    fetchQuestion().finally(() => {
      setLoaded(true);
    });
  }, []);

  const onSubmit = async function (data) {
    try {
      await api.put(`/api/question/update/${questionId}`, data, {
        withCredentials: true,
      });
      setOpenModal(true);
      setError("");
      setTimeout(() => {
        setOpenModal(false);
      }, 2000);
    } catch (e) {
      setError(e.response?.data?.message);
      console.log(e);
    }
  };

  if (!loaded) return <Loading />;

  return (
    <div className="mt-16 mb-16 flex flex-col items-center w-full">
      <div className="w-full flex gap-4 mb-12 font-medium">
        <Link to="/admin/faq">F.A.Q</Link>><span>Редактировать F.A.Q</span>
      </div>
      <h2 className="text-2xl font-semibold">Редактировать вопрос - ответ</h2>
      {openModal && (
        <div className="fixed top-10 left-1/2 sm:text-lg -translate-x-1/2 bg-red-400 px-6 sm:px-10 w-fit rounded-md text-white py-5 sm:py-8">
          Вопрос сохранен!
        </div>
      )}
      <form
        className="flex flex-col gap-4 mt-12 w-full max-w-[30rem]"
        onSubmit={handleSubmit(onSubmit)}
        method="post"
      >
        <label htmlFor="name" className="self-start">
          Вопрос
        </label>
        <input
          {...register("name", {
            required: true,
          })}
          type="text"
          name="name"
          defaultValue={question.name}
          className="text-lg text-black bg-inherit px-5 py-1.5 border-2 border-[#A1947C] rounded-md pl-4 w-full"
        />
        <label htmlFor="description" className="self-start">
          Ответ
        </label>
        <textarea
          {...register("description", {
            required: true,
          })}
          name="description"
          defaultValue={question.description}
          className="text-black resize-none text-lg bg-inherit px-5 py-1.5 h-44 border-2 border-[#A1947C] rounded-md pl-4 w-full"
        />
        {Object.keys(errors).length > 0 && (
          <span className="text-red-600 text-center">
            Проверьте правильность заполнения полей
          </span>
        )}
        {errors && <span className="text-red-600">{error}</span>}
        <input
          type="submit"
          value="Редактировать вопрос - ответ"
          className="bg-second px-8 py-2 rounded-md text-white w-fit mx-auto mt-6"
        />
      </form>
    </div>
  );
}