import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Home() {
    const [pregunta, setPregunta] = useState("") //Hook que maneja la pregunta
    const [descripcion, setDescripcion] = useState("") // Hook para manejar la descripcion de la pregunta
    const navigate = useNavigate() //Hook para manjear la navegacion

    function manejarEnvio(e) {
        e.preventDefault()
        if (pregunta.trim() !== "" && pregunta.length < 121 && descripcion.length < 301) { //Si la pregunta contiene algo entonces se crea la pregunta y creamos una pagina nueva cone esto

        navigate("/pregunta",{
          state: {
            pregunta,
            descripcion
          }
        })
    }
  }

return (
    <div>
        <h1>Preguntas Facultad de Ciencias</h1>
        <form onSubmit={manejarEnvio}>
        <input
            type="text"
            placeholder="¿Cuál es tu pregunta? Max. 120 caracteres"
            value={pregunta}
            onChange={(e) => setPregunta(e.target.value)}
        />
        <br />
        <textarea 
            placeholder="Descripcion. Max 300 caracteres"
            value = {descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
        />
        <button type="submit">Enviar</button>
        </form>
    </div>
  )
}

export default Home
