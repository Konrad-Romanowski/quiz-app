import React from 'react';
import StartNewGame from './components/screens/StartNewGame';
import Game from './components/screens/Game';

export default function App() {

    // TODO:
    // Add loading screen

    const [newGame, setNewGame] = React.useState(false);
    
    function startNewGame() {
        setNewGame(true);
    }
    
    return (
        <>
            {newGame ?
                <Game newGame={newGame}/> :
                <StartNewGame startNewGame={startNewGame}/>
            }
        </>
    )
}
