import React from 'react';
import {AnswerType} from "../App";
import {AnswerWrapper, ButtonWrapper, Wrapper} from "./QuestionCard.styles";

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
            <Wrapper>
                <p className="number">
                    Question: {questionNum} / {totalQuestions}
                </p>
                <p dangerouslySetInnerHTML={{__html: question}}/>
                <AnswerWrapper>
                    {answers.map(ans => (
                        <ButtonWrapper
                            key={ans}
                            correct={userAnswer?.correctAnswer === ans}
                            userClicked={userAnswer?.answer === ans}>
                            <button value={ans} disabled={!!userAnswer} onClick={checkAnswer}>
                                <span dangerouslySetInnerHTML={{__html: ans}}/>
                            </button>
                        </ButtonWrapper>))}
                </AnswerWrapper>
            </Wrapper>
        );

    }