import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import api from "../../../services/api.js";

export default function Promocode({ promocode, setPromocodes, setOpenModal }) {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const handleDelete = function () {
    setOpenDeleteModal(true);
  };

  const handleCancel = function () {
    setOpenDeleteModal(false);
  };

  const handleSubmitDelete = async function (e) {
    e.preventDefault();
    try {
      const response = await api.delete(
        `/api/promocode/delete/${promocode.id}`,
        {
          withCredentials: true,
        },
      );
      setPromocodes((prev) => [
        ...prev.filter(({ id }) => id !== promocode.id),
      ]);
      setOpenModal(true);
      setTimeout(() => {
        setOpenModal(false);
      }, 2000);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div key={promocode.id} className="flex flex-col gap-2 items-center w-full">
      {openDeleteModal && (
        <div className="fixed  z-20 flex flex-col border-2 border-red-600 items-center gap-3 top-1/2 left-1/2 rounded-md -translate-x-1/2 -translate-y-1/2 bg-white w-5/6 md:w-120 px-6 py-4">
          <p className="text-center">Вы точно хотите удалить промокод?</p>
          <form
            className="flex flex-col gap-5 mt-4 mb-2"
            onSubmit={(e) => handleSubmitDelete(e)}
          >
            <input
              type="submit"
              className="bg-second text-white px-12 py-2 rounded-md"
              value="Да, удалить"
            />
            <button type="button px-12 py-2" onClick={handleCancel}>
              Нет, я передумал
            </button>
          </form>
        </div>
      )}
      <div className="flex justify-between w-full font-semibold">
        <p>Название промокода</p>
        <p>{promocode.name}</p>
      </div>
      <div className="flex justify-between w-full">
        <p>Минимальная сумма заказа</p>
        <p>{promocode.min_amount}</p>
      </div>
      <div className="flex justify-between w-full">
        <p>Тип скидки</p>
        <p>
          {promocode.discount_type === "fix" ? "Фиксированная" : "Процентная"}
        </p>
      </div>
      <div className="flex justify-between w-full">
        <p>Скидка</p>
        <p>
          {promocode.discount_amount +
            " " +
            (promocode.discount_type === "fix" ? "₽" : "%")}
        </p>
      </div>
      <div className="flex gap-8 justify-center">
        <button
          type="button"
          className="bg-second px-4 py-1 rounded-md text-white"
          onClick={handleDelete}
        >
          Удалить
        </button>
        <Link to={"/admin/promocodes/promocode_edit/" + promocode.id}>
          Редактировать
        </Link>
      </div>
    </div>
  );
}
