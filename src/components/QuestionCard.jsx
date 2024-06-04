import { useState } from "react";

export default function QuestionCard({ question, answer }) {
  const [quiestionOpened, setQuestionOpened] = useState(false);

  return (
    <div className="w-full max-w-5xl mx-auto">
      <button
        type="button"
        className="question-btn text-white text-xl w-full font-medium flex items-center justify-between bg-[#F35E62] px-6 py-2 rounded-md"
        onClick={() => setQuestionOpened((prev) => !prev)}
      >
        {question}
        <svg
          width="16"
          height="10"
          viewBox="0 0 16 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={
            (quiestionOpened ? "rotate-180 " : "") + "transition-transform"
          }
        >
          <line
            y1="-0.5"
            x2="12.1228"
            y2="-0.5"
            transform="matrix(0.625186 0.780475 -0.858121 0.513448 0 0.539062)"
            stroke="white"
          />
          <line
            y1="-0.5"
            x2="12.123"
            y2="-0.5"
            transform="matrix(0.625255 -0.78042 0.85808 0.513516 8.41992 10)"
            stroke="white"
          />
        </svg>
      </button>
      <p
        className={
          (quiestionOpened ? "answer_active " : "answer ") +
          "shadow-xl rounded-md question_answer bg-white px-3"
        }
      >
        {answer}
      </p>
    </div>
  );
}
