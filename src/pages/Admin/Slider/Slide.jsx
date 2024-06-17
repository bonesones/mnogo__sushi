import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Slide({ slide, setOpenModal, setSlides }) {
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = function () {
    setOpenDeleteModal(true);
  };

  const handleCancel = function () {
    setOpenDeleteModal(false);
  };

  const handleSubmitDelete = async function (e) {
    e.preventDefault();
    try {
      const response = await api.delete(`/api/slider/delete/${slide.id}`, {
        withCredentials: true,
      });
      setSlides((prev) => [...prev.filter(({ id }) => id !== slide.id)]);
      setOpenModal(true);
      setTimeout(() => {
        setOpenModal(false);
      }, 2000);
    } catch (e) {
      setError(e.response?.data?.message);
    }
  };

  return (
    <div className="flex flex-col">
      {openDeleteModal && (
        <div className="fixed  z-20 flex flex-col border-2 border-red-600 items-center gap-3 top-1/2 left-1/2 rounded-md -translate-x-1/2 -translate-y-1/2 bg-white w-5/6 md:w-120 px-6 py-4">
          <p className="text-center">Вы точно хотите удалить продукт?</p>
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
      <picture>
        <source
          media="(min-width: 1100px)"
          srcSet={import.meta.env.VITE_API_URL + slide.desktop_image}
          className="max-h-[500px]"
        />
        <img
          className="w-full max-h-[500px]"
          src={import.meta.env.VITE_API_URL + slide.tablet_phone_image}
          alt={slide.title}
        />
      </picture>
      <div className="flex self-start gap-8 justify-center mt-4">
        <button
          type="button"
          className="bg-second px-4 py-1 rounded-md text-white"
          onClick={handleDelete}
        >
          Удалить
        </button>
        <Link to={"/admin/slides/slide_edit/" + slide.id}>Редактировать</Link>
      </div>
    </div>
  );
}
