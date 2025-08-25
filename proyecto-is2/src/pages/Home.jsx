import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { api } from "../services/api"
import "./Home.css"

function Home() {
    const [pregunta, setPregunta] = useState("") //Hook que maneja la pregunta
    const [descripcion, setDescripcion] = useState("") // Hook para manejar la descripcion de la pregunta
    const [anonimo, setAnonimo] = useState(false) // Hook para manejar si la pregunta es anónima
    const [nombreAutor, setNombreAutor] = useState("") // Hook para manejar el nombre del autor
    const [loading, setLoading] = useState(false) // Hook para manejar el estado de carga
    const [error, setError] = useState("") // Hook para manejar errores
    const navigate = useNavigate() //Hook para manjear la navegacion
    const [mostrarFormulario, setMostrarFormulario] = useState(false) //Hook que ayuda en el aspecto visual del formulario

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
            setMostrarFormulario(false) 

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
    <div className = "main" >
        <h1>Preguntas Facultad de Ciencias</h1>
        
        
        <button className="botonPreguntas" onClick={() => navigate("/preguntas")}>
            Ver todas las preguntas
        </button>

        
        {!mostrarFormulario && (
            <button 
                className="botonPreguntas" 
                onClick={() => setMostrarFormulario(true)} 
            >
                Nueva pregunta
            </button>
        )}
        
        
        {mostrarFormulario && (
            <>
                {error && <div className="error">{error}</div>}
                <form onSubmit={manejarEnvio} className="formulario">
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
                    <label className="checkbox1" >
                        <input
                            className="checbox2"
                            type="checkbox"
                            checked={anonimo}
                            onChange={(e) => {
                                setAnonimo(e.target.checked)
                                if (e.target.checked) {
                                    setNombreAutor("") 
                                }
                            }}
                            disabled={loading}
                            style={{marginRight: '8px'}}
                        />
                        Publicar pregunta de forma anónima
                    </label>
                    <button className="botonPreguntas" type="submit" disabled={loading}>
                        {loading ? "Enviando..." : "Enviar"}
                    </button>

                    <button 
                        type="button" 
                        className="botonCancelar" 
                        onClick={() => setMostrarFormulario(false)}
                        disabled={loading}
                        style={{marginTop: '10px', backgroundColor: ''}}
                    >
                        Cancelar
                    </button>
                </form>
            </>
        )}
    </div>
  )
}

export default Home
