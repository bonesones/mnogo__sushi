import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../store/userPersistSlice.js";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { state } = useLocation();
  const [error, setError] = useState("");

  const onSubmit = async function (data) {
    try {
      const response = await dispatch(loginUser(data));
      if (response.error) {
        throw new Error("Неверный логин или пароль");
      }
      setError("");
      navigate(state?.path || "/");
    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <div className="profile-modal login block flex-col absolute md:static items-center rounded-xl w-80 md:mx-auto bg-main pb-4">
      <div className="text-center text-black font-semibold text-2xl mt-12">
        Вход
      </div>

      <form
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
        <label htmlFor="password" className="self-start">
          Пароль
        </label>
        <input
          {...register("password", {
            required: "Пароль не может быть пустым",
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
        {error && <span className="text-red-600 self-center">{error}</span>}
        <input
          type="submit"
          value="Войти"
          className="border bg-[#F35E62] text-white w-fit py-1.5 px-20 rounded-md rounded-tl-md hover:cursor-pointer mt-12"
        />
      </form>
      <div className="flex flex-col gap-5 text-center mt-[2rem]">
        <Link to="/register">Зарегистрироваться</Link>
        <a>Забыли пароль?</a>
      </div>
    </div>
  );
}
