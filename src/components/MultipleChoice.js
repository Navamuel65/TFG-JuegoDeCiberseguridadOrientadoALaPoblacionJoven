import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSound } from 'use-sound';
import './MultipleChoice.css';

export default function MultipleChoice({nivel, gameScore, setGameScore, gameOver, setGameOver, time, setTime, preguntasTest}) {

    let navigate = useNavigate();
    let{ nivelId } = useParams();

    const test = preguntasTest; //Preguntas del test

    const [pregunta, setPregunta] = useState(0); //Pregunta actual
    const [click, setClick] = useState("MultipleChoice-box"); //Define si se puede hacer click o no en la pantalla
    const [correct] = useSound(require("../assets/correct_sound_effect.mp3")); //Sonido de acierto
    const [wrong] = useSound(require("../assets/wrong_sound_effect.mp3")); //Sonido de fallo

    //Función que pasa a la siguiente pregunta o que termina el test
    const siguiente = () => {
        if (pregunta < (test.ejercicio.length - 1)) {
            setPregunta(pregunta + 1);
        }else{
            navigate("/nivel/" + nivelId);
            setGameOver(true);
        }
    }

    //Función que comprueba si la respuesta es correcta o no
    const check = async (id) => {
        if (id === test.ejercicio[pregunta].correct) {
            setClick("MultipleChoice-boxNo");
            document.getElementById("box" + id).style.backgroundColor = "#78fe6e";
            setGameScore(gameScore + 1);
            correct();
            setTimeout(() => {
                siguiente();
                setClick("MultipleChoice-box");
                document.getElementById("box" + id).style.backgroundColor = "lightgray";
            }, 1500);
        } else {
            setClick("MultipleChoice-boxNo");
            document.getElementById("box" + id).style.backgroundColor = "#fe6e6e";
            wrong();
            setTimeout(() => {
                siguiente();
                setClick("MultipleChoice-box");
                document.getElementById("box" + id).style.backgroundColor = "lightgray";
            }, 1500);
        }
    }

    //Contador de tiempo
    useEffect(() => {
        let interval = null;
        if (!gameOver) {
            interval = setInterval(() => {
                setTime(prevTime => {
                    let minutes = prevTime.minutes;
                    let seconds = prevTime.seconds + 1;
                    if (seconds === 60) {
                        minutes += 1;
                        seconds = 0;
                    }
                    return {minutes, seconds};
                });
            }, 1000);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [gameOver, setTime]);


    return (
        <div className={click}>
            <div className="MultipleChoice-template">

            
            <div id="MultipleChoice-header">
                <h2 id="MultipleChoice-title">{test.ejercicio[pregunta].question}</h2>
            </div>
            <div>
                <p id="MultipleChoice-time">{time.minutes < 10 ? "0" + time.minutes : time.minutes}:{time.seconds < 10 ? "0" + time.seconds : time.seconds}</p>
            </div>
            <div id="MultipleChoice-question">
                {test.ejercicio[pregunta].answers.map(function(answer, index){
                    return <p id={"box" + index} className="MultipleChoice-answers" key={index} onClick={() => check(index)}>{answer}</p>
                })}
            </div>
            </div>
        </div>
    );
}
