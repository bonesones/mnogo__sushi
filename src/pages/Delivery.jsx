export default function Delivery() {
  return (
    <div className="wrapper">
      <h1 className="text-3xl font-bold mt-24 mb-[4rem] text-center sm:text-left">
        Доставка
      </h1>
      <h2 className="text-md sm:text-xl font-semibold text-center sm:text-left">
        Минимальная сумма заказа - 500 рублей
      </h2>
      <iframe
        src="https://yandex.ru/map-widget/v1/?um=constructor%3A3df4efdafc83a5d6b7bc630075fc7f2b6721f0a266b5b6f2d9d55f6ddbdf9de4&amp;source=constructor"
        width="100%"
        height="484"
        frameBorder="0"
        className="mt-[4rem] mb-10"
      ></iframe>
    </div>
  );
}
