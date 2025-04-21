import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginPage from './pages/login';
import Home from './pages/Home';
import Article from './pages/Article';
import ArticleCreation from './pages/ArticleCreation';
import MonoArticle from './pages/MonoArticle';
import Profile from './pages/Profile';

function App() {
  const location = useLocation();
  const hideNavbarRoutes = ['/login', '/signup'];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbar && <Navbar />}

      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/home' element={<Home />} />
        <Route path='/articles' element={<Article />} />
        <Route path='/articleCreation' element={<ArticleCreation />} />
        <Route path='/monoArticle/:articleId' element={<MonoArticle />} />
        <Route path='/profile' element={<Profile />} />
      </Routes>
    </>
  );
}

export default App;
