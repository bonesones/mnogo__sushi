import { useForm } from "react-hook-form";
import Select from "react-select";
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import api from "../../../services/api.js";

export default function PromocodeForm() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
    reset,
  } = useForm();

  const [loaded, setLoaded] = useState(true)

  const [currentDiscountType, setCurrentDiscountType] = useState({
    value: "fix",
    label: "Фиксированный",
  });
  const [openModal, setOpenModal] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    document.title = "МногоСуши | Создание промокода";
  }, []);

  const onSubmit = async function (data) {
    setLoaded(false)
    try {
      const response = await api.post(
        "/api/promocode/create",
        {
          ...data,
          discount_type: currentDiscountType.value,
        },
        {
          withCredentials: true,
        },
      );
      reset();
      setError("");
      setOpenModal(true);
      setTimeout(() => {
        setOpenModal(false);
      }, 2000);
      setLoaded(true)
    } catch (e) {
      setLoaded(true)
      setError(e.response?.data?.message);
      console.log(e);
    }
  };

  const options = [
    {
      value: "fix",
      label: "Фиксированный",
    },
    {
      value: "percent",
      label: "Плавающий",
    },
  ];

  return (
    <div className="mt-16 mb-16 flex flex-col items-center">
      {openModal && (
        <div className="fixed top-10 left-1/2 sm:text-lg -translate-x-1/2 bg-red-400 px-6 sm:px-10 w-fit rounded-md text-white py-5 sm:py-8">
          Промокод создан!
        </div>
      )}
      <div className="w-full flex gap-4 mb-12 font-medium">
        <Link to="/admin/promocodes">Промокоды</Link>>
        <span>Создать промокод</span>
      </div>
      <h2 className="text-2xl font-semibold">Создать промокод</h2>
      <form
        className="flex flex-col gap-4 mt-12 max-w-[282px]"
        onSubmit={handleSubmit(onSubmit)}
        method="post"
      >
        <label htmlFor="name" className="self-start">
          Название промокода
        </label>
        <input
          {...register("name", {
            required: true,
          })}
          type="text"
          name="name"
          className="text-lg text-black bg-inherit px-5 py-1.5 border-2 border-[#A1947C] rounded-md pl-4 w-full"
        />
        <label htmlFor="min_amount" className="self-start">
          Минимальная сумма заказа
        </label>
        <input
          {...register("min_amount", {
            required: true,
            validate: (value) => !isNaN(value),
          })}
          type="number"
          name="min_amount"
          className="text-lg text-black bg-inherit px-5 py-1.5 border-2 border-[#A1947C] rounded-md pl-4 w-full"
        />
        <label className="self-start">Вид скидки</label>
        <Select
          options={options}
          value={currentDiscountType}
          onChange={(e) => setCurrentDiscountType(e)}
        />
        <label htmlFor="discount_amount" className="self-start">
          Скидка
        </label>
        <div className="flex items-center gap-4">
          <input
            {...register("discount_amount", {
              required: true,
              validate: {
                maxFixValue: (value) =>
                  Number(value) <= Number(getValues("min_amount")) || "error",
                maxPercentValue: (value) =>
                  currentDiscountType.value === "fix"
                    ? true
                    : Number(value) <= 100 || "error",
              },
            })}
            type="number"
            min={1}
            name="discount_amount"
            className="text-lg text-black bg-inherit px-5 py-1.5 border-2 border-[#A1947C] rounded-md pl-4 w-full"
          />
          <span>{currentDiscountType.value === "fix" ? "₽" : "%"}</span>
        </div>
        {Object.keys(errors).length > 0 && (
          <span className="text-red-600">
            Проверьте правильность заполнения полей!
          </span>
        )}
        {error && <span className="text-red-600">{error}</span>}
        <input
          type="submit"
          value="Создать промокод"
          disabled={!loaded}
          className="bg-second w-fit px-4 py-1 text-white mt-6 self-center rounded-md"
        />
      </form>
    </div>
  );
}
