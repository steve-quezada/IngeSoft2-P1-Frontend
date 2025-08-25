import { useParams } from "react-router-dom"
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
        setRespuestas([...respuestas, nuevaRespuesta])
        setNuevaRespuesta("")
        }
    }

    function botonInicio(){ //Funcion para volver a la Home Page
        navigate('/')
    }

    
return (
    <div className="mainPregunta">
        <h2 className="h2Pregunta">{pregunta}</h2>
        {autor && <p><strong>Autor:</strong> {autor}</p>}
        {descripcion && <p><strong>Descripcion:</strong> {descripcion}</p>}
        

        <form className="formulario"onSubmit={manejarEnvio}>
        <input
            type="text"
            placeholder="Escribe tu respuesta"
            value={nuevaRespuesta}
            onChange={(e) => setNuevaRespuesta(e.target.value)}
        />
        <button type="submit">Responder</button>
        </form>

        <h3>Respuestas:</h3>
        {respuestas.length > 0 ? (
            <ul>
                {respuestas.map((r, i) => (
                    <li className="respuestas" key={i}>{r}</li> 
                ))}
            </ul>
        ) : (
            <p>No hay respuestas aún</p>
        )}
        
        <button onClick={botonInicio}>Inicio</button>
    </div>
  )
}

export default Pregunta
