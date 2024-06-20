import Order from "../components/Order.jsx";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getBasket } from "../store/basketPersistSlice.js";
import Pagination from "../components/Pagination.jsx";
import api from "../services/api.js";

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [loaded, setLoaded] = useState(false);
  const [ordersPerPage] = useState(5);

  useEffect(() => {
    document.title = "МногоСуши | История заказов";
    const fetchOrders = async () => {
      const response = await api.get("/api/order/user/getall", {
        withCredentials: true,
      })
      setOrders(response.data)
      await dispatch(getBasket());
    };
    fetchOrders().finally(() => {
      console.log(orders)
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
                return (<Order order={order} key={order.id} />);
              })}
            {currentOrder.length === 0 && (
              <h2 className="text-center text-3xl opacity-70">
                У вас нет заказов
              </h2>
            )}
            {
              orders.length > 5 && (
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
                                disabled={!orders[lastOrderIndex - 1]}
                            >
                              Далее
                            </button>
                          </div>
                      )}
                    </div>
                )
            }
          </>
        )}
      </div>
    </>
  );
}
