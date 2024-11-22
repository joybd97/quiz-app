import axios from "axios";

export const patchQuiz = async (id, data) => {
    //console.log(id, data)
    const token = localStorage.getItem('authToken');
    try {
        const response = await axios.patch(
            `http://localhost:5000/api/admin/quizzes/${id}`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": "application/json",
                },
            }
        );
        return response.data; // Return the updated quiz data
    } catch (error) {
        console.error("Error updating quiz:", error);
        return [false, error.response?.data || error.message];
    }
};


