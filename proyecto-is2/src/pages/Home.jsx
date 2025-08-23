import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { api } from "../services/api"

function Home() {
    const [pregunta, setPregunta] = useState("") //Hook que maneja la pregunta
    const [descripcion, setDescripcion] = useState("") // Hook para manejar la descripcion de la pregunta
    const [anonimo, setAnonimo] = useState(false) // Hook para manejar si la pregunta es anónima
    const [nombreAutor, setNombreAutor] = useState("") // Hook para manejar el nombre del autor
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

        if (nombreAutor.length > 50) {
            setError("El nombre del autor no puede superar los 50 caracteres")
            return
        }

        // Validación: debe elegir entre anónimo o proporcionar nombre
        if (!anonimo && !nombreAutor.trim()) {
            setError("Debe proporcionar un nombre o marcar la pregunta como anónima")
            return
        }

        try {
            setLoading(true)
            const preguntaCreada = await api.createQuestion(pregunta, descripcion, anonimo, nombreAutor)
            
            navigate("/pregunta", {
                state: {
                    pregunta: preguntaCreada.title,
                    descripcion: preguntaCreada.description,
                    id: preguntaCreada.id,
                    autor: preguntaCreada.author
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
        <br />
        <input
            type="text"
            placeholder="Tu nombre (requerido si no marcas anónimo, máx 50 caracteres)"
            value={nombreAutor}
            onChange={(e) => setNombreAutor(e.target.value)}
            disabled={loading || anonimo}
            style={{
                marginTop: '10px',
                opacity: anonimo ? 0.5 : 1,
                cursor: anonimo ? 'not-allowed' : 'text'
            }}
        />
        <br />
        <label style={{display: 'flex', alignItems: 'center', margin: '10px 0'}}>
            <input
                type="checkbox"
                checked={anonimo}
                onChange={(e) => {
                    setAnonimo(e.target.checked)
                    if (e.target.checked) {
                        setNombreAutor("") // Limpiar el nombre si se marca anónimo
                    }
                }}
                disabled={loading}
                style={{marginRight: '8px'}}
            />
            Publicar pregunta de forma anónima
        </label>
        <button type="submit" disabled={loading}>
            {loading ? "Enviando..." : "Enviar"}
        </button>
        </form>
    </div>
  )
}

export default Home
