import { useParams } from "react-router-dom"
import { useState } from "react"
import { useNavigate } from "react-router-dom"


function Pregunta() {
    const { texto } = useParams()   // Hook para recibir la pregunta con el URL
    const [respuestas, setRespuestas] = useState([]) // Hook para actualizar la lista de respuestas
    const [nuevaRespuesta, setNuevaRespuesta] = useState("") // Hook para registrar la nueva respuesta
    const navigate = useNavigate()

    function manejarEnvio(e) {
        e.preventDefault()
        if (nuevaRespuesta.trim() !== "") {
        setRespuestas([...respuestas, nuevaRespuesta])
        setNuevaRespuesta("")
        }
    }

    function botonInicio(){
        navigate('/')
    }

return (
    <div>
        <h2>{decodeURIComponent(texto)}</h2>

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
