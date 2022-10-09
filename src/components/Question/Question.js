import React from 'react';
import he from 'he'; // HTML entity encoder/decoder - used to format HTML symbols code to normal text

export default function Question(props) {

    // TODO:
    // Style template

    const answers = [props.correctAnswer, ...props.incorrectAnswers];
    answers.sort(()=>Math.random() - 0.5);

    const answersElements = answers.map((answer,index) => {
        const answerID = `${props.id}-${index}`;

        return (
            <span className='answer' key={answerID}>
                <input
                    id={answerID}
                    value={answer}
                    name={props.id}
                    type='radio'
                />
                <label htmlFor={answerID}>{he.decode(answer)}</label>
            </span>
        )

        }
    );
        
    return (
        <section className='question-container'>
            <p className='question'>{he.decode(props.question)}</p>
            <form name={props.id} className='answer-form'>
                {answersElements}
            </form>
            <hr/>
        </section>
    )
}