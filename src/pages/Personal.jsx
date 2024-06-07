import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo, updateUserInfo } from "../store/userPrivateSlice.js";
import { useForm } from "react-hook-form";
import InputMask from "react-input-mask";
import BackGround from "../components/BackGround.jsx";
import {deleteUser, logoutUser} from "../store/userPersistSlice.js";
import {useNavigate} from "react-router-dom";

export default function Personal() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userPrivate.user.personal);
  const [success, setSuccess] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [isDeleteModalActive, setDeleteModalActive] = useState(false);

  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    dispatch(getUserInfo()).then(() => {
      setLoaded(true);
    });
  }, []);

  useEffect(() => {
    if(isDeleteModalActive) {
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.overflowY = 'auto';
    }
  }, [isDeleteModalActive]);

  const onSubmit = async function (data) {
    try {
      const response = await dispatch(updateUserInfo(data));
      if (!response.error) {
        setSuccess(true);
        setTimeout(function () {
          setSuccess(false);
        }, 5000)
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleDeleteUserSubmit = async function (e) {
    e.preventDefault();
    setDeleteModalActive(false);
    await dispatch(deleteUser())
    await dispatch(logoutUser())
    navigate('/login')
  }

  const handleOpenModalDeleteUser = function () {
    setDeleteModalActive(true)
  }

  return (
      <>
        <BackGround active={isDeleteModalActive} onClick={() => setDeleteModalActive(false)}/>
        {isDeleteModalActive && (
            <div className="fixed z-20 flex flex-col items-center gap-3 top-1/2 left-1/2 rounded-md -translate-x-1/2 -translate-y-1/2 bg-white w-5/6 md:w-120 px-6 py-4">
              <p className="text-center">Вы точно хотите удалить личный кабиент?</p>
              <p className="text-center">Действие отменить невозможно</p>
              <form className="flex flex-col gap-5 mt-4 mb-2" onSubmit={handleDeleteUserSubmit}>
                <input type="submit" className="bg-second text-white px-12 py-2 rounded-md" value="Да, удалить"/>
                <button type="button px-12 py-2" onClick={() => setDeleteModalActive(false)}>Нет, я передумал</button>
              </form>
            </div>
        )}
        <form
            className="profile-form w-full flex flex-col mb-16 sm:w-10/12 md:w-9/12 lg:w-[30rem] items-center gap-y-4 md:gap-y-12 font-medium text-lg"
            onSubmit={handleSubmit(onSubmit)}
            method="PUT"
        >
          {loaded && (
              <>
                <div className="w-full flex flex-col md:flex-row md:justify-between gap-3 md:gap-4">
                  <label htmlFor="name" className=" inline-block">
                    Имя
                  </label>
                  <input
                      type="text"
                      {...register("name")}
                      name="name"
                      defaultValue={user.name}
                      autoComplete="on"
                      className="bg-inherit border-2 border-[#A1947C] rounded-md h-10 pl-4 w-full md:w-96 lg:w-72"
                  />
                </div>
                <div className="w-full flex flex-col md:flex-row md:justify-between gap-3 md:gap-4">
                  <label htmlFor="phone" className="inline-block">
                    Телефон
                  </label>
                  <div className="flex flex-col md:w-96 gap-2 items-end">
                    <InputMask
                        type="tel"
                        name="phone"
                        {...register("phone", {
                          required: "Телефон не указан",
                          pattern: {
                            value: /^\+7\(\d{3}\)-\d{3}-\d{2}-\d{2}$/,
                            message: "Неверный формат телефона",
                          },
                        })}
                        mask="+7(999)-999-99-99"
                        defaultValue={user.phone}
                        className="bg-inherit border-2 border-[#A1947C] rounded-md h-10 pl-4 w-full lg:w-72"
                    />
                    {errors.phone && (
                        <span className="text-red-600 self-start lg:self-end">
                  {errors.phone.message}
                </span>
                    )}
                  </div>
                </div>
                <div className="w-full flex flex-col md:flex-row md:justify-between gap-3 md:gap-4">
                  <label htmlFor="birthday" className=" inline-block">
                    Дата рождения
                  </label>
                  <div className="flex flex-col md:w-96 gap-2 items-end">
                    <input
                        {...register("birthday", {
                          validate: {
                            isTwelveAtLeast: (date) =>
                                new Date().getFullYear() - new Date(date).getFullYear() >=
                                12 || "Вам должно быть не меньше 12",
                          },
                        })}
                        type="date"
                        name="birthday"
                        placeholder="мм/дд/гггг"
                        defaultValue={user.birthday}
                        className="bg-inherit h-10 border-2 border-[#A1947C] rounded-md pl-4 w-full md:w-96 lg:w-72"
                    />
                    {errors.birthday && (
                        <span className="text-red-600 self-start lg:self-end">
                  {errors.birthday.message}
                </span>
                    )}
                  </div>
                </div>
                <div className="w-full flex flex-col md:flex-row md:justify-between gap-3 md:gap-4">
                  <label htmlFor="email" className=" inline-block">
                    Почта
                  </label>
                  <div className="flex flex-col md:w-96 gap-2 items-end">
                    <input
                        type="email"
                        name="email"
                        {...register("email", {
                          required: "Почта не указана",
                          pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: "Неверный формат почты",
                          },
                        })}
                        defaultValue={user.email}
                        className="bg-inherit border-2 border-[#A1947C] rounded-md pl-4 w-full md:w-96 lg:w-72 h-10"
                        placeholder="example@email.com"
                    />
                    {errors.email && (
                        <span className="text-red-600 self-start lg:self-end">
                  {errors.email.message}
                </span>
                    )}
                  </div>
                </div>
                <div className="w-full flex flex-col md:flex-row md:justify-between gap-3 md:gap-4">
                  <label htmlFor="password" className="inline-block">
                    Пароль
                  </label>
                  <div className="flex flex-col md:w-96 gap-2 items-end md:w-min">
                    <input
                        {...register("password", {
                          minLength: {
                            value: 8,
                            message: "Пароль не может быть менее 8 символов"
                          }
                        })}
                        type="password"
                        name="password"
                        placeholder="******"
                        autoComplete="false"
                        className="bg-inherit border-2 border-[#A1947C] rounded-md pl-4 w-full md:w-96 lg:w-72 h-10"
                    />
                    {errors.password && (
                        <span className="text-red-600 self-start lg:self-end">
                  {errors.password.message}
                </span>
                    )}
                  </div>
                </div>
                <div className="w-full flex flex-col md:flex-row md:justify-between gap-3 md:gap-4">
                  <label htmlFor="password_submit" className="inline-block md:w-min">
                    Подтвердите пароль
                  </label>
                  <div className="flex flex-col md:w-96 gap-2 items-end ">
                    <input
                        {...register("password_submit", {
                          validate: (value) =>
                              value === getValues("password") || "Пароли не совпадают",
                        })}
                        type="password"
                        name="password_submit"
                        placeholder="******"
                        className="bg-inherit border-2 border-[#A1947C] rounded-md pl-4 w-full md:w-96 lg:w-72 h-10"
                    />
                    {errors.password_submit && (
                        <span className="text-red-600 self-start lg:self-end">
                  {errors.password_submit.message}
                </span>
                    )}
                  </div>
                </div>
                <div className="flex flex-col gap-6 col-span-full">
                  {success && (
                      <span className="place-self-center text-green-500">
                Данные сохранены
              </span>
                  )}
                  <input
                      type="submit"
                      value="Сохранить"
                      className="border bg-[#F35E62] text-white w-fit py-1.5 px-20 place-self-center mt-10 rounded-r-md rounded-tl-md hover:cursor-pointer"
                  />
                  <button type="button" onClick={handleOpenModalDeleteUser} className="mt-4">
                    Удалить личный кабинет
                  </button>
                </div>
              </>
          )}
        </form>
      </>
  );
}
