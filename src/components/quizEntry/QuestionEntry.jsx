import React from 'react'

export const QuestionEntry = ({ quizTitle, setQuizTitle, options,handleSaveQuiz, handleOptionChange, handleCheckboxChange }) => {
  return (
    <>
          <div className="space-y-4">
              <h2 className="text-xl font-bold text-foreground">
                  Create Quiz
              </h2>

              <div>
                  <label
                      htmlFor="quizTitle"
                      className="block text-sm font-medium text-foreground mb-1"
                  >
                      Question Title
                  </label>
                  <input
                      type="text"
                      id="quizTitle"
                      name="quizTitle"
                      value={quizTitle}
                      onChange={(e) => setQuizTitle(e.target.value)}
                      className="w-full mt-2 p-2 border border-input rounded-md bg-background text-foreground"
                      placeholder="Enter quiz title"
                  />
              </div>

              <p className="text-sm text-gray-600 mt-4">Add Options</p>

              <div id="optionsContainer" className="space-y-2 mt-4">
                  {options.map((option, index) => (
                      <div
                          key={index}
                          className="flex items-center space-x-2 px-4 py-1 rounded-md group focus-within:ring focus-within:ring-primary/80 bg-white"
                      >
                          <input
                              type="checkbox"
                              checked={option.isCorrect}
                              onChange={() => handleCheckboxChange(index)}
                              className="text-primary focus:ring-0 w-4 h-4"
                          />
                          <label htmlFor={`optionText${index}`} className="sr-only">
                              Option {index + 1}
                          </label>
                          <input
                              type="text"
                              id={`optionText${index}`}
                              value={option.text}
                              onChange={(e) =>
                                  handleOptionChange(index, e.target.value)
                              }
                              className="w-full p-2 bg-transparent rounded-md text-foreground outline-none focus:ring-0"
                              placeholder={`Option ${index + 1}`}
                          />
                      </div>
                  ))}
              </div>
              <button
                  className="w-full bg-primary text-white text-primary-foreground p-2 rounded-md hover:bg-primary/90 transition-colors"
                  onClick={handleSaveQuiz}
              >
                  Save Quiz
              </button>
          </div>
    </>
  )
}
