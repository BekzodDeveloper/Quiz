import {shuffleArray} from "./utils";

export type QuestionType = {
    category: string
    correct_answer: string
    difficulty: string
    incorrect_answers: Array<string>
    question: string
    type: string

}
export type QuestionState = QuestionType & { answers: Array<string> }

export enum Difficulty {
    EASY = "easy",
    MEDIUM = "medium",
    HARD = "hard",
}

export const fetchQuizQuestions = async (
    amount: number,
    difficulty: Difficulty) => {
    const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple`;
    const data = await (await fetch(endpoint)).json(); // 1. await fetch then 2. await converting to json
    return data.results.map((question: QuestionType) => ({
            ...question,
            answers: shuffleArray([
                ...question.incorrect_answers,
                question.correct_answer
            ])
        })
    )
}