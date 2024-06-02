import  React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './Menu.css';

export default function Menu({nivel, estadoPartida, setEstadoPartida, setVideoVisto, imagenNivelActual, setImagenNivelActual, config}) {

    const [nivelId, setNivelId] = useState(imagenNivelActual); //Id del nivel actual
    const [showDesplegable, setShowDesplegable] = useState(false); //Indica si se muestra el menú desplegable
    const [showInput, setShowInput] = useState(false); //Indica si se muestra el popup para guardar partida
    const [nombrePartida, setNombrePartida] = useState(""); //Nombre de la partida
    const [showBlock, setShowBlock] = useState(false); //Indica si se muestra el popup para desbloquear un nivel
    const [showWarning, setShowWarning] = useState(false); //Indica si se muestra el popup de warning al intentar desbloquear un nivel sin monedas suficientes
    const [showPartidas, setShowPartidas] = useState(false); //Indica si se muestra el popup para cargar una partida

    let navigate = useNavigate();

    //Funciones para mostrar y cerrar el menú desplegable y los popups
    const handleCloseDesplegable = () => setShowDesplegable(false);
    const handleShowDesplegable = () => setShowDesplegable(true);
    const handleShowInput = () => setShowInput(true);
    const handleCloseInput = () => setShowInput(false);
    const handleShowBlock = () => setShowBlock(true);
    const handleCloseBlock = () => setShowBlock(false);
    const handleShowWarning = () => setShowWarning(true);
    const handleCloseWarning = () => setShowWarning(false);
    const handleShowPartidas = () => setShowPartidas(true);
    const handleClosePartidas = () => setShowPartidas(false);

    //Función para cambiar de imagen
    const changeImage = (direction) => {
      if (direction === "right") {
        if (imagenNivelActual < nivel.length - 1) {
          setNivelId(nivelId + 1);
          setImagenNivelActual(imagenNivelActual + 1);
        } else {
          setNivelId(0);
          setImagenNivelActual(0);
        }
      } else {
        if (imagenNivelActual > 0) {
          setNivelId(nivelId - 1);
          setImagenNivelActual(imagenNivelActual - 1);
        } else {
          setNivelId(nivel.length - 1);
          setImagenNivelActual(nivel.length - 1);
        }
      }
    }

    //Función para actualizar el estado de videoVisto
    const updateVideoVisto = () => {
      setVideoVisto(false);
    }

    //Función para cargar una partida
    const cargarPartida = (id) => {
      fetch(config.url[id -1])
      .then(response => response.json())
      .then(data => {
        setEstadoPartida(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
    }

    //Función para guardar una partida
    const guardarPartida = (name) => {
      console.log(name);
      console.log(estadoPartida);
    }

    //Función para desbloquear un nivel
    const desbloquearNivel = (id) => {
      if (estadoPartida.monedas < estadoPartida.niveles[id].monedasDesbloquear) {
        handleCloseBlock();
        handleShowWarning();
      } else {
        setEstadoPartida(estadoPrevio => {
          const nuevoEstado = { ...estadoPrevio };
          const nivel = nuevoEstado.niveles[id];
          nivel.isBloqueado = false;
          nuevoEstado.monedas -= nivel.monedasDesbloquear;
          return nuevoEstado;
        });
      }
    }

    return (
        <div id="Menu-box">
          <div id="Menu-header">
            <div id="Menu-cabecera">
              <div id="Menu-intro">
                <img id="Menu-menu" src={require("../assets/menu.png")} alt="menu" onClick={() => handleShowDesplegable()} ></img>
              </div>
              <div style={{width: "100%", display: "flex", justifyContent: "center", alignItems: "center"}}>
                <p id="Menu-title">{estadoPartida.niveles[nivelId].isBloqueado ? "???" : nivel[imagenNivelActual].name}</p>
              </div>
              <div style={{display: "flex", flexFlow: "row", justifyContent: "center", alignItems: "center", width: "15%"}}>
                <p id="Menu-monedas">{estadoPartida.monedas}</p>
                <img id="Menu-monedasImage" src={require("../assets/coin.png")} alt="monedas"></img>
              </div>
              
            </div>
          </div>

          {/*Menu Desplegable*/}
          <>
            <Offcanvas show={showDesplegable} onHide={handleCloseDesplegable}>
              <Offcanvas.Header closeButton>
                <Offcanvas.Title>Menú</Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <div style={{ display: "flex", flexFlow: "column", justifyContent: "center", alignItems: "start" }}>
                  <Button style={{ marginBottom: "2vh" }} className="btn btn-secondary" onClick={() => {updateVideoVisto(); handleCloseDesplegable();}} >Ver Vídeo Introductorio</Button>
                  <Button style={{ marginBottom: "2vh" }} className="btn btn-primary" onClick={() => {handleCloseDesplegable(); handleShowPartidas();}} >Cargar Partida</Button>
                  <Button style={{ marginBottom: "2vh" }} className="btn btn-success" onClick={() => {handleCloseDesplegable(); handleShowInput();}}>Guardar Partida</Button>
                </div>
              </Offcanvas.Body>
            </Offcanvas>
          </>

          {/*Popup para guardar partida*/}
          <>
            <Modal show={showInput} onHide={handleCloseInput} backdrop="static" keyboard={false} centered>
              <Modal.Header closeButton>
                <Modal.Title>Introduce el nombre de tu partida</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <input className="form-control" placeholder="Nombre de la partida" onChange={e => setNombrePartida(e.target.value)}></input>
              </Modal.Body>
              <Modal.Footer>
                <Button className="btn btn-success" onClick={() => {guardarPartida(nombrePartida); handleCloseInput();}}>Guardar</Button>
                <Button className="btn btn-danger" onClick={handleCloseInput}>
                  Cancelar
                </Button>
              </Modal.Footer>
            </Modal>
          </>

          {/*Popup para cargar una partida*/}
          <>
            <Modal show={showPartidas} onHide={handleClosePartidas} backdrop="static" keyboard={false} centered>
              <Modal.Header>
                <Modal.Title>Selecciona la partida que quieras cargar</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Button className="btn btn-primary" onClick={() => {handleClosePartidas(); cargarPartida(1);}} style={{margin: 10}}>Partida 1</Button>
                <Button className="btn btn-primary" onClick={() => {handleClosePartidas(); cargarPartida(2);}} style={{margin: 10}}>Partida 2</Button>
                <Button className="btn btn-primary" onClick={() => {handleClosePartidas(); cargarPartida(3);}} style={{margin: 10}}>Partida 3</Button>
                <Button className="btn btn-primary" onClick={() => {handleClosePartidas(); cargarPartida(4);}} style={{margin: 10}}>Partida 4</Button>
              </Modal.Body>
            </Modal>
          </>

          {/*Popup para desbloquear nivel*/}
          <>
            <Modal show={showBlock} onHide={handleCloseBlock} backdrop="static" keyboard={false} centered>
              <Modal.Header>
                <Modal.Title>Nivel bloqueado</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>Para desbloquear este nivel tienes que dar {estadoPartida.niveles[nivelId].monedasDesbloquear} monedas. ¿Quieres desbloquearlo?</p>
              </Modal.Body>
              <Modal.Footer>
                <Button className="btn btn-success" onClick={() => {handleCloseBlock(); desbloquearNivel(nivelId);}}>Desbloquear</Button>
                <Button className="btn btn-danger" onClick={() => handleCloseBlock()}>Mejor no</Button>
              </Modal.Footer>
            </Modal>
          </>

          {/*Popup de warning al intentar desbloquear un nivel sin monedas suficientes*/}
          <>
            <Modal show={showWarning} onHide={handleCloseWarning} backdrop="static" keyboard={false} centered>
              <Modal.Header>
                <Modal.Title>No tienes suficientes monedas</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>Gana monedas haciendo tests de niveles que tengas desbloqueados</p>
              </Modal.Body>
              <Modal.Footer>
                <Button className="btn btn-danger" onClick={() => handleCloseWarning()}>Cerrar</Button>
              </Modal.Footer>
            </Modal>
          </>
            
          <div id="Menu-center">
            <div id="Menu-flechaI">
              <img className="Menu-arrow" alt="flecha" src={require("../assets/arrow.png")} onClick={() => changeImage("left")}/>
            </div>
            {estadoPartida.niveles[nivelId].superado ? (
              <img id="Menu-image" alt="nivel" src={require("../assets/" + nivel[imagenNivelActual].miniaturePassed)} onClick={() => {navigate("/nivel/" + nivel[nivelId].nivelId)}}/>
            ) : (
              estadoPartida.niveles[nivelId].isBloqueado ? (
                <img id="Menu-image" alt="nivel" src={require("../assets/" + nivel[imagenNivelActual].miniatureBlocked)} onClick={() => {handleShowBlock()}}/>
              ) : (
                <img id="Menu-image" alt="nivel" src={require("../assets/" + nivel[imagenNivelActual].miniature)} onClick={() => {navigate("/nivel/" + nivel[nivelId].nivelId)}}/>
              )
            )}
            
            <div id="Menu-flechaR">
              <img className="Menu-arrow" alt="flecha" src={require("../assets/arrow.png")} onClick={() => changeImage("right")}/>
            </div>
          </div>
          <div id="Menu-footer">
            <p className="Menu-features" onClick={() => navigate("/lecciones")}>Lecciones</p>
            <p className="Menu-features" onClick={() => navigate("/estadisticas")}>Estadísticas</p>
          </div>
        </div>
    );
}
