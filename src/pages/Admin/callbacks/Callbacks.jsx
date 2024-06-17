import { useEffect, useState } from "react";
import Loading from "../../../components/Loading.jsx";
import axios from "axios";
import Select from "react-select";
import Callback from "./Callback.jsx";

export default function Callbacks() {
  const [callbacks, setCallbacks] = useState([]);
  const [filteredCallbacks, setFilteredCallbacks] = useState([]);
  const [loaded, setLoaded] = useState(false);

  const [filterCurrentOption, setFilterCurrentOption] = useState({
    label: "Все",
    value: "Все",
  });

  useEffect(() => {
    document.title = "МногоСуши | Обратная связь";
    const fetchCallbacks = async () => {
      try {
        const response = await axios.get("/api/callback/getall", {
          withCredentials: true,
        });
        setCallbacks(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCallbacks().finally(() => {
      setLoaded(true);
    });
  }, []);

  const options = [
    {
      value: "Новая",
      label: "Новая",
      isDisabled: true,
    },
    {
      value: "Обработана",
      label: "Обработана",
    },
  ];

  const filterOptions = [
    {
      value: "Все",
      label: "Все",
    },
    {
      value: "Новая",
      label: "Новая",
    },
    {
      value: "Обработана",
      label: "Обработана",
    },
  ];

  const handleFilter = function (e) {
    setFilterCurrentOption({
      label: e.label,
      value: e.value,
    });
  };

  useEffect(() => {
    if (filterCurrentOption.value === "Все") {
      setFilteredCallbacks(callbacks);
    } else {
      setFilteredCallbacks([
        ...callbacks.filter(
          (callback) => callback.status === filterCurrentOption.value,
        ),
      ]);
    }
  }, [filterCurrentOption, callbacks]);

  if (!loaded) return <Loading />;

  return (
    <div className="mt-16 flex flex-col items-center">
      <h2 className="text-2xl font-semibold">Заявки обратной связи</h2>
      <div className="mt-12 mb-12 w-full">
        <div className="flex items-center gap-4 mb-6">
          <span>Фильтровать по: </span>
          <Select
            options={filterOptions}
            value={filterCurrentOption}
            onChange={(e) => handleFilter(e)}
            className="w-44"
          />
        </div>
        <div className="flex flex-col gap-6">
          {filteredCallbacks.map((callback) => (
            <Callback key={callback.id} callback={callback} options={options} />
          ))}
        </div>
      </div>
    </div>
  );
}
