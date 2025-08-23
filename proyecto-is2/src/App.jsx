import { Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Pregunta from "./pages/Pregunta"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pregunta/" element={<Pregunta />} />
    </Routes>
  )
}

export default App
