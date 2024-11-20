import axios from "axios";
import { handleAPIError } from "../APIErrorHandler";




export const getAllQuizzes = () => {
    return (
        axios.get(("http://localhost:5000/api/quizzes"))
            .then((response) => {
                return [response?.data?.data];
            })
            .catch((error) => {
                return [false, handleAPIError(error)];
            })
    )
};