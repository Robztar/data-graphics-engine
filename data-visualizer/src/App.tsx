import { Routes, Route} from "react-router-dom"
import { Home } from "./Pages/Home"
import { Project } from "./Pages/Project"
import { Survey } from "./Pages/Survey"
import { Auth } from "./Pages/Auth"
import {About} from "./Pages/About"

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="proj" element={<Project />} />
      <Route path="auth" element={<Auth />} />
      <Route path="about" element={<About />} />
      <Route path="survey" element={<Survey />} />
    </Routes>
  )
}

export default App
