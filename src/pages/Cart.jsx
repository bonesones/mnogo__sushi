import { useState } from "react"

export default function Cart() {

    const [isOrderMethodActive, setIsOrderMethodActive] = useState(true)
    const [isToTimeActive, setIsToTimeActive] = useState(false)
    const [isPayByCard, setIsPayByCard] = useState(true)


    const handleChangeGetMethod = function() {
        setIsOrderMethodActive(prev => !prev)
    }

    const handleChangeTimeMethod = function() {
        setIsToTimeActive (prev => !prev)
    }

    const handleChangePayMethod = function() {
        setIsPayByCard(prev => !prev)
    }



    return (
        <>
            <h1 className="font-semibold text-5xl mt-24 wrapper">Корзина</h1>
            <div className="wrapper mt-20 flex flex-col items-center">
                <div className="mx-52 font-medium text-2xl flex flex-col gap-20 w-232">
                    <div className="cart-items flex items-center justify-between">
                        <span>МногоМяса</span>
                        <div className="flex gap-16">
                            <div className="flexa items-center relative">
                                <button className="w-16 rounded-l-xl text-center bg-white">-</button>
                                <span className="bg-[#F35E62] py-4 px-3 rounded-xl text-white">1</span>
                                <button className="w-16 rounded-r-xl inline-block bg-white text-center">+</button>
                            </div>
                            <span>600р</span>
                            <button>
                                <img src="/close.png" />
                            </button>
                        </div>
                    </div>
                    <div className="cart-items flex items-center justify-between">
                        <span>МногоМяса</span>
                        <div className="flex gap-16">
                            <div className="flexa items-center relative">
                                <button className="w-16 rounded-l-xl text-center bg-white">-</button>
                                <span className="bg-[#F35E62] py-4 px-3 rounded-xl text-white">1</span>
                                <button className="w-16 rounded-r-xl inline-block bg-white text-center">+</button>
                            </div>
                            <span>600р</span>
                            <button>
                                <img src="/close.png" />
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col w-full mt-24">
                    <h2 className="text-4xl font-semibold">Способ получения заказа</h2>
                    <div className="mt-16 text-xl font-medium" onClick={handleChangeGetMethod}>
                        <button className={(isOrderMethodActive ? "!bg-[#F35E62] !text-white " : "") + "text-black bg-white rounded-xl px-12 py-1.5"}>
                            Доставка
                        </button>
                        <button className={(!isOrderMethodActive ? "!bg-[#F35E62] !text-white " : "") + "text-black bg-white rounded-xl px-12 py-1.5 relative right-4"}>
                            Самовывоз
                        </button>
                    </div>
                    {isOrderMethodActive ? <form className="cart-form w-[50rem] flex flex-col gap-6 mt-20" onSubmit={(e) => e.preventDefault()}>
                        <input type='text' className="w-full bg-inherit border-2 border-[#A1947C] rounded-md py-0.5 px-4" placeholder="Улица, дом" />
                        <fieldset className="flex justify-between"> 
                            <input type='text />' className="bg-inherit border-2 border-[#A1947C] rounded-md py-0.5 px-4" placeholder="№ квартиры / офиса" />
                            <input type='text />' className="bg-inherit border-2 border-[#A1947C] rounded-md py-0.5 px-4" placeholder="Подъезд"/>
                            <input type='text />' className="bg-inherit border-2 border-[#A1947C] rounded-md py-0.5 px-4" placeholder="Этаж"/>
                        </fieldset>
                        <textarea className="bg-inherit border-2 border-[#A1947C] w-full h-[8rem] rounded-md py-0.5 px-4" placeholder="Комментарий курьеру" />
                        <fieldset className="flex justify-between">
                            <input type='text' className="w-5/12 bg-inherit border-2 border-[#A1947C] rounded-md py-0.5 px-4" placeholder="Телефон получателя" />
                            <input type='text' className="w-5/12 bg-inherit border-2 border-[#A1947C] rounded-md py-0.5 px-4" placeholder="Имя получателя" />
                        </fieldset>
                        <div className="flex justify-between">
                            <div className="text-xl font-medium" onClick={handleChangeTimeMethod}>
                                <button className={(!isToTimeActive ? "!bg-[#F35E62] !text-white " : "") + "text-black bg-white rounded-xl px-6 py-1.5"}>
                                    Как можно быстрее
                                </button>
                                <button className={(isToTimeActive ? "!bg-[#F35E62] !text-white " : "") + "text-black bg-white rounded-xl px-20 py-1.5 relative right-4"}>
                                    Ко времени
                                </button>
                            </div>
                            {isToTimeActive && <div className="flex h-10 items-center gap-2">
                                    <input type="number" className="bg-inherit border-2 border-[#A1947C] rounded-md py-0.5 px-4 w-20 " min={0} max={23} />
                                    :
                                    <input type="number" className="bg-inherit border-2 border-[#A1947C] rounded-md py-0.5 px-4 w-20" min={0} max={59} />
                                </div>}
                        </div>
                    </form> : <p className="mt-12">Адрес самовывоза: г. Вологда, ул. Ветошкина 84Б</p>}   
                </div>
                <div className="w-full mt-24">
                    <h2 className="text-4xl font-semibold">Способ оплаты</h2>
                    <div className="text-xl mt-16 font-medium" onClick={handleChangePayMethod}>
                        <button className={(isPayByCard ? "!bg-[#F35E62] !text-white " : "") + "text-black bg-white rounded-xl px-20 py-1.5"}>
                            Картой
                        </button>
                        <button className={(!isPayByCard ? "!bg-[#F35E62] !text-white " : "") + "text-black bg-white rounded-xl px-20 py-1.5 relative right-4"}>
                            Наличными
                        </button>
                    </div>
                    <div className="mt-16 w-[30rem]">
                        <p className="text-xl font-medium"><span className="opacity-70">Доставка: </span><span >Бесплатно</span></p>
                        <div className="flex justify-between items-center mt-5">
                            <input className="bg-inherit promocode__input border-2 border-[#A1947C] rounded-md py-0.5 px-4" type="text" placeholder="Введите промокод" />
                            <button className="border border-[#F35E62] text-[#F35E62] text-center bg-inherit rounded-lg hover:bg-[#F35E62] hover:text-white font-medium hover:bg-second px-3">Применить</button>
                        </div>
                        <hr className="w-full bg-black mt-2.5 h-[.12rem]" />
                        <div className="flex justify-between items-center text-4xl font-semibold mt-6">
                            <span>К оплате:</span>
                            <span>899 ₽</span>
                        </div>
                        <button className="border text-2xl font-medium mt-10 text-center w-full rounded-lg bg-[#F35E62] text-white font-medium px-3 py-1">
                            Оформить заказ
                        </button>
                    </div>
                </div>
            </div>
           
        </>
    )
}