import React from 'react';
import {AnswerType} from "../App";

type QuestionCardType = {
    question: string
    answers: Array<string>
    checkAnswer: (e: React.MouseEvent<HTMLButtonElement>) => void
    userAnswer: AnswerType | undefined
    questionNum: number
    totalQuestions: number

}

export const QuestionCard: React.FC<QuestionCardType> =
    ({
         question,
         answers,
         checkAnswer,
         userAnswer,
         questionNum,
         totalQuestions,
     }) => {

        return (
            <div>
                <p className="number">
                    Question: {questionNum} / {totalQuestions}
                </p>
                <p dangerouslySetInnerHTML={{__html: question}}/>
                <div>
                    {answers.map(ans => <div key={ans}>
                        <button value={ans} disabled={!!userAnswer} onClick={checkAnswer}>
                            <span dangerouslySetInnerHTML={{__html: ans}}/>
                        </button>
                    </div>)}
                </div>
            </div>
        );

    }