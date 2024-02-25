import { Link } from "react-router-dom"

export default function ModalMenu ({ active }) {
    return (
        <div className={(active ? "" : "hidden ") + "modal-menu absolute z-30 p-4 rounded-lg"}>
            <ul className="grid grid-cols-2 gap-x-8 gap-y-6 w-fit">
                <li>
                    <Link to="/">
                        Наборы
                    </Link>
                </li>
                <li>
                    <Link to="/">
                        Пицца
                    </Link>
                </li>
                <li>
                    <Link to="/">
                        Сушипицца
                    </Link>
                </li>
                <li>
                    <Link to="/">
                        Сливочные роллы
                    </Link>
                </li>
                <li>
                    <Link to="/">
                        Маки
                    </Link>
                </li>
                <li>
                    <Link to="/">
                        Холодные роллы
                    </Link>
                </li>
                <li>
                    <Link to="/">
                        Запеченные роллы
                    </Link>
                </li>
                <li>
                    <Link to="/">
                        Теплые роллы
                    </Link>
                </li>
                <li>
                    <Link to="/">
                        Закуски
                    </Link>
                </li>
                <li>
                    <Link to="/">
                        Дополнительно
                    </Link>
                </li>
            </ul>
        </div>
    )
}