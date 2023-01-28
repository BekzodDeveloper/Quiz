import React from 'react';
import {AnswerWrapper, ButtonWrapper, Wrapper} from "./QuestionCard.styles";
import {AnswerType, QuestionItemType} from "../state/state";

type QuestionCardType = {
    // questionItem: QuestionItemType
    // answers:Array<string>

    question: string
    answers: Array<string>
    userAnswer: AnswerType | undefined
    questionNum: number
    totalQuestions: number
    checkAnswer: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export const QuestionCardComponent: React.FC<QuestionCardType> =
    ({
         // questionItem,
         // answers,
         checkAnswer,

         question,
         answers,
         userAnswer,
         questionNum,
         totalQuestions
     }) => {

        return (
            <Wrapper>
                <p className="number">
                    Вопросы: {questionNum} / {totalQuestions}
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