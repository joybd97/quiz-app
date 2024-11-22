import axios from "axios";
import { handleAPIError } from "../APIErrorHandler";

export const createQuiz = async (quizData, token) => {
    try {
        const response = await axios.post(
            "http://localhost:5000/api/admin/quizzes",
            quizData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );
        return response.data;
    } catch (error) {
        return [false, handleAPIError(error)];
    }
};

export const postQuiz = async (id, token, quizData) => {
    //console.log(id)
    try {
        const response = await axios.post(
            `http://localhost:5000/api/admin/quizzes/${id}/questions`, 
            quizData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );
        return response.data; 
    } catch (error) {
        console.error("Error posting quiz:", error); 
        return [false, error.response?.data || error.message]; 
    }
};


