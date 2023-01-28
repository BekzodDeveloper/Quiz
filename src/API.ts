// import {shuffleArray} from "./utils";
// import {Difficulty, QuestionType} from "./state/state";
export {}



// export const fetchQuizQuestions = async (
//     amount: number,
//     difficulty: Difficulty) => {
//     const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
//     const data = await (await fetch(endpoint)).json(); // 1. await fetch then 2. await converting to json
//     return data.results.map((question: QuestionType) => ({
//             ...question,
//             answers: shuffleArray([
//                 ...question.incorrect_answers,
//                 question.correct_answer
//             ])
//         })
//     )
// }

// export const fetchQuizQuestions = async (
//     amount: number,
//     difficulty: Difficulty) => {
//     const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
//     const data = await (await fetch(endpoint)).json(); // 1. await fetch then 2. await converting to json
//     return data.results.map((question: QuestionType) => ({
//             ...question,
//             answers: shuffleArray([
//                 ...question.incorrect_answers,
//                 question.correct_answer
//             ])
//         })
//     )
// }