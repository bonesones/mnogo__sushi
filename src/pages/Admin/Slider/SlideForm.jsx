import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import api from "../../../services/api.js";

export default function SlideForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [firstImage, setFirstImage] = useState()
  const [secondImage, setSecondImage] = useState()

  const [openModal, setOpenModal] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    document.title = "МногоСуши | Создание слайда";
  }, []);

  useEffect(() => {
    console.log(secondImage)
  }, [setSecondImage]);

  const onSubmit = async function (data) {
    const formData = new FormData();
    formData.append("desktop_image", data.desktop_image[0]);
    formData.append("tablet_phone_image", data.tablet_phone_image[0]);
    formData.append("title", data.title);

    try {
      await api.post("/api/slider/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
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
        <Link to="/admin/slides">Слайды</Link>><span>Создать слайд</span>
      </div>
      <h2 className="text-2xl font-semibold">Создать слайд</h2>
      {openModal && (
        <div className="fixed top-10 left-1/2 sm:text-lg -translate-x-1/2 bg-red-400 px-6 sm:px-10 w-fit rounded-md text-white py-5 sm:py-8">
          Слайд создан!
        </div>
      )}
      <form
        className="flex flex-col gap-4 mt-12 w-full max-w-[30rem]"
        onSubmit={handleSubmit(onSubmit)}
        method="post"
      >
        <label htmlFor="title" className="self-start">
          Название слайда
        </label>
        <input
          {...register("title", {
            required: true,
          })}
          type="text"
          name="title"
          className="text-lg text-black bg-inherit px-5 py-1.5 border-2 border-[#A1947C] rounded-md pl-4 w-full"
        />
        <label htmlFor="desktop_image" className="self-start">
          Слайд для компьютеров
        </label>
        <input
          {...register("desktop_image", {
            required: true,
            validate: (value) =>
              value[0].size < 1048576 || "Изображение больше 1Мбайта!",
          })}
          type="file"
          name="desktop_image"
          className="text-lg text-black bg-inherit px-5 py-1.5 border-2 border-[#A1947C] rounded-md pl-4 w-full"
        />
        {errors.desktop_image?.type === "validate" && (
          <span className="text-red-600">{errors.desktop_image.message}</span>
        )}
        <span>Рекомендуемое разрешение: 1920 X 500</span>
        <span>До 1 Мбайта</span>
        <label htmlFor="tablet_phone_image" className="self-start">
          Слайд для планшетов и телефонов
        </label>
        <input
          {...register("tablet_phone_image", {
            required: true,
            validate: (value) =>
              value[0].size < 1048576 || "Изображение больше 1Мбайта!",
          })}
          type="file"
          name="tablet_phone_image"
          className="text-black resize-none text-lg bg-inherit px-5 py-1.5 border-2 border-[#A1947C] rounded-md pl-4 w-full"
        />
        {errors.tablet_phone_image?.type === "validate" && (
          <span className="text-red-600">
            {errors.tablet_phone_image.message}
          </span>
        )}
        <span>Рекомендуемое разрешение: 1024 X 500</span>
        <span>До 1 Мбайта</span>
        {Object.keys(errors).length > 0 && (
          <span className="text-red-600 text-center">
            Проверьте правильность заполнения полей
          </span>
        )}
        {errors && <span className="text-red-600">{error}</span>}
        <input
          type="submit"
          value="Создать слайд"
          className="bg-second px-8 py-2 rounded-md text-white w-fit mx-auto mt-6"
        />
      </form>
    </div>
  );
}
