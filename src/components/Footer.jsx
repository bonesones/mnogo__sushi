import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCategories, setActive } from "../store/categoriesSlice.js";
import { useEffect, useState } from "react";

export default function Footer() {
  const handleClick = function (id) {
    dispatch(setActive(id));
    window.scrollTo(0, 0);
  };

  const categories = useSelector((state) => state.categories.categories);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    dispatch(getCategories());
    setLoading(false);
  }, []);
  const dispatch = useDispatch();

  if (loading) {
    return null;
  }

  return (
    <footer className="hidden md:block bottom-0 border-t py-10 mt-44 text-white bg-[#F35E62]">
      <div className="grid grid-cols-2 wrapper mx-auto">
        <div>
          <span className="footer__title font-semibold text-xl">Меню</span>
          <ul className="grid grid-cols-2 mt-10 gap-y-3 font-medium opacity-70">
            {categories.map(({ id, name }) => (
              <li key={id}>
                <Link to="/" onClick={() => handleClick(id)}>
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col justify-between row-span-2 justify-self-end lg:justify-self-start">
          <div className="font-semibold text-xl col grid grid-cols-2 lg:flex h-fit gap-y-6 lg:gap-10 gap-x-10">
            <Link to="/promo">Акции</Link>
            <Link to="/help">Помощь</Link>
            <Link to="/contacts">Контакты</Link>
            <Link to="/delivery">Доставка</Link>
          </div>
          <a href="https://vk.com/mnogosushi35" className="cursor-pointer">
            <svg
              width="50"
              height="50"
              viewBox="0 0 50 50"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 4C6.25048 4 4 6.25048 4 9V41C4 43.7495 6.25048 46 9 46H41C43.7495 46 46 43.7495 46 41V9C46 6.25048 43.7495 4 41 4H9ZM9 6H41C42.6685 6 44 7.33152 44 9V41C44 42.6685 42.6685 44 41 44H9C7.33152 44 6 42.6685 6 41V9C6 7.33152 7.33152 6 9 6ZM23.3965 15.9922C22.339 15.9898 21.3961 16.0489 20.5527 16.4629L20.5508 16.4648C20.1396 16.6674 19.8499 16.9247 19.6191 17.2305C19.5038 17.3834 19.3856 17.5206 19.3223 17.8691C19.2906 18.0434 19.2728 18.3258 19.4551 18.6309C19.6373 18.9359 20.0038 19.1094 20.2383 19.1406C20.4012 19.1623 20.7688 19.3188 20.8027 19.3652L20.8047 19.3691C20.8047 19.3691 20.9473 19.7411 20.9883 20.0723C21.0293 20.4034 21.0273 20.6719 21.0273 20.6719C21.0269 20.6986 21.0276 20.7253 21.0293 20.752C21.0293 20.752 21.0872 21.6195 21.0488 22.5156C21.0335 22.8728 20.9873 23.1905 20.9395 23.4746C20.5833 23.0814 20.0586 22.3695 19.3008 21.0566C18.4601 19.5994 17.791 18.293 17.791 18.293C17.7559 18.1791 17.6316 17.825 17.1465 17.4688C16.6162 17.0779 16.1035 17.0195 16.1035 17.0195C16.0392 17.0066 15.9738 17.0001 15.9082 17L11.9668 17.002C11.9668 17.002 11.7305 16.9883 11.4473 17.0273C11.1641 17.0664 10.7376 17.0982 10.3262 17.5859L10.3242 17.5879C9.95653 18.0272 9.97877 18.5128 10.0234 18.7871C10.0681 19.0614 10.168 19.2695 10.168 19.2695C10.1699 19.2734 10.1718 19.2774 10.1738 19.2812C10.1738 19.2812 13.3977 26.0595 17.041 30.0508C19.6867 32.9488 22.4022 32.998 24.6426 32.998H26.3145C26.7413 32.998 27.1274 32.9814 27.5547 32.7324C27.982 32.4835 28.2695 31.8774 28.2695 31.457C28.2695 31.0165 28.3353 30.6702 28.416 30.4922C28.4728 30.367 28.5177 30.3219 28.5879 30.2852C28.6027 30.2946 28.5931 30.2891 28.6348 30.3184C28.8012 30.4354 29.0761 30.7023 29.375 31.0352C29.9728 31.7009 30.6513 32.614 31.5625 33.2402C32.2153 33.6892 32.832 33.8886 33.3008 33.9609C33.5945 34.0063 33.8226 33.9975 33.9844 33.9844L37.7188 34C37.7409 34.0001 37.7631 33.9994 37.7852 33.998C37.7852 33.998 38.4286 34.0055 39.0977 33.6055C39.4322 33.4054 39.8267 33.0261 39.9551 32.4727C40.0834 31.9192 39.9221 31.3457 39.6074 30.8223V30.8203C39.6621 30.9109 39.5579 30.7247 39.4512 30.5508C39.3444 30.3768 39.1894 30.1424 38.9668 29.8516C38.5217 29.2699 37.8087 28.4559 36.6562 27.3828H36.6543C36.069 26.8382 35.6737 26.4527 35.5117 26.2383C35.3497 26.0239 35.4029 26.1365 35.4141 26.082C35.4365 25.9731 36.139 24.9597 37.5684 23.0508C38.4372 21.8889 39.047 21.0166 39.4492 20.291C39.8514 19.5655 40.1414 18.9371 39.9395 18.168L39.9375 18.1641C39.8479 17.8264 39.603 17.5152 39.3516 17.3457C39.1001 17.1762 38.8617 17.1099 38.6484 17.0684C38.2218 16.9854 37.8496 17 37.5039 17C36.7791 17 33.5635 17.0254 33.2988 17.0254C32.9861 17.0254 32.469 17.1676 32.2402 17.3047C31.6651 17.6508 31.5 18.1055 31.5 18.1055C31.4896 18.1247 31.4798 18.1442 31.4707 18.1641C31.4707 18.1641 30.8074 19.635 29.9531 21.0879C29.0877 22.5616 28.4484 23.2645 28.0625 23.5898C28.0519 23.532 28.0537 23.579 28.0469 23.498C28.0123 23.0865 28.0508 22.5178 28.0508 21.9629C28.0508 20.4684 28.1775 19.4224 28.1094 18.498C28.0753 18.0359 27.9897 17.5593 27.6855 17.1211C27.3814 16.6829 26.8752 16.3982 26.375 16.2773C26.0748 16.2049 25.7327 16.0166 24.4941 16.0039H24.4922C24.1134 16.0001 23.749 15.993 23.3965 15.9922ZM24.4727 18.0039C25.5686 18.0152 25.2956 18.0755 25.9043 18.2227C26.0931 18.2683 26.0473 18.268 26.043 18.2617C26.0386 18.2554 26.094 18.3585 26.1152 18.6465C26.1577 19.2224 26.0508 20.3674 26.0508 21.9629C26.0508 22.398 25.9983 23.0188 26.0527 23.666C26.1071 24.3132 26.2677 25.1438 27.041 25.6445C27.4076 25.8822 27.8333 25.8971 28.1973 25.8066C28.5613 25.7161 28.8915 25.5277 29.2383 25.25C29.9318 24.6947 30.7054 23.7575 31.6777 22.1016C32.5865 20.5559 33.2476 19.084 33.2695 19.0352C33.2738 19.0317 33.2782 19.0293 33.2832 19.0254C33.2957 19.0255 33.2828 19.0254 33.2988 19.0254C33.6722 19.0254 36.8287 19 37.5039 19C37.6615 19 37.7189 19.0095 37.8438 19.0137C37.8098 19.1269 37.8475 19.0547 37.6992 19.3223C37.3881 19.8835 36.8149 20.7175 35.9668 21.8516C34.5732 23.7127 33.7094 24.442 33.4551 25.6777C33.3279 26.2956 33.5662 26.9805 33.916 27.4434C34.2658 27.9062 34.7073 28.3027 35.293 28.8477C36.3775 29.8576 37.0138 30.5913 37.3789 31.0684C37.5615 31.3069 37.6765 31.4792 37.748 31.5957C37.8196 31.7122 37.8019 31.6999 37.8945 31.8535C37.9555 31.9557 37.933 31.8933 37.9434 31.9238C37.8235 31.9576 37.6782 31.9983 37.6699 32L33.9922 31.9844C33.9259 31.9843 33.8599 31.9909 33.7949 32.0039C33.7949 32.0039 33.8041 32.0147 33.6074 31.9844C33.4107 31.954 33.0978 31.8689 32.6953 31.5918C32.2096 31.258 31.5295 30.4412 30.8633 29.6992C30.5302 29.3282 30.1979 28.9719 29.7852 28.6816C29.3724 28.3914 28.7547 28.1184 28.0879 28.3281C27.3957 28.5455 26.8568 29.0857 26.5938 29.666C26.3979 30.098 26.382 30.5492 26.3516 30.998C26.3184 31.0005 26.3566 30.998 26.3145 30.998H24.6426C22.3709 30.998 20.7579 31.1552 18.5176 28.7012C15.5041 25.3998 12.7431 19.907 12.293 19.002L15.7617 19C15.8227 19.0234 15.9532 19.0724 15.9609 19.0781L15.9648 19.082C15.838 18.9894 15.9707 19.1191 15.9707 19.1191C15.9829 19.1491 15.9966 19.1784 16.0117 19.207C16.0117 19.207 16.699 20.5498 17.5684 22.0566C18.4211 23.5338 19.0425 24.4566 19.6426 25.0664C19.9426 25.3713 20.2455 25.6158 20.6504 25.7539C21.0552 25.892 21.578 25.8413 21.9297 25.6484C22.6481 25.2552 22.7446 24.6751 22.8613 24.168C22.9782 23.6601 23.0247 23.1191 23.0469 22.6016C23.0899 21.597 23.029 20.7275 23.0254 20.6738C23.0256 20.655 23.0302 20.2924 22.9727 19.8281C22.9138 19.3527 22.8481 18.7714 22.418 18.1855L22.416 18.1836C22.413 18.1795 22.4093 18.1798 22.4062 18.1758C22.975 18.0942 23.4617 17.9938 24.4727 18.0039ZM33.2949 18.9844L33.2812 19.0156C33.2791 19.0168 33.2798 19.0142 33.2773 19.0156C33.2816 19.0076 33.2949 18.9844 33.2949 18.9844Z"
                fill="white"
              />
            </svg>
          </a>
        </div>
        <span className="opacity-70 mt-12 inline-block">
          МногоСуши © 2021-2024 ИП “Потапов Денис Валерьевич”.
        </span>
      </div>
    </footer>
  );
}
