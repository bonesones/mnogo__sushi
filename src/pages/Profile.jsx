import { useEffect, useState } from "react"

export default function Profile() {

    const [profileMode, setProfileMode] = useState('personal')
    const [orderOpened, setOrderOpened] = useState(false)

    const clickHandler = function(e) {
        if(e.target.tagName === "BUTTON") {
            document.querySelector(".data-switch-btn_active")?.classList?.remove("data-switch-btn_active")
            e.target.classList.add("data-switch-btn_active")
            setProfileMode(e.target.dataset.page)
        }
    }

    const handleOpenCloseOrder = function(e) {
        setOrderOpened(prev => !prev)
    }


    return (
        <>
            <div className="flex justify-between wrapper items-center mt-24">
                <h1 className="font-semibold text-5xl text-start">Личный кабинет</h1>
                <button type="button" className="bg-white hover:bg-[#F35E62] text-[#F35E62] hover:text-white border-2 border-[#F35E62] font-medium rounded-lg py-1 px-16">
                    Выйти
                </button>
            </div>
            <div className="mt-16 flex wrapper">
                <div className="flex flex-col gap-4 w-fit" onClick={(e) => clickHandler(e)}>
                    <button className="w-80 data-switch-btn data-switch-btn_active bg-white border-2 border-[#F35E62] text-[#F35E62] font-medium text-2xl px-10 py-1.5 rounded-r-lg" data-page="personal">
                        Личные данные
                    </button>
                    <button className="w-80 data-switch-btn bg-white border-2 border-[#F35E62] text-[#F35E62] font-medium text-2xl px-10 py-1.5 rounded-r-lg" data-page="orders">
                        История заказов
                    </button>
                </div>
                <div className="w-full flex wrapper">
                    {profileMode === "personal" ? <form className="profile-form grid grid-cols-2 gap-y-16 font-medium text-lg"> 
                        <label htmlFor="name" className="w-40 inline-block">Имя</label>
                        <input type="text" name="name" className="bg-inherit border-2 border-[#A1947C] rounded-sm pl-4 w-72" />
                        <label htmlFor="phone" className="w-40 inline-block">Телефон</label>
                        <input type="tel" name="phone" placeholder="+7 (111) 111-11-11" className="bg-inherit border-2 border-[#A1947C] rounded-sm pl-4 w-72" />
                        <label htmlFor="birthday" className="w-40 inline-block">Дата рождения</label>
                        <input type="date" name="birthday" value='мм/дд/гггг' className="bg-inherit border-2 border-[#A1947C] rounded-sm pl-4 w-72" />
                        <label htmlFor="email" className="w-40 inline-block">Почта</label>
                        <input type="email" name="email" className="bg-inherit border-2 border-[#A1947C] rounded-sm pl-4 w-72" placeholder="example@email.com" />
                        <label htmlFor="password" className="w-40 inline-block">Пароль</label>
                        <input type="password" name="password" value="test1234" className="bg-inherit border-2 border-[#A1947C] rounded-sm pl-4 w-72" />
                        <input type="submit" value="Сохранить" className="border bg-[#F35E62] text-white w-fit py-1.5 px-20 rounded-r-md rounded-tl-md hover:cursor-pointer" />
                    </form> : <div className="w-full flex flex-col gap-6">
                            <div className="flex justify-between text-center">
                                <span className="w-12"></span>
                                <span className="w-28">Дата заказа</span>
                                <span className="w-96">Адрес</span>
                                <span className="w-24">Сумма</span>
                                <span className="w-32">Номер заказа</span>
                            </div>
                            <div className="flex flex-col gap-12">
                                <div>
                                    <div className="flex justify-between items-center text-center">
                                        <button type="button" className="order__arrow w-12 cursor-pointer" 
                                                onClick={(e) => handleOpenCloseOrder(e)}>
                                            <img className={(orderOpened ? "order__arrow_rotate ": "") + "transition-transform"} src="/ArrowNav.svg" />
                                        </button>
                                        <span className="text-lg font-medium w-28">
                                        11.02.2024
                                        </span>
                                        <span className="text-lg font-medium w-96">
                                        ул. Первомайская, 42
                                        </span>
                                        <span className="text-lg font-medium w-24">
                                        899 ₽
                                        </span>
                                        <span className="text-lg font-medium w-32">
                                            453123
                                        </span>
                                    </div>
                                    <div className={(orderOpened ? "block " : "hidden ") + "popup-order ml-12 mt-6"}>
                                        <div className="flex gap-8">
                                            <span>
                                                Оплата: картой
                                            </span>
                                            <span>
                                                Доставка: бесплатно
                                            </span>
                                            <span className="bg-[#F35E62] text-white py-0.5 px-1">
                                                Статус: выполнен
                                            </span>
                                        </div>
                                        <div className="flex justify-between mt-6">
                                            <span className="font-medium">МногоМяса</span>
                                            <div>
                                                <span className="mr-7 font-medium">600 ₽</span>
                                                <button type="button" className="border-2 border-[#F35E62] text-[#F35E62] hover:text-white hover:bg-[#F35E62] rounded-lg px-5 text-medium">
                                                    В корзину
                                                </button>
                                            </div>
                                        </div>
                                        <div className="flex justify-between mt-6">
                                            <span className="font-medium">Чикен Паприка</span>
                                            <div>
                                                <span className="mr-7 font-medium">299 ₽</span>
                                                <button type="button" className="border-2 border-[#F35E62] text-[#F35E62] hover:text-white hover:bg-[#F35E62] rounded-lg px-5 text-medium">
                                                    В корзину
                                                </button>
                                            </div>
                                        </div>
                                        <button type="button" className="border-2 border-[#F35E62] text-[#F35E62] hover:text-white hover:bg-[#F35E62] rounded-lg px-5 text-medium mt-8">Повторить</button>
                                    </div>
                                </div>
                                <div>
                                    <div className="flex justify-between items-center text-center">
                                        <button type="button" className="order__arrow w-12 cursor-pointer">
                                            <img className="transition-transform" src="/ArrowNav.svg" />
                                        </button>
                                        <span className="text-lg font-medium w-28">
                                        11.02.2024
                                        </span>
                                        <span className="text-lg font-medium w-96">
                                        ул. Первомайская, 42
                                        </span>
                                        <span className="text-lg font-medium w-24">
                                        899 ₽
                                        </span>
                                        <span className="text-lg font-medium w-32">
                                            453123
                                        </span>
                                    </div>
                                    <div className="hidden popup-order ml-12 mt-6">
                                        <div className="flex gap-8">
                                            <span>
                                                Оплата: картой
                                            </span>
                                            <span>
                                                Доставка: бесплатно
                                            </span>
                                            <span className="bg-[#F35E62] text-white py-0.5 px-1">
                                                Статус: выполнен
                                            </span>
                                        </div>
                                        <div className="flex justify-between mt-6">
                                            <span className="font-medium">МногоМяса</span>
                                            <div>
                                                <span className="mr-7 font-medium">600 ₽</span>
                                                <button type="button" className="border-2 border-[#F35E62] text-[#F35E62] hover:text-white hover:bg-[#F35E62] rounded-lg px-5 text-medium">
                                                    В корзину
                                                </button>
                                            </div>
                                        </div>
                                        <div className="flex justify-between mt-6">
                                            <span className="font-medium">Чикен Паприка</span>
                                            <div>
                                                <span className="mr-7 font-medium">299 ₽</span>
                                                <button type="button" className="border-2 border-[#F35E62] text-[#F35E62] hover:text-white hover:bg-[#F35E62] rounded-lg px-5 text-medium">
                                                    В корзину
                                                </button>
                                            </div>
                                        </div>
                                        <button type="button" className="border-2 border-[#F35E62] text-[#F35E62] hover:text-white hover:bg-[#F35E62] rounded-lg px-5 text-medium mt-8">Повторить</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
            
        </>
    )
}