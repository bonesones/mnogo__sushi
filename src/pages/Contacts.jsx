export default function Contacts() {
    return (
        <>
            <h1 className="font-semibold text-5xl mt-24 wrapper">Контакты</h1>
            <section className="contacts wrapper !px-48">
                <iframe className="mt-16" src="https://yandex.ru/map-widget/v1/?um=constructor%3A1c3f39a5285b71b5150aaaa7723acb0e1bf6d47ab3fe617f116dc605c334dbae&amp;source=constructor" width="100%" height="400" frameborder="0"></iframe>
                <section className="contacts-data mt-16 flex justify-between"> 
                    <div className="w-5/12">
                        <h2 className="font-semibold text-2xl">Обратная связь</h2>
                        <form className="flex flex-wrap gap-6 mt-12 reply-form"> 
                            <input type="text" className="reply__input pb-1 w-5/12 font-medium text-black bg-inherit border-b border-black" placeholder="Имя*" />
                            <input type="tel" className="reply__input pb-1 font-medium w-5/12 ml-auto bg-inherit border-b border-black" placeholder="Телефон*" />
                            <textarea className="reply__input reply__textarea pb-1 h-24 font-medium text-base w-full block bg-inherit border-b border-black" placeholder="Ваше сообщение*" />
                            <input type="sumbit" value="Отправить" className="mt-12 product-card__cart-btn reply__btn text-center bg-inherit rounded-lg hover: font-medium hover:bg-second" />
                            
                        </form>
                    </div>
                    <div className="w-5/12">
                        <div>
                            <h2 className="text-2xl font-semibold mb-6">
                                Адрес
                            </h2>
                            <span>г. Вологда, ул. Ветошкина 84Б</span>
                        </div>
                        <div>
                            <h2 className="text-2xl font-semibold mt-8 mb-6">
                                Время работы
                            </h2>
                            <div className="flex flex-col gap-4">
                                <span>Понедельник - Четверг: 12:00 - 22:00</span>
                                <span>Пятница, Суббота: 12:00 - 00:00</span>
                                <span>Воскресенье 12:00 - 22:00</span>
                            </div>
                        </div>
                        <div>
                            <h2 className="text-2xl font-semibold mt-8 mb-6">
                                Телефоны
                            </h2>
                            <div className="flex flex-col gap-4">
                                <a href="tel:78172292022">
                                    +7 (8172) 29-20-22
                                </a>
                                <a href="tel:79005602022">
                                +7 900 560-20-22
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </section>
        </>
    )
}