import {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import axios from "axios";
import Select from 'react-select'

export default function Order({ order }) {
    const [orderOpened, setOrderOpened] = useState(false);
    const [orderStatus, setOrderStatus] = useState(order.status)
    const [showSaveBtn, setShowSaveBtn] = useState(false)
    const [openModal, setOpenModal] = useState(false)

    const handleOpenCloseOrder = function () {
        setOrderOpened((prev) => !prev);
    };

    const options = [
        {
            value: "Новый",
            label: "Новый",
            isDisabled: true,
        },
        {
            value: "Принят в работу",
            label: "Принят в работу",
        },
        {
            value: "Передан курьеру",
            label: "Передан курьеру",
        },
        {
            value: "Выдан",
            label: "Выдан",
        },
        {
            value: "Отменен",
            label: "Отменен"
        }
    ]

    const changeOrderStatus = async function () {
        try {
            const response = await axios.put(`/api/order/admin/update/${order.id}`, {
                status: orderStatus
            }, {
                withCredentials: true
            })
            setOpenModal(true)
            setTimeout(() => setOpenModal(false), 2000)
        } catch(e) {
            console.log(e)
        }
    }

    const handleChangeOrderStatus = function (e) {
        setOrderStatus(e.value)
        setShowSaveBtn(true)
    }

    const handleSubmit = async function () {
        await changeOrderStatus()
    }

    const handleCancel = function () {
        setOrderStatus(order.status)
        setShowSaveBtn(false);
    }



    return (
        <div className="w-full">
            <div className="w-full flex-col border-t-2 pt-6 lg:ml-8 lg:mr-8">
                <div className="grid grid-cols-[1fr,2fr] gap-y-2 gap-x-2 md:hidden">
                    <span
                        className="mb-6 bg-[#F35E62] text-white py-0.5 px-1 rounded-sm text-center">Статус заказа</span>
                    {order.status !== "Выдан" ? (
                        <Select className="text-lg font-medium ml-2" onChange={(e) => handleChangeOrderStatus(e)} options={options} value={{
                            value: orderStatus,
                            label: orderStatus,
                        }} />)
                        : (
                            <span className="text-lg font-medium">{order.status}</span>
                        )}
                    <span>Дата заказа</span>
                    <span className="text-lg font-medium">
                        {new Date(order.createdAt).toLocaleDateString("ru")}
                    </span>
                    {order.in_time && (
                        <>
                            <span>Приготовить к</span>
                            <span className="text-lg font-medium">
                                {order.ready_hour + ":" + order.ready_minutes}
                            </span>
                        </>
                    )}
                    <span>Время заказа</span>
                    <span className="text-lg font-medium">
                        {new Date(order.createdAt).getHours() + ":" + (new Date(order.createdAt).getMinutes() < 10 ? "0" + new Date(order.createdAt).getMinutes() : new Date(order.createdAt).getMinutes())}
                    </span>
                    <span>Адрес</span>
                    <span className="text-lg">
                        {order.is_delivery ?
                            ("ул. " + order.street_house + ", под. " + order.entrance + ', эт. ' + order.floor + ", кв. " + order.room)
                            : "Самовывоз"}
                    </span>
                    <span>Сумма</span>
                    <span className="text-lg font-medium">{order.amount} ₽</span>
                    <span>Номер заказа</span>
                    <span className="text-lg font-medium">{order.id}</span>
                    {order.name && (
                        <>
                            <span>Имя</span>
                            <span className="text-lg font-medium">{order.name}</span>
                        </>
                    )}
                    <span>Телефон</span>
                    <a href={"tel:" + order.phone} className="text-lg font-medium">{order.phone}</a>
                    {order.comment && (
                        <>
                            <span>Комментарий</span>
                            <span className="text-lg font-medium max-w-44">{order.comment}</span>
                        </>
                    )}
                    {showSaveBtn && (
                        <>
                            <button type="button" onClick={handleSubmit} className="bg-second text-white py-2 rounded-md mt-5">
                                Сохранить
                            </button>
                            <button type="button" onClick={handleCancel} className="py-2 w-24 mt-5 place-self-center">
                                Отменить
                            </button>
                        </>
                    )}
                    {openModal &&
                        (<div className="fixed top-10 left-1/2 sm:text-lg -translate-x-1/2 bg-red-400 px-6 sm:px-10 w-fit rounded-md text-white py-5 sm:py-8">
                            Статус заказа изменен!
                        </div>)}
                    <button
                        type="button"
                        className="order__arrow w-12 mt-4 cursor-pointer"
                        onClick={handleOpenCloseOrder}
                    >
                        <img
                            className={
                                (orderOpened ? "order__arrow_rotate " : "") +
                                "transition-transform"
                            }
                            src="/ArrowNav.svg"
                            alt="Раскрыть меню"
                        />
                    </button>
                </div>
                <div className="hidden md:grid grid-cols-[1fr,2fr,1fr,1fr] gap-x-4 gap-y-6 lg:ml-4">
                    <span>Дата заказа</span>
                    <span>Адрес</span>
                    <span>Сумма</span>
                    <span>Номер заказа</span>
                    <span className="text-lg font-medium">
                        11.02.2024
                      </span>
                    <span className="text-lg font-medium">
                        Ветошкина 86Б
                      </span>
                    <span className="text-lg font-medium">1200 ₽</span>
                    <span className="text-lg font-medium">11</span>
                    <button
                        type="button"
                        className="order__arrow w-12 mt-4 cursor-pointer"
                        onClick={handleOpenCloseOrder}
                    >
                        <img
                            className={
                                (orderOpened ? "order__arrow_rotate " : "") +
                                "transition-transform"
                            }
                            src="/ArrowNav.svg"
                            alt="Раскрыть меню"
                        />
                    </button>
                </div>
                <div
                    className={
                        (orderOpened
                            ? "flex flex-col bg-gray-200  rounded-md p-4 "
                            : "hidden ") + "popup-order mt-6 mb-10"
                    }
                >
                    <div className="flex gap-8 flex-wrap">
                        <span>
                          Оплата: Наличными
                        </span>
                    </div>
                    {/* Сделать для каждого товара в заказе */}
                    <div
                        className="flex flex-col sp:flex-row gap-2 justify-between mt-6"
                    >
                        <span className="font-medium">МногоМяса <br/> 2 шт.</span>
                        <div className="flex items-center">
                            <span className="mr-7 font-medium">1200 ₽</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
