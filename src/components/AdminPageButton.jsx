import {Link} from "react-router-dom";

export default function AdminPageButton ({ title, link, id, activeId, onClick }) {
    return (
       <li className="text-center">
            <Link to={"/admin" + link} className={(id === activeId ? "bg-second text-white " : "bg-gray-200 ") + "py-4 px-3 rounded-md w-full inline-block"} onClick={() => onClick(id)} >
                {title}
            </Link>
       </li>
    )
}