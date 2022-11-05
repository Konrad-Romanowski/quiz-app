import React from 'react';

export default function ErrorScreen(props) {

    const {setIsErrorFromAPI, setNewGame, setIsPending} = props;

    function handleError() {
        setIsErrorFromAPI(false);
        setNewGame(false);
        setIsPending(true);
    }

    return (
        <section className='error-screen'>
            <h2 className='error-screen-title'>Whops!</h2>
            <h3 className='error-screen-subtitle'>Something went wrong</h3>
            <h3 className='error-screen-subtitle'>Please try again.</h3>
            <button
                className='button error-screen-button'
                onClick={handleError}
            >
                Try again
            </button>
        </section>
    )
}
