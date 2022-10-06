import React from 'react';
import { nanoid } from 'nanoid';
import Question from '../Question/Question';

export default function Game(props) {

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

    console.log(questions);

    const questionsElement = questions.map(q =>
        <Question
            key={nanoid()}
            question={q.question}
            correctAnswer={q.correct_answer}
            incorrectAnswers={q.incorrect_answers}
        />
    );
    
    return (
        <article className='game'>
            <section className='game-section'>
                {questionsElement}
            </section>
        </article>
    )
}
