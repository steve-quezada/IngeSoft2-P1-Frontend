import { api } from "../services/api"
import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import "./Pregunta.css"

function Pregunta() {
    const [respuestas, setRespuestas] = useState([]) // Hook para actualizar la lista de respuestas
    const [nuevaRespuesta, setNuevaRespuesta] = useState("") // Hook para registrar la nueva respuesta
    const navigate = useNavigate() //Hook para manejar la navegacion
    const location = useLocation()
    const {pregunta, descripcion, autor} = location.state || {}


    function manejarEnvio(e) { 
        e.preventDefault()
        if (nuevaRespuesta.trim() !== "") { //Si la respuesta contiene algo utilizamos os hooks para actualizar la lista y la respuesta
        setRespuestas([...respuestas, { texto: nuevaRespuesta, votos: 0 }])
        setNuevaRespuesta("")
        }
    }

    function botonInicio(){ //Funcion para volver a la Home Page
        navigate('/')
    }

    function votar(index, cambio) {
        setRespuestas((prev) =>
        prev.map((r, i) =>
        i === index ? { ...r, votos: r.votos + cambio } : r
        ));
    }


    
return (
    <div className="mainPregunta">
        <div className="boxPregunta">
            <h2 className="h2Pregunta">{pregunta}</h2>
            {autor && <p className="autor"><strong>Autor:</strong> {autor}</p>}
            {descripcion && <p className="descripcion"><strong>Descripcion:</strong> {descripcion}</p>}
        </div>

        <div className="boxFormulario">
            <form className="formularioRespuesta"onSubmit={manejarEnvio}>
            <textarea className="textareaRespuesta"
                placeholder="Escribe tu respuesta"
                value={nuevaRespuesta}
                onChange={(e) => setNuevaRespuesta(e.target.value)}
                onInput={(e) => {
                    e.target.style.height = "auto";   // Reinicia altura
                    e.target.style.height = e.target.scrollHeight + "px"; // Ajusta según contenido
                }}
            />
            <button className="botonResponder" type="submit">Enviar</button>
            </form>
        </div>

        <div className="boxRespuestas">
            <h3>Respuestas:</h3>
            {respuestas.length > 0 ? (
                <ul>
                    {respuestas.map((r, i) => (
                    <li className="respuestas" key={i}>
                        <div className="respuestaTexto">{r.texto}</div>
                        <div className="votos">
                        <button onClick={() => votar(i, 1)}>👍</button>
                        <span>{r.votos}</span>
                        <button onClick={() => votar(i, -1)}>👎</button>
                        </div>
                    </li>
                    ))}
                </ul>
                ) : (
                <p>No hay respuestas aún</p>
                )}
        </div>            
        <button onClick={botonInicio}>Inicio</button>
    </div>
  )
}

export default Pregunta
