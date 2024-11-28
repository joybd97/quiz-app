import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Navbar } from "./Navbar";
import { fetchQuizResultLeaderboardData } from "../api/quizzes/Get";
import { toast } from "react-toastify";
import PersonalInfo from "./leaderboard/PersonalInfo";
import ResultList from "./leaderboard/ResultList";

function LeaderBoard() {
    const location = useLocation();
    const [id, setId] = useState(null);
    const username = JSON.parse(localStorage.getItem('username'));
    const [quizInfo, setQuizInfo] = useState(null);
    const [leaderboardData, setLeaderboardData] = useState([]);
    const [currentUserStats, setCurrentUserStats] = useState({
        position: 0,
        totalMarks: 0,
        correctAnswers: 0,
        wrongAnswers: 0,
    });

    useEffect(() => {
        // Check for ID in the URL state or fallback to localStorage
        const stateId = location.state?.id;
        const storedId = localStorage.getItem("id");
        const quizId = stateId || storedId;

        if (!quizId) {
            toast.error("Quiz ID not found. Unable to load leaderboard.");
            return;
        }

        setId(quizId);

        fetchQuizResultLeaderboardData(quizId)
            .then((response) => {
                if (response[0]?.quiz) {
                    const quizData = response[0].quiz;
                    const attempts = response[0].attempts;

                    setQuizInfo(quizData);

                    const results = attempts.map((attempt) => {
                        let totalMarks = 0;
                        let correctAnswers = 0;
                        let wrongAnswers = 0;

                        attempt.submitted_answers.forEach((answer) => {
                            const correctAnswer = attempt.correct_answers.find(
                                (correct) => correct.question_id === answer.question_id
                            );

                            if (correctAnswer && correctAnswer.answer === answer.answer) {
                                totalMarks += correctAnswer.marks;
                                correctAnswers++;
                            } else {
                                wrongAnswers++;
                            }
                        });

                        return {
                            name: attempt.user.full_name,
                            email: attempt.user.email,
                            total_marks: totalMarks,
                            correct: correctAnswers,
                            wrong: wrongAnswers,
                        };
                    });

                    results.sort(
                        (a, b) =>
                            b.total_marks - a.total_marks || a.name.localeCompare(b.name)
                    );

                    let position = 1;
                    results.forEach((result, index) => {
                        if (
                            index > 0 &&
                            result.total_marks < results[index - 1].total_marks
                        ) {
                            position = index + 1;
                        }
                        result.position = position;
                    });

                    setLeaderboardData(results);

                    // Set current user stats
                    const currentUser = results.find(
                        (user) => user.name === username
                    );
                    if (currentUser) {
                        setCurrentUserStats({
                            position: currentUser.position,
                            totalMarks: currentUser.total_marks,
                            correctAnswers: currentUser.correct,
                            wrongAnswers: currentUser.wrong,
                        });
                    }
                } else {
                    console.log(response?.[1]);
                }
            })
            .catch((error) => {
                console.error("Failed to fetch leaderboard data:", error);
                toast.error("Unable to fetch leaderboard data. Please try again later.");
            });
    }, [location.state, username]);

    return (
        <>
            <Navbar />
            <main className="min-h-[calc(100vh-50px)] flex items-center justify-center p-4">
                <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl overflow-hidden">
                    <div className="p-6 md:p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                        {/* Left Column */}
                        <PersonalInfo
                            currentUserStats={currentUserStats}
                            username={username}
                        />

                        {/* Right Column */}
                        <ResultList
                            quizInfo={quizInfo}
                            leaderboardData={leaderboardData}
                            username={username}
                        />
                    </div>
                </div>
            </main>
        </>
    );
}

export default LeaderBoard;
