import { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../store/categoriesSlice.js";
import Loading from "../../components/Loading.jsx";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [deleteModalActive, setDeleteModalActive] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [openRestoreModal, setOpenRestoreModal] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);
  const categories = useSelector((state) => state.categories.categories);
  const [options, setOptions] = useState([]);
  const [currentCategory, setCurrentCategory] = useState({
    label: "Все",
    value: "Все",
  });
  const [currentProducts, setCurrentProducts] = useState([]);

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("/api/product/getall");
        setProducts(response.data);
        dispatch(getCategories());
      } catch (e) {
        console.log(e);
      }
    };
    fetchProducts().finally(() => {
      setLoaded(true);
    });
  }, []);

  useEffect(() => {
    const options = categories.map(({ id, name }) => ({
      label: name,
      value: id,
    }));
    setOptions(() => [{ value: "Все", label: "Все" }, ...options]);
  }, [categories]);

  useEffect(() => {
    if (currentCategory.value == "Все" && products.length > 0) {
      setCurrentProducts(products);
    } else if (products.length > 0) {
      setCurrentProducts([
        ...products.filter(
          (product) => product.categoryId === currentCategory.value,
        ),
      ]);
    }
  }, [currentCategory, products]);

  const handleDeleteProduct = function (id) {
    console.log(id);
    setCurrentProductId(id);
    setDeleteModalActive(true);
  };

  const handleSubmitDeleteProduct = async function (e, id) {
    e.preventDefault();
    try {
      await axios.put(
        `/api/product/delete/${id}`,
        {},
        {
          withCredentials: true,
        },
      );
      setDeleteModalActive(false);
      setOpenModal(true);
      const products = await axios.get("/api/product/getall");
      setProducts(products.data);
      setTimeout(() => {
        setOpenModal(false);
      }, 2000);
    } catch (e) {
      console.log(e);
    }
  };

  const handleRestoreProduct = async function (id) {
    try {
      await axios.put(
        `/api/product/update/${id}`,
        {
          isDeleted: false,
        },
        {
          withCredentials: true,
        },
      );
      setOpenRestoreModal(true);
      const products = await axios.get("/api/product/getall");
      setProducts(products.data);
      setTimeout(() => {
        setOpenRestoreModal(false);
      }, 2000);
    } catch (e) {
      console.log(e);
    }
  };

  if (!loaded) return <Loading />;

  return (
    <div className="mt-16 flex flex-col items-center">
      <h2 className="text-2xl font-semibold">Все товары</h2>
      <Link
        to="/admin/products/create_product"
        className="mt-12 bg-second text-white px-5 py-1 rounded-md"
      >
        Создать товар
      </Link>
      {openModal && (
        <div className="fixed z-10 top-10 left-1/2 sm:text-lg -translate-x-1/2 bg-red-400 px-6 sm:px-10 w-fit rounded-md text-white py-5 sm:py-8">
          Товар удален!
        </div>
      )}
      {openRestoreModal && (
        <div className="fixed z-10 top-10 left-1/2 sm:text-lg -translate-x-1/2 bg-red-400 px-6 sm:px-10 w-fit rounded-md text-white py-5 sm:py-8">
          Товар восстановлен!
        </div>
      )}
      <div className="mt-12 w-full mb-12">
        <div className="flex justify-center items-center gap-4 mx-auto">
          <span>Фильтровать по:</span>
          <Select
            options={options}
            value={currentCategory}
            onChange={(e) => setCurrentCategory(e)}
          />
        </div>
        {deleteModalActive && (
          <div className="fixed  z-20 flex flex-col border-2 border-red-600 items-center gap-3 top-1/2 left-1/2 rounded-md -translate-x-1/2 -translate-y-1/2 bg-white w-5/6 md:w-120 px-6 py-4">
            <p className="text-center">Вы точно хотите удалить продукт?</p>
            <form
              className="flex flex-col gap-5 mt-4 mb-2"
              onSubmit={(e) => handleSubmitDeleteProduct(e, currentProductId)}
            >
              <input
                type="submit"
                className="bg-second text-white px-12 py-2 rounded-md"
                value="Да, удалить"
              />
              <button
                type="button px-12 py-2"
                onClick={() => setDeleteModalActive(false)}
              >
                Нет, я передумал
              </button>
            </form>
          </div>
        )}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 justify-items-center gap-8 w-full">
          {currentProducts.length > 0 &&
            currentProducts.map((product) => (
              <div
                className="flex flex-col items-center relative w-full gap-4"
                key={product.id}
              >
                <Link to={`/admin/products/product_edit/${product.id}`}>
                  <img
                    src={"/edit-pen.png"}
                    className="absolute top-0 right-10 w-[32px]"
                    alt=""
                  />
                </Link>
                {!product.isDeleted ? (
                  <button
                    type="button"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    <img
                      src={"/trash-icon.png"}
                      className="absolute top-0 right-0 w-[32px]"
                      alt=""
                    />
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => handleRestoreProduct(product.id)}
                  >
                    <img
                      src={"/restore.png"}
                      className="absolute top-0 right-0 w-[32px]"
                      alt=""
                    />
                  </button>
                )}
                <img
                  src={"http://192.168.1.120:3000/" + product.image}
                  className="w-44"
                />
                <p className="text-xl font-semibold">{product.name}</p>
                <p>{product.description}</p>
                <p className="text-lg font-medium">{product.price} ₽</p>
                {product.isDeleted && (
                  <p className={"bg-red-600 px-2 py-0.5 text-white"}>
                    Товар удален
                  </p>
                )}
                {product.Sibling?.findIndex((product) => product.isDeleted) !=
                  -1 && (
                  <p className={"bg-red-600 px-2 py-0.5 text-white"}>
                    Товар из комбо удалён
                  </p>
                )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
