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
    checkAnswer: (e: React.MouseEvent<HTMLButtonElement>) => void,
    gameOver: boolean,
    userAnswers: Array<AnswerType>
    startExamQuiz: (category: string) => void,
    questionCategory: string
    score: number
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
         totalQuestions,

         gameOver,
         userAnswers,
         startExamQuiz,
         questionCategory,
         score
     }) => {
        // let progress = ((50 / 20) * score).toFixed(1);
        return (
            <>
                {/*<h2 style={{fontSize: '20px'}}>{questionCategory}</h2>*/}
                <Wrapper>


                    <p style={{margin: '20px 0 10px'}} className="number">
                        Всего вопросов: {totalQuestions}
                    </p>
                    <p style={{margin: '0 0 10px', fontSize: '20px'}} className="number">
                        Правильных ответов: {score} из {questionNum}
                    </p>
                    {/*<p style={{margin: '0 0 10px', fontSize: '20px'}} className="number">*/}
                    {/*    {progress} баллов*/}
                    {/*</p>*/}
                    <p style={{fontSize: "20px", fontWeight: "400"}} dangerouslySetInnerHTML={{__html: question}}/>
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
                    {gameOver || userAnswers.length === totalQuestions
                        ? <>

                            <button style={{padding: "10px 40px", margin: "30px 0"}} className='start' onClick={() => {
                                startExamQuiz(questionCategory)
                            }}>Рестарт ▶
                            </button>
                        </>
                        : null}
                </Wrapper>
            </>
        );

    }