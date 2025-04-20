import { Route, Routes } from "react-router-dom"
import LoginPage from "./pages/login"
import Home from "./pages/Home"

 
function App() {
 
  return (
    <>
    <Routes>
      <Route path='/' element={ <LoginPage />} />
      <Route path='/home' element={ <Home />} />
    </Routes>
   
    </>
  )
}

export default App
