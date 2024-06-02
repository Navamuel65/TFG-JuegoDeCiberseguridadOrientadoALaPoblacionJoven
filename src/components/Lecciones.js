import { useNavigate } from "react-router-dom";
import './Lecciones.css';


export default function Lecciones({nivel, estadoPartida}) {

    let navigate = useNavigate();

    return (
    <div id="Lecciones-box">
        <div id="Lecciones-header">
            <h1 id="Lecciones-title">Lecciones</h1>
        </div>


        {nivel.map(function(level, index){
            if (!estadoPartida.niveles[index].isBloqueado) {
                return (
                    <div id="Lecciones-frame">
                        <div id="Lecciones-nivel">
                            <div style={{display: "flex", flexFlow: "column", justifyContent: "center", alignItems: "center", marginRight: "20px", width: "20vw", minWidth: "150px"}}>
                                <p id="Lecciones-name">{level.name}</p>
                            </div>
                    
                            <video id="Lecciones-video" key={index} controls>
                                <source src={require("../assets/" + level.video)} type="video/mp4"/>
                            </video>
                        </div>
                    </div>
                );
            }
        })}

        <div id="Lecciones-footer">
            <p className="btn btn-primary" id="Lecciones-return" onClick={() => {navigate("/")}}>Volver al Menú</p>
        </div>
    </div>
    );
}