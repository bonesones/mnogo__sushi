import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserInfo, updateUserInfo } from "../store/userPrivateSlice.js";
import { useForm } from "react-hook-form";
import InputMask from "react-input-mask";

export default function Personal() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userPrivate.user.personal);
  const [success, setSuccess] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    dispatch(getUserInfo()).then(() => {
      setLoaded(true);
    });
  }, []);

  const onSubmit = async function (data) {
    try {
      const response = await dispatch(updateUserInfo(data));
      if (!response.error) {
        setSuccess(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <form
      className="profile-form w-full flex flex-col sm:w-10/12 md:w-9/12 lg:w-[30rem] items-center gap-y-4 md:gap-y-12 font-medium text-lg"
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
            <input
              {...register("password")}
              type="password"
              name="password"
              placeholder="******"
              className="bg-inherit border-2 border-[#A1947C] rounded-md pl-4 w-full md:w-96 lg:w-72 h-10"
            />
          </div>
          <div className="w-full flex flex-col md:flex-row md:justify-between gap-3 md:gap-4">
            <label htmlFor="password_submit" className="inline-block md:w-min">
              Подтвердите пароль
            </label>
            <input
              {...register("password_submit")}
              type="password"
              name="password_submit"
              placeholder="******"
              className="bg-inherit border-2 border-[#A1947C] rounded-md pl-4 w-full md:w-96 lg:w-72 h-10"
            />
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
            <button type="button" className="mt-4 mb-10">
              Удалить личный кабинет
            </button>
          </div>
        </>
      )}
    </form>
  );
}
