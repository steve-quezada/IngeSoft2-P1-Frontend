import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { api } from "../services/api"
import "./ListaPreguntas.css"

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
                id: pregunta.id,
                autor: pregunta.author
            }
        })
    }

    if (loading) return <div>Cargando preguntas...</div>
    if (error) return <div style={{color: 'red'}}>Error: {error}</div>

    return (
        <div className="mainLista">
            <h1>Todas las Preguntas</h1>
            <button onClick={() => navigate("/")}>Nueva Pregunta</button>
            
            {preguntas.length === 0 ? (
                <p>No hay preguntas disponibles</p>
            ) : (
                <div className="boxPreguntas">
                    {preguntas.map((pregunta) => (
                        <div className="boxIndividual" key={pregunta.id}
                            onClick={() => verPregunta(pregunta)}>
                            <h3 className="tituloPregunta">{pregunta.title}</h3>
                            <small className="autorPregunta">Por: {pregunta.author}</small>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default ListaPreguntas
