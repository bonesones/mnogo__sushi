import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../store/categoriesSlice.js";
import Loading from "../../components/Loading.jsx";
import axios from "axios";

export default function Categories() {
  const categories = useSelector((state) => state.categories.categories);
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");

  const [openModal, setOpenModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [confirmDeleteModal, setConfirmDeleteModal] = useState(false);
  const [isCategoryCreating, setCategoryCreating] = useState(false);
  const [newCategoryInput, setNewCategoryInput] = useState("");
  const [currentCategoryId, setCurrentCategoryId] = useState(null);

  const handleCreateCategory = function () {
    setCategoryCreating(true);
  };

  const handleCancelCreate = function () {
    setCategoryCreating(false);
  };

  const handleSubmitCreateCategory = async function () {
    try {
      await api.post(
        "/api/category/create",
        {
          name: newCategoryInput,
        },
        {
          withCredentials: true,
        },
      );
      await dispatch(getCategories());
      setOpenCreateModal(true);
      setError("");
      setTimeout(() => setOpenCreateModal(false), 2000);
      setNewCategoryInput("");
      setCategoryCreating(false);
    } catch (e) {
      setError(e.response?.data?.message);
      console.log(e);
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      await dispatch(getCategories());
    };
    fetchCategories().finally(() => {
      setLoaded(true);
    });
  }, []);

  const handleSubmitDelete = async function (e) {
    e.preventDefault();
    try {
      await api.delete(`/api/category/delete/${currentCategoryId}`);
      dispatch(getCategories());
      setOpenDeleteModal(true);
      setConfirmDeleteModal(false);
      setTimeout(() => {
        setOpenDeleteModal(false);
      }, 2000);
    } catch (e) {
      console.log(e);
    }
  };

  const Category = function Category({
    category,
    setOpenModal,
    setConfirmDeleteModal,
    setCurrentCategoryId,
  }) {
    const [isEditing, setEditing] = useState(false);
    const [categoryInput, setCategoryInput] = useState(category.name);

    const handleEditCategory = function () {
      setEditing(true);
    };

    const handleCancelChange = function () {
      setCategoryInput(category.name);
      setEditing(false);
    };

    const handleSave = async function () {
      try {
        await api.put(
          `/api/category/update/${category.id}`,
          {
            name: categoryInput,
          },
          {
            withCredentials: true,
          },
        );
        setOpenModal(true);
        setError("");
        setTimeout(() => {
          setOpenModal(false);
        }, 2000);
        await dispatch(getCategories());
      } catch (e) {
        setError(e.response?.data?.message);
        console.log(e);
      }
    };

    const handleDelete = function () {
      setConfirmDeleteModal(true);
      setCurrentCategoryId(category.id);
    };

    return (
      <div
        className={
          (isEditing ? "flex-col " : "border-b-2 ") +
          "pb-2 flex justify-between"
        }
      >
        {isEditing ? (
          <input
            type="text"
            value={categoryInput}
            autoFocus={true}
            className="w-full border-b-2 pl-2"
            onChange={(e) => setCategoryInput(e.target.value)}
          />
        ) : (
          <span>{category.name}</span>
        )}
        {isEditing ? (
          <div className="flex gap-6 mt-4">
            <button
              type="button"
              onClick={handleSave}
              className="bg-second px-4 py-1 rounded-md text-white"
            >
              Сохранить
            </button>
            <button type="button" onClick={handleCancelChange}>
              Отмена
            </button>
          </div>
        ) : (
          <div className="flex gap-8">
            <button type="button" onClick={handleEditCategory}>
              <img src={"/edit-pen.png"} className="w-[30px]" alt="" />
            </button>
            <button type="button" onClick={() => handleDelete()}>
              <img src={"/trash-icon.png"} className="w-[30px]" alt="" />
            </button>
          </div>
        )}
      </div>
    );
  };

  if (!loaded) return <Loading />;

  return (
    <div className="mt-16 mb-12 flex flex-col items-center">
      {confirmDeleteModal && (
        <div className="fixed  z-20 flex flex-col border-2 border-red-600 items-center gap-3 top-1/2 left-1/2 rounded-md -translate-x-1/2 -translate-y-1/2 bg-white w-5/6 md:w-120 px-6 py-4">
          <p className="text-center">
            Вы точно хотите удалить категорию? <br /> Это приведет к удалению
            товаров в этой категории
          </p>
          <form
            className="flex flex-col gap-5 mt-4 mb-2"
            onSubmit={(e) => handleSubmitDelete(e)}
          >
            <input
              type="submit"
              className="bg-second text-white px-12 py-2 rounded-md"
              value="Да, удалить"
            />
            <button
              type="button px-12 py-2"
              onClick={() => setConfirmDeleteModal(false)}
            >
              Нет, я передумал
            </button>
          </form>
        </div>
      )}
      {openModal && (
        <div className="fixed top-10 left-1/2 sm:text-lg -translate-x-1/2 bg-red-400 px-6 sm:px-10 w-fit rounded-md text-white py-5 sm:py-8">
          Категория сохранена!
        </div>
      )}
      {openDeleteModal && (
        <div className="fixed top-10 left-1/2 sm:text-lg -translate-x-1/2 bg-red-400 px-6 sm:px-10 w-fit rounded-md text-white py-5 sm:py-8">
          Категория удалена!
        </div>
      )}
      {openCreateModal && (
        <div className="fixed top-10 left-1/2 sm:text-lg -translate-x-1/2 bg-red-400 px-6 sm:px-10 w-fit rounded-md text-white py-5 sm:py-8">
          Категория создана!
        </div>
      )}
      <h2 className="text-2xl font-semibold">Все категории</h2>
      <button
        type="button"
        className="mt-12 bg-second text-white px-5 py-1 rounded-md"
        onClick={handleCreateCategory}
      >
        Создать категорию
      </button>
      <div className="mt-12 flex flex-col gap-6 w-8/12">
        {error && <span className="text-red-600">{error}</span>}
        {isCategoryCreating && (
          <div>
            <input
              type="text"
              className="w-full border-b-2 pl-2"
              autoFocus={true}
              value={newCategoryInput}
              onChange={(e) => setNewCategoryInput(e.target.value)}
            />
            <div>
              <div className="flex gap-6 mt-4">
                <button
                  type="button"
                  className="bg-second px-4 py-1 rounded-md text-white"
                  onClick={handleSubmitCreateCategory}
                >
                  Создать
                </button>
                <button type="button" onClick={handleCancelCreate}>
                  Отмена
                </button>
              </div>
            </div>
          </div>
        )}
        {categories.length > 0 &&
          categories.map((category) => (
            <Category
              category={category}
              key={category.id}
              setOpenModal={setOpenModal}
              setCurrentCategoryId={setCurrentCategoryId}
              setConfirmDeleteModal={setConfirmDeleteModal}
            />
          ))}
      </div>
    </div>
  );
}
