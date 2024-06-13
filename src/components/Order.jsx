import { useState } from "react";
import { addProduct } from "../store/basketPersistSlice.js";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

export default function Order({ order }) {
  const [orderOpened, setOrderOpened] = useState(false);

  const handleOpenCloseOrder = function () {
    setOrderOpened((prev) => !prev);
  };

  const basketProducts = useSelector(
    (state) => state.basketPersist.basket.products,
  );

  const dispatch = useDispatch();

  const handleAddProductToCart = function (id) {
    dispatch(addProduct(id));
  };

  return (
    <div className="w-full">
      <div className="w-full flex-col border-t-2 pt-6 lg:ml-8 lg:mr-8">
        <div className="grid grid-cols-[1fr,2fr] md:hidden">
          <span>Дата заказа</span>
          <span className="text-lg font-medium">
            {new Date(order.createdAt).toLocaleDateString("ru")}
          </span>
          <span>Адрес</span>
          <span className="text-lg">
            {order.is_delivery ? order.street_house : "Ветошкина 85Б"}
          </span>
          <span>Сумма</span>
          <span className="text-lg font-medium">{order.amount} ₽</span>
          <span>Номер заказа</span>
          <span className="text-lg font-medium">{order.id}</span>
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
        <div className="hidden md:grid grid-cols-[1fr,2fr,1fr,1fr] gap-x-4 gap-y-6 lg:ml-4">
          <span>Дата заказа</span>
          <span>Адрес</span>
          <span>Сумма</span>
          <span>Номер заказа</span>
          <span className="text-lg font-medium">
            {new Date(order.createdAt).toLocaleDateString("ru")}
          </span>
          <span className="text-lg font-medium">
            {order.is_delivery ? order.street_house : "Ветошкина 85Б"}
          </span>
          <span className="text-lg font-medium">{order.amount} ₽</span>
          <span className="text-lg font-medium">{order.id}</span>
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
              ? "flex flex-col bg-gray-200  rounded-md p-4 "
              : "hidden ") + "popup-order mt-6 mb-10"
          }
        >
          <div className="flex gap-8 flex-wrap">
            <span>
              Оплата: {order.payment_method === "card" ? "Картой" : "Наличными"}
            </span>
            <span className="bg-[#F35E62] text-white py-0.5 px-1">
              Статус: {order.status}
            </span>
          </div>
          {order.items.map((product) => {
            return (
              <div
                className="flex flex-col sp:flex-row gap-2 justify-between mt-6"
                key={product.id}
              >
                <span className="font-medium">
                  {product.name} <br /> {product.quantity} шт.
                </span>
                <div className="flex items-center">
                  <span className="mr-7 font-medium">
                    {order.promocode && Object.keys(order.promocode).length > 0
                      ? order.promocode.discount_type === "fix"
                        ? product.quantity * product.price -
                          order.promocode.discount_amount / order.items.length
                        : product.quantity *
                          product.price *
                          (1 - order.promocode.discount_amount / 100)
                      : product.price * product.quantity}{" "}
                    ₽
                  </span>
                  {basketProducts &&
                  basketProducts.find(({ id }) => id === product.id) ? (
                    <Link
                      to="/cart"
                      className="text-white bg-[#F35E62] border-2 border-[#F35E62] rounded-lg px-5 text-medium"
                    >
                      В корзине
                    </Link>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleAddProductToCart(product.id)}
                      className="border-2 border-[#F35E62] text-[#F35E62] hover:text-white hover:bg-[#F35E62] rounded-lg px-5 text-medium"
                    >
                      В корзину
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
