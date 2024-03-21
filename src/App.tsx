import React, { ChangeEvent, ChangeEventHandler, MouseEventHandler, useState } from 'react';

import { GlobalStyle, Wrapper } from "./App.styles";

import LoadingIMG from "./images/loading-gif.gif";
import nextArrowIMG from "./images/next.svg";
import { AnswerType, dataQuestions, ex, QuestionItemType, QuestionState, QuestionType } from "./state/state";
import { shuffleArray } from "./utils";
import { QuestionCardComponent } from "./components/QuestionCardComponent";
import { NavLink, Route, Routes } from "react-router-dom";


const concatToJSON: boolean = true;
type QuestionObj = {
    title: string, category: string, btnClass: string, path: string
}
type AllQuestions = Array<QuestionType>;

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

        let allQuestions: AllQuestions;

        switch (category) {
            case "РК":
                allQuestions = dataQuestions.questionsCapital;
                break;
            case "ПМ":
                allQuestions = dataQuestions.questionsProd;
                break
            case "ИЭУ":
                allQuestions = dataQuestions.questionsHistory;
                break
            case "ЦЭ":
                allQuestions = dataQuestions.questionsDigEco;
                break
            case "ПТ":
                allQuestions = dataQuestions.questionsProdTech;
                break
            case "PR":
                allQuestions = dataQuestions.questionsPR;
                break
            case "МИ":
                allQuestions = dataQuestions.questionsMoR;
                break
            case "PM":
                allQuestions = dataQuestions.questionsPM;
                break
            case "МИ1":
                allQuestions = dataQuestions.questionsMoR1;
                break
            case "PM1":
                allQuestions = dataQuestions.questionsPM1;
                break
            case "Риск":
                allQuestions = dataQuestions.questionRisk;
                break
            case "Риск1":
                allQuestions = dataQuestions.questionRisk1;
                break
            case "Банк":
                allQuestions = dataQuestions.questionsBank;
                break
            case "Тайм":
                allQuestions = dataQuestions.questionsTime;
                break
            case "БизСтр":
                allQuestions = dataQuestions.questionsBusStr;
                break
            default:
                allQuestions = [];
        }

        const newQuestions: any = shuffleArray(allQuestions.map(questionItem => ({
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
        } else if (nextQuestion === totalQuestions) {
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
                category: "БизСтр",
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

    const questionObjs: Array<QuestionObj> = [
        // {title: "Рынок Капитала", category: "РК", btnClass: "next", path: "/capitalmarket"},
        // {title: "Производ. Менеджмент", category: "ПМ", btnClass: "next", path: "/prodman"},
        // {title: "История Эк. Уч.", category: "ИЭУ", btnClass: "next", path: "/history"},
        // {title: "Цифровая Экономика", category: "ЦЭ", btnClass: "next", path: "/digeco"},
        // {title: "Произ-е Технологии", category: "ПТ", btnClass: "next", path: "/prodtech"},
        // {title: "Public Relations", category: "PR", btnClass: "next", path: "/pr"},
        // { title: "Методы исследования", category: "МИ", btnClass: "next", path: "/mor" },
        // { title: "Проджект Менеджмент", category: "PM", btnClass: "next", path: "/pm" },
        // { title: "Риск Менеджмент", category: "Риск", btnClass: "next", path: "/risk" },
        { title: "Банк и деньги", category: "Банк", btnClass: "next", path: "/bank" },
        { title: "Тайм Менеджмент", category: "Тайм", btnClass: "next", path: "/time" },
        { title: "Бизнес Стратегия", category: "БизСтр", btnClass: "next", path: "/busstr" },
    ];
    const questionObjs1: Array<QuestionObj> = [
        // { title: "Методы исследования", category: "МИ1", btnClass: "next", path: "/mor1" },
        // { title: "Проджект Менеджмент", category: "PM1", btnClass: "next", path: "/pm1" },
        { title: "Риск Менеджмент", category: "Риск1", btnClass: "next", path: "/risk1" },
    ];


    type InputValue = string;
    const pass = "MNP31";
    const pass1 = "BBB31";
    const [inputValue, setInputValue] = useState<InputValue>("");

    const inputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setInputValue(event.target.value)
    }


    return (<>
        <GlobalStyle />
        <Wrapper>
            <h1 style={{ margin: "40px 4px 0px" }}>Exam Quiz</h1>
            <hr />
            <input type="password" value={inputValue} placeholder={"Введите пароль"} onChange={inputChange}
                style={{ marginBottom: "10px", marginTop: "10px", padding: "5px" }} />

            {inputValue === pass ?
                <>
                    <p>Выберите предмет</p>
                    <Buttons startExamQuiz={startExamQuiz}
                        questionObjs={questionObjs} />
                </>
                : inputValue === pass1 ?
                    <>
                        <p>Выберите предмет</p>
                        <Buttons
                            startExamQuiz={startExamQuiz}
                            questionObjs={questionObjs1} />
                    </>
                    : (<>
                        🔼 Введите пароль 🔼
                    </>)
            }

            {loading && <img style={{ width: "100px" }} src={LoadingIMG} />}

            {!loading && !gameOver && (inputValue === pass || inputValue === pass1) && (

                <Routes>
                    {
                        (inputValue === pass ? questionObjs :
                            inputValue === pass1 ?
                                questionObjs1 : []).map(q => {
                                    return <Route path={q.path} element={
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
                                            score={score}
                                        />
                                    } />
                                })

                    }
                </Routes>
            )}
            {!gameOver &&
                !loading &&
                userAnswers.length === number + 1 &&
                number !== totalQuestions - 1 && (inputValue === pass || inputValue === pass1) &&
                <button className='next' onClick={nextQuestion}>Следующий вопрос <img style={{ paddingLeft: "5px" }}
                    src={nextArrowIMG} /></button>
            }
            <div className='powered'>
                {/* Powered by 
            Kholdorov's - <a
                target='_blank'
                href="https://t.me/bekzodmirzakarim_blog">Bekzod
            </a> & <a target='_blank' href="https://www.instagram.com/abdulaziz.uxui/">Abdulaziz</a> */}
            </div>

        </Wrapper>
        <>

            {
                concatToJSON && questionArrays.map(myQ => {

                    return <p>
                        {`{`}
                        category: "{myQ.category}",
                        type: "{myQ.type}",
                        difficulty: "{myQ.difficulty}",
                        question: "{myQ.question}",
                        correct_answer: "{myQ.correct_answer}",
                        incorrect_answers: [{myQ.incorrect_answers.map(ia => `"${ia}",`)}]
                        {`},`}
                    </p>

                })

            }

        </>

    </>
    );
}


type ButtonsType = {
    startExamQuiz: (category: string) => void
    questionObjs: Array<QuestionObj>
}

const Buttons: React.FC<ButtonsType> = ({ startExamQuiz, questionObjs }) => {


    return <div style={{ display: "flex", flexWrap: "wrap", gridGap: '10px' }}>
        {questionObjs.map(q => {
            return <button key={q.category} className={q.btnClass}>
                <NavLink to={q.path}
                    onClick={() => {
                        startExamQuiz(q.category)
                    }}>
                    {q.title}
                </NavLink>
            </button>
        })}
    </div>;
}
export default App;
