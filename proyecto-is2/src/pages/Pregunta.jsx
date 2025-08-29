import { api } from "../services/api"
import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import "./Pregunta.css"

function Pregunta() {
  const [respuestas, setRespuestas] = useState([])
  const [nuevaRespuesta, setNuevaRespuesta] = useState("")
  const navigate = useNavigate()
  const location = useLocation()
  const { id, pregunta, descripcion, autor } = location.state || {}

  // 🔹 Cargar respuestas cuando entro a la pregunta
  useEffect(() => {
    if (id) {
      api.getAnswers(id).then(setRespuestas)
    }
  }, [id])

  async function manejarEnvio(e) {
    e.preventDefault()
    if (nuevaRespuesta.trim() !== "") {
      const nueva = await api.createAnswer(id, nuevaRespuesta)
      setRespuestas([...respuestas, nueva])
      setNuevaRespuesta("")
    }
  }

  async function votar(answerId, cambio) {
    const actualizada = await api.voteAnswer(id, answerId, cambio)
    setRespuestas((prev) =>
      prev.map((r) => (r.id === actualizada.id ? actualizada : r))
    )
  }

  return (
    <div className="mainPregunta">
      <div className="boxPregunta">
        <h2 className="h2Pregunta">{pregunta}</h2>
        {autor && <p className="autor"><strong>Autor:</strong> {autor}</p>}
        {descripcion && <p className="descripcion"><strong>Descripcion:</strong> {descripcion}</p>}
      </div>

      <div className="boxFormulario">
        <form className="formularioRespuesta" onSubmit={manejarEnvio}>
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
            {respuestas.map((r) => (
              <li className="respuestas" key={r.id}>
                <div className="respuestaTexto">{r.text}</div>
                <div className="votos">
                  <button onClick={() => votar(r.id, 1)}>👍</button>
                  <span>{r.votes}</span>
                  <button onClick={() => votar(r.id, -1)}>👎</button>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay respuestas aún</p>
        )}
      </div>

      <button onClick={() => navigate("/")}>Inicio</button>
    </div>
  )
}

export default Pregunta
