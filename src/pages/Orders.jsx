import Order from "../components/Order.jsx";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrders } from "../store/userOrderSlice.js";
import { getBasket } from "../store/basketPersistSlice.js";
import Pagination from "../components/Pagination.jsx";

export default function Orders() {
  const orders = useSelector((state) => state.orders.orders);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [loaded, setLoaded] = useState(false);
  const [ordersPerPage] = useState(5);

  useEffect(() => {
    document.title = "МногоСуши | История заказов";
    const fetchOrders = async () => {
      await dispatch(getUserOrders());
      await dispatch(getBasket());
    };
    fetchOrders().finally(() => {
      setLoaded(true);
    });
  }, []);

  const lastOrderIndex = currentPage * ordersPerPage;
  const firstOrderIndex = lastOrderIndex - ordersPerPage;
  const currentOrder = orders.slice(firstOrderIndex, lastOrderIndex);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage((prev) => prev + 1);
  const prevPage = () => setCurrentPage((prev) => prev - 1);

  return (
    <>
      <div className="flex flex-col gap-16 w-full">
        {loaded && (
          <>
            {currentOrder.length > 0 &&
              currentOrder.map((order) => {
                return <Order order={order} key={order.id} />;
              })}
            {currentOrder.length === 0 && (
              <h2 className="text-center text-3xl opacity-70">
                У вас нет заказов
              </h2>
            )}
            <div className="flex justify-center flex-col gap-6">
              <Pagination
                ordersPerPage={ordersPerPage}
                totalOrders={orders.length}
                paginate={paginate}
                currentPage={currentPage}
              />
              {currentOrder.length > 5 && (
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
                    disabled={currentPage === 2}
                  >
                    Далее
                  </button>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}
