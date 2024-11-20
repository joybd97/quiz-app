export const handleAPIError = (error) => {
    if (error?.response) {
        // Server responded with a status other than 2xx
        return (error?.response?.data?.message);
    } else if (error?.request) {
        // Request was made but no response was received
        return (error?.request?.data?.message);
    } else {
        // Something happened in setting up the request
        return ("An error occurred. Please try again.");
    }
}