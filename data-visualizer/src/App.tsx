import { Routes, Route} from "react-router-dom";

function App() {

  return (
    <Routes>
      <Route path="/" element={
        <div className="text-5xl">Hello World</div>
      } />
      {/* <Route path="/" element={<Home />} /> */}
      {/* <Route path="edit" element={<Edit />} />
      <Route path="dash" element={<Dash />} />
      <Route path="about" element={<About />} /> */}
      {/* <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} /> */}
    </Routes>
  )
}

export default App
