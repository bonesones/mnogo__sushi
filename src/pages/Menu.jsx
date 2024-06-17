import ProductsList from "../components/ProductsList";
import { useEffect, useState } from "react";
import ProductDetails from "../components/ProductDetails";
import Slider from "../components/Slider";
import axios from "axios";
import api from "../services/api.js";
import { useDispatch, useSelector } from "react-redux";
import { getCategories, setActive } from "../store/categoriesSlice.js";
import Loading from "../components/Loading.jsx";

export default function Menu() {
  const [category, setCategory] = useState(1);
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories.categories);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "МногоСуши | Меню";
    if (categories.length <= 1) {
      dispatch(getCategories());
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (categories.length > 1) {
      const category = categories.find(({ isActive }) => isActive === true);
      setCategory(category.id);
    }
  }, [categories]);

  const handleChangeCategory = function (id) {
    setCategory(id);
    dispatch(setActive(id));
  };

  const isCategoryActive = function (id) {
    const category = categories.find((category) => category.id === id);
    return category.isActive;
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <Slider />
      <div className="category-list wrapper py-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 justify-items-center gap-y-5 md:gap-y-7 font-medium mx-auto lg:text-lg mt-6">
        {categories.length > 1 &&
          categories.map(({ id, name }) => {
            return (
              <button
                className={
                  (isCategoryActive(id) && "category-list__btn_active ") +
                  "category-list__btn"
                }
                key={id}
                onClick={() => handleChangeCategory(id)}
              >
                {name}
              </button>
            );
          })}
      </div>
      {categories.length > 1 && <ProductsList category={category} />}
    </>
  );
}
