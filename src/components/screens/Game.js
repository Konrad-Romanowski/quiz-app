import React from 'react';
import { nanoid } from 'nanoid';
import Question from '../Question/Question';

export default function Game(props) {

    // TODO:
    // Display score after checking the answers
    // Modify check answers button, to start new game after checking answers

    const [questions, setQuestions] = React.useState([]);
    const [areAnswersRevealed, setAreAnswersRevealed] = React.useState(false);
    
    function checkAnswers() {

        setAreAnswersRevealed(true);

        let points = 0;
        questions.forEach(question=>{
            if(question.selectedAnswer === question.correctAnswer) points++;
        });

        console.log(points);
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

    const questionsElement = questions.map(question => {
        const id = nanoid();
        
        return (
            <Question
                key={id}
                id={id}
                question={question}
                setQuestions={setQuestions}
                areAnswersRevealed={areAnswersRevealed}
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
                className='button check-answers-button'
                onClick={checkAnswers}
                // disabled={true}
            >
                Check answers
            </button>
        </main>
    )
}
