import React, { useEffect, useState } from 'react'
import { Navbar } from './Navbar'
import { useParams } from 'react-router-dom'

import { fetchQuizByID } from '../api/quizzes/Get'
import { toast } from 'react-toastify'
import InfoCard from './quizParticipate/InfoCard'
import QuizQuestion from './quizParticipate/QuizQuestion'

function QuizParticipation() {
    const { quizId } = useParams()
    const [quizInfo, setQuizInfo] = useState()
    const [quizCount, setQuizCount] = useState(0)

    useEffect(() => {
        fetchQuizByID(quizId).then((response) => {
            //console.log(response[0])
            if (response[0]) {
                setQuizInfo(response?.[0]);
            } else {
                toast.error(response?.[1] || "Failed to fetch quizze");
            }
        });
    }, []);

    return (
        <>
            <Navbar />
            <main className="max-w-8xl mx-auto h-[calc(100vh-10rem)]">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 h-full">
                    {/* Left Column */}
                    <InfoCard
                        quizInfo={quizInfo}
                        quizCount={quizCount}
                    />

                    {/* Right Column */}
                    <div className="lg:col-span-2 bg-white">
                        <QuizQuestion
                            quizInfo={quizInfo}
                            setQuizCount={setQuizCount}
                            quizCount={quizCount}
                            quizId={quizId}
                        />
                    </div>
                </div>
            </main>
        </>
    )
}

export default QuizParticipation