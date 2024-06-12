import QuestionCard from "../components/QuestionCard";
import {useEffect, useState} from "react";
import axios from "axios";
import Loading from "../components/Loading.jsx";

export default function Help() {
    const [questions, setQuestions] = useState([]);
    const [loaded, setLoaded] = useState(false);


    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get("/api/question/getall");
                console.log(response)
                if(response.error) {
                    throw new Error(response.payload.response.status);
                }
                setQuestions(response.data);
                setLoaded(true)
            } catch (error) {
                if(error !== 500) {
                    setLoaded(true)
                }
            }
        }
        fetchQuestions()
    }, []);


    if(!loaded) return <Loading />

  return (
    <div className="help mx-auto wrapper">
      <h1 className="font-semibold text-3xl mt-24 text-center md:text-left">
        Помощь
      </h1>
      <section className="mt-20 flex flex-col gap-6 items-center mx-auto">
          {questions.map((question) => (
                  <QuestionCard question={question.name} answer={question.description} key={question.id} />
              ))}
      </section>
    </div>
  );
}
