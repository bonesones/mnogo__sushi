import Order from "./Order.jsx";
import { useEffect, useState } from "react";
import Select from "react-select";
import api from "../../../services/api.js";
import Loading from "../../../components/Loading.jsx";
import Pagination from "../../../components/Pagination.jsx";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [filterValue, setFilterValue] = useState("Все");
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(6);
  let lastOrderIndex = ordersPerPage * currentPage;
  let firstOrderIndex = lastOrderIndex - ordersPerPage
  const [currentOrders, setCurrentOrders] = useState([])


  const fetchOrders = async function() {
    try {
      const response = await api.get("/api/order/admin/getall", {
        withCredentials: true,
      });
      setOrders(response.data);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    document.title = "МногоСуши | Заказы";
    fetchOrders().finally(() => {
      setLoaded(true);
    });
  }, []);

  useEffect(() => {
    setFilteredOrders(() => {
      if (filterValue === "Все") {
        return orders;
      } else {
        return orders.filter((order) => order.status === filterValue);
      }
    });
  }, [filterValue]);

  useEffect(() => {
    lastOrderIndex = currentPage * ordersPerPage
    firstOrderIndex = lastOrderIndex - ordersPerPage
    setCurrentOrders([...filteredOrders.slice(firstOrderIndex, lastOrderIndex)])
  }, [filteredOrders, currentPage])

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage((prev) => prev + 1);
  const prevPage = () => setCurrentPage((prev) => prev - 1);

  useEffect(() => {
    setFilteredOrders(orders);
  }, [orders]);

  const options = [
    {
      label: "Все",
      value: "Все",
    },
    {
      label: "Новый",
      value: "Новый",
    },
    {
      label: "Принят в работу",
      value: "Принят в работу",
    },
    {
      label: "Передан курьеру",
      value: "Передан курьеру",
    },
    {
      label: "Выдан",
      value: "Выдан",
    },
    {
      label: "Отменен",
      value: "Отменен",
    },
  ];

  if (!loaded) return <Loading />;

  return (
    <div className="mt-16 flex flex-col items-center">
      <h2 className="text-2xl font-semibold">Все заказы</h2>
      <div className="mt-12 flex gap-4 items-center">
        <span>Фильтровать по:</span>
        <Select
          options={options}
          value={{
            label: filterValue,
            value: filterValue,
          }}
          onChange={(e) => setFilterValue(e.value)}
        />
      </div>
      <div className="orders mb-12 mt-4 w-full flex flex-col gap-6">
        {currentOrders.length > 0 && currentOrders.map((order) => <Order key={order.id} fetchOrders={fetchOrders} order={order}/>)}
        {currentOrders.length > 0 && (
            <div className="flex justify-center flex-col gap-6">
              <Pagination
                  ordersPerPage={ordersPerPage}
                  totalOrders={filteredOrders.length}
                  paginate={paginate}
                  currentPage={currentPage}
              />
                <div className="flex justify-center gap-12 mb-12">
                  <button
                      type="button"
                      className="text-xl"
                      onClick={prevPage}
                      disabled={currentPage === 1}
                  >
                    Назад
                  </button>
                  <button
                      type="button"
                      className="text-xl"
                      onClick={nextPage}
                      disabled={!currentOrders[lastOrderIndex - 1]}
                  >
                    Далее
                  </button>
                </div>
            </div>
        )}
        {currentOrders.length === 0 && (
            <h2 className="text-center text-3xl opacity-70">
              Нет заказов
            </h2>
        )}
      </div>
    </div>
  )
      ;
}
