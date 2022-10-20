import React from 'react';
import { nanoid } from 'nanoid';
import Question from '../Question/Question';
import LoadingScreen from './LoadingScreen';

export default function Game(props) {
    
    const [isPending, setIsPending] = React.useState(true);
    const [questions, setQuestions] = React.useState([]);
    const [areAnswersRevealed, setAreAnswersRevealed] = React.useState(false);
    const [score, setScore] = React.useState(0);

    const {newGame} = props;
    
    function checkAnswers() {
        if(areAnswersRevealed) {
            setAreAnswersRevealed(false);
            props.setNewGame(false);
        } else {
            questions.forEach(question=>{
                if(question.selectedAnswer === question.correctAnswer) setScore(prevScore => prevScore+1);
            });
            setAreAnswersRevealed(true);
        }

    }

    React.useEffect(()=>{
        async function getQuestionsFromAPI() {  
            setIsPending(true);          
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
                setIsPending(false);
            }
        }
        
        if(newGame) getQuestionsFromAPI();
        
    },[newGame]);

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
        isPending ? <LoadingScreen /> :
        <main className='game'>
            <section className='game-section'>
                {questionsElement}
            </section>

            <section className='check-answers'>
                {areAnswersRevealed && <p className='score'>
                    {`You scored ${score} out of 5 correct answers`}
                </p>}

                <button
                    className='button check-answers-button'
                    onClick={checkAnswers}
                >
                    {areAnswersRevealed ? 'Start new game' : 'Check answers'}
                </button>
            </section>
            
        </main>
    )
}