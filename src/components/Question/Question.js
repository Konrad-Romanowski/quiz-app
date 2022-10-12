import React from 'react';
import he from 'he'; // HTML entity encoder/decoder - used to format HTML symbols code to normal text

export default function Question(props) {

    const {questionNumber, question, answers, correctAnswer, selectedAnswer} = props.question;

    // TODO:
    // Style template

    function selectAnswer(answer) {
        props.setQuestions(prevQuestionData => {
            const newQuestionData = [...prevQuestionData];
            newQuestionData[questionNumber - 1].selectedAnswer = answer;
    
            return newQuestionData;
        })        
    }

    const answersElements = answers.map((answer,index) => {
        const answerID = `${props.id}-${index}`;

        return (
            <span className='answer' key={answerID}>
                <input
                    type='radio'
                    id={answerID}
                    name={props.id}
                    value={answer}
                    checked={selectedAnswer === answer}
                    onChange={()=>selectAnswer(answer)}
                />
                <label htmlFor={answerID}>{he.decode(answer)}</label>
            </span>
        )

        }
    );
        
    return (
        <section className='question-container'>
            <p className='question'>{`${questionNumber}. ${he.decode(question)}`}</p>
            <form name={props.id} className='answer-form'>
                {answersElements}
            </form>
            <hr/>
        </section>
    )
}