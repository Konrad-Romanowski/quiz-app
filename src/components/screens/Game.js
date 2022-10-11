import React from 'react';
import { nanoid } from 'nanoid';
import Question from '../Question/Question';

export default function Game(props) {

    // TODO:
    // Add function that checks answers

    const [questions, setQuestions] = React.useState([]);
    const [selectedAnswers, setSelectedAnswers] = React.useState([]);   

    React.useEffect(()=>{
        async function getQuestionsFromAPI() {
            const res = await fetch('https://opentdb.com/api.php?amount=5&type=multiple');
            const data = await res.json();

            if(data.response_code === 0) {
                const receivedQuestions = data.results.reduce((questionsArray,question)=>{

                    const answers = [question.correct_answer, ...question.incorrect_answers];
                    answers.sort(()=>Math.random() - 0.5);

                    const questionData = {
                        question: question.question,
                        answers,
                        correctAnswer: question.correct_answer,
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
    console.log(selectedAnswers);

    const questionsElement = questions.map((q,index) => {
        const id = nanoid();
        
        return (
            <Question
                key={id}
                id={id}
                questionNumber={index+1}
                question={q.question}
                answers={q.answers}
                selectedAnswers={selectedAnswers}
                setSelectedAnswers={setSelectedAnswers}
            />
        )

        }
    );
    
    return (
        <main className='game'>
            <section className='game-section'>
                {questionsElement}
            </section>
        </main>
    )
}
