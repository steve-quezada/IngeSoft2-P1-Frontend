import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { api } from "../services/api"

function Home() {
    const [pregunta, setPregunta] = useState("") //Hook que maneja la pregunta
    const [descripcion, setDescripcion] = useState("") // Hook para manejar la descripcion de la pregunta
    const [loading, setLoading] = useState(false) // Hook para manejar el estado de carga
    const [error, setError] = useState("") // Hook para manejar errores
    const navigate = useNavigate() //Hook para manjear la navegacion

    async function manejarEnvio(e) {
        e.preventDefault()
        setError("")
        
        if (pregunta.trim() === "") {
            setError("La pregunta no puede estar vacía")
            return
        }
        
        if (pregunta.length < 5 || pregunta.length > 80) {
            setError("La pregunta debe tener entre 5 y 80 caracteres")
            return
        }
        
        if (descripcion.length > 300) {
            setError("La descripción no puede superar los 300 caracteres")
            return
        }

        try {
            setLoading(true)
            const preguntaCreada = await api.createQuestion(pregunta, descripcion)
            
            navigate("/pregunta", {
                state: {
                    pregunta: preguntaCreada.title,
                    descripcion: preguntaCreada.description,
                    id: preguntaCreada.id
                }
            })
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

return (
    <div>
        <h1>Preguntas Facultad de Ciencias</h1>
        <button onClick={() => navigate("/preguntas")} style={{marginBottom: '20px'}}>
            Ver todas las preguntas
        </button>
        
        {error && <div style={{color: 'red', marginBottom: '10px'}}>{error}</div>}
        <form onSubmit={manejarEnvio}>
        <input
            type="text"
            placeholder="¿Cuál es tu pregunta? Entre 5 y 80 caracteres"
            value={pregunta}
            onChange={(e) => setPregunta(e.target.value)}
            disabled={loading}
        />
        <br />
        <textarea 
            placeholder="Descripcion. Max 300 caracteres"
            value = {descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            disabled={loading}
        />
        <button type="submit" disabled={loading}>
            {loading ? "Enviando..." : "Enviar"}
        </button>
        </form>
    </div>
  )
}

export default Home
