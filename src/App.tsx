import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import LoginPage from './pages/login';
import Home from './pages/Home';
import MyArticle from './pages/MyArticle';
import ArticleCreation from './pages/ArticleCreation';
import MonoArticle from './pages/MonoArticle';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import SignupPage from './pages/Signup';
import Footer from './components/Footer';
import ArticleEditPage from './pages/ArticleEditPage';
import { UserProtectedRoute } from './utils/HOC/ProtectedRoute';
import Prefrences from './components/Preferences';

function App() {
  const location = useLocation();
  const hideNavbarRoutes = ['/login', '/signup', '/preferences'];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbar && <Navbar />}

      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/preferences' element={<Prefrences />} />
       <Route element={<UserProtectedRoute />}>
       <Route path='/home' element={<Home />} />
        <Route path='/articles' element={<MyArticle />} />
        <Route path='/articleCreation' element={<ArticleCreation />} />
        <Route path='/article/:articleId' element={<MonoArticle />} />
        <Route path='/article' element={<ArticleEditPage />} />
        <Route path='/profile' element={<Profile />} />
        <Route path='/profile/edit' element={<ProfileEdit />} />
       </Route>
      </Routes>
      {!shouldHideNavbar && <Footer />}
    </>
  );
}

export default App;
