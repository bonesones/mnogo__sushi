import { Link } from "react-router-dom";

export default function ModalMenu({ active, setCategory }) {
  return (
    <div
      className={
        (active ? "" : "hidden ") + "modal-menu absolute z-30 p-4 rounded-lg"
      }
    >
      <ul
        className="grid grid-cols-2 gap-x-8 gap-y-6 w-fit"
        onClick={(e) => setCategory(e.target.dataset.id)}
      >
        <li>
          <Link to="/" className="category-list__btn" data-id="combo">
            Наборы
          </Link>
        </li>
        <li>
          <button className="category-list__btn" data-id="pizza">
            Пицца
          </button>
        </li>
        <li>
          <button className="category-list__btn" data-id="sushipizza">
            Сушипицца
          </button>
        </li>
        <li>
          <button className="category-list__btn" data-id="cream_rolls">
            Сливочные роллы
          </button>
        </li>
        <li>
          <button className="category-list__btn" data-id="maki">
            Маки
          </button>
        </li>
        <li>
          <button className="category-list__btn" data-id="cold_rolls">
            Холодные роллы
          </button>
        </li>
        <li>
          <button className="category-list__btn" data-id="baked_rolls">
            Запеченные роллы
          </button>
        </li>
        <li>
          <button className="category-list__btn" data-id="warm_rolls">
            Теплые роллы
          </button>
        </li>
        <li>
          <button className="category-list__btn" data-id="snacks">
            Закуски
          </button>
        </li>
        <li>
          <button className="category-list__btn" data-id="additional">
            Дополнительно
          </button>
        </li>
      </ul>
    </div>
  );
}
