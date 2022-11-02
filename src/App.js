import React from 'react';
import StartNewGame from './components/screens/StartNewGame';
import LoadingScreen from './components/screens/LoadingScreen';
import Game from './components/screens/Game';

export default function App() {

    // TODO:
    // Allow user to select difficulty of the questions

    const [newGame, setNewGame] = React.useState(false);
    const [isPending, setIsPending] = React.useState(true);
    const [questions, setQuestions] = React.useState([]);

    React.useEffect(()=>{
        async function getQuestionsFromAPI() {
            const res = await fetch('https://opentdb.com/api.php?amount=5&type=multiple');
            const data = await res.json();

            if(data.response_code === 0) {
                const receivedQuestions = data.results.reduce((questionsArray,question,index)=>{

                    const answers = [question.correct_answer, ...question.incorrect_answers];
                    answers.sort(()=>Math.random() - 0.5);

                    const questionData = {
                        questionNumber: index+1,
                        question: question.question,
                        answers,
                        correctAnswer: question.correct_answer,
                        selectedAnswer: null
                    }

                    questionsArray.push(questionData);
                    return questionsArray;
                },[]);

                setQuestions(receivedQuestions);
                setIsPending(false);
            }
        }
        
        if(newGame) getQuestionsFromAPI();
        
    },[newGame]);
    

    if(!newGame) return <StartNewGame setNewGame={setNewGame}/>
    if(newGame && isPending) return <LoadingScreen />
    if(newGame && !isPending) return (
        <Game
            questions={questions}
            setQuestions={setQuestions}
            setNewGame={setNewGame}
            setIsPending={setIsPending}
        /> 
    )
}
