import React, { useEffect, useState } from "react";

import { getAllQuizzes } from "../api/quizzes/Get";
// Import all background images
import bg1 from "../assets/backgrounds/1.jpeg";
import bg2 from "../assets/backgrounds/2.jpg";
import bg3 from "../assets/backgrounds/3.jpg";
import bg4 from "../assets/backgrounds/4.jpg";
import bg5 from "../assets/backgrounds/5.jpg";
import bg6 from "../assets/backgrounds/6.jpg";
import bg7 from "../assets/backgrounds/7.jpg";
import bg8 from "../assets/backgrounds/8.jpg";
const backgrounds = [bg1, bg2, bg3, bg4, bg5, bg6, bg7, bg8];

const QuizCards = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    // Fetch quizzes from API
    getAllQuizzes().then((response) => {
      if (response?.[0]) {
        setQuizzes(response?.[0]);
      } else {
        console.log(response?.[1]);
      }
    });
  }, []);

  return (
    <section className="bg-white p-6 rounded-md h-full">
      <h3 className="text-2xl font-bold mb-6">Participate In Quizzes</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quizzes?.length > 0 ? (
          quizzes?.map((quiz, index) => {
            const randomBackground =
              backgrounds[Math.floor(Math.random() * backgrounds.length)];

            return (
              <div
                key={quiz.id}
                className="rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow max-h-[450px] relative group cursor-pointer"
              >
                <div className="group-hover:scale-105 absolute transition-all text-white text-center top-1/2 -translate-y-1/2 px-4">
                  <h1 className="text-5xl" style={{ fontFamily: "Jaro" }}>
                    {quiz.title}
                  </h1>
                  <p className="mt-2 text-lg">{quiz.description}</p>
                </div>
                {quiz.is_attempted && (
                  <div className="hidden absolute transition-all bg-black/80 w-full h-full left-0 top-0 text-white group-hover:grid place-items-center">
                    <div>
                      <h1 className="text-3xl font-bold">
                        Already Participated
                      </h1>
                      <p className="text-center">
                        Click to view your leaderboard
                      </p>
                    </div>
                  </div>
                )}
                <img
                  src={randomBackground}
                  alt={quiz.title}
                  className="w-full h-full object-cover rounded mb-4"
                />
              </div>
            )
          })
        ) : (
          <div>No quizzes data found.</div>
        )}
      </div>
    </section>
  );
};

export default QuizCards;