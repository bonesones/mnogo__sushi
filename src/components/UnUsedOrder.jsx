export default function unUsedOrder() {
  return (
    <div className="w-full hidden grid grid-cols-2">
      <div className="flex flex-col text-start justify-between text-center">
        <span>Дата заказа</span>
        <span>Адрес</span>
        <span>Сумма</span>
        <span>Номер заказа</span>
      </div>
      <div className="flex flex-col gap-12">
        <div>
          <div className="flex justify-between items-center text-center">
            <button
              type="button"
              className="order__arrow w-12 cursor-pointer"
              onClick={(e) => handleOpenCloseOrder(e)}
            >
              <img
                className={
                  (orderOpened ? "order__arrow_rotate " : "") +
                  "transition-transform"
                }
                src="/ArrowNav.svg"
              />
            </button>
            <span className="text-lg font-medium w-28">11.02.2024</span>
            <span className="text-lg font-medium w-96">
              ул. Первомайская, 42
            </span>
            <span className="text-lg font-medium w-24">899 ₽</span>
            <span className="text-lg font-medium w-32">453123</span>
          </div>
          <div
            className={
              (orderOpened ? "block " : "hidden ") + "popup-order ml-12 mt-6"
            }
          >
            <div className="flex gap-8">
              <span>Оплата: картой</span>
              <span>Доставка: бесплатно</span>
              <span className="bg-[#F35E62] text-white py-0.5 px-1">
                Статус: выполнен
              </span>
            </div>
            <div className="flex justify-between mt-6">
              <span className="font-medium">МногоМяса</span>
              <div>
                <span className="mr-7 font-medium">600 ₽</span>
                <button
                  type="button"
                  className="border-2 border-[#F35E62] text-[#F35E62] hover:text-white hover:bg-[#F35E62] rounded-lg px-5 text-medium"
                >
                  В корзину
                </button>
              </div>
            </div>
            <div className="flex justify-between mt-6">
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
              className="border-2 border-[#F35E62] text-[#F35E62] hover:text-white hover:bg-[#F35E62] rounded-lg px-5 text-medium mt-8"
            >
              Повторить
            </button>
          </div>
        </div>
        <div>
          <div className="flex justify-between items-center text-center">
            <button type="button" className="order__arrow w-12 cursor-pointer">
              <img className="transition-transform" src="/ArrowNav.svg" />
            </button>
            <span className="text-lg font-medium w-28">11.02.2024</span>
            <span className="text-lg font-medium w-96">
              ул. Первомайская, 42
            </span>
            <span className="text-lg font-medium w-24">899 ₽</span>
            <span className="text-lg font-medium w-32">453123</span>
          </div>
          <div className="hidden popup-order ml-12 mt-6">
            <div className="flex gap-8">
              <span>Оплата: картой</span>
              <span>Доставка: бесплатно</span>
              <span className="bg-[#F35E62] text-white py-0.5 px-1">
                Статус: выполнен
              </span>
            </div>
            <div className="flex justify-between mt-6">
              <span className="font-medium">МногоМяса</span>
              <div>
                <span className="mr-7 font-medium">600 ₽</span>
                <button
                  type="button"
                  className="border-2 border-[#F35E62] text-[#F35E62] hover:text-white hover:bg-[#F35E62] rounded-lg px-5 text-medium"
                >
                  В корзину
                </button>
              </div>
            </div>
            <div className="flex justify-between mt-6">
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
              className="border-2 border-[#F35E62] text-[#F35E62] hover:text-white hover:bg-[#F35E62] rounded-lg px-5 text-medium mt-8"
            >
              Повторить
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
