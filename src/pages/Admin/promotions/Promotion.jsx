import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import api from "../../../services/api.js";

export default function Promotion({ promotion, setPromotions, setOpenModal }) {
  const [openDeleteSubmit, setOpenDeleteSubmit] = useState(false);

  const handleDelete = function () {
    setOpenDeleteSubmit(true);
  };

  const handleCancel = function () {
    setOpenDeleteSubmit(false);
  };

  const handleSubmitDelete = async function (e) {
    e.preventDefault();
    try {
      await api.delete(`/api/promotion/delete/${promotion.id}`, {
        withCredentials: true,
      });
      setOpenDeleteSubmit(false)
      setPromotions((prev) => [
        ...prev.filter(({ id }) => id !== promotion.id),
      ]);
      setOpenModal(true);
      setTimeout(() => setOpenModal(false), 2000);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <article className="flex flex-col gap-5 w-80">
      {openDeleteSubmit && (
        <div className="fixed  z-20 flex flex-col border-2 border-red-600 items-center gap-3 top-1/2 left-1/2 rounded-md -translate-x-1/2 -translate-y-1/2 bg-white w-5/6 md:w-120 px-6 py-4">
          <p className="text-center">Вы точно хотите удалить акцию?</p>
          <form
            className="flex flex-col gap-5 mt-4 mb-2"
            onSubmit={(e) => handleSubmitDelete(e)}
          >
            <input
              type="submit"
              className="bg-second text-white px-12 py-2 rounded-md"
              value="Да, удалить"
            />
            <button type="button px-12 py-2" onClick={() => handleCancel()}>
              Нет, я передумал
            </button>
          </form>
        </div>
      )}
      <img src={import.meta.env.VITE_STATIC_URL + promotion.image} width="100%" className="h-60 mx-auto object-contain" />
      <h2 className="text-xl font-semibold text-center">{promotion.title}</h2>
      <p className="text-center">{promotion.description}</p>
      <div className="flex gap-8 justify-center">
        <button
          type="button"
          className="bg-second px-4 py-1 rounded-md text-white"
          onClick={handleDelete}
        >
          Удалить
        </button>
        <Link to={"/admin/promotions/promotion_edit/" + promotion.id}>
          Редактировать
        </Link>
      </div>
    </article>
  );
}
