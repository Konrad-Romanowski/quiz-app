import React from 'react';

export default function StartNewGame(props) {

    function startNewGame() {
        props.setNewGame(true);
    }

    return (
        <section className='start-new-game'>
            <h2 className='start-new-game-title'>Quiz App</h2>
            <h3 className='start-new-game-subtitle'>Test your knowledge!</h3>
            <button className='button start-new-game-button' onClick={startNewGame}>New game</button>
        </section>
    )
}
