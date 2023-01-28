import React, {useState} from 'react';

import {GlobalStyle, Wrapper} from "./App.styles";

import LoadingIMG from "./images/loading-gif.gif";
import {AnswerType, dataCapitalMarket, ex, QuestionItemType, QuestionState, QuestionType} from "./state/state";
import {shuffleArray} from "./utils";
import {QuestionCardComponent} from "./components/QuestionCardComponent";
import {log} from "util";


const TOTAL_QUESTIONS = 50;
const myJson=false;

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


        const newQuestions = shuffleArray(dataCapitalMarket.questions.map(questionItem => ({
            ...questionItem,
            answers: shuffleArray([...questionItem.incorrect_answers, questionItem.correct_answer])
        })));

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



    function sliceArray(array: Array<string>) {

        let size = 5;
        let subarray = [];
        for (let i = 0; i < Math.ceil(array.length / size); i++) {
            subarray[i] = array.slice((i * size), (i * size) + size);
        }
        const objs = subarray.map(sub => (
            {
                category: "CAPITAL MARKET",
                type: "multiple",
                difficulty: "easy",
                question: sub[0],
                correct_answer: sub[1],
                incorrect_answers: [sub[2], sub[3], sub[4]]
            }
        ))
        return objs;
    }

    const questionArrays = sliceArray(ex.questions);



    return (<>
            <GlobalStyle/>
            <Wrapper>
                <h1>{dataCapitalMarket.questions[0].category}</h1>
                {gameOver || userAnswers.length === TOTAL_QUESTIONS
                    ? <button className='start' onClick={startTrivia}>Старт</button>
                    : null}


                {!gameOver && <p className="score">Счёт: {score}</p>}

                {loading && <img style={{width: "100px"}} src={LoadingIMG}/>}

                {!loading && !gameOver && (

                    <QuestionCardComponent
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
                    <button className='next' onClick={nextQuestion}>Следующий вопрос</button>
                }
            </Wrapper>
            {myJson && questionArrays.map(myQ => {

                return <p key={myQ.question}>
                    {`{`}
                    category: "{myQ.category}",
                    type: "{myQ.type}",
                    difficulty: "{myQ.difficulty}",
                    question: "{myQ.question}",
                    correct_answer: "{myQ.correct_answer}",
                    incorrect_answers: [{myQ.incorrect_answers.map(ia => `"${ia}",`)}]
                    {`},`}
                </p>

            })}
        </>
    );
}

export default App
;
