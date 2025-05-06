import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { UserProtectedRoute } from "./utils/HOC/ProtectedRoute";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import LoginPage from "./pages/login";
import SignupPage from "./pages/Signup";
import MyArticle from "./pages/MyArticle";
import ProfileEdit from "./pages/ProfileEdit";
import MonoArticle from "./pages/MonoArticle";
import Footer from "./components/common/Footer";
import Navbar from "./components/common/Navbar";
import ArticleEditPage from "./pages/ArticleEditPage";
import ArticleCreation from "./pages/ArticleCreation";
import Prefrences from "./components/user/Preferences";
import NotFound from "./components/errorComponents/NotFound";
import About from "./pages/About";
import Contact from "./pages/Contact"; 


const App: React.FC = () => {

  const location = useLocation();
  const hideNavbarRoutes = ["/login", "/signup", "/preferences", "/404"];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbar && <Navbar />}

      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/preferences" element={<Prefrences />} />

        <Route element={<UserProtectedRoute />}>
          <Route path="/home" element={<Home />} />
          <Route path="/articles" element={<MyArticle />} />
          <Route path="/articleCreation" element={<ArticleCreation />} />
          <Route path="/article/:articleId" element={<MonoArticle />} />
          <Route path="/article" element={<ArticleEditPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/edit" element={<ProfileEdit />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        <Route path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>

      {!shouldHideNavbar && <Footer />}
    </>
  );
};

export default App;
