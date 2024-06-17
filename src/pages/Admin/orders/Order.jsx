import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import api from "../../../services/api.js";
import Select from "react-select";

export default function Order({ order }) {
  const [orderOpened, setOrderOpened] = useState(false);
  const [orderStatus, setOrderStatus] = useState(order.status);
  const [showSaveBtn, setShowSaveBtn] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [actualStatus, setActialStatus] = useState(order.status);

  const handleOpenCloseOrder = function () {
    setOrderOpened((prev) => !prev);
  };

  const options = [
    {
      value: "Новый",
      label: "Новый",
      isDisabled: true,
    },
    {
      value: "Принят в работу",
      label: "Принят в работу",
    },
    {
      value: "Передан курьеру",
      label: "Передан курьеру",
    },
    {
      value: "Выдан",
      label: "Выдан",
    },
    {
      value: "Отменен",
      label: "Отменен",
    },
  ];

  const changeOrderStatus = async function () {
    try {
      const response = await api.put(
        `/api/order/admin/update/${order.id}`,
        {
          status: orderStatus,
        },
        {
          withCredentials: true,
        },
      );
      setActialStatus(orderStatus);
      setOpenModal(true);
      setShowSaveBtn(false);
      setTimeout(() => setOpenModal(false), 2000);
    } catch (e) {
      console.log(e);
    }
  };

  const handleChangeOrderStatus = function (e) {
    setOrderStatus(e.value);
    setShowSaveBtn(true);
  };

  const handleSubmit = async function () {
    await changeOrderStatus();
  };

  const handleCancel = function () {
    setOrderStatus(order.status);
    setShowSaveBtn(false);
  };

  return (
    <div className="w-full">
      <div className="w-full flex-col border-t-2 pt-6">
        <div className="grid grid-cols-[1fr,2fr] gap-y-2 gap-x-2 lg:hidden">
          <span className="mb-6 bg-[#F35E62] text-white py-0.5 px-1 rounded-sm text-center">
            Статус заказа
          </span>
          {actualStatus !== "Выдан" ? (
            <Select
              className="text-lg font-medium ml-2"
              onChange={(e) => handleChangeOrderStatus(e)}
              options={options}
              value={{
                value: orderStatus,
                label: orderStatus,
              }}
            />
          ) : (
            <span className="text-lg font-medium">Выдан</span>
          )}
          <span>Дата заказа</span>
          <span className="text-lg font-medium">
            {new Date(order.createdAt).toLocaleDateString("ru")}
          </span>
          {order.in_time && (
            <>
              <span>Приготовить к</span>
              <span className="text-lg font-medium">
                {order.ready_hour + ":" + order.ready_minutes}
              </span>
            </>
          )}
          <span>Время заказа</span>
          <span className="text-lg font-medium">
            {new Date(order.createdAt).getHours() +
              ":" +
              (new Date(order.createdAt).getMinutes() < 10
                ? "0" + new Date(order.createdAt).getMinutes()
                : new Date(order.createdAt).getMinutes())}
          </span>
          <span>Адрес</span>
          <span className="text-lg">
            {order.is_delivery
              ? "ул. " +
                order.street_house +
                ", под. " +
                order.entrance +
                ", эт. " +
                order.floor +
                ", кв. " +
                order.room
              : "Самовывоз"}
          </span>
          <span>Сумма</span>
          <span className="text-lg font-medium">{order.amount} ₽</span>
          <span>Оплата</span>
          <span className="text-lg font-medium">
            {order.payment_method === "card" ? "Картой" : "Наличными"}
          </span>
          <span>Номер заказа</span>
          <span className="text-lg font-medium">{order.id}</span>
          {order.name && (
            <>
              <span>Имя</span>
              <span className="text-lg font-medium">{order.name}</span>
            </>
          )}
          <span>Телефон</span>
          <a href={"tel:" + order.phone} className="text-lg font-medium">
            {order.phone}
          </a>
          {order.comment && (
            <>
              <span>Комментарий</span>
              <span className="text-lg font-medium max-w-44">
                {order.comment}
              </span>
            </>
          )}
          {showSaveBtn && (
            <>
              <button
                type="button"
                onClick={handleSubmit}
                className="bg-second text-white py-2 rounded-md mt-5"
              >
                Сохранить
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="py-2 w-24 mt-5 place-self-center"
              >
                Отменить
              </button>
            </>
          )}
          {openModal && (
            <div className="fixed top-10 left-1/2 sm:text-lg -translate-x-1/2 bg-red-400 px-6 sm:px-10 w-fit rounded-md text-white py-5 sm:py-8">
              Статус заказа изменен!
            </div>
          )}
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
        <div className="hidden lg:grid grid-cols-[2fr,1fr,1fr,2fr,1fr,1fr,1fr,2fr] justify-items-center gap-x-4 gap-y-6">
          <span className="text-center bg-[#F35E62] text-white py-0.5 px-1 rounded-md text-base leading-10">
            Статус заказа
          </span>
          <span className="text-center">Дата заказа</span>
          <span className="text-center">Время заказа</span>
          <span className="text-center">Адрес</span>
          <span className="text-center">Сумма</span>
          <span className="text-center">Номер заказа</span>
          <span className="text-center">Имя</span>
          <span className="text-center">Телефон</span>
          <span className="text-lg font-medium">
            {actualStatus !== "Выдан" ? (
              <Select
                className="text-lg font-medium ml-2"
                onChange={(e) => handleChangeOrderStatus(e)}
                options={options}
                value={{
                  value: orderStatus,
                  label: orderStatus,
                }}
              />
            ) : (
              <span className="text-lg font-medium">Выдан</span>
            )}
          </span>
          <span className="text-lg font-medium">
            {new Date(order.createdAt).toLocaleDateString("ru")}
          </span>
          <span className="text-lg font-medium">
            {new Date(order.createdAt).getHours() +
              ":" +
              (new Date(order.createdAt).getMinutes() < 10
                ? "0" + new Date(order.createdAt).getMinutes()
                : new Date(order.createdAt).getMinutes())}
          </span>
          <span className="text-lg font-medium">
            {order.is_delivery
              ? "ул. " +
                order.street_house +
                ", под. " +
                order.entrance +
                ", эт. " +
                order.floor +
                ", кв. " +
                order.room
              : "Самовывоз"}
          </span>
          <span className="text-lg font-medium">{order.amount} ₽</span>
          <span className="text-lg font-medium">{order.id}</span>
          <span className="text-lg font-medium">
            {order.name || "Не указано"}
          </span>
          <span className="text-lg font-medium">{order.phone}</span>
          {showSaveBtn && (
            <>
              <button
                type="button"
                onClick={handleSubmit}
                className="bg-second text-white py-2 px-4 rounded-md mt-5"
              >
                Сохранить
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="py-2 px-4 mt-5 place-self-center"
              >
                Отменить
              </button>
            </>
          )}
          {openModal && (
            <div className="fixed top-10 left-1/2 sm:text-lg -translate-x-1/2 bg-red-400 px-6 sm:px-10 w-fit rounded-md text-white py-5 sm:py-8">
              Статус заказа изменен!
            </div>
          )}
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
              ? "flex flex-col gap-5 bg-gray-200  rounded-md p-4 "
              : "hidden ") + "popup-order mt-6 mb-10"
          }
        >
          <div className="flex gap-4 flex-col">
            <p className="hidden md:block bg-[#F35E62] text-white py-0.5 px-1 w-fit">
              Приготовить к:{" "}
              {order.in_time
                ? order.ready_hour + ":" + order.ready_minutes
                : "Не указано"}
            </p>
            <p className="hidden md:block">
              Оплата: {order.payment_method === "card" ? "Картой" : "Наличными"}
            </p>
            <p className="hidden md:block">
              Комментарий: {order.comment || "Не указан"}{" "}
            </p>
          </div>
          {order.items.map((product) => (
            <div
              key={product.id}
              className="flex flex-row gap-2 justify-between mt-0"
            >
              <span className="font-medium">
                {product.name} {product.quantity} шт.
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
