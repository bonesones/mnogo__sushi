import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import api from "../../../services/api.js";
import Loading from "../../../components/Loading.jsx";
import {useForm} from "react-hook-form";
import InputMask from "react-input-mask";
import Select from "react-select";

export default function UserForm() {
    const [error, setError] = useState('')
    const [loaded, setLoaded] = useState(true)
    const [openModal, setOpenModal] = useState(false);

    const roleOptions = [
        {
            value: "ADMIN",
            label: "Администратор"
        },
        {
            value: "USER",
            label: "Пользователь"
        }
    ]

    const [userRole, setUserRole] = useState(roleOptions[1]);

    const {
        register,
        handleSubmit,
        getValues,
        formState: { errors },
    } = useForm();


    useEffect(() => {
        document.title = "МногоСуши | Редактирование пользователя";
    }, []);

    const onSubmit = async function(data) {
        setLoaded(false)
        try {
            await api.post(`/api/user/admin/create/`, {
                email: data.email,
                password: data.password,
                submit_password: data.submit_password,
                role: userRole.value,
                phone: data.phone
            }, {
                withCredentials: true
            })
            setLoaded(true)
            setOpenModal(true);
            setTimeout(() => { setOpenModal(false); }, 2000);
        } catch (e) {
            console.log(e)
            setLoaded(true)
            setError(e.response?.data?.message)
        }
    }

    if(!loaded) return <Loading />

    return (
        <div className="mt-16 mb-16 flex flex-col items-center">
            {openModal && (
                <div className="fixed top-10 left-1/2 sm:text-lg -translate-x-1/2 bg-red-400 px-6 sm:px-10 w-fit rounded-md text-white py-5 sm:py-8">
                    Пользователь создан!
                </div>
            )}
            <div className="w-full flex gap-4 mb-12 font-medium">
                <Link to="/admin/users">Пользователи</Link>><span>Создать пользователя</span>
            </div>
            <h2 className="text-2xl font-semibold">Создание пользователя</h2>
            <form
                action=""
                method="POST"
                onSubmit={handleSubmit(onSubmit)}
                className="profile-modal-form flex flex-col gap-3 items-center mt-12"
            >
                <label htmlFor="email" className="self-start">
                    Почта
                </label>
                <input
                    {...register("email", {
                        required: "Почта не указана",
                        pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: "Неверный формат почты",
                        },
                    })}
                    type="email"
                    name="email"
                    placeholder="example@email.com"
                    className="text-lg text-black bg-inherit px-5 py-1.5 border-2 border-[#A1947C] rounded-md pl-4 w-full"
                />
                {errors.email && (
                    <span className="text-red-600 self-start">
            {errors.email.message}
          </span>
                )}
                <label htmlFor="email" className="self-start">
                    Телефон
                </label>
                <InputMask
                    {...register("phone", {
                        required: "Телефон не указан",
                        pattern: {
                            value: /^\+7\(\d{3}\)-\d{3}-\d{2}-\d{2}$/,
                            message: "Неверный формат телефона",
                        },
                    })}
                    mask="+7(999)-999-99-99"
                    type="tel"
                    name="phone"
                    className="text-lg text-black bg-inherit px-5 py-1.5 border-2 border-[#A1947C] rounded-md pl-4 w-full"
                />
                {errors.phone && (
                    <span className="text-red-600 self-start">
            {errors.phone.message}
          </span>
                )}
                <p className="self-start">
                    Роль
                </p>
                <Select options={roleOptions}
                        value={userRole}
                        onChange={(e) => setUserRole(e)}
                        className='w-full'
                />
                <label htmlFor="password" className="self-start">
                    Пароль
                </label>
                <input
                    {...register("password", {
                        required: "Пароль не может быть пустым",
                        minLength: {
                            value: 8,
                            message: "Пароль не может быть меньше 8 символов",
                        },
                    })}
                    type="password"
                    name="password"
                    className="text-black text-lg bg-inherit px-5 py-1.5  border-2 border-[#A1947C] rounded-md pl-4 w-full"
                />
                {errors.password && (
                    <span className="text-red-600 self-start">
            {errors.password.message}
          </span>
                )}
                <label htmlFor="submit_password" className="self-start">
                    Подтвердите пароль
                </label>
                <input
                    {...register("submit_password", {
                        validate: (value) =>
                            value === getValues("password") || "Пароли не совпадают",
                    })}
                    type="password"
                    name="submit_password"
                    className="text-black text-lg bg-inherit px-5 py-1.5  border-2 border-[#A1947C] rounded-md pl-4 w-full"
                />
                {errors.submit_password && (
                    <span className="text-red-600 self-start">
            {errors.submit_password.message}
          </span>
                )}
                {error && (
                    <span className="text-red-600 self-center text-center">{error}</span>
                )}
                <input
                    type="submit"
                    value="Создать пользователя"
                    className="border bg-[#F35E62] text-white w-fit py-1.5 px-10 rounded-md rounded-tl-md hover:cursor-pointer mt-12"
                />
            </form>
        </div>
    )
}