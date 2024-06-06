import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import InputMask from "react-input-mask";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function Register() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const onSubmit = async function (data) {
    try {
      await axios.post(
        "/api/user/signup",
        {
          email: data.email,
          phone: data.phone,
          password: data.password,
          submit_password: data.submit_password,
        },
        {
          withCredentials: true,
        },
      );
      localStorage.setItem("isAuthenticated", true);
      navigate("/profile");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="profile-modal login block flex-col absolute md:static items-center rounded-xl w-80 md:mx-auto bg-main pb-4">
      <div className="text-center text-black font-semibold text-2xl mt-12">
        Регистрация
      </div>
      <form
        action=""
        method="POST"
        onSubmit={handleSubmit(onSubmit)}
        className="profile-modal-form flex flex-col gap-3 items-center mt-12"
      >
        <label htmlFor="email" className="self-start">
          Почта
        </label>
        <input
          {...register("email", {
            required: "Почта не указана",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Неверный формат почты",
            },
          })}
          type="email"
          name="email"
          placeholder="example@email.com"
          className="text-lg text-black bg-inherit px-5 py-1.5 border-2 border-[#A1947C] rounded-md pl-4 w-full"
        />
        {errors.email && (
          <span className="text-red-600 self-start">
            {errors.email.message}
          </span>
        )}
        <label htmlFor="email" className="self-start">
          Телефон
        </label>
        <InputMask
          {...register("phone", {
            required: "Телефон не указан",
            pattern: {
              value: /^\+7\(\d{3}\)-\d{3}-\d{2}-\d{2}$/,
              message: "Неверный формат телефона",
            },
          })}
          mask="+7(999)-999-99-99"
          type="tel"
          name="phone"
          className="text-lg text-black bg-inherit px-5 py-1.5 border-2 border-[#A1947C] rounded-md pl-4 w-full"
          alwaysShowMask
        />
        {errors.phone && (
          <span className="text-red-600 self-start">
            {errors.phone.message}
          </span>
        )}
        <label htmlFor="password" className="self-start">
          Пароль
        </label>
        <input
          {...register("password", {
            required: "Пароль не может быть пустым",
            minLength: {
              value: 8,
              message: "Пароль не может быть меньше 8 символов",
            },
          })}
          type="password"
          name="password"
          className="text-black text-lg bg-inherit px-5 py-1.5  border-2 border-[#A1947C] rounded-md pl-4 w-full"
        />
        {errors.password && (
          <span className="text-red-600 self-start">
            {errors.password.message}
          </span>
        )}
        <label htmlFor="submit_password" className="self-start">
          Подтвердите пароль
        </label>
        <input
          {...register("submit_password", {
            validate: (value) =>
              value === getValues("password") || "Пароли не совпадают",
          })}
          type="password"
          name="submit_password"
          className="text-black text-lg bg-inherit px-5 py-1.5  border-2 border-[#A1947C] rounded-md pl-4 w-full"
        />
        {errors.submit_password && (
          <span className="text-red-600 self-start">
            {errors.submit_password.message}
          </span>
        )}
        <input
          type="submit"
          value="Зарегистрироваться"
          className="border bg-[#F35E62] text-white w-fit py-1.5 px-10 rounded-md rounded-tl-md hover:cursor-pointer mt-12"
        />
      </form>
      <div className="flex flex-col gap-5 text-center mt-[2rem]">
        <Link to="/login">Зарегистрированы? Войти</Link>
      </div>
    </div>
  );
}
