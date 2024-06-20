import {useEffect, useState} from "react";
import api from "../../../services/api.js";
import Loading from "../../../components/Loading.jsx";
import User from "./User.jsx";
import {Link} from "react-router-dom";

export default function Users () {

    const [users, setUsers] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await api.get('/api/user/admin/getall', {
                    withCredentials: true
                })
                setUsers(response.data.users);
            } catch(e) {
                console.log(e)
            }
        }
        fetchUsers().finally(() => {
            setLoaded(true)
        })
    }, []);

    if(!loaded) return <Loading />;

    return (
        <div className="mt-16 mb-16 flex flex-col items-center">
            {openModal && (
                <div className="fixed z-10 top-10 left-1/2 sm:text-lg -translate-x-1/2 bg-red-400 px-6 sm:px-10 w-fit rounded-md text-white py-5 sm:py-8">
                    Пользователь удалена!
                </div>
            )}
            <h2 className="text-2xl font-semibold">Пользователи</h2>
            <Link
                to="/admin/users/create_user"
                className="mt-12 bg-second text-white px-5 py-1 rounded-md"
            >
                Создать пользователя
            </Link>
            <div className="flex flex-col items-center gap-10 mt-12">
                {users?.length > 0 && users.map(user => <User key={user.id} setUsers={setUsers} setOpenModal={setOpenModal} user={user} />)}
            </div>
        </div>
    )
}