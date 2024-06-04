import { useState } from "react";

export default function LogModal({ isLogin, setIsLogin }) {
  const [value, setValue] = useState("");
  const handleInputChange = function (e) {
    setValue(e.target.value);
  };
  return (
    <div className="profile-modal login flex flex-col items-center absolute z-30 rounded-xl w-[40rem] bg-[#E4D3B1] pb-4">
      <div className="text-center text-black font-semibold text-2xl mt-12">
        {isLogin ? "Вход" : "Регистрация"}
      </div>
      <form
        action=""
        method="POST"
        className="profile-modal-form flex flex-col items-center mt-12"
      >
        {isLogin ? (
          <>
            <input
              type="text"
              placeholder="Телефон"
              className="text-lg text-black bg-inherit px-5 py-1.5 border-2 border-[#A1947C] rounded-md pl-4 w-full"
            />
            <input
              type="password"
              placeholder="Пароль"
              className="mt-3 text-black text-lg bg-inherit px-5 py-1.5  border-2 border-[#A1947C] rounded-md pl-4 w-full"
            />
            <input
              type="submit"
              value="Войти"
              className="border bg-[#F35E62] text-white w-fit py-1.5 px-20 rounded-md rounded-tl-md hover:cursor-pointer mt-12"
            />
          </>
        ) : (
          <>
            <input
              type="text"
              placeholder="Телефон"
              className="text-lg text-black bg-inherit px-5 py-1.5 border-2 border-[#A1947C] rounded-md pl-4 w-full"
            />
            <input
              type="text"
              placeholder="Имя"
              className="mt-3 text-lg text-black bg-inherit px-5 py-1.5 border-2 border-[#A1947C] rounded-md pl-4 w-full"
            />
            <input
              type="password"
              placeholder="Пароль"
              value={value}
              onChange={(e) => handleInputChange(e)}
              className="mt-3 text-black text-lg bg-inherit px-5 py-1.5  border-2 border-[#A1947C] rounded-md pl-4 w-full"
            />
            <input
              type="password"
              placeholder="Повторите пароль"
              className="mt-3 text-black text-lg bg-inherit px-5 py-1.5  border-2 border-[#A1947C] rounded-md pl-4 w-full"
            />
            <input
              type="submit"
              value="Зарегистрироваться"
              className="border bg-[#F35E62] text-white w-fit py-1.5 px-12 rounded-md rounded-tl-md hover:cursor-pointer mt-12"
            />
          </>
        )}
      </form>
      <button
        type="button"
        onClick={() => setIsLogin((prev) => !prev)}
        className="mx-auto text-black text-lg font-medium mt-12"
      >
        {isLogin ? "Зарегистрироваться" : "Есть аккаунт? Войти"}
      </button>
    </div>
  );
}
