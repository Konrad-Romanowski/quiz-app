import React from 'react';

export default function StartNewGame(props) {

    function startNewGame() {
        props.setNewGame(true);
    }

    function changeDifficulty(e) {
        props.setDifficulty(e.target.value)
    }

    return (
        <section className='start-new-game'>
            <header className='start-new-game-header'>
                <h2 className='start-new-game-title'>Quiz App</h2>
                <h3 className='start-new-game-subtitle'>Test your knowledge!</h3>
            </header>

            <div className='start-new-game-difficulty'>
                <h4 className='start-new-game-difficulty-header'>Select difficulty</h4>
                <select className='select-difficulty'
                    onChange={(e)=>changeDifficulty(e)}
                    value={props.difficulty}
                    name='difficulty'
                >
                    <option value=''>All</option>
                    <option value='easy'>Easy</option>
                    <option value='medium'>Medium</option>
                    <option value='hard'>Hard</option>
                </select>
            </div>

            <button className='button start-new-game-button' onClick={startNewGame}>New game</button>
        </section>
    )
}