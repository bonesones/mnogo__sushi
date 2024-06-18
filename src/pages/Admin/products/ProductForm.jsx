import Select from "react-select";
import Order from "../orders/Order.jsx";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../../store/categoriesSlice.js";
import axios from "axios";
import Loading from "../../../components/Loading.jsx";
import { Link } from "react-router-dom";
import api from "../../../services/api.js";

export default function ProductForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [loaded, setLoaded] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);
  const [allProducts, setAllProducts] = useState([]);
  const [comboProducts, setComboProducts] = useState([]);
  const [showSaveBtn, setShowSaveBtn] = useState(false);
  const [productsOption, setProductsOption] = useState([]);
  const [comboError, setComboError] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "МногоСуши | Создание товара";
    const fetchData = async () => {
      await dispatch(getCategories());
      try {
        const responseProducts = await api.get(`/api/product/getall`);
        const filteredProducts = responseProducts.data.filter(
          ({ categoryId }) => categoryId != 1,
        );
        setAllProducts(filteredProducts);
        setError("");
      } catch (e) {
        setError(e.response?.data?.message);
        console.log(e);
      }
    };
    fetchData().finally(() => setLoaded(true));
  }, []);

  const options = categories.map((category) => {
    return {
      label: category.name,
      value: category.id,
    };
  });

  useEffect(() => {
    setProductsOption(() => {
      return allProducts.map((product) => {
        return {
          label: product.name,
          value: product.id,
        };
      });
    });
  }, [allProducts]);

  const [currentCategory, setCurrentCategory] = useState({});
  const [currentProduct, setCurrentProduct] = useState({});

  const handleChangeCategory = function (e) {
    setCurrentCategory({
      value: e.value,
      label: e.label,
    });
  };

  const handleChangeProduct = function (e) {
    setCurrentProduct({
      value: e.value,
      label: e.label,
    });
    setShowSaveBtn(true);
  };

  useEffect(() => {
    setCurrentCategory(options[0]);
  }, [categories]);

  const onSubmit = async function (data) {
    if (currentCategory.label === "Наборы" && comboProducts.length < 2) {
      setComboError("В комбо не может быть меньше двух продуктов");
      return;
    } else {
      setComboError("");
    }
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      if (key === "image") {
        return;
      }
      formData.append(key, value);
    });
    formData.append("image", data.image[0]);
    formData.append("categoryId", currentCategory.value);

    if (currentCategory.label === "Наборы") {
      const products = [];
      comboProducts.forEach((product) => {
        products.push(product.value);
      });
      formData.append("products", JSON.stringify(products));
    }

    try {
      await api.post("/api/product/create", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      });
      reset();
      setOpenModal(true);
      setError("");
      setTimeout(() => setOpenModal(false), 2000);
    } catch (e) {
      setError(e.response?.data?.message);
      console.log(e);
    }
  };

  const handleAddComboProduct = function () {
    setComboProducts((prev) => [...prev, currentProduct]);
    setCurrentProduct({});
    setShowSaveBtn(false);
    setProductsOption((prev) => [
      ...prev.filter((product) => product.value !== currentProduct.value),
    ]);
  };

  const handleDeleteComboProduct = function (item) {
    productsOption.push(item);
    setComboProducts((prev) => {
      return [...prev.filter((product) => product.value != item.value)];
    });
  };

  if (!loaded) return <Loading />;

  return (
    <div className="mt-16 mb-16 flex flex-col items-center">
      <div className="w-full flex gap-4 mb-12 font-medium">
        <Link to="/admin/products">Товары</Link>><span>Создать товар</span>
      </div>
      <h2 className="text-2xl font-semibold">Создать товар</h2>
      {openModal && (
        <div className="fixed top-10 left-1/2 sm:text-lg -translate-x-1/2 bg-red-400 px-6 sm:px-10 w-fit rounded-md text-white py-5 sm:py-8">
          Товар создан!
        </div>
      )}
      <form
        className="flex flex-col gap-4 mt-12"
        onSubmit={handleSubmit(onSubmit)}
        method="post"
      >
        <label htmlFor="name" className="self-start">
          Название товара
        </label>
        <input
          {...register("name", {
            required: true,
          })}
          type="text"
          name="name"
          className="text-lg text-black bg-inherit px-5 py-1.5 border-2 border-[#A1947C] rounded-md pl-4 w-full"
        />
        <label htmlFor="description" className="self-start">
          Описание товара
        </label>
        <textarea
          {...register("description", {
            required: true,
          })}
          type="text"
          name="description"
          className="text-black resize-none text-lg bg-inherit px-5 py-1.5 h-32 border-2 border-[#A1947C] rounded-md pl-4 w-full"
        />
        <label htmlFor="parameter" className="self-start">
          Свойство товара (вес или размер)
        </label>
        <input
          {...register("parameter", {
            required: true,
          })}
          type="text"
          name="parameter"
          className="text-lg text-black bg-inherit px-5 py-1.5 border-2 border-[#A1947C] rounded-md pl-4 w-full"
        />
        <label htmlFor="price" className="self-start">
          Цена
        </label>
        <div className="flex items-center gap-4">
          <input
            {...register("price", {
              required: true,
              validate: (value) =>
                !isNaN(value) || "Изображение больше 1 Мбайта",
            })}
            type="name"
            name="price"
            className="text-lg text-black bg-inherit px-5 py-1.5 border-2 border-[#A1947C] rounded-md pl-4 w-full"
          />
          <span>₽</span>
        </div>
        <p>Категория товара</p>
        <Select
          options={options}
          value={currentCategory}
          onChange={(e) => handleChangeCategory(e)}
        />
        {currentCategory.label === "Наборы" && (
          <>
            <p>Товары в комбо</p>
            {comboProducts.length > 0 ? (
              <ul className="list-disc w-fit ml-6 flex flex-col gap-2">
                {comboProducts.map((product) => (
                  <li key={product.value}>
                    {product.label}
                    <button
                      className="ml-4 text-red-600"
                      onClick={() => handleDeleteComboProduct(product)}
                    >
                      Удалить
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <span></span>
            )}
            <Select
              options={productsOption}
              value={currentProduct}
              onChange={(e) => handleChangeProduct(e)}
            />
            {showSaveBtn && (
              <>
                <button
                  type="button"
                  onClick={handleAddComboProduct}
                  className="bg-second text-white py-2 px-4 w-fit rounded-md"
                >
                  Сохранить
                </button>
              </>
            )}
          </>
        )}
        {comboError && <span className="text-red-600">{comboError}</span>}
        <label htmlFor="image" className="self-start">
          Изображение товара
        </label>
        <input
          {...register("image", {
            required: true,
            validate: (value) =>
              value[0].size < 1048576 || "Изображение больше 1Мбайта!",
          })}
          type="file"
          name="image"
          className="text-lg text-black bg-inherit px-5 py-1.5 border-2 border-[#A1947C] rounded-md pl-4 w-full"
        />
        <span>До 1 Мбайта</span>
        {errors.image && (
          <span className="text-red-600 text-center">
            {errors.image.message}
          </span>
        )}
        {Object.keys(errors).length > 0 && (
          <span className="text-red-600 text-center">
            Проверьте правильность заполнения полей
          </span>
        )}
        {error && <span className="text-red-600">{error}</span>}
        <input
          type="submit"
          value="Создать товар"
          className="border bg-[#F35E62] text-white w-fit py-1.5 px-20 self-center rounded-md rounded-tl-md hover:cursor-pointer mt-12"
        />
      </form>
    </div>
  );
}
