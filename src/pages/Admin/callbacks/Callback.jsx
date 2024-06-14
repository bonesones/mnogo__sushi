import Select from "react-select";
import {useState} from "react";
import axios from "axios";

export default function Callback ({ callback, options }) {

    const [currentOption, setCurrentOption] = useState({
        value: callback.status,
        label: callback.status
    })
    const [currentStatus, setCurrentStatus] = useState(callback.status)
    const [isEditing, setEditing] = useState(false)
    const [openModal, setOpenModal] = useState(false)


    const handleChangeStatus = (e) => {
        setCurrentOption({
            value: e.value,
            label: e.label,
        })
        setEditing(true)
    }

    const handleCancel = function () {
        setEditing(false)
        setCurrentOption({
            value: callback.status,
            label: callback.status
        })
    }

    const handleSubmit = async function () {
        try {
            const response = await axios.put(`/api/callback/update/${callback.id}`, {
                status: currentOption.value,
            }, {
                withCredentials: true,
            })
            setCurrentStatus(response.data.status)
            setEditing(false)
            setOpenModal(true)
            setTimeout(() => setOpenModal(false), 2000)
        } catch(e) {
            console.log(e)
        }
    }

    return (
        <div key={callback.id} className="flex flex-col border-2 gap-4 p-10 border-red-500 rounded-md">
            <div className="flex flex-col md:flex-row md:w-full justify-between md:items-center gap-4">
                <div className="flex gap-2 items-center">
                    <span className="bg-second px-2 py-1 rounded-md text-white">Статус</span>
                    {currentStatus === "Новая" ? (
                        <Select options={options} className="w-44" value={currentOption}
                                onChange={(e) => handleChangeStatus(e)}/>
                    ) : (
                        <span className="w-44">{currentStatus}</span>
                    )}
                </div>
                <span>Дата заявки: {new Date(callback.createdAt).toLocaleDateString("ru")}</span>
                <div className="flex flex-col gap-2">
                    <span>Имя: {callback.name}</span>
                    <span>Телефон: <a className="font-medium" href={"tel:" + callback.phone}>{callback.phone}</a></span>
                </div>
            </div>
            <div>
                <span className="leading-8">Сообщение: {callback.message}</span>
                {isEditing && (
                    <div>
                        <button
                            type="button"
                            onClick={handleSubmit}
                            className="bg-second text-white py-2 rounded-md px-2 mt-5"
                        >
                            Сохранить
                        </button>
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="py-2 w-24 mt-5 place-self-center"
                        >
                            Отменить
                        </button>
                    </div>
                )}
                {openModal && (
                    <div className="fixed top-10 left-1/2 sm:text-lg -translate-x-1/2 bg-red-400 px-6 sm:px-10 w-fit rounded-md text-white py-5 sm:py-8">
                        Статус заявки изменен!
                    </div>
                )}
            </div>
        </div>
    )
}