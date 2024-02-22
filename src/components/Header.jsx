import React, { useRef, useState } from "react"
import Burger from "./../assets/burger-menu.png"
import Cart from "./../assets/shopping_cart.png"
import Logo from "./../assets/logo.png"
import Arrow from "./../assets/modal-arrow.png"
import Location from "./../assets/location.png"
import Phone from "./../assets/phone.png"

import { Link } from "react-router-dom"
import BackGround from "./BackGround"

export default function Header() {

    const categories = [["combo", "Комбо"], // пара ссылка - название
                        ["pizza", "Пицца"],
                        ["sushipizza", "Сушипицца"],
                        ["cream_rolls", "Сливочные роллы"],
                        ["maki", "Маки"],
                        ["cold_rolls", "Холодные роллы"],
                        ["baked_rolls", "Запеченные роллы"],
                        ["warm_rolls", "Теплые роллы"],
                        ["snacks", "Закуски"],
                        ["additional", "Дополнительно"]
                       ]


    const categoriesList = categories.map(([link, title], key) => {
        return (
            <li className="mt-2.5" key={key}>
                <a href={'/#' + link}>
                    {title}
                </a>
            </li>
        )
    }) 

    const arrowImage = useRef(null);
    const arrowMenu = useRef(null)

    const burgerBackground = useRef(null)
    const burgerMenu = useRef(null)

    const [isBurgerOpened, setIsBurgerOpened] = useState(false)
    const [isArrowTouched, setIsArrowTouched] = useState(false)

    const handleOpenCloseArrowMenu = function() {

        if(!isArrowTouched) {
            arrowImage.current.classList.add('modal-nav__arrow_rotated')
            arrowMenu.current.classList.add('modal-nav__element-submenu_displayed')

            setIsArrowTouched(prev => !prev)
            
        } else {
            arrowImage.current.classList.remove('modal-nav__arrow_rotated')
            arrowMenu.current.classList.remove('modal-nav__element-submenu_displayed')

            setIsArrowTouched(prev => !prev)
        }
    }

    const handleChangeNav = function() {
        
        if(!isBurgerOpened) {

            burgerMenu.current.classList.remove('modal-nav_inactive')
            burgerBackground.current.classList.add('modal-nav__background_active')

            if(isArrowTouched) {
                handleOpenCloseArrowMenu()
            }

            setIsBurgerOpened(prev => !prev)
        } else {

            burgerMenu.current.classList.add('modal-nav_inactive')
            burgerBackground.current.classList.remove('modal-nav__background_active')

            setIsBurgerOpened(prev => !prev)

        }

    }
    return (
        <>
        <header className="wrapper py-3.5">
            <BackGround onClick={handleChangeNav} reference={burgerBackground} />
            <div className="modal-nav modal-nav_inactive flex flex-col items-center absolute top-0 left-0 z-20 bg-main h-full w-64 overflow-y-auto"
                 ref={burgerMenu}
            >
                <img className="logo text-center h-fit pt-8" src={Logo} width={156} alt="Логотип" />
                <nav className="w-full mt-12">
                    <ul className="flex flex-col items-center modal-nav pb-8 ">
                        <li className="flex flex-col justify-between modal-nav__element w-9/12">
                            <button className="flex items-center justify-between modal-nav__arrow-btn" 
                                    type="button"
                                    onClick={handleOpenCloseArrowMenu}
                            >
                                <span>Меню</span>
                                <img className="modal-nav__arrow transition-transform" 
                                     src={Arrow} 
                                     width={21} 
                                     alt="Стрелка, раскрывающая меню"
                                     ref={arrowImage}
                                />
                            </button>
                            <button className="modal-nav__arrow-btn" 
                                    type="button"
                                    onClick={handleOpenCloseArrowMenu}
                            >
                
                            </button>
                            <ul className="modal-nav__element-submenu ml-2 mt-3" ref={arrowMenu}>
                                    {categoriesList}
                            </ul>
                        </li>
                        <li className=" modal-nav__element w-9/12 mt-5">
                            <a href='#'>Доставка</a>
                        </li>
                        <li className="modal-nav__element w-9/12 mt-5">
                            <a href="#">Акции</a>
                        </li>
                        <li className="modal-nav__element w-9/12 mt-5">
                            <a href="#">Помощь</a>
                        </li>
                        <li className="modal-nav__element w-9/12 mt-7">
                            <a href="#">Личный кабинет</a>
                        </li>
                        <li className="header__contacts flex items-center modal-nav__element w-9/12 mt-8">
                            <img src={Location} width={24} alt="Изображение локации" />
                            <span className="ml-2">Вологда</span>
                        </li>
                        <li className="header__contacts flex items-center modal-nav__element w-9/12 mt-7">
                            <img src={Phone} width={24} alt="Изображение локации" />
                            <a href="tel:292022" className="ml-2">+7 (8172) 29-20-22</a>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="top-header flex justify-between items-center">
                <div className="flex items-center">
                    <button className="bg-transparent md:hidden" type="button" onClick={handleChangeNav}>
                        <img src={Burger}  width="30px" alt="выпадающее меню" />
                    </button>
                    <Link to="/" className="md:hidden company__name ml-2.5">МногоСуши</Link>
                    <Link to="/" className="hidden md:block">
                        <img src={Logo} width={150} height={150} alt="Логоти" />
                    </Link>
                </div>
                <button type="button" className="shopping__card relative">
                    <img src={Cart} alt="Корзина" width="32px" />
                    <span className="cart-item__counter rounded-full absolute top-0 right-0 px-1">0</span>
                </button>
            </div>
        </header>
    </>
    )
}