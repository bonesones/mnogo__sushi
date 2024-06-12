import {useEffect, useRef, useState} from "react";
import {useForm} from "react-hook-form";
import InputMask from "react-input-mask";
import {useDispatch, useSelector} from "react-redux";
import {getUserInfo} from "../store/userPrivateSlice.js";
import axios from "axios";
import Loading from "../components/Loading.jsx";

export default function Contacts() {
  const literalsCounterRef = useRef(null);
  const [messageLength, setMessageLength] = useState(0);
  const [loaded, setLoaded] = useState(false)
  const [openModal, setOpenModal] = useState(false)


  const {
    register,
    handleSubmit,
    resetField,
    formState: { errors },
  } = useForm();

  const dispatch = useDispatch()
  const user = useSelector(state => state.userPrivate.user.personal)
  const isAuthenticated = useSelector(state => state.userPersist.user.isAuthenticated);
  useEffect(() => {
    const tryGetUser = async () => {
      try {
        const response = await dispatch(getUserInfo())
        if(response.error) {
          throw new Error(response.payload.response.status);
        }
        setLoaded(true)
      } catch(e) {
        if(e !== 500) {
          setLoaded(true)
        }
      }
    }
    tryGetUser()
  }, []);

  const handleMessageInput = function (e) {
    if (e.target.value.length >= 254) {
      if (!literalsCounterRef.current.classList.contains("text-red-600")) {
        literalsCounterRef.current.classList.add("text-red-600");
      }
    } else {
      if (literalsCounterRef.current.classList.contains("text-red-600")) {
        literalsCounterRef.current.classList.remove("text-red-600");
      }
    }
    setMessageLength(e.target.value.length);
  };

  const onSubmit = async function(data) {
    try {
      await axios.post('/api/callback/create', {
        name: data.name.trim(),
        phone: data.phone,
        message: data.message.trim()
      })
      setOpenModal(true)
      resetField("message")
      setTimeout(() => {
        setOpenModal(false)
      }, 2500)
    } catch(e) {
      console.log(e)
    }
  }


  if(!loaded) return <Loading />

  return (
    <div className="wrapper mx-auto">
      <h1 className="font-semibold text-3xl mt-24 text-center md:text-left">
        Контакты
      </h1>
      <section className="contacts">
        <iframe
          className="mt-16"
          src="https://yandex.ru/map-widget/v1/?um=constructor%3A1c3f39a5285b71b5150aaaa7723acb0e1bf6d47ab3fe617f116dc605c334dbae&amp;source=constructor"
          width="100%"
          height="400"
          frameBorder="0"
        ></iframe>
        <section className="contacts-data mt-16 flex flex-col md:flex-row md:justify-between w-full">
          <div className="md:w-2/4">
            <h2 className="font-semibold text-2xl text-center md:text-left">
              Обратная связь
            </h2>
            <form
              method="post"
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-wrap mt-8 flex-col gap-12 reply-form"
            >
                  <input
                      {...register("name", {
                        required: true
                      })}
                      type="text"
                      className="reply__input pb-1 font-medium text-black bg-inherit border-b border-black"
                      placeholder="Имя*"
                      defaultValue={(isAuthenticated && user.name) || ""}
                  />
                  <InputMask
                      {...register("phone", {
                        required: "Телефон не указан",
                        pattern: {
                          value: /^\+7\(\d{3}\)-\d{3}-\d{2}-\d{2}$/,
                          message: "Неверный формат телефона",
                        },
                      })}
                      defaultValue={isAuthenticated && user.phone}
                      mask="+7(999)-999-99-99"
                      type="tel"
                      name="phone"
                      alwaysShowMask={isAuthenticated}
                      className="reply__input pb-1 font-medium bg-inherit border-b border-black"
                  />
                  <div className="text-area-wrapper">
              <textarea
                  {...register('message', {
                    required: true,
                    maxLength: 254
                  })}
                  maxLength="254"
                  className="reply__input reply__textarea pb-1 h-24 font-medium text-base w-full block bg-inherit border-b border-black"
                  placeholder="Ваше сообщение*"
                  onChange={(e) => handleMessageInput(e)}
              />
                    <span
                        className="text-sm ml-auto block text-end mt-2"
                        ref={literalsCounterRef}
                    >
                {messageLength}/254
              </span>
                  </div>
                  {Object.keys(errors).length > 0 && <span className="text-red-600 text-center">Не все поля заполнены</span>}
                  {openModal &&
                      (<div className="fixed top-10 left-1/2 sm:text-lg -translate-x-1/2 bg-red-400 px-6 sm:px-10 w-fit rounded-md text-white py-5 sm:py-8">
                        Форма отправлена!
                      </div>)}
                  <input
                      type="submit"
                      value="Отправить"
                      className="w-fit px-10 py-1 self-start product-card__cart-btn reply__btn text-center bg-inherit rounded-lg font-medium hover:bg-second mx-auto sm:mx-0"
                  />
            </form>
          </div>
          <div className="mt-20 md:mt-0 mb-16 md:mb-0">
            <div className="flex flex-col items-center md:items-start">
              <h2 className="text-2xl font-semibold mb-6">Адрес</h2>
              <span>г. Вологда, ул. Ветошкина 84Б</span>
            </div>
            <div className="flex flex-col items-center md:items-start">
              <h2 className="text-2xl font-semibold mt-8 mb-6">Время работы</h2>
              <div className="flex flex-col items-center md:items-start gap-4">
                <span>Понедельник - Четверг: 12:00 - 22:00</span>
                <span>Пятница, Суббота: 12:00 - 00:00</span>
                <span>Воскресенье 12:00 - 22:00</span>
              </div>
            </div>
            <div className="flex flex-col items-center md:items-start">
              <h2 className="text-2xl font-semibold mt-8 mb-6">Телефоны</h2>
              <div className="flex flex-col gap-4">
                <a href="tel:78172292022">+7 (8172) 29-20-22</a>
                <a href="tel:79005602022">+7 900 560-20-22</a>
              </div>
            </div>
          </div>
        </section>
      </section>
    </div>
  );
}
