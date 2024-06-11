import Order from "../components/Order.jsx";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrders } from "../store/userOrderSlice.js";
import { getBasket } from "../store/basketPersistSlice.js";

export default function Orders() {
  const orders = useSelector((state) => state.orders.orders);
  const dispatch = useDispatch();
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchOrders = async () => {
      await dispatch(getUserOrders());
      await dispatch(getBasket());
    };
    fetchOrders().then(() => {
      setLoaded(true);
    });
  }, []);
  console.log(orders);
  return (
    <div className="flex flex-col gap-16 w-full">
      {orders.length > 0 &&
        orders.map((order) => {
          return <Order order={order} key={order.id} />;
        })}
      {orders.length === 0 && (
        <h2 className="text-center text-3xl opacity-70">У вас нет заказов</h2>
      )}
    </div>
  );
}
