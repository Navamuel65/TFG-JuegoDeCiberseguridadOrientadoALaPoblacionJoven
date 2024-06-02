import { useNavigate } from "react-router-dom";
import './Estadisticas.css';


export default function Estadisticas({nivel, estadoPartida, config}) {

    let navigate = useNavigate();

    //Funciones auxiliares
    const longitudPreguntas = (nivelId) => {
        if(!config.use_gpt) {
            if (nivel[nivelId].test.tipoPrueba === "multiplechoice") {
                return nivel[nivelId].test.ejercicio.length;
            } else if (nivel[nivelId].test.tipoPrueba === "relaciona") {
                return nivel[nivelId].test.ejercicio.elementos.length;
            }
        } else {
            return estadoPartida.niveles[nivelId].intentos.aciertosTotales + estadoPartida.niveles[nivelId].intentos.fallosTotales;
        }
    }

    const porcentajeAciertos = (nivelId) => {
        let porcent = (estadoPartida.niveles[nivelId].intentos.aciertosTotales / longitudPreguntas(nivelId)) * 100;
        if (isNaN(porcent)) {
            return 0;
        }
        return porcent;
    }

    const mejorTiempo = (nivelId) => {
        let minutos = estadoPartida.niveles[nivelId].intentos.mejorMinutos;
        let segundos = estadoPartida.niveles[nivelId].intentos.mejorSegundos;
        if ((minutos === 0) && (segundos === 0)) {
            return "No hay ningún tiempo registrado";
        } else {
            return minutos + " minutos y " + segundos + " segundos";
        }
    }

    return (
    <div id="Stats-box">
        <div id="Stats-header">
            <h1 id="Stats-title">Estadísticas</h1>
        </div>

        {nivel.map(function(level, index){
            if (!estadoPartida.niveles[index].isBloqueado) {
                return (
                    <div id="Stats-frame" key={index}>
                        <div id="Stats-nivel">
                            <div style={{display: "flex", flexFlow: "column", justifyContent: "center", alignItems: "center", marginRight: "20px"}}>
                                <p id="Stats-name">{level.name}</p>
                                <p className="Stats-stat">Estado del nivel: {estadoPartida.niveles[index].superado ? "Superado" : "No superado"}</p>
                                <p className="Stats-stat">Número de intentos: {estadoPartida.niveles[index].intentos.numIntentos}</p>
                                <p className="Stats-stat">Máximo número de aciertos por intento: {estadoPartida.niveles[index].maxAciertos} {config.usegpt ? (" de " + longitudPreguntas(index)) : (null)}</p>
                                <p className="Stats-stat">Número de aciertos totales: {estadoPartida.niveles[index].intentos.aciertosTotales}</p>
                                <p className="Stats-stat">Número de fallos totales: {estadoPartida.niveles[index].intentos.fallosTotales}</p>
                                <p className="Stats-stat">Porcentaje de aciertos: {porcentajeAciertos(index).toFixed(2)}%</p>
                                <p className="Stats-stat">Mejor tiempo: {mejorTiempo(index)}</p>
                            </div>
                        </div>
                    </div>
                );
            }
            
        })}

        <div id="Stats-footer">
            <p className="btn btn-primary" id="Stats-return" onClick={() => {navigate("/")}}>Volver al Menú</p>
        </div>
    </div>
    );
}