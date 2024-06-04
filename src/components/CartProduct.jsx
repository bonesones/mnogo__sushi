import { useState } from "react";

export default function CartProduct() {
  const [quantity, setQuantity] = useState(1);

  const handleDecrement = function () {
    if (quantity === 0) {
      return;
    } else {
      setQuantity((prev) => prev - 1);
    }
  };

  const handleIncrement = function () {
    if (quantity === 10) {
      return;
    } else {
      setQuantity((prev) => prev + 1);
    }
  };

  return (
    <div className="cart-items flex items-center justify-between w-full">
      <p>МногоМяса</p>
      <div className="flex w-32 sm:w-fit flex-col sm:flex-row items-center gap-4">
        <span className="font-semibold w-full text-center">600 Р</span>
        <div className="rounded-2xl flex justify-between w-[110px] w-min-[108px] box-border">
          <button
            type="button"
            onClick={handleDecrement}
            className="bg-[#F35E62] text-white w-[36px] h-[36px] rounded-full"
          >
            -
          </button>
          <span className="bg-white text-black px-3 w-14 text-center">
            {quantity}
          </span>
          <button
            type="button"
            onClick={handleIncrement}
            className={
              "text-white w-[36px] h-[36px] rounded-full" +
              (quantity === 10 ? " bg-gray-100" : " bg-[#F35E62]")
            }
          >
            +
          </button>
        </div>
      </div>
      <img className="hidden" src="/close.png" alt="Закрытие" />
    </div>
  );
}
