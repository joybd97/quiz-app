import React from 'react'

export const QuizSetCreate = ({ handleSubmit, title, description, loading, successMessage, errorMessage, setTitle, setDescription }) => {
    return (
        <>
            <div>
                <h2 className="text-3xl font-bold mb-6">
                    Give your quiz title and description
                </h2>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label
                            htmlFor="quiz-title"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Quiz title*
                        </label>
                        <input
                            type="text"
                            id="quiz-title"
                            name="quiz-title"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-buzzr-purple focus:border-buzzr-purple"
                            placeholder="Enter quiz title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-6">
                        <label
                            htmlFor="quiz-description"
                            className="block text-sm font-medium text-gray-700 mb-1"
                        >
                            Description*
                        </label>
                        <textarea
                            id="quiz-description"
                            name="quiz-description"
                            rows="4"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-buzzr-purple focus:border-buzzr-purple"
                            placeholder="Enter description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        ></textarea>
                    </div>

                    <button
                        type="submit"
                        className="w-full block text-center bg-primary text-white py-2 px-4 rounded-md hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                        disabled={loading}
                    >
                        {loading ? "Submitting..." : "Next"}
                    </button>
                </form>

                {successMessage && (
                    <p className="mt-4 text-green-500 font-semibold">
                        {successMessage}
                    </p>
                )}
                {errorMessage && (
                    <p className="mt-4 text-red-500 font-semibold">{errorMessage}</p>
                )}
            </div>
        </>
    )
}
