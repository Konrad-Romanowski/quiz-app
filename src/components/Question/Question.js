import React from 'react';
import he from 'he'; // HTML entity encoder/decoder - used to format HTML symbols code to normal text

export default function Question(props) {

    // TODO:
    // Mix answers
    // Add a key prop to the answersElements
    // Modify answersElements to input+label elements

    const answers = [props.correctAnswer, ...props.incorrectAnswers];
    const answersElements = answers.map(answer =>
        <div>{he.decode(answer)}</div>
    )

        return (
        <section className='question'>
            <div className='question-question'>{he.decode(props.question)}</div>
            <div className='question-answers'>
                {answersElements}
            </div>
            <hr/>
        </section>
    )
}
