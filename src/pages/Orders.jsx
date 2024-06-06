import Order from "../components/Order.jsx";

export default function Orders() {
  return (
    <div className="flex flex-col gap-16 w-full">
      <Order />
      <Order />
      <Order />
    </div>
  );
}
