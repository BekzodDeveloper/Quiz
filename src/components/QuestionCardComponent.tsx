import React from 'react';
import { AnswerWrapper, ButtonWrapper, Wrapper } from "./QuestionCard.styles";
import { AnswerType, dataQuestions, QuestionItemType } from "../state/state";

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
        // console.log(question)
        return (
            <>
                {/*<h2 style={{fontSize: '20px'}}>{questionCategory}</h2>*/}
                <Wrapper>

                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <p style={{ margin: '5px 5px 10px', fontSize: '18px' }} className="number">
                            |  Всего: 
                            {/* {totalQuestions}  */}
                            {questionCategory === "PM" ? " 87" :
                                questionCategory === "PM1" ? " 87" :
                                    questionCategory === "МИ" ? " 46" :
                                        questionCategory == "МИ1" ? " 46" : ""

                            }
                        </p>

                        <p style={{ margin: '5px 5px 10px', fontSize: '18px' }} className="number">
                            | Счёт: <span style={{ color: "#59ba0f" }}> {score}</span> / {questionNum} |
                        </p>
                    </div>
                    <hr />

                    <p style={{ fontSize: "20px", fontWeight: "400" }} dangerouslySetInnerHTML={{ __html: question }} />
                    <AnswerWrapper>

                        {answers.map(ans => (
                            <ButtonWrapper
                                key={ans}
                                correct={userAnswer?.correctAnswer === ans}
                                userClicked={userAnswer?.answer === ans}>
                                <button value={ans} disabled={!!userAnswer} onClick={checkAnswer}>
                                    <span dangerouslySetInnerHTML={{ __html: ans }} />
                                </button>
                            </ButtonWrapper>))}
                    </AnswerWrapper>
                    {gameOver || userAnswers.length === totalQuestions
                        ? <>

                            <button style={{ padding: "10px 40px", margin: "30px 0", backgroundColor: "#59ba0f", color: "#fff", borderColor: "#59ba0f" }} className='start' onClick={() => {
                                startExamQuiz(questionCategory)
                            }}>Рестарт ▶
                            </button>
                        </>
                        : null}
                </Wrapper>
            </>
        );

    }