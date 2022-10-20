import React from 'react';
import StartNewGame from './components/screens/StartNewGame';
import Game from './components/screens/Game';

export default function App() {

    // TODO:
    // Allow user to select difficulty of the questions
    // Refactor code

    const [newGame, setNewGame] = React.useState(false);
    
    return (
        <>
            {newGame ?
                <Game newGame={newGame} setNewGame={setNewGame}/> :
                <StartNewGame setNewGame={setNewGame}/>
            }
        </>
    )
}
