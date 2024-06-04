export default function Login() {
  return (
    <div className="profile-modal login block flex-col absolute md:static items-center rounded-xl w-80 md:mx-auto bg-main pb-4">
      <div className="text-center text-black font-semibold text-2xl mt-12">
        Вход
      </div>
      <form
        action=""
        method="POST"
        className="profile-modal-form flex flex-col items-center mt-12"
      >
        <input
          type="email"
          placeholder="Почта"
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
      </form>
      <div className="flex flex-col gap-5 text-center mt-[2rem]">
        <a>Зарегистрироваться</a>
        <a>Забыли пароль?</a>
      </div>
    </div>
  );
}
