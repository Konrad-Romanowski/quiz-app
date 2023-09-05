import React from 'react';
import Question from '../Question/Question';

export default function Game(props) {

    const {questions, setQuestions, setNewGame, setIsPending} = props;

    const [score, setScore] = React.useState(0);
    const [areAnswersRevealed, setAreAnswersRevealed] = React.useState(false);
    
    function checkAnswers() {
        if(areAnswersRevealed) {
            setAreAnswersRevealed(false);
            setNewGame(false);
            setIsPending(true);
        } else {
            questions.forEach(question=>{
                if(question.selectedAnswer === question.correctAnswer) setScore(prevScore => prevScore+1);
            });
            setAreAnswersRevealed(true);
        }
    }

    const questionsElement = questions.map(question => {        
        return (
            <Question
                key={question.id}
                id={question.id}
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