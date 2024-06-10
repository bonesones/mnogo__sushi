import { useEffect, useState } from "react";
import CartProduct from "../components/CartProduct.jsx";
import Select from "react-select";
import { useSelector } from "react-redux";

export default function Cart() {
  const [orderGetMethod, setOrderGetMethod] = useState("delivery");
  const [orderGetTimeMethod, setOrderGetTimeMethod] = useState("now");
  const [orderPayMethod, setOrderPayMethod] = useState("card");
  const [availbaleDeliveryHours, setAvailbaleDeliveryHours] = useState([]);
  const [availibaleDeliveryMinutes, setAvailbaleDeliveryMinutes] = useState([]);
  const [deliveryHour, setDeliveryHour] = useState(
    availbaleDeliveryHours[0]?.value,
  );
  const products = useSelector((state) => state.basketPersist.basket.products);

  const [deliveryMinutes, setDeliveryMinutes] = useState(
    availibaleDeliveryMinutes[0]?.value,
  );

  const isEmpty = function (array) {
    return array.length === 0;
  };

  const handleChangeOrderGetMethod = function (value) {
    setOrderGetMethod(value);
  };

  const handleChangeTimeMethod = function (value) {
    setOrderGetTimeMethod(value);
  };

  const handleChangePayMethod = function (value) {
    setOrderPayMethod(value);
  };

  useEffect(() => {
    let counter = 0;
    for (
      let i = new Date(Date.now() + 1000 * 60 * 60 * 1.5).getHours();
      i < 24;
      i++
    ) {
      if (counter === 0) {
        setDeliveryHour(i);
        ++counter;
      }
      setAvailbaleDeliveryHours((prev) => [
        ...prev,
        {
          value: i,
          label: i,
        },
      ]);
    }
    console.log(products);
  }, []);

  const handleChangeDeliveryHour = function (e) {
    setAvailbaleDeliveryMinutes([]);
    setDeliveryHour(e.value);
  };

  const handleChangeDeliveryMinutes = function (e) {
    setDeliveryMinutes(e.value);
  };

  useEffect(() => {
    if (
      isEmpty(availibaleDeliveryMinutes) &&
      !isEmpty(availbaleDeliveryHours)
    ) {
      if (deliveryHour != availbaleDeliveryHours[0].value) {
        for (let i = 0; i < 60; i++) {
          setAvailbaleDeliveryMinutes((prev) => [
            ...prev,
            {
              value: i,
              label: i < 10 ? `0${i}` : i,
            },
          ]);
        }
      } else {
        for (
          let i = new Date(Date.now() + 1000 * 60 * 60 * 1.5).getMinutes();
          i < 60;
          i++
        ) {
          setAvailbaleDeliveryMinutes((prev) => [
            ...prev,
            {
              value: i,
              label: i < 10 ? `0${i}` : i,
            },
          ]);
        }
      }
    } else {
      if (deliveryMinutes < availibaleDeliveryMinutes[0]?.value) {
        setDeliveryMinutes(availibaleDeliveryMinutes[0]?.value);
      }
    }
  }, [deliveryHour, availbaleDeliveryHours, availibaleDeliveryMinutes]);

  return (
    <div className="wrapper mx-auto mb-28">
      <h1 className="font-semibold text-3xl mt-24 text-center md:text-left">
        Корзина
      </h1>
      <div className="mt-20 flex flex-col items-center">
        <div className="font-medium text-2xl flex flex-col gap-20 w-full">
          {products &&
            products.map((product) => {
              return <CartProduct product={product} id={product.id} />;
            })}
        </div>
        <div className="flex flex-col w-full mt-24">
          <h2 className="font-semibold text-2xl text-center md:text-left">
            Способ получения заказа
          </h2>
          <div className="mt-16 text-xl font-medium mx-auto md:ml-0 md:mr-auto relative">
            <button
              onClick={() => handleChangeOrderGetMethod("delivery")}
              className={
                (orderGetMethod === "delivery"
                  ? "!bg-[#F35E62] !text-white z-10 "
                  : "bg-gray-100 z-1 ") +
                "text-black bg-white rounded-xl px-5 sp:px-8 py-1.5 absolute left-0 md:left-[10rem]"
              }
            >
              Доставка
            </button>
            <button
              onClick={() => handleChangeOrderGetMethod("self-delivery")}
              className={
                (orderGetMethod === "self-delivery"
                  ? "!bg-[#F35E62] !text-white z-10"
                  : "bg-gray-100 z-1 ") +
                "text-black bg-white rounded-xl w-fit px-5 sp:px-8 py-1.5 absolute -right-4 md:right-0 md:left-0"
              }
            >
              Самовывоз
            </button>
          </div>
          {orderGetMethod === "delivery" ? (
            <form
              className="cart-form flex flex-col gap-6 mt-20"
              onSubmit={(e) => e.preventDefault()}
            >
              <input
                type="text"
                className="w-full bg-inherit border-2 border-[#A1947C] rounded-md py-1.5 px-4"
                placeholder="Улица, дом"
              />
              <fieldset className="flex justify-between gap-6 flex-wrap">
                <input
                  type="text"
                  className="bg-inherit border-2 border-[#A1947C] w-full md:w-1/4 rounded-md py-1.5 px-4"
                  placeholder="№ квартиры / офиса"
                />
                <input
                  type="text"
                  className="bg-inherit border-2 border-[#A1947C] rounded-md py-1.5 px-4 w-2/5 md:w-1/4"
                  placeholder="Подъезд"
                />
                <input
                  type="text"
                  className="bg-inherit border-2 border-[#A1947C] rounded-md py-1.5 px-4 w-2/5 md:w-1/4"
                  placeholder="Этаж"
                />
              </fieldset>
              <textarea
                className="bg-inherit border-2 border-[#A1947C] w-full h-[8rem] rounded-md py-1.5 px-4"
                placeholder="Комментарий курьеру"
              />
              <fieldset className="flex justify-between flex-col gap-6">
                <input
                  type="text"
                  className="bg-inherit border-2 border-[#A1947C] rounded-md py-1.5 px-4 w-full"
                  placeholder="Телефон получателя"
                />
                <input
                  type="text"
                  className="bg-inherit border-2 border-[#A1947C] rounded-md py-1.5 px-4 w-full"
                  placeholder="Имя получателя"
                />
              </fieldset>
              <div className="flex justify-center flex-col items-center md:items-start">
                <div className="relative">
                  <button
                    onClick={() => handleChangeTimeMethod("now")}
                    className={
                      (orderGetTimeMethod === "now"
                        ? "!bg-[#F35E62] !text-white z-10 "
                        : "bg-gray-100 z-1 ") +
                      "text-black bg-white rounded-xl px-12 sp:px-8 py-1.5 absolute right-0 md:left-0 w-fit"
                    }
                  >
                    Сейчас
                  </button>
                  <button
                    onClick={() => handleChangeTimeMethod("to-time")}
                    className={
                      (orderGetTimeMethod === "to-time"
                        ? "!bg-[#F35E62] !text-white z-10"
                        : "bg-gray-100 z-1 ") +
                      "text-black bg-white rounded-xl px-12 sp:px-6 py-1.5 absolute -left-4 md:left-[6.5rem] w-max"
                    }
                  >
                    Ко времени
                  </button>
                </div>
                {orderGetTimeMethod === "to-time" && (
                  <div className="flex h-10 items-center mt-16">
                    <Select
                      options={availbaleDeliveryHours}
                      className="bg-inherit rounded-md py-2.5 px-2"
                      defaultValue={availbaleDeliveryHours[0]}
                      onChange={(e) => handleChangeDeliveryHour(e)}
                      menuPortalTarget={document.body}
                      styles={{
                        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                      }}
                    />
                    :
                    <Select
                      className="bg-inherit rounded-md py-2.5 px-2"
                      options={availibaleDeliveryMinutes}
                      defaultValue={availibaleDeliveryMinutes[0]}
                      menuPortalTarget={document.body}
                      value={{
                        value:
                          deliveryMinutes ??
                          availibaleDeliveryMinutes[0]?.value,
                        label:
                          deliveryMinutes < 10
                            ? `0${deliveryMinutes}`
                            : deliveryMinutes ??
                              availibaleDeliveryMinutes[0]?.label,
                      }}
                      styles={{
                        menuPortal: (base) => ({ ...base, zIndex: 9999 }),
                      }}
                      onChange={(e) => handleChangeDeliveryMinutes(e)}
                    />
                  </div>
                )}
              </div>
            </form>
          ) : (
            <p className="mt-24">
              Адрес самовывоза: г. Вологда, ул. Ветошкина 84Б
            </p>
          )}
        </div>
        <div className="w-full mt-24 flex flex-col">
          <h2 className="font-semibold text-3xl text-center md:text-left">
            Способ оплаты
          </h2>
          <div className="text-xl mt-10 font-medium flex flex-col md:flex-row md:justify-center gap-2">
            <button
              onClick={() => handleChangePayMethod("card")}
              className={
                (orderPayMethod === "card"
                  ? "!bg-[#F35E62] !text-white z-10 "
                  : "bg-gray-100 z-1 ") +
                "text-black bg-white rounded-xl py-1.5 text-lg px-6"
              }
            >
              Картой при получении
            </button>
            <button
              onClick={() => handleChangePayMethod("cash")}
              className={
                (orderPayMethod === "cash"
                  ? "!bg-[#F35E62] !text-white "
                  : "bg-gray-100 ") +
                "text-black bg-white rounded-xl py-1.5 text-lg px-6"
              }
            >
              Наличными при получении
            </button>
          </div>
          <div className="mt-16 max-w-[32rem] self-center flex flex-col">
            <p className="text-xl font-medium">
              <span className="opacity-70">Доставка: </span>
              <span>Бесплатно</span>
            </p>
            <div className="flex justify-between flex-col sp:flex-row my-8 gap-6 ">
              <input
                className="bg-inherit promocode__input border-2 border-[#A1947C] rounded-md py-0.5 px-4"
                type="text"
                placeholder="Введите промокод"
              />
              <button className="border border-[#F35E62] text-[#F35E62] text-center bg-inherit rounded-lg hover:bg-[#F35E62] hover:text-white font-medium hover:bg-second px-3">
                Применить
              </button>
            </div>
            <hr className="w-full bg-black mt-2.5 h-[.12rem]" />
            <div className="flex justify-between items-center text-2xl font-semibold mt-6">
              <span>К оплате:</span>
              <span>899 ₽</span>
            </div>
            <button className="border text-xl self-center font-medium mt-10 text-center w-full md:max-w-[32rem] px-16 rounded-lg bg-[#F35E62] text-white py-1">
              Оформить заказ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
