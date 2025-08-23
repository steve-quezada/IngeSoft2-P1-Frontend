import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Pregunta from "./pages/Pregunta"
import ListaPreguntas from "./pages/ListaPreguntas"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pregunta/" element={<Pregunta />} />
      <Route path="/preguntas/" element={<ListaPreguntas />} />
    </Routes>
  )
}

export default App
