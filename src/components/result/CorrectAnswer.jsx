import React from 'react'

export default function CorrectAnswer({ result, quizInfo }) {
  return (
    <>
          <div className="max-h-screen md:w-1/2 flex items-center justify-center h-full p-8 text-left">
              <div className="h-[calc(100vh-50px)] overflow-y-scroll">
                  <div className="px-4">
                      {result?.submitted_answers.map((answer, index) => {
                          const correctAnswer = result.correct_answers.find(
                              (ca) => ca.question_id === answer.question_id
                          );

                          return (
                              <div className="rounded-lg overflow-hidden shadow-sm mb-4" key={answer.question_id}>
                                  <div className="bg-white p-6 !pb-2">
                                      <div className="flex justify-between items-center mb-4">
                                          <h3 className="text-lg font-semibold text-right">
                                              {index + 1}. {quizInfo?.questions[index]?.question} ?

                                          </h3>
                                      </div>
                                      <div className="space-y-2">
                                          <div>
                                              Submitted Answer: {answer.answer}
                                          </div>
                                          {correctAnswer && (
                                              <div
                                                  className={
                                                      correctAnswer.answer === answer.answer
                                                          ? "text-green-500"
                                                          : "text-red-500"
                                                  }
                                              >
                                                  Correct Answer: {correctAnswer.answer}
                                              </div>
                                          )}
                                          <div>
                                              Marks Awarded: {correctAnswer && correctAnswer.answer === answer.answer ? correctAnswer.marks : 0}
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          );
                      })}
                  </div>
              </div>
          </div>
    </>
  )
}
