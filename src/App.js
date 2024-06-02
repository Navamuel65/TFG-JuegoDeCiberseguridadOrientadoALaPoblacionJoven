import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import { config } from './config/config.js';
import { mockdata } from './constants/nivel.js';

import { useEffect, useState } from 'react';

import Estadisticas from './components/Estadisticas.js';
import Lecciones from './components/Lecciones.js';
import Menu from './components/Menu.js';
import MultipleChoice from './components/MultipleChoice.js';
import Nivel from './components/Nivel.js';
import Relaciona from './components/Relaciona.js';

function App() {

const [showIntro, setShowIntro] = useState(false);

const [gameScore, setGameScore] = useState(0); //Puntuación del test
const [gameOver, setGameOver] = useState(false); //Indica si se ha terminado el test
const [time, setTime] = useState({minutes: 0, seconds: 0}); //Tiempo tomado en hacer el test
const [videoVisto, setVideoVisto] = useState(JSON.parse(localStorage.getItem('videoVisto')) || false); //Indica si se ha visto el video de introducción
const [preguntasTest, setPreguntasTest] = useState(mockdata.nivel[0].test); //Preguntas del test
const [isLoading, setIsLoading] = useState(true); //Indica si las preguntas del test están cargadas
const [imagenNivelActual, setImagenNivelActual] = useState(0); //Imagen del nivel actual

//Estado inicial de la partida
const [estadoPartida, setEstadoPartida] = useState({
  monedas: 0,
  niveles: Array.from({ length: mockdata.nivel.length }).map((level, index) => ({
    superado: false,
    isBloqueado: mockdata.nivel[index].bloqueado.isBloqueado,
    monedasDesbloquear: mockdata.nivel[index].bloqueado.monedasDesbloquear,
    maxAciertos: 0,
    intentos: {
      numIntentos: 0,
      aciertosTotales: 0,
      fallosTotales: 0,
      mejorMinutos: 0,
      mejorSegundos: 0,
    },
    }))
});

//Funciones para mostrar y cerrar el video de introducción
const handleClose = () => {
  setShowIntro(false);
  setVideoVisto(true);
};

const handleShow = () => {
  setShowIntro(true);
};

useEffect(() => {
  localStorage.setItem('videoVisto', JSON.stringify(videoVisto));
  if (videoVisto !== true) {
    setTimeout(() => {
      handleShow();
    }, 700);
  }
}, [videoVisto]);

/*const subirEstadoPartida = () => {
  fetch(config.url, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(estadoPartida),
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success:', data);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
}*/

//Función para generar preguntas con una inteligencia artificial
const generaPreguntasGPT = async (tematicaPrueba) => {

  setIsLoading(true);

  const prompt = `Quiero que generes un JSON cuyo formato depende de "tipoPrueba" (que generaras tu aleatoriamente entre las siguientes opciones: "relaciona" o "multiplechoice") y cuya tematica esta definida por "tematicaPrueba". El JSON tiene una clave, llamada test, que contiene diversos objetos. El primer objeto es "tipoPrueba", cuyo valor sera el que tu le des aleatoriamente entre los valores que te he dicho. El siguiente objeto es "minScore", que es un numero entero igual a la mitad del numero de preguntas. Si el numero de preguntas es impar, "minScore" se redondea al entero superior. A continuacion se genera el objeto "ejercicio", que depende de si "tipoPrueba" es "relaciona" o "multiplechoice". Si es "multiplechoice", "ejercicio" es un array de objetos donde cada objeto esta formado por una clave "question" con una pregunta sobre "tematicaPrueba", un array llamado "answers" con cuatro posibles respuestas a la pregunta donde solo una es correcta y el resto erróneas (tiene que quedar claro cuál es la respuesta correcta), y la clave "correct" que es la posicion del array de "answers" donde esta la respuesta correcta. Cuando "tipoPrueba" es "multiplechoice" generas entre 3 y 6 objetos en el array "ejercicio". Si "tipoPrueba" es "relaciona", "ejercicio" es un objeto que contiene una clave que se llama "grupos" que es un array de longitud variable entre 2 y 4 de posibles grupos en los que categorizar los siguientes elementos, un objeto llamado "elementos" que es un array de objetos donde cada objeto tiene una clave llamada "elemento" que es el elemento a categorizar y que puede ser un concepto o una situacion de la vida cotidiana relacionada con la temática y con los grupos generados, y una clave llamada "correct", que es la posicion del array "grupos" que corresponde con el grupo al que pertenece el elemento. Los grupos generados no puede llamarse "Contenido" ni "Situación" y deben ser algo elaborados. Los elementos no pueden estar escritos en forma impersonal, sino en primera persona y deben ser situaciones en las que el usuario se pueda encontrar en su día a día. Cuando "tipoPrueba" es "relaciona", generas entre 6 y 10 objetos en el array "elementos". Quiero que solo devuelvas el JSON. La tematica que quiero que sigas es "${tematicaPrueba}". Las preguntas que generas estan destinadas a un adolescente entre 10 y 18 años. La dificultad de las preguntas debe ser"${config.chatGPT.dificultad}".`;

  try {
      const response = await fetch(config.chatGPT.chatUrl, {
          method: 'POST',
          headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${config.chatGPT.apiKey}`
          },
          body: JSON.stringify({
              model: 'gpt-3.5-turbo',
              messages: [{ role: 'user', content: prompt }],
              max_tokens: 2048,
          })
      });

      const data = await response.json();
      const content = JSON.parse(data.choices[0].message.content);
      setPreguntasTest(content.test);
      return content.test;
  } catch (error) {
      console.error('Error:', error);
  } finally {
      setIsLoading(false);
  }
}

  return (
        <div id="App-background">
          <Modal show={showIntro} onHide={handleClose} backdrop="static" keyboard={false} centered>
            <Modal.Header closeButton>
              <Modal.Title>Bienvenido</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div id="App-frame">
                <video id="App-video" controls controlsList="nodownload">
                  <source src={require("./assets/VideoIntro.mov")} type="video/mp4"/>
                </video>
              </div>
            </Modal.Body>
            <Modal.Footer>
              <button className="btn btn-secondary" onClick={handleClose}>
                Cerrar
              </button>
            </Modal.Footer>
          </Modal>

          <Router>
            <Routes>
              <Route path="/" element={<Menu nivel={mockdata.nivel} estadoPartida={estadoPartida} setEstadoPartida={setEstadoPartida} setVideoVisto={setVideoVisto} imagenNivelActual={imagenNivelActual} setImagenNivelActual={setImagenNivelActual} config={config} />} />
              <Route path="/nivel/:nivelId" element={<Nivel nivel={mockdata.nivel} gameScore={gameScore} setGameScore={setGameScore} gameOver={gameOver} setGameOver={setGameOver} estadoPartida={estadoPartida} setEstadoPartida={setEstadoPartida} time={time} setTime={setTime} preguntasTest={preguntasTest} setPreguntasTest={setPreguntasTest} config={config} isLoading={isLoading} setIsLoading={setIsLoading} generaPreguntasGPT={generaPreguntasGPT} setImagenNivelActual={setImagenNivelActual} />} />
              <Route path="/multiplechoice/:nivelId" element={<MultipleChoice nivel={mockdata.nivel} gameScore={gameScore} setGameScore={setGameScore} gameOver={gameOver} setGameOver={setGameOver} time={time} setTime={setTime} preguntasTest={preguntasTest} isLoading={isLoading} />} />
              <Route path="/relaciona/:nivelId" element={<Relaciona nivel={mockdata.nivel} gameScore={gameScore} setGameScore={setGameScore} gameOver={gameOver} setGameOver={setGameOver} time={time} setTime={setTime} preguntasTest={preguntasTest} isLoading={isLoading} />} />
              <Route path="/lecciones" element={<Lecciones nivel={mockdata.nivel} estadoPartida={estadoPartida} />} />
              <Route path="/estadisticas" element={<Estadisticas nivel={mockdata.nivel} estadoPartida={estadoPartida} config={config} />} />
            </Routes>
          </Router>
        </div>
  );
}


export default App;
