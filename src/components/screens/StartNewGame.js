import React from 'react';

export default function StartNewGame(props) {
    return (
        <article className='start-new-game'>
            <section className='start-new-game-menu'>
                <h2 className='start-new-game-title'>Quiz App</h2>
                <h3 className='start-new-game-subtitle'>Test your knowledge!</h3>
                <button className='start-new-game-button' onClick={props.startNewGame}>New game</button>
            </section>
        </article>
    )
}
