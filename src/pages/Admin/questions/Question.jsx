import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Question({
  question,
  answer,
  id,
  setOpenModal,
  setQuestions,
}) {
  const [quiestionOpened, setQuestionOpened] = useState(false);
  const [deleteModalOpened, setDeleteModalOpened] = useState(false);

  const handleDelete = function () {
    setDeleteModalOpened(true);
  };

  const handleCancel = function () {
    setDeleteModalOpened(false);
  };

  const handleSubmitDelete = async function (e) {
    e.preventDefault();
    try {
      const response = await api.delete(`/api/question/delete/${id}`, {
        withCredentials: true,
      });
      setQuestions((prev) => [
        ...prev.filter(({ id: questionId }) => id !== questionId),
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
    <div className="w-full max-w-5xl mx-auto flex flex-col">
      {deleteModalOpened && (
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
      <button
        type="button"
        className="question-btn text-white text-xl w-full font-medium flex items-center justify-between bg-[#F35E62] px-6 py-2 rounded-md"
        onClick={() => setQuestionOpened((prev) => !prev)}
      >
        {question}
        <svg
          width="16"
          height="10"
          viewBox="0 0 16 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={
            (quiestionOpened ? "rotate-180 " : "") + "transition-transform"
          }
        >
          <line
            y1="-0.5"
            x2="12.1228"
            y2="-0.5"
            transform="matrix(0.625186 0.780475 -0.858121 0.513448 0 0.539062)"
            stroke="white"
          />
          <line
            y1="-0.5"
            x2="12.123"
            y2="-0.5"
            transform="matrix(0.625255 -0.78042 0.85808 0.513516 8.41992 10)"
            stroke="white"
          />
        </svg>
      </button>
      <p
        className={
          (quiestionOpened ? "answer_active " : "answer ") +
          "shadow-xl rounded-md question_answer bg-white px-3"
        }
      >
        {answer}
      </p>
      <div className="flex self-start gap-8 justify-center mt-4">
        <button
          type="button"
          className="bg-second px-4 py-1 rounded-md text-white"
          onClick={handleDelete}
        >
          Удалить
        </button>
        <Link to={"/admin/faq/question_edit/" + id}>Редактировать</Link>
      </div>
    </div>
  );
}
