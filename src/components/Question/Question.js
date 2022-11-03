import React from 'react';
import he from 'he'; // HTML entity encoder/decoder - used to format HTML symbols code to normal text

export default function Question(props) {

    const {questionNumber, question, answers, correctAnswer, selectedAnswer} = props.question;
    const {areAnswersRevealed, setQuestions, id} = props;

    // TODO:
    // Style template

    const styleCorrect = {
        backgroundColor: '#bff8bf'
    }

    const styleIncorrect = {
        backgroundColor: '#ffa9a9'
    }

    function selectAnswer(answer) {
        setQuestions(prevQuestionData => {
            const newQuestionData = [...prevQuestionData];
            newQuestionData[questionNumber - 1].selectedAnswer = answer;
    
            return newQuestionData;
        });
    }

    const answersElements = answers.map((answer,index) => {
        const answerID = `${id}-${index}`;

        return (
            <span className='answer' key={answerID}>
                <input
                    type='radio'
                    id={answerID}
                    name={id}
                    value={answer}
                    checked={selectedAnswer === answer}
                    onChange={()=>selectAnswer(answer)}
                    disabled={areAnswersRevealed}
                />
                <label
                    htmlFor={answerID}
                    style={(areAnswersRevealed && answer === correctAnswer) ? styleCorrect : 
                            (areAnswersRevealed && selectedAnswer === answer && selectedAnswer !== correctAnswer) ? styleIncorrect : null}
                >
                    {he.decode(answer)}
                </label>
            </span>
        )

        }
    );
        
    return (
        <section className='question-container'>
            <p className='question'>{`${questionNumber}. ${he.decode(question)}`}</p>
            <form name={id} className='answer-form'>
                {answersElements}
            </form>
            <hr/>
        </section>
    )
}