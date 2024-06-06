import { useEffect, useState } from "react";
import Order from "../components/Order.jsx";

export default function Profile() {
  return (
    <div className="profile flex flex-col wrapper mx-auto">
      <div className="flex flex-col md:flex-row md:justify-between gap-5 mt-24 mb-[3rem] items-center mt-24">
        <h1 className="text-3xl font-bold text-center">Личный кабинет</h1>
        <button
          type="button"
          className="bg-white hover:bg-[#F35E62] text-[#F35E62] hover:text-white border-2 border-[#F35E62] font-medium rounded-lg py-1 px-4"
        >
          Выйти
        </button>
      </div>
      <div className="flex flex-col lg:flex-row items-center lg:items-start xl:justify-items-start">
        <div
          className="flex flex-col gap-4 w-fit"
          onClick={(e) => clickHandler(e)}
        >
          <button
            className="w-72 data-switch-btn data-switch-btn_active bg-white border-2 border-[#F35E62] text-[#F35E62] font-medium text-xl px-10 py-1.5 rounded-r-lg"
            data-page="personal"
          >
            Личные данные
          </button>
          <button
            className="w-72 data-switch-btn bg-white border-2 border-[#F35E62] text-[#F35E62] font-medium text-xl px-10 py-1.5 rounded-r-lg"
            data-page="orders"
          >
            История заказов
          </button>
        </div>
        <div className="w-full flex justify-center lg:pr-0 xl:pl-6 mt-24 lg:mt-0">
          {profileMode === "personal" ? (
            <form className="profile-form grid grid-cols-1 md:grid-cols-2 w-full sm:w-10/12 lg:w-[30rem] items-center gap-y-4 md:gap-y-12 font-medium text-lg">
              <label htmlFor="name" className=" inline-block">
                Имя
              </label>
              <input
                type="text"
                name="name"
                className="bg-inherit border-2 border-[#A1947C] rounded-md pl-4 w-full"
              />
              <label htmlFor="phone" className=" inline-block">
                Телефон
              </label>
              <input
                type="tel"
                name="phone"
                placeholder="+7 (111) 111-11-11"
                className="bg-inherit border-2 border-[#A1947C] rounded-md pl-4 w-full"
              />
              <label htmlFor="birthday" className=" inline-block">
                Дата рождения
              </label>
              <input
                type="date"
                name="birthday"
                placeholder="мм/дд/гггг"
                className="bg-inherit h-[32px] border-2 border-[#A1947C] rounded-md pl-4 w-full"
              />
              <label htmlFor="email" className=" inline-block">
                Почта
              </label>
              <input
                type="email"
                name="email"
                className="bg-inherit border-2 border-[#A1947C] rounded-md pl-4 w-full"
                placeholder="example@email.com"
              />
              <label htmlFor="password" className=" inline-block">
                Пароль
              </label>
              <input
                type="password"
                name="password"
                placeholder="******"
                className="bg-inherit border-2 border-[#A1947C] rounded-md pl-4 w-full"
              />
              <label htmlFor="password_submit" className="inline-block">
                Подтвердите пароль
              </label>
              <input
                type="password"
                name="password_submit"
                placeholder="******"
                className="bg-inherit border-2 border-[#A1947C] rounded-md pl-4 w-full"
              />
              <div className="flex flex-col gap-6 col-span-full">
                <input
                  type="submit"
                  value="Сохранить"
                  className="border bg-[#F35E62] text-white w-fit py-1.5 px-20 place-self-center mt-10 rounded-r-md rounded-tl-md hover:cursor-pointer"
                />
                <button type="button" className="mt-4 mb-10">
                  Удалить личный кабинет
                </button>
              </div>
            </form>
          ) : (
            <div className="flex flex-col gap-16 w-full">
              <Order />
              <Order />
              <Order />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
