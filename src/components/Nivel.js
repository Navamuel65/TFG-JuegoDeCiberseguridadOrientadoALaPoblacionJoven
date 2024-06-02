import { useEffect, useState } from "react";
import Accordion from 'react-bootstrap/Accordion';
import Modal from 'react-bootstrap/Modal';
import ProgressBar from 'react-bootstrap/ProgressBar';
import { useNavigate, useParams } from "react-router-dom";
import './Nivel.css';

export default function Nivel({nivel, gameScore, setGameScore, gameOver, setGameOver, estadoPartida, setEstadoPartida, time, setTime, preguntasTest, setPreguntasTest, config, generaPreguntasGPT, setImagenNivelActual}) {
    
    let{ nivelId } = useParams();
    let navigate = useNavigate();

    const [test, setTest] = useState(null); //Preguntas del test
    const [isLoaded, setIsLoaded] = useState(false); //Indica si las preguntas del test están cargadas
    const [showPopup, setShowPopup] = useState(false); //Indica si se muestra el popup para confirmar el inicio del test
    const [showLoading, setShowLoading] = useState(false); //Indica si se muestra el popup de carga
    const [progressBarValue, setProgressBarValue] = useState(0); //Valor de la barra de progreso

    //Funciones para mostrar y cerrar los popups
    const handleShowPopup = () => setShowPopup(true);
    const handleClosePopup = () => setShowPopup(false);
    const handleShowLoading = () => setShowLoading(true);
    const handleCloseLoading = () => setShowLoading(false);

    //Función que se ejecuta al carga las preguntas del test
    useEffect(() => {
        setTimeout(() => {
            setProgressBarValue(100);
            if (test && isLoaded) {
                setTimeout(() => {
                    if (test.tipoPrueba === "multiplechoice") {
                        navigate("/multiplechoice/" + nivelId);
                        setIsLoaded(false);
                        setProgressBarValue(0);
                    } else if (test.tipoPrueba === "relaciona") {
                        navigate("/relaciona/" + nivelId);
                        setIsLoaded(false);
                        setProgressBarValue(0);
                    }
                }, 600);
            }
        }, 1000);
    }, [test, navigate, nivelId, isLoaded, setIsLoaded]);

    //Función que compara la puntuación obtenida en el test con la puntuación mínima requerida
    const compareScore = (gameScore) => {
        if (gameScore >= preguntasTest.minScore) {
            return true;
        } else {
            return false;
        }
    }

    //Función que actualiza el estado de la partida tras haber completado el test
    const updateEstadoPartida = (gameScore, nivelId) => {
        setEstadoPartida(estadoPrevio => {
            const nuevoEstado = { ...estadoPrevio };
            const level = nuevoEstado.niveles[nivelId - 1];

            if (!level.superado) {
                if (compareScore(gameScore)) {
                    level.superado = true;
                }
            }

            if (gameScore > level.maxAciertos) {
                level.maxAciertos = gameScore;
            }

            nuevoEstado.monedas += gameScore * 100;
            level.intentos.numIntentos += 1;
            level.intentos.aciertosTotales += gameScore;
            if (preguntasTest.tipoPrueba === "multiplechoice") {
                level.intentos.fallosTotales += preguntasTest.ejercicio.length - gameScore;
            } else if (preguntasTest.tipoPrueba === "relaciona") {
                level.intentos.fallosTotales += preguntasTest.ejercicio.elementos.length - gameScore;
            }

            if (level.intentos.mejorMinutos === 0 && level.intentos.mejorSegundos === 0) {
                level.intentos.mejorMinutos = time.minutes;
                level.intentos.mejorSegundos = time.seconds;
            }else if (level.intentos.mejorMinutos >= time.minutes) {
                level.intentos.mejorMinutos = time.minutes;
                if (level.intentos.mejorSegundos > time.seconds) {
                    level.intentos.mejorSegundos = time.seconds;
                }
            }
            setTime({minutes: 0, seconds: 0});
            return nuevoEstado;
        });
    }

    //Función que se ejecuta tras haber completado el test y resetea los valores de gameScore y gameOver
    const handleGame = () => {
        updateEstadoPartida(gameScore, nivelId);
        setGameScore(0);
        setGameOver(false);
    }

    //Función que genera las preguntas del test
    const handlePreguntasTest = async (tematicaPrueba) => {
        setProgressBarValue(20);
        if (config.use_gpt) {
            return await generaPreguntasGPT(tematicaPrueba);
        } else {
            return new Promise(resolve => {
                setTimeout(() => {
                    setProgressBarValue(70);
                    resolve(nivel[nivelId - 1].test);
                }, 1000);
            });
        }
    }

    //Función que carga las preguntas del test
    const handleTest = async () => {
        let jsonGPT = await handlePreguntasTest(nivel[nivelId - 1].tematicaPrueba);
        setProgressBarValue(75);
        setTest(jsonGPT);
        setPreguntasTest(jsonGPT);
        setIsLoaded(true);
    }

    return (
        <div id="Nivel-box">
            <div id="Nivel-template">

            
            <div id="Nivel-header">
                <h1 id ="Nivel-title">{nivel[nivelId - 1].name}</h1>
            </div>
            <div id="Nivel-frame">
                <video id="Nivel-video" controls controlsList="nodownload">
                    <source src={require("../assets/" + nivel[nivelId - 1].video)} type="video/mp4"/>
                </video>
            </div>
            <div id="Nivel-text">
                <Accordion defaultActiveKey="0" style={{width: "100%"}}>
                    <Accordion.Item eventKey="0">
                        <Accordion.Header>Contenido de la Lección</Accordion.Header>
                        <Accordion.Body>
                            <embed src={require("../assets/" + nivel[nivelId - 1].description) + "#view=FitH"} type="application/pdf" id="Nivel-description" style={{width: "100%", height: "60vh"}}/>
                        </Accordion.Body>
                    </Accordion.Item>
                </Accordion>
            </div>

            
            {/*Popup para confirmar que se quiere comenzar el test*/}
            <Modal show={showPopup} onHide={handleClosePopup} backdrop="static" keyboard={false} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Si comienzas el test, no podrás salir hasta completarlo</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>¿Estás seguro de que quieres comenzar?</p>
                </Modal.Body>
                <Modal.Footer>
                    <button className="btn btn-success" onClick={async () => {handleClosePopup(); handleShowLoading(); await handleTest();}}>Sí, comenzar Test</button>
                    <button className="btn btn-danger" onClick={handleClosePopup}>Mejor no</button>
                </Modal.Footer>
            </Modal>

            {/*Popup de carga*/}
            <Modal show={showLoading} onHide={handleCloseLoading} backdrop="static" keyboard={false} centered>
                <Modal.Header>
                    <Modal.Title>Generando preguntas</Modal.Title>
                </Modal.Header>
                <Modal.Body><ProgressBar animated now={progressBarValue} /></Modal.Body>
            </Modal>
            
            <div id="Nivel-testBox">
                <button className="btn btn-success" id="Nivel-test" onClick={handleShowPopup}>Comenzar Test</button>
            </div>
            
            {/*Popup tras haber acabado el test*/}
            <Modal show={gameOver} onHide={handleGame} backdrop="static" keyboard={false} centered>
                <Modal.Header closeButton>
                    <Modal.Title>
                        {compareScore(gameScore) ?
                        <p>¡Felicidades! Has superado el test</p>
                        :
                        <p>Lástima, no has superado el test</p>
                        }
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Has obtenido {gameScore * 100} monedas. Ahora tienes {estadoPartida.monedas + gameScore * 100} monedas en total.</p>
                    {(compareScore(gameScore)) && ((gameScore * 100 + estadoPartida.monedas) >= nivel[nivelId].bloqueado.monedasDesbloquear) && (nivelId !== nivel.length) ?
                    <p><b>¡Tienes suficientes monedas para desbloquear el siguiente nivel!</b> ¿Quieres ir a desbloquearlo?</p>
                    :
                    <p>Puedes conseguir más monedas repitiendo el test. ¿Quieres volver a intentarlo?</p>
                    }
                </Modal.Body>
                <Modal.Footer>
                    {(compareScore(gameScore)) && ((gameScore * 100 + estadoPartida.monedas) >= nivel[nivelId].bloqueado.monedasDesbloquear) && (nivelId !== nivel.length) ?
                    <div>
                        <button className="btn btn-success" style={{margin: 10}} onClick={() => {handleGame(); setImagenNivelActual(nivelId); navigate("/")}}>Sí, ir a desbloquearlo</button>
                        <button className="btn btn-danger" onClick={() => {handleGame(); navigate("/")}}>No, volver al Menú Principal</button>
                    </div>
                    :
                    <div>
                        <button className="btn btn-success" style={{margin: 10}} onClick={() => {handleGame(); handleShowLoading(); handleTest();}}>Sí, volver a intentarlo</button>
                        <button className="btn btn-danger" onClick={() => {handleGame(); navigate("/")}}>No, volver al Menú Principal</button>
                    </div>
                    }
                </Modal.Footer>
            </Modal>
            
            <div id="Nivel-footer">
                <p className="btn btn-primary" id="Nivel-return" onClick={() => {navigate("/")}}>Volver al Menú</p>
            </div>
            </div>
        </div>
    );
}
