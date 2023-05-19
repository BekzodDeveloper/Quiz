import React, {useState} from 'react';

import {GlobalStyle, Wrapper} from "./App.styles";

import LoadingIMG from "./images/loading-gif.gif";
import nextArrowIMG from "./images/next.svg";
import {AnswerType, dataCapitalMarket, ex, QuestionItemType, QuestionState, QuestionType} from "./state/state";
import {shuffleArray} from "./utils";
import {QuestionCardComponent} from "./components/QuestionCardComponent";
import {NavLink, Route, Routes} from "react-router-dom";


const concatToJSON: boolean = true;


const App = () => {

    const [loading, setLoading] = useState(false);
    const [questions, setQuestions] = useState<Array<QuestionState>>([]);
    const [number, setNumber] = useState(0);
    const [userAnswers, setUserAnswers] = useState<Array<AnswerType>>([]);
    const [score, setScore] = useState(0);
    const [gameOver, setGameOver] = useState(true);
    const [totalQuestions, setTotalQuestions] = useState<number>(36)

    const startExamQuiz = async (category: string) => {
        setLoading(true)
        setGameOver(false)

        const allQuestions = category === "РК"
            ? dataCapitalMarket.questionsCapital : category === "ПМ"
                ? dataCapitalMarket.questionsProd : category === "ИЭУ"
                    ? dataCapitalMarket.questionsHistory : category === "ЦЭ"
                        ? dataCapitalMarket.questionsDigEco : category === "ПТ"
                            ? dataCapitalMarket.questionsProdTech : [];

        const newQuestions = shuffleArray(allQuestions.map(questionItem => ({
            ...questionItem,
            answers: shuffleArray([...questionItem.incorrect_answers, questionItem.correct_answer])
        })));


        setTotalQuestions(newQuestions.length)
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
        if (nextQuestion === totalQuestions) {
            setGameOver(true);
        } else {
            setNumber(nextQuestion)
        }
    }

// slice questions and answers from Array of strings
    function sliceArray(array: Array<string>) {

        let size: number = 5;
        let subarray: Array<Array<string>> = [];// [ [string,string ], [ ], ]
        for (let i = 0; i < Math.ceil(array.length / size); i++) {
            subarray[i] = array.slice((i * size), (i * size) + size);
        }
        const objs: Array<QuestionType> = subarray.map(sub => (
            {
                category: "ЦЭ",
                type: "multiple",
                difficulty: "easy",
                question: sub[0],
                correct_answer: sub[1],
                incorrect_answers: [sub[2], sub[3], sub[4]]
            }
        ))
        return objs;
    }

    const questionArrays: Array<QuestionType> = sliceArray(ex.questions);


    return (<>
            <GlobalStyle/>
            <Wrapper>
                <h1 style={{margin: "40px 5px 0px"}}>Итоговая контрольная</h1>
                <p>Выберите предмет</p>
                <Buttons startExamQuiz={startExamQuiz}/>

                {!gameOver && <>
                    <p className="score">Счёт: {score}</p>
                </>}
                {loading && <img style={{width: "100px"}} src={LoadingIMG}/>}

                {!loading && !gameOver && (
                    <Routes>
                        <Route path='/prodtech' element={
                            <QuestionCardComponent
                                questionNum={number + 1}
                                totalQuestions={totalQuestions}
                                question={questions[number].question}
                                answers={questions[number].answers}
                                userAnswer={userAnswers ? userAnswers[number] : undefined}
                                checkAnswer={checkAnswer}
                                gameOver={gameOver}
                                userAnswers={userAnswers}
                                startExamQuiz={startExamQuiz}
                                questionCategory={questions[0].category}
                            />
                        }/>
                        <Route path='/capitalmarket' element={
                            <QuestionCardComponent
                                questionNum={number + 1}
                                totalQuestions={totalQuestions}
                                question={questions[number].question}
                                answers={questions[number].answers}
                                userAnswer={userAnswers ? userAnswers[number] : undefined}
                                checkAnswer={checkAnswer}
                                gameOver={gameOver}
                                userAnswers={userAnswers}
                                startExamQuiz={startExamQuiz}
                                questionCategory={questions[0].category}
                            />
                        }/>
                        <Route path='/prodman' element={
                            <QuestionCardComponent
                                questionNum={number + 1}
                                totalQuestions={totalQuestions}
                                question={questions[number].question}
                                answers={questions[number].answers}
                                userAnswer={userAnswers ? userAnswers[number] : undefined}
                                checkAnswer={checkAnswer}
                                gameOver={gameOver}
                                userAnswers={userAnswers}
                                startExamQuiz={startExamQuiz}
                                questionCategory={questions[0].category}
                            />
                        }/>
                        <Route path='/history' element={
                            <QuestionCardComponent
                                questionNum={number + 1}
                                totalQuestions={totalQuestions}
                                question={questions[number].question}
                                answers={questions[number].answers}
                                userAnswer={userAnswers ? userAnswers[number] : undefined}
                                checkAnswer={checkAnswer}
                                gameOver={gameOver}
                                userAnswers={userAnswers}
                                startExamQuiz={startExamQuiz}
                                questionCategory={questions[0].category}
                            />
                        }/>
                        <Route path='/digeco' element={
                            <QuestionCardComponent
                                questionNum={number + 1}
                                totalQuestions={totalQuestions}
                                question={questions[number].question}
                                answers={questions[number].answers}
                                userAnswer={userAnswers ? userAnswers[number] : undefined}
                                checkAnswer={checkAnswer}
                                gameOver={gameOver}
                                userAnswers={userAnswers}
                                startExamQuiz={startExamQuiz}
                                questionCategory={questions[0].category}
                            />
                        }/>


                    </Routes>

                )}
                {!gameOver &&
                    !loading &&
                    userAnswers.length === number + 1 &&
                    number !== totalQuestions - 1 &&
                    <button className='next' onClick={nextQuestion}>Следующий вопрос <img style={{paddingLeft: "5px"}}
                                                                                          src={nextArrowIMG}/></button>
                }
                <div className='powered'>Powered by Kholdorov's - <a
                    target='_blank'
                    href="https://t.me/bekzoddeveloper_blog">Bekzod
                </a> & <a target='_blank' href="https://www.instagram.com/abdulaziz.uxui/">Abdulaziz</a>
                </div>
            </Wrapper>
            {concatToJSON && questionArrays.map(myQ => {
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

type ButtonsType = {
    startExamQuiz: (category: string) => void
}
const Buttons: React.FC<ButtonsType> = ({startExamQuiz}) => {


    return <div style={{display: "flex", flexWrap: "wrap", gridGap: '10px'}}>

        <button className='next dnone'><NavLink to="/capitalmarket" onClick={() => {
            startExamQuiz('РК')
        }}>Рынок Капитала</NavLink></button>
        <button className='next dnone'><NavLink to="/prodman" onClick={() => {
            startExamQuiz('ПМ')
        }}>Производ. Менеджмент</NavLink></button>
        <button className='next dnone'><NavLink to="/history" onClick={() => {
            startExamQuiz('ИЭУ')
        }}>История Эк. Уч.</NavLink></button>
        <button className='next dnone'><NavLink to="/digeco" onClick={() => {
            startExamQuiz('ЦЭ')
        }}>Цифровая Экономика</NavLink></button>
        <button className='next'><NavLink to="/prodtech" onClick={() => {
            startExamQuiz('ПТ')
        }}>Произ-е Технологии</NavLink></button>


    </div>;
}
export default App
;
