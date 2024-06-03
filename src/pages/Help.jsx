import QuestionCard from "../components/QuestionCard";

export default function Help() {
  return (
    <>
      <h1 className="font-semibold text-3xl mt-24 wrapper text-center sm:text-left">
        Помощь
      </h1>
      <section
        className="wrapper mt-20 flex flex-col gap-6  items-center mx-auto"
        onClick={(e) => handleOpenCloseQuestion(e)}
      >
        <QuestionCard
          question="Как оформить заказ?"
          answer="Для оформления заказа необходимо выбрать товары и добавить их в корзину. Затем перейти в неё. При наличии промокода ввести его
                              в соответсвующее поле и нажать кнопку “Применить”. Выбрать способ получения заказа (доставка или самовывоз). Если выбран способ
                              получения “Доставка”, то ввести адрес доставки, где будет получен заказ. Затем выбрать способ оплаты и нажать кнопку “Оформить”."
        />
        <QuestionCard
          question="Как отменить заказ?"
          answer="Для отмены заказа свяжитесь с оператором по номеру +7 (8172) 29-20-22, учтите, должно быть не съеденным 90-95% продукта"
        />
        <QuestionCard
          question="Что такое промокод?"
          answer="Промокод - это кодовое слово или набор букв и цифр, позволяющий получить скидку на заказ"
        />
        <QuestionCard
          question="Как воспользоваться промокодом?"
          answer="Для того, чтобы воспользоваться промокодом, зайдите в корзину, в соотвествующее поле введите промокод и нажмите 'Применить'"
        />
      </section>
    </>
  );
}
