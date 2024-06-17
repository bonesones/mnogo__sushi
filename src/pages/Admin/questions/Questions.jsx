import {useEffect, useState} from "react";
import axios from "axios";
import Loading from "../../../components/Loading.jsx";
import Question from "./Question.jsx";

export default function Questions() {

    const [FAQs, setFAQs] = useState([]);
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const fetchFAQs = async () => {
            try {
                const response = await axios.get("/api/question/getall");
                setFAQs(response.data);
            } catch (e) {
                console.log(e)
            }
        }
        fetchFAQs().finally(() => {
            setLoaded(true)
        })
    }, [])

    if(!loaded) return <Loading />

    return (
        <div className="mt-16 mb-16 flex flex-col items-center">
            <h2 className="text-2xl font-semibold">Вопрос - ответ</h2>
            <div className="mt-12">
                {
                    FAQs.map(FAQ => (
                        <Question key={FAQ.id} question={FAQ.name} answer={FAQ.description} />
                    ))
                }
            </div>
        </div>
    )
}