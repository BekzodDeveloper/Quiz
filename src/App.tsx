import React, {useState} from 'react';
import {Difficulty, fetchQuizQuestions, QuestionState} from "./API";
import {QuestionCard} from "./components/QuestionCard";

import {GlobalStyle, Wrapper} from "./App.styles";

import LoadingIMG from "./images/loading-gif.gif";

export type AnswerType = {
    question: string
    answer: string
    correct: boolean
    correctAnswer: string
}

const TOTAL_QUESTIONS = 10;

const App = () => {

    const [loading, setLoading] = useState(false);
    const [questions, setQuestions] = useState<Array<QuestionState>>([]);
    const [number, setNumber] = useState(0);
    const [userAnswers, setUserAnswers] = useState<Array<AnswerType>>([]);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(true);

    const startTrivia = async () => {
        setLoading(true)
        setGameOver(false)

        const newQuestions = await fetchQuizQuestions(
            TOTAL_QUESTIONS, Difficulty.EASY);

        setQuestions(newQuestions);
        setScore(0)
        setUserAnswers([])
        setNumber(0);
        setLoading(false)
    }

    const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (!gameOver) {
            const answer = e.currentTarget.value;

            //Check answer against correct answer
            const correct = questions[number].correct_answer === answer;

            if (correct) setScore(prev => prev + 1);
            const answerObj = {
                question: questions[number].question,
                answer,
                correct,
                correctAnswer: questions[number].correct_answer
            };
            setUserAnswers(prev => [...prev, answerObj]);
        }
    }

    const nextQuestion = () => {
        const nextQuestion = number + 1;
        if (nextQuestion === TOTAL_QUESTIONS) {
            setGameOver(true);
        } else {
            setNumber(nextQuestion)
        }
    }
// || or
// && and
    return (<>
            <GlobalStyle/>
            <Wrapper>
                <h1>QUIZ</h1>
                {gameOver || userAnswers.length === TOTAL_QUESTIONS
                    ? <button className='start' onClick={startTrivia}>Start</button>
                    : null}


                {!gameOver && <p className="score">Score: {score}</p>}

                {loading && <img style={{width:"100px"}} src={LoadingIMG}/>}

                {!loading && !gameOver && (
                    <QuestionCard
                        questionNum={number + 1}
                        totalQuestions={TOTAL_QUESTIONS}
                        question={questions[number].question}
                        answers={questions[number].answers}
                        userAnswer={userAnswers ? userAnswers[number] : undefined}
                        checkAnswer={checkAnswer}
                    />
                )}
                {!gameOver &&
                    !loading &&
                    userAnswers.length === number + 1 &&
                    number !== TOTAL_QUESTIONS - 1 &&
                    <button className='next' onClick={nextQuestion}>Next Question</button>
                }
            </Wrapper>
        </>
    );
}

export default App;
