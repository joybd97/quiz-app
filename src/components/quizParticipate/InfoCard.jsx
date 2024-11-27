import React, { useContext } from 'react'
import Avatar from 'react-avatar';
import { UserContext } from '../../context/userContext';

export default function InfoCard({ quizInfo, quizCount }) {
    //console.log(quizInfo)
    const { username } = useContext(UserContext);
  return (
    <>
          <div className="lg:col-span-1 bg-white rounded-md p-6 h-full flex flex-col">
              <div>
                  <h2 className="text-4xl font-bold mb-4">{quizInfo?.title}</h2>
                  <p className="text-gray-600 mb-4">
                      {quizInfo?.description}
                  </p>

                  <div className="flex flex-col">
                      <div className="w-fit bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-full inline-block mb-2">
                          Total number of questions : {quizInfo?.questions.length}
                      </div>

                      <div className="w-fit bg-blue-100 text-blue-800 text-sm font-medium px-2.5 py-0.5 rounded-full inline-block mb-2">
                          Participation : {quizCount}
                      </div>

                      <div className="w-fit bg-gray-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-full inline-block mb-2">
                          Remaining :  {quizInfo?.questions.length - quizCount}
                      </div>
                  </div>
              </div>

              <div className="mt-auto flex items-center">
                  <Avatar
                      name={username}
                      size="40"
                      round={true}
                      className="w-10 h-10 rounded-full mr-3 object-cover"
                  />
                  <span className="text-black font-semibold">{username}</span>
              </div>
          </div>
    </>
  )
}
