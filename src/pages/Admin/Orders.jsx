import Order from "./Order.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [filterValue, setFilterValue] = useState("Все");
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("/api/order/admin/getall", {
          withCredentials: true,
        });
        setOrders(
          response.data.sort(
            ({ id: prevId }, { id: nextId }) => nextId - prevId,
          ),
        );
      } catch (e) {
        console.log(e);
      }
    };
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
    setFilteredOrders(orders);
  }, [orders]);

  if (!loaded) return null;

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
        {filteredOrders.length > 0 &&
          filteredOrders.map((order) => <Order key={order.id} order={order} />)}
      </div>
    </div>
  );
}
