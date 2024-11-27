import React from 'react'

function LeaderBoard({ quizResult }) {
    const quiz = quizResult?.data?.quiz;
    const attempt = quizResult?.data?.attempts[0];

    const totalMarks = quiz?.total_marks;
    const totalQuestions = quiz?.total_questions;
    const userName = attempt?.user?.full_name;
    const userEmail = attempt?.user?.email;

    // Calculate the number of correct answers
    const correctAnswers = attempt?.correct_answers?.length || 0;
    const score = correctAnswers * 5; // Assuming 5 marks per correct answer

    return (
        <main className="min-h-[calc(100vh-50px)] flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl overflow-hidden">
                <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Left Column */}
                    <div className="bg-primary rounded-lg p-6 text-white">
                        <div className="flex flex-col items-center mb-6">
                            <img
                                src="./assets/avater.webp"
                                alt="Profile Pic"
                                className="w-20 h-20 rounded-full border-4 border-white mb-4 object-cover"
                            />
                            <h2 className="text-2xl font-bold">{userName}</h2>
                            <p className="text-xl">{userEmail}</p>
                        </div>
                        <div className="grid grid-cols-3 gap-4 mb-6">
                            <div className="text-center">
                                <p className="text-sm opacity-75">Total Marks</p>
                                <p className="text-2xl font-bold">{totalMarks}</p>
                            </div>
                            <div className="text-center">
                                <p className="text-sm opacity-75">Total Questions</p>
                                <p className="text-2xl font-bold">{totalQuestions}</p>
                            </div>
                            <div className="text-center">
                                <p className="text-sm opacity-75">Score</p>
                                <p className="text-2xl font-bold">{score}</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Column */}
                    <div>
                        <h1 className="text-2xl font-bold">Quiz Results</h1>
                        <p className="mb-6">{quiz?.title}</p>
                        <div className="space-y-4">
                            {attempt?.submitted_answers?.map((submittedAnswer, index) => {
                                const correctAnswer = attempt?.correct_answers.find(
                                    (ca) => ca.question_id === submittedAnswer.question_id
                                );
                                return (
                                    <div key={submittedAnswer.question_id} className="flex items-center justify-between border-b py-2">
                                        <div className="flex items-center">
                                            <p className="font-semibold">{index + 1}. {submittedAnswer.answer}</p>
                                        </div>
                                        <div className="flex items-center">
                                            <span
                                                className={`${submittedAnswer.answer === correctAnswer?.answer
                                                    ? 'text-green-500'
                                                    : 'text-red-500'
                                                    }`}
                                            >
                                                {submittedAnswer.answer === correctAnswer?.answer
                                                    ? 'Correct'
                                                    : 'Wrong'}
                                            </span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default LeaderBoard