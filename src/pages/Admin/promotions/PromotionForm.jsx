import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useEffect, useState } from "react";
import api from "../../../services/api.js";

export default function PromotionForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [openModal, setOpenModal] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = "МногоСуши | Создание акции";
  }, []);

  const onSubmit = async function (data) {
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key === "image") {
        return;
      }
      formData.append(key, value);
    });
    formData.append("image", data.image[0]);
    try {
      await api.post("/api/promotion/create", formData, {
        withCredentials: true,
      });
      setOpenModal(true);
      reset();
      setError("");
      setTimeout(() => {
        setOpenModal(false);
      }, 2000);
    } catch (e) {
      setError(e.response?.data?.message);
      console.log(e);
    }
  };

  return (
    <div className="mt-16 mb-16 flex flex-col items-center w-full">
      <div className="w-full flex gap-4 mb-12 font-medium">
        <Link to="/admin/promotions">Акции</Link>><span>Создать акцию</span>
      </div>
      <h2 className="text-2xl font-semibold">Создать акцию</h2>
      {openModal && (
        <div className="fixed top-10 left-1/2 sm:text-lg -translate-x-1/2 bg-red-400 px-6 sm:px-10 w-fit rounded-md text-white py-5 sm:py-8">
          Акция создана!
        </div>
      )}
      <form
        className="flex flex-col gap-4 mt-12"
        onSubmit={handleSubmit(onSubmit)}
        method="post"
      >
        <label htmlFor="title" className="self-start">
          Название акции
        </label>
        <input
          {...register("title", {
            required: true,
          })}
          type="text"
          name="title"
          className="text-lg text-black bg-inherit px-5 py-1.5 border-2 border-[#A1947C] rounded-md pl-4 w-full"
        />
        <label htmlFor="description" className="self-start">
          Описание акции
        </label>
        <textarea
          {...register("description", {
            required: true,
          })}
          name="description"
          className="text-black resize-none text-lg bg-inherit px-5 py-1.5 h-44 border-2 border-[#A1947C] rounded-md pl-4 w-full"
        />
        <label htmlFor="image" className="self-start">
          Изображение акции
        </label>
        <input
          {...register("image", {
            required: true,
            validate: (value) =>
              value[0].size < 1048576 || "Изображение больше 1Мбайта!",
          })}
          type="file"
          name="image"
          className="text-lg text-black bg-inherit px-5 py-1.5 border-2 border-[#A1947C] rounded-md pl-4 w-full"
        />
        <span>До 1 Мбайта</span>
        {errors.image && (
          <span className="text-red-600 text-center">
            {errors.image.message}
          </span>
        )}
        {Object.keys(errors).length > 0 && (
          <span className="text-red-600 text-center">
            Проверьте правильность заполнения полей
          </span>
        )}
        {errors && <span className="text-red-600">{error}</span>}
        <input
          type="submit"
          value="Создать акцию"
          className="bg-second px-8 py-2 rounded-md text-white w-fit mx-auto mt-6"
        />
      </form>
    </div>
  );
}
