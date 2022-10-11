import React from 'react';
import he from 'he'; // HTML entity encoder/decoder - used to format HTML symbols code to normal text

export default function Question(props) {

    // TODO:
    // Style template

    function selectAnswer(answer) {
        props.setSelectedAnswers(prevSelectedAnswers => {
            const newAnswers = [...prevSelectedAnswers];
            newAnswers[props.questionNumber - 1] = answer;

            return newAnswers;
        })
    }

    const answersElements = props.answers.map((answer,index) => {
        const answerID = `${props.id}-${index}`;

        return (
            <span className='answer' key={answerID}>
                <input
                    type='radio'
                    id={answerID}
                    name={props.id}
                    value={answer}
                    checked={props.selectedAnswers[props.questionNumber-1] === answer}
                    onChange={()=>selectAnswer(answer)}
                />
                <label htmlFor={answerID}>{he.decode(answer)}</label>
            </span>
        )

        }
    );
        
    return (
        <section className='question-container'>
            <p className='question'>{`${props.questionNumber}. ${he.decode(props.question)}`}</p>
            <form name={props.id} className='answer-form'>
                {answersElements}
            </form>
            <hr/>
        </section>
    )
}