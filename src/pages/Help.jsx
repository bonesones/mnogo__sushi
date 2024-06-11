import QuestionCard from "../components/QuestionCard";
import {useEffect, useState} from "react";
import axios from "axios";

export default function Help() {
    const [questions, setQuestions] = useState([]);
    const [loaded, setLoaded] = useState(false);


    useEffect(() => {
        const fetchQuestions = async () => {
            try {
                const response = await axios.get("/api/question/getall");
                setQuestions(response.data);
                setLoaded(true)
            } catch (error) {
                console.log(error)
            }
        }
        fetchQuestions()
    }, []);

  return (
    <div className="help mx-auto wrapper">
      <h1 className="font-semibold text-3xl mt-24 text-center md:text-left">
        Помощь
      </h1>
      <section className="mt-20 flex flex-col gap-6 items-center mx-auto">
          {loaded && (
              questions.map((question) => (
                  <QuestionCard question={question.name} answer={question.description} key={question.id} />
              ))
          )}
      </section>
    </div>
  );
}
