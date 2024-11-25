import React, { useState } from 'react'
import { deleteQuiz } from '../../api/quizzes/Delete';
import { toast } from 'react-toastify';

export const QuizList = ({ quizzes, handleDelete, handleEdit }) => {

  return (
    <>
          <div className="px-4">
              {quizzes?.map((quiz, index) => (
                  <div
                      key={index}
                      className="rounded-lg overflow-hidden shadow-sm mb-4"
                  >
                      <div className="bg-white p-6 !pb-2">
                          {/* Render the quiz question */}
                          <div className="flex justify-between items-center mb-4">
                              <h3 className="text-lg font-semibold">
                                  {index + 1}. {quiz.question}
                              </h3>
                          </div>
                          {/* Render the quiz options as radio buttons */}
                          <div className="space-y-2">
                              {quiz.options.map((option, i) => (
                                  <label key={i} className="flex items-center space-x-3">
                                      <input
                                          type="radio"
                                          name={`answer${index}`}
                                          className="form-radio text-buzzr-purple"
                                          checked={option === quiz.correctAnswer} // Default checked if the option matches correctAnswer
                                          onChange={() => handleOptionChange(index, option)} // Handle change if required
                                      />
                                      <span>{option}</span>
                                  </label>
                              ))}
                          </div>
                      </div>
                      {/* Render action buttons */}
                      <div className="flex space-x-4 bg-primary/10 px-6 py-2">
                          <button
                              className="text-red-600 hover:text-red-800 font-medium"
                              onClick={() => handleDelete(quiz.id)}
                          >
                              Delete
                          </button>
                          <button
                              className="text-primary hover:text-primary/80 font-medium"
                              onClick={() => handleEdit(quiz)} // Define `handleEdit` function for editing
                          >
                              Edit Question
                          </button>
                      </div>
                  </div>
              ))}
          </div>
    </>
  )
}
