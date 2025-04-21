import { Route, Routes } from "react-router-dom"
import LoginPage from "./pages/login"
import Home from "./pages/Home"
import Navbar from "./components/Navbar"
import Article from "./pages/Article"
import ArticleCreation from "./pages/ArticleCreation"

 
function App() {
 
  return (
    <>
      <Navbar /> 
    <Routes>
      <Route path='/login' element={ <LoginPage />} /> 
      <Route path='/home' element={ <Home />} /> 
      <Route path='/articles' element={ <Article />} /> 
      <Route path='/articleCreation' element={ <ArticleCreation />} /> 
    </Routes>
   
    </>
  )
}

export default App
