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

export const adminQuizzes = () => {
    const token = localStorage.getItem('authToken');
    //console.log(token)
    return axios
        .get("http://localhost:5000/api/admin/quizzes", {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
            //console.log(response)
            return [response];
        })
        .catch((error) => {
            return [false, handleAPIError(error)];
        });
};

export const fetchQuizzes = () => {
    const token = localStorage.getItem('authToken');
    return axios
        .get("http://localhost:5000/api/admin/quizzes", {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
           // console.log(response)
            return [response?.data[0]];
        })
        .catch((error) => {
            return [false, handleAPIError(error)];
        });
};


