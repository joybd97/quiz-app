import React from 'react'
import Avatar from 'react-avatar';

export default function PersonalInfo({ currentUserStats, username }) {
    
  return (
    <>
          <div className="bg-primary rounded-lg p-6 text-white">
              <div className="flex flex-col items-center mb-6">
                  <Avatar
                      name={username}
                      size="40"
                      round={true}
                      className="w-10 h-10 rounded-full mr-3 object-cover"
                  />
                  <h2 className="text-2xl font-bold">{username}</h2>
                  <p className="text-xl">{currentUserStats.position} Position</p>
              </div>
              <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center">
                      <p className="text-sm opacity-75">Mark</p>
                      <p className="text-2xl font-bold">
                          {currentUserStats.totalMarks}
                      </p>
                  </div>
                  <div className="text-center">
                      <p className="text-sm opacity-75">Correct</p>
                      <p className="text-2xl font-bold">
                          {currentUserStats.correctAnswers}
                      </p>
                  </div>
                  <div className="text-center">
                      <p className="text-sm opacity-75">Wrong</p>
                      <p className="text-2xl font-bold">
                          {currentUserStats.wrongAnswers}
                      </p>
                  </div>
              </div>
          </div>
    </>
  )
}
