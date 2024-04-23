import { Routes, Route} from "react-router-dom";
import { Home } from "./Pages/Home";
import { Edit } from "./Pages/Edit";
import { Auth } from "./Pages/Auth";
import {About} from "./Pages/About"

function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="edit" element={<Edit />} />
      <Route path="auth" element={<Auth />} />
      <Route path="about" element={<About />} />
    </Routes>
  )
}

export default App
