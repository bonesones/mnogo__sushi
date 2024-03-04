import React, { useRef, useState } from "react"
import Burger from "./../assets/burger-menu.png"
import Cart from "./../assets/shopping_cart.png"
import Logo from "./../assets/logo.png"
import Arrow from "./../assets/modal-arrow.png"
import Location from "./../assets/location.png"
import Phone from "./../assets/phone.png"

import { Link } from "react-router-dom"
import BackGround from "./BackGround"
import ModalMenu from "./ModalMenu"
import LogModal from "./LogModal"

export default function Header({ setCategory }) {

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

    const burgerMenu = useRef(null)

    const [isBurgerOpened, setIsBurgerOpened] = useState(false)
    const [isArrowTouched, setIsArrowTouched] = useState(false)
    const [isNavModalMenuActive, setIsNavModalMenuActive] = useState(false)
    const [isLogin, setIsLogin] = useState(true)
    const [isLogModalActive, setIsLogModalActive] = useState(false);
    
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

    const openLoginMenu = function() {
        return (
            1
        )
    }

    const handleChangeNav = function() {
        
        if(!isBurgerOpened) {

            burgerMenu.current.classList.remove('modal-nav_inactive')

            if(isArrowTouched) {
                handleOpenCloseArrowMenu()
            }

            document.body.className = "overflow-hidden"

            setIsBurgerOpened(prev => !prev)
        } else {

            burgerMenu.current.classList.add('modal-nav_inactive')

            document.body.className = ""

            setIsBurgerOpened(prev => !prev)

        }

    }
    return (
        <>
        <header className="py-3.5 md:py-0">
            <BackGround onClick={handleChangeNav} active={isBurgerOpened} />
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
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 0C7.02938 0 3 4.02938 3 9C3 11.1292 3.93825 13.0016 4.97662 14.625L11.388 23.6835C11.5286 23.8822 11.757 24 12 24C12.243 24 12.4714 23.8822 12.612 23.6835L19.0234 14.625C20.0156 13.2893 21 11.1292 21 9C21 4.02938 16.9706 0 12 0ZM12 14.25C9.1005 14.25 6.75 11.8995 6.75 9C6.75 6.1005 9.1005 3.75 12 3.75C14.8995 3.75 17.25 6.1005 17.25 9C17.25 11.8995 14.8995 14.25 12 14.25Z" fill="black"/>
                                <path d="M12 4.5C9.51487 4.5 7.5 6.51487 7.5 9C7.5 11.4851 9.51487 13.5 12 13.5C14.4851 13.5 16.5 11.4851 16.5 9C16.5 6.51487 14.4851 4.5 12 4.5ZM12 12.75C9.92887 12.75 8.25 11.0707 8.25 9C8.25 6.92925 9.92887 5.25 12 5.25C14.0711 5.25 15.75 6.92925 15.75 9C15.75 11.0707 14.0711 12.75 12 12.75Z" fill="black"/>
                            </svg>
                            <span className="ml-2">Вологда</span>
                        </li>
                        <li className="header__contacts flex items-center modal-nav__element w-9/12 mt-7">
                            <img src={Phone} width={24} alt="Изображение локации" />
                            <a href="tel:292022" className="ml-2">+7 (8172) 29-20-22</a>
                        </li>
                    </ul>
                </nav>
            </div>
            <div className="top-header flex justify-between items-center md:flex-col">
                <div className="the-top-header wrapper hidden md:block w-full text-sm py-2">
                    <ul className="flex items-center text-sm">
                        <li className="header__contacts flex items-center w-fit">                            
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 0C7.02938 0 3 4.02938 3 9C3 11.1292 3.93825 13.0016 4.97662 14.625L11.388 23.6835C11.5286 23.8822 11.757 24 12 24C12.243 24 12.4714 23.8822 12.612 23.6835L19.0234 14.625C20.0156 13.2893 21 11.1292 21 9C21 4.02938 16.9706 0 12 0ZM12 14.25C9.1005 14.25 6.75 11.8995 6.75 9C6.75 6.1005 9.1005 3.75 12 3.75C14.8995 3.75 17.25 6.1005 17.25 9C17.25 11.8995 14.8995 14.25 12 14.25Z" fill="white"/>
                                <path d="M12 4.5C9.51487 4.5 7.5 6.51487 7.5 9C7.5 11.4851 9.51487 13.5 12 13.5C14.4851 13.5 16.5 11.4851 16.5 9C16.5 6.51487 14.4851 4.5 12 4.5ZM12 12.75C9.92887 12.75 8.25 11.0707 8.25 9C8.25 6.92925 9.92887 5.25 12 5.25C14.0711 5.25 15.75 6.92925 15.75 9C15.75 11.0707 14.0711 12.75 12 12.75Z" fill="white"/>
                            </svg>
                            <span className="ml-2">Вологда</span>
                        </li>
                        <li className="header__contacts flex items-center w-fit ml-8">
                            <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.125 5.5C3.125 14.0604 10.3537 21 19.2708 21C19.6731 21 20.072 20.9859 20.467 20.9581C20.9202 20.9262 21.1468 20.9103 21.3531 20.7963C21.524 20.7019 21.6859 20.5345 21.7716 20.364C21.875 20.1582 21.875 19.9181 21.875 19.438V16.6207C21.875 16.2169 21.875 16.015 21.8057 15.842C21.7447 15.6891 21.6453 15.553 21.5166 15.4456C21.3708 15.324 21.1731 15.255 20.7779 15.117L17.4375 13.9509C16.9776 13.7904 16.7476 13.7101 16.5295 13.7237C16.3371 13.7357 16.152 13.7988 15.9947 13.9058C15.8164 14.0271 15.6905 14.2285 15.4387 14.6314L14.5833 16C11.823 14.7999 9.58531 12.6489 8.33333 10L9.75899 9.17882C10.1786 8.93713 10.3884 8.81628 10.5148 8.64506C10.6262 8.49408 10.692 8.31637 10.7045 8.1317C10.7186 7.92227 10.635 7.70153 10.4678 7.26005L9.25311 4.05321C9.10937 3.67376 9.03751 3.48403 8.91085 3.3441C8.79897 3.22049 8.65718 3.12515 8.49794 3.06645C8.31767 3 8.10737 3 7.68679 3H4.75209C4.25196 3 4.00189 3 3.78748 3.09925C3.6099 3.18146 3.43556 3.33701 3.33719 3.50103C3.21842 3.69907 3.20182 3.91662 3.16864 4.35173C3.13972 4.73086 3.125 5.11378 3.125 5.5Z" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <a href="tel:292022" className="w-fit ml-2">+7 (8172) 29-20-22</a>
                        </li>
                        <li className="w-9/12 md:w-fit mt-7 md:mt-0 flex items-center md:ml-auto">                                
                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_538_2177)">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M12 12C9.3528 12 7.2 9.8472 7.2 7.2C7.2 4.5528 9.3528 2.4 12 2.4C14.6472 2.4 16.8 4.5528 16.8 7.2C16.8 9.8472 14.6472 12 12 12ZM16.5096 12.8076C18.1488 11.4888 19.2 9.468 19.2 7.2C19.2 3.2232 15.9768 0 12 0C8.0232 0 4.8 3.2232 4.8 7.2C4.8 9.468 5.85121 11.4888 7.49041 12.8076C3.09961 14.4576 0 18.534 0 24H2.4C2.4 18 6.7068 14.4 12 14.4C17.2932 14.4 21.6 18 21.6 24H24C24 18.534 20.9004 14.4576 16.5096 12.8076Z" fill="white"/>
                                </g>
                                <defs>
                                    <clipPath id="clip0_538_2177">
                                        <rect width="24" height="24" fill="white"/>
                                    </clipPath>
                                </defs>
                            </svg>
                                <button type='button' className="ml-2" onClick={() => setIsLogModalActive(true)}>Личный кабинет</button>
                                {isLogModalActive && <LogModal isLogin={isLogin} setIsLogin={setIsLogin} /> }
                                <BackGround active={isLogModalActive} onClick={() => setIsLogModalActive(false)} />
                        </li>
                    </ul>
                </div>
                <div className="flex items-center w-full wrapper md:py-4">
                    <button className="bg-transparent md:hidden" type="button" onClick={handleChangeNav}>
                        <img src={Burger}  width="30px" alt="выпадающее меню" />
                    </button>
                    <Link to="/" className="md:hidden company__name ml-2.5">МногоСуши</Link>
                    <Link to="/" className="hidden md:block">
                        <img src={Logo} width={150} height={150} alt="Логотип" />
                    </Link>
                    <nav className="w-7/12 ml-10 hidden md:block">
                        <ul className="flex justify-start gap-16 font-medium">
                            <li className="relative">
                                <Link to="/">
                                    Меню
                                </Link>
                            </li>
                            <li>
                                <Link to="/delivery">
                                    Доставка
                                </Link>
                            </li>
                            <li>
                                <Link to="/contacts">
                                    Контакты
                                </Link>
                            </li>
                            <li>
                                <Link to="/promo">
                                    Акции
                                </Link>
                            </li>
                            <li>
                                <Link to="/help">
                                    Помощь
                                </Link>
                            </li>
                        </ul>
                    </nav>
                    <button type="button" className="lg:hidden shopping__card relative ml-auto">
                        <img src={Cart} alt="Корзина" width="32px" />
                        <span className="cart-item__counter rounded-full absolute top-0 right-0 px-1">0</span>
                    </button>
                    <Link to="/cart" className="hidden lg:flex shopping__card relative ml-auto items-center gap-2">
                        <div className="relative">
                            <img src="/cart_desktop.png" alt="Корзина" width="42px" />
                            <span className="cart-item__counter rounded-full absolute top-0 right-0 px-1">0</span>
                        </div>
                        <span>Корзина</span>
                    </Link> 
                </div>
            </div>
        </header>
    </>
    )
}