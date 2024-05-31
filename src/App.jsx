import { Routes, Route } from "react-router-dom";
import PrivateRoutes from "./routes/PrivateRoutes";
import HomePage from './pages/HomePage';
import LogInPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import RegistrationPage from './pages/RegistrationPage';
import NotFoundPage from './pages/NotFoundPage';
import SingleBlogPage from "./pages/SingleBlog";
import CreateBlogPage from "./pages/CreateBlogPage";


function App() {
  return (
    <>

      <Routes>
        <Route element={<HomePage />} path="/" exact />
        <Route element={<ProfilePage />} path="/profile/:profileId" />
        <Route element={<PrivateRoutes />}>
          <Route element={<CreateBlogPage />} path="/createblog" />
        </Route>
        <Route element={<SingleBlogPage />} path="/single-blog/:singleBlogId" />
        <Route element={<LogInPage />} path="/login" />
        <Route element={<RegistrationPage />} path="/register" />
        <Route element={<NotFoundPage />} path="*" />
      </Routes>
    </>
  )
}

export default App
