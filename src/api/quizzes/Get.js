import axios from "axios";
import { handleAPIError } from "../APIErrorHandler";

export const getAllQuizzes = () => {
    const token = localStorage.getItem('authToken');
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn == false) {
        return (
            axios.get(("http://localhost:5000/api/quizzes"))

                .then((response) => {
                    console.log(response)
                    return [response?.data?.data];
                })
                .catch((error) => {
                    return [false, handleAPIError(error)];
                })
        )
    } else {
        return axios
            .get("http://localhost:5000/api/quizzes", {
                headers: { Authorization: `Bearer ${token}` },
            })
            .then((response) => {
                //console.log(response)
                return [response];
            })
            .catch((error) => {
                return [false, handleAPIError(error)];
            });
    }

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

export const fetchQuizByID = (id) => {
    const token = localStorage.getItem('authToken');
    return axios
        .get(`http://localhost:5000/api/quizzes/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
            //  console.log(response)
            return [response?.data?.data];
        })
        .catch((error) => {
            return [false, handleAPIError(error)];
        });
};


export const fetchQuizResultLeaderboardData = (id) => {
    const token = localStorage.getItem('authToken');
    return axios
        .get(`http://localhost:5000/api/quizzes/${id}/attempts`, {
            headers: { Authorization: `Bearer ${token}` },
        })
        .then((response) => {
        //    console.log(response)
            return [response?.data?.data];
        })
        .catch((error) => {
            return [false, handleAPIError(error)];
        });
};
