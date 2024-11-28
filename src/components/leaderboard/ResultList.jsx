import React from 'react'
import Avatar from 'react-avatar'

export default function ResultList({ quizInfo, leaderboardData, username }) {
    return (
        <>
            <div>
                <h1 className="text-2xl font-bold">Leaderboard</h1>
                {quizInfo && <p className="mb-6">{quizInfo.title}</p>}
                <ul className="space-y-4">
                    {leaderboardData.map((user, index) => (
                        <li
                            key={index}
                            className={`flex items-center justify-between p-2 rounded-lg ${user.name === username ? "border-2 border-primary bg-gray-100" : ""
                                }`}
                        >
                            <div className="flex items-center">
                                <Avatar
                                    name={username}
                                    size="40"
                                    round={true}
                                    className="w-10 h-10 rounded-full mr-3 object-cover"
                                />
                                <div>
                                    <h3 className="font-semibold">{user.name}</h3>
                                    <p className="text-sm text-gray-500">
                                        {user.position}
                                        {user.position === 1
                                            ? "st"
                                            : user.position === 2
                                                ? "nd"
                                                : user.position === 3
                                                    ? "rd"
                                                    : "th"}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center">
                                <span className="mr-2">{user.total_marks}</span>
                            </div>
                        </li>
                    ))}
                </ul>

            </div>
        </>
    )
}
