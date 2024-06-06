export default function Personal() {
  return (
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
  );
}
