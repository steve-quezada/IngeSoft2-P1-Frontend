import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Home() {
    const [pregunta, setPregunta] = useState("")
    const navigate = useNavigate()

    function manejarEnvio(e) {
        e.preventDefault()
        if (pregunta.trim() !== "") {

        navigate(`/pregunta/${encodeURIComponent(pregunta)}`)
    }
  }

return (
    <div>
        <h1>Preguntas Facultad de Ciencias</h1>
        <form onSubmit={manejarEnvio}>
        <input
            type="text"
            placeholder="¿Cuál es tu pregunta?"
            value={pregunta}
            onChange={(e) => setPregunta(e.target.value)}
        />
        <button type="submit">Enviar</button>
        </form>
    </div>
  )
}

export default Home
