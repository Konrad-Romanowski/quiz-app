import React from 'react';
import { nanoid } from 'nanoid';
import Question from '../Question/Question';

export default function Game(props) {

    // TODO:
    // Add function that checks answers

    const [questions, setQuestions] = React.useState([]);
    // const [selectedAnswers, setSelectedAnswers] = React.useState(Array.from({length: 5}, answer => null));

    function checkAnswers() {
        let points = 0;
        questions.forEach(q=> {
            console.log(q.selectedAnswer);
        });
    }

    React.useEffect(()=>{
        async function getQuestionsFromAPI() {
            const res = await fetch('https://opentdb.com/api.php?amount=5&type=multiple');
            const data = await res.json();

            if(data.response_code === 0) {
                const receivedQuestions = data.results.reduce((questionsArray,question,index)=>{

                    const answers = [question.correct_answer, ...question.incorrect_answers];
                    answers.sort(()=>Math.random() - 0.5);

                    const questionData = {
                        questionNumber: index+1,
                        question: question.question,
                        answers,
                        correctAnswer: question.correct_answer,
                        selectedAnswer: null
                    }

                    questionsArray.push(questionData);
                    return questionsArray;
                },[]);

                setQuestions(receivedQuestions);
            }
        }

        if(props.newGame) getQuestionsFromAPI();
    },[props.newGame]);

    // Helper functions
    // console.log(questions);
    // console.log('correct answers:',
    //     questions.reduce((correctAnswers,q) => {
    //         correctAnswers.push(q.correctAnswer);
    //         return correctAnswers;
    //     },[])
    // );

    const questionsElement = questions.map((question,index) => {
        const id = nanoid();
        
        return (
            <Question
                key={id}
                id={id}
                question={question}
                setQuestions={setQuestions}
            />
        )

        }
    );
    
    return (
        <main className='game'>
            <section className='game-section'>
                {questionsElement}
            </section>
            <button
                className='check-answers-button'
                onClick={checkAnswers}
                // disabled={true}
            >
                Check answers
            </button>
        </main>
    )
}
