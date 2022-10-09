import React from 'react';
import { nanoid } from 'nanoid';
import Question from '../Question/Question';

export default function Game(props) {

    // TODO:
    // Add state with user answers

    const [questions, setQuestions] = React.useState([]);

    React.useEffect(()=>{
        async function getQuestionsFromAPI() {
            const res = await fetch('https://opentdb.com/api.php?amount=5&type=multiple');
            const data = await res.json();
            if(data.response_code === 0) {
                setQuestions(data.results);
            }
        }

        if(props.newGame) getQuestionsFromAPI();
    },[props.newGame]);

    // Helper functions
    console.log(questions);
    questions.forEach(q => console.log(q.correct_answer))

    const questionsElement = questions.map((q,index) => {
        const id = nanoid();
        
        return (
            <Question
                key={id}
                id={id}
                question={`${index+1}. ${q.question}`}
                correctAnswer={q.correct_answer}
                incorrectAnswers={q.incorrect_answers}
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
