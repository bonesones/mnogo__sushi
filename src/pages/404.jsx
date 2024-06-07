import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Error_404() {
  return (
    <div className="mx-auto md:my-60 lg:my-14 absolute md:sticky w-10/12 sm:w-full flex flex-col items-center top-2/4 left-2/4 -translate-x-1/2 md:translate-x-0 -translate-y-1/2 md:translate-y-0">
      <img
        src="/panda_404.png"
        alt="Панда"
        width="300"
        height="300"
        className="sm:w-[320px] sm:h-[320px] lg:w-[280px] lg:h-[280px]"
      />
      <h1 className="text-center mt-4 text-4xl lg:text-5xl font-semibold">
        404
        <br />
      </h1>
      <p className="text-center mt-6 text-lg lg:text-xl">
        Страница, которую Вы ищете, не существует
      </p>
      <p className="text-center mt-6 text-lg lg:text-xl">
        Ничего страшного, вы можете вернуться и продолжить свои покупки!
      </p>
      <Link
        to="/"
        className="mt-8 text-lg lg:text-xl border-2 border-red-400 px-6 py-0.5 rounded-lg text-red-500"
      >
        На главную
      </Link>
    </div>
  );
}
