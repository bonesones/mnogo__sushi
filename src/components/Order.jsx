import { useState } from "react";

export default function Order() {
  const [orderOpened, setOrderOpened] = useState(false);

  const handleOpenCloseOrder = function () {
    setOrderOpened((prev) => !prev);
  };

  return (
    <div className="w-full">
      <div className="w-full flex-col border-t-2 pt-6">
        <div className="grid grid-cols-[1fr,2fr] md:hidden">
          <span>Дата заказа</span>
          <span className="text-lg font-medium">11.02.2024</span>
          <span>Адрес</span>
          <span className="text-lg">ул. Первомайская, 42</span>
          <span>Сумма</span>
          <span className="text-lg font-medium">899 ₽</span>
          <span>Номер заказа</span>
          <span className="text-lg font-medium">453123</span>
          <button
            type="button"
            className="order__arrow w-12 mt-4 cursor-pointer"
            onClick={handleOpenCloseOrder}
          >
            <img
              className={
                (orderOpened ? "order__arrow_rotate " : "") +
                "transition-transform"
              }
              src="/ArrowNav.svg"
              alt="Раскрыть меню"
            />
          </button>
        </div>
        <div className="hidden md:grid grid-cols-[1fr,2fr,1fr,1fr] gap-x-4 gap-y-6 lg:ml-8">
          <span>Дата заказа</span>
          <span>Адрес</span>
          <span>Сумма</span>
          <span>Номер заказа</span>
          <span className="text-lg font-medium">11.02.2024</span>
          <span className="text-lg font-medium">
            Вологда, ул. Первомайская, 42
          </span>
          <span className="text-lg font-medium">899 ₽</span>
          <span className="text-lg font-medium">453123</span>
          <button
            type="button"
            className="order__arrow w-12 mt-4 cursor-pointer"
            onClick={handleOpenCloseOrder}
          >
            <img
              className={
                (orderOpened ? "order__arrow_rotate " : "") +
                "transition-transform"
              }
              src="/ArrowNav.svg"
              alt="Раскрыть меню"
            />
          </button>
        </div>
        <div
          className={
            (orderOpened
              ? "flex flex-col lg:ml-8 bg-gray-50 p-3 rounded-md "
              : "hidden ") + "popup-order mt-6"
          }
        >
          <div className="flex gap-8 flex-wrap">
            <span>Оплата: картой</span>
            <span>Доставка: бесплатно</span>
            <span className="bg-[#F35E62] text-white py-0.5 px-1">
              Статус: выполнен
            </span>
          </div>
          <div className="flex flex-col sp:flex-row gap-2 justify-between mt-6">
            <span className="font-medium">МногоМяса</span>
            <div className="flex">
              <span className="mr-7 font-medium">600 ₽</span>
              <button
                type="button"
                className="border-2 border-[#F35E62] text-[#F35E62] hover:text-white hover:bg-[#F35E62] rounded-lg px-5 text-medium"
              >
                В корзину
              </button>
            </div>
          </div>
          <div className="flex flex-col sp:flex-row gap-2 justify-between mt-6">
            <span className="font-medium">Чикен Паприка</span>
            <div>
              <span className="mr-7 font-medium">299 ₽</span>
              <button
                type="button"
                className="border-2 border-[#F35E62] text-[#F35E62] hover:text-white hover:bg-[#F35E62] rounded-lg px-5 text-medium"
              >
                В корзину
              </button>
            </div>
          </div>
          <button
            type="button"
            className="border-2 border-[#F35E62] text-[#F35E62] hover:text-white hover:bg-[#F35E62] rounded-lg px-5 text-medium mt-8 w-fit"
          >
            Повторить
          </button>
        </div>
      </div>
    </div>
  );
}
