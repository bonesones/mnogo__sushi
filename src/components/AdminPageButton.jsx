import { Link } from "react-router-dom";

export default function AdminPageButton({ title, link, activePath }) {
  return (
    <li className="text-center">
      <Link
        to={"/admin/" + link}
        className={
          (link === activePath ? "bg-second text-white " : "bg-gray-200 ") +
          "py-4 px-3 rounded-md w-full inline-block"
        }
      >
        {title}
      </Link>
    </li>
  );
}
