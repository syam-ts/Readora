import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { UserProtectedRoute } from "./utils/HOC/ProtectedRoute";
import Home from "./pages/user/Home";
import Profile from "./pages/user/Profile";
import LoginPage from "./pages/common/login";
import SignupPage from "./pages/common/Signup";
import MyArticle from "./pages/article/MyArticle";
import ProfileEdit from "./pages/user/ProfileEdit";
import MonoArticle from "./pages/MonoArticle";
import Footer from "./components/common/Footer";
import Navbar from "./components/common/Navbar";
import ArticleEditPage from "./pages/ArticleEditPage";
import ArticleCreation from "./pages/article/ArticleCreation";
import Prefrences from "./components/user/Preferences";
import NotFound from "./components/errorComponents/NotFound";
import About from "./pages/common/About";
import Contact from "./pages/common/Contact"; 
import VerifyOtp from "./pages/common/VerifyOtp";


const App: React.FC = () => {

  const location = useLocation();
  const hideNavbarRoutes = ["/login", "/signup", "/verify","/preferences", "/404"];
  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <>
      {!shouldHideNavbar && <Navbar />}

      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/verify" element={<VerifyOtp />} />
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
