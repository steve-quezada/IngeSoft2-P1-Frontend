import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { api } from "../services/api"

function ListaPreguntas() {
    const [preguntas, setPreguntas] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState("")
    const navigate = useNavigate()

    useEffect(() => {
        cargarPreguntas()
    }, [])

    async function cargarPreguntas() {
        try {
            setLoading(true)
            const preguntasObtenidas = await api.getQuestions()
            setPreguntas(preguntasObtenidas)
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    function verPregunta(pregunta) {
        navigate("/pregunta", {
            state: {
                pregunta: pregunta.title,
                descripcion: pregunta.description,
                id: pregunta.id
            }
        })
    }

    if (loading) return <div>Cargando preguntas...</div>
    if (error) return <div style={{color: 'red'}}>Error: {error}</div>

    return (
        <div>
            <h1>Todas las Preguntas</h1>
            <button onClick={() => navigate("/")}>Nueva Pregunta</button>
            
            {preguntas.length === 0 ? (
                <p>No hay preguntas disponibles</p>
            ) : (
                <div>
                    {preguntas.map((pregunta) => (
                        <div key={pregunta.id} style={{
                            border: '1px solid #ccc', 
                            margin: '10px 0', 
                            padding: '10px',
                            cursor: 'pointer'
                        }} onClick={() => verPregunta(pregunta)}>
                            <h3>{pregunta.title}</h3>
                            {pregunta.description && <p>{pregunta.description}</p>}
                            <small>Por: {pregunta.author}</small>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default ListaPreguntas
