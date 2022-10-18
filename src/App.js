import React from 'react';
import StartNewGame from './components/screens/StartNewGame';
import Game from './components/screens/Game';

export default function App() {

    // TODO:
    // Add loading screen
    // Allow user to select difficulty of the questions

    const [newGame, setNewGame] = React.useState(false);
    const [isPending, setIsPending] = React.useState(true);
    
    function startNewGame() {
        setNewGame(true);
    }
    
    return (
        <>
            {newGame ?
                <Game newGame={newGame} setNewGame={setNewGame} isPending={isPending}/> :
                <StartNewGame startNewGame={startNewGame}/>
            }
        </>
    )
}
