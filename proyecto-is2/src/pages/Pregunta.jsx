import { useParams } from "react-router-dom"
import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"


function Pregunta() {
    const { texto } = useParams()   // Hook para recibir la pregunta con el URL
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
    <div>
        <h2>{pregunta}</h2>
        {descripcion && <p><strong>Descripcion:</strong> {descripcion}</p>}
        {autor && <p><strong>Autor:</strong> {autor}</p>}

        <form onSubmit={manejarEnvio}>
        <input
            type="text"
            placeholder="Escribe tu respuesta"
            value={nuevaRespuesta}
            onChange={(e) => setNuevaRespuesta(e.target.value)}
        />
        <button type="submit">Responder</button>
        </form>

        <h3>Respuestas:</h3>
        <ul>
            {respuestas.map((r, i) => (
                <li key={i}>{r}</li>
            ))}
        </ul>
        <button onClick={botonInicio}>Inicio</button>
    </div>
  )
}

export default Pregunta
