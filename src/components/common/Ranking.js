function processQuizData(apiResponse) {
    const attempts = apiResponse.data.attempts;

    // Calculate total marks for each user
    const results = attempts.map((attempt) => {
        let totalMarks = 0;

        attempt.submitted_answers.forEach((answer) => {
            const correct = attempt.correct_answers.find(
                (ca) => ca.question_id === answer.question_id
            );
            if (correct && correct.answer === answer.answer) {
                totalMarks += correct.marks;
            }
        });

        return {
            name: attempt.user.full_name,
            email: attempt.user.email,
            total_marks: totalMarks
        };
    });

    // Sort by total marks (descending) and calculate position
    results.sort((a, b) => b.total_marks - a.total_marks || a.name.localeCompare(b.name));

    let position = 1;
    results.forEach((result, index) => {
        if (index > 0 && result.total_marks < results[index - 1].total_marks) {
            position = index + 1;
        }
        result.position = position;
    });

    return results;
}

// Example usage
const response = { /* The provided API response */ };
const processedData = processQuizData(response);
console.log(processedData);
