import React from 'react'
import ProgressBar from '../common/ProgressBar'

export default function ResultInfo({ result, totalMarks }) {
    return (
        <>
            <div className="max-h-screen overflow-hidden hidden lg:flex lg:w-1/2 bg-primary flex-col justify-center p-12 relative">
                <div>
                    <div className="text-white">
                        <div>
                            {/* {console.log(result)} */}
                            <h2 className="text-4xl font-bold mb-2">{result?.quiz.title}</h2>
                            {/* <p>{result.quiz.description}</p> */}
                        </div>

                        <div className="my-6 flex items-center">
                            <div className="w-1/2">
                                <div className="flex gap-6 my-6">
                                    <div>
                                        <p className="font-semibold text-2xl my-0">{result?.correct_answers.length}</p>
                                        <p className="text-gray-300">Questions</p>
                                    </div>

                                    <div>
                                        <p className="font-semibold text-2xl my-0">{result?.submitted_answers.filter(sub => result?.correct_answers.some(c => c.question_id === sub.question_id && c.answer === sub.answer)).length}</p>
                                        <p className="text-gray-300">Correct</p>
                                    </div>

                                    <div>
                                        <p className="font-semibold text-2xl my-0">{result?.submitted_answers.length - result?.submitted_answers.filter(sub => result.correct_answers.some(c => c.question_id === sub.question_id && c.answer === sub.answer)).length}</p>
                                        <p className="text-gray-300">Wrong</p>
                                    </div>
                                </div>

                                <a href="./leaderboard_page.html"
                                    className="bg-secondary py-3 rounded-md hover:bg-secondary/90 transition-colors text-lg font-medium underline text-white">
                                    View Leaderboard
                                </a>
                            </div>

                            <div className="w-1/2 bg-primary/80 rounded-md border border-white/20 flex items-center p-4">
                                <div className="flex-1">
                                    <p className="text-2xl font-bold">{totalMarks}/{result?.correct_answers.length * result?.correct_answers[0].marks}</p>
                                    <p>Your Mark</p>
                                </div>
                                {/* progressbar */}
                                {/* <div>
                                        <img src="./assets/icons/circular-progressbar.svg" className="h-20" alt="Progress" />
                                    </div> */}

                                <div>
                                    <ProgressBar percentage={Math.floor((result?.submitted_answers.filter(sub => result?.correct_answers.some(c => c.question_id === sub.question_id && c.answer === sub.answer)).length) / (result?.correct_answers.length) * 100)} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
