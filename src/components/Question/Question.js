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
            <span key={answerID}>
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
        <section className='question'>
            <div className='question-question'>{he.decode(props.question)}</div>
            <form name={props.id} className='question-answers'>
                {answersElements}
            </form>
            <hr/>
        </section>
    )
}