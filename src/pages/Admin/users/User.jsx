import {Link} from "react-router-dom";
import {useState} from "react";
import api from "../../../services/api.js";

export default function User({ user, setUsers, setOpenModal }) {
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    const handleDelete = function () {
        setOpenDeleteModal(true)
    }

    const handleCancel = function () {
        setOpenDeleteModal(false)
    }

    сonst [loaded, setLoaded] = useState(true);

    const handleSubmitDelete = async function (e) {
        setLoaded(false)
        e.preventDefault();
        try {
            await api.delete(`/api/user/admin/delete/${user.id}`, {
                withCredentials: true,
            });

            setUsers((prev) => [
                ...prev.filter(({ id }) => id !== user.id),
            ]);
            setOpenModal(true);
            setTimeout(() => setOpenModal(false), 2000);
            setLoaded(true)
        } catch (e) {
            setLoaded(true)
            console.log(e);
        }
    };

    return (
        <div className="w-full">
            {openDeleteModal && (
                <div className="fixed  z-20 flex flex-col border-2 border-red-600 items-center gap-3 top-1/2 left-1/2 rounded-md -translate-x-1/2 -translate-y-1/2 bg-white w-5/6 md:w-120 px-6 py-4">
                    <p className="text-center">Вы точно хотите удалить пользователя?</p>
                    <form
                        className="flex flex-col gap-5 mt-4 mb-2"
                        onSubmit={(e) => handleSubmitDelete(e)}
                    >
                        <input
                            type="submit"
                            className="bg-second text-white px-12 py-2 rounded-md"
                            value="Да, удалить"
                            disabled={!loaded}
                        />
                        <button type="button px-12 py-2" onClick={handleCancel}>
                            Нет, я передумал
                        </button>
                    </form>
                </div>
            )}
            <div className="flex sm:grid sm:grid-cols-4 justify-between flex-col gap-1 sm:gap-x-3 md:gap-x-6">
                <div className="flex justify-between sm:justify-start flex-col sm:items-center gap-2 sm:gap-3">
                    <p>Имя</p>
                    <p className="break-all">{user.name ?? "Не указано"}</p>
                </div>
                <div className="flex justify-between sm:justify-start flex-col sm:items-center gap-2 sm:gap-3">
                    <p>Телефон</p>
                    <p>{user.phone}</p>
                </div>
                <div className="flex col-span-1 justify-between sm:justify-start flex-col sm:items-center gap-2 sm:gap-3">
                    <p>Почта</p>
                    <p className={"break-all"}>{user.email}</p>
                </div>
                <div className="flex justify-between sm:justify-start flex-col sm:items-center gap-2 sm:gap-3">
                    <p>Роль</p>
                    <p>{user.role === "ADMIN" ? "Администратор" : "Пользователь"}</p>
                </div>
            </div>
            <div className="flex flex-col">
                <div className="flex self-start gap-8 justify-center mt-4">
                    <button
                        type="button"
                        onClick={handleDelete}
                        className="bg-second px-4 py-1 rounded-md text-white"
                    >
                        Удалить
                    </button>
                    <Link to={`/admin/users/user_edit/${user.id}`}>Редактировать</Link>
                </div>
            </div>
        </div>
    )
}