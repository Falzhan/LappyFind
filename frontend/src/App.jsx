import { Box, useColorModeValue } from "@chakra-ui/react";
import { Route, Routes, Navigate } from "react-router-dom";
import { useAuthStore } from "./catalog/auth";
import FindPage from "./pages/FindPage";
import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage";
import InputPage from "./pages/InputPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ArticlesPage from "./pages/ArticlesPage";
import StoresPage from "./pages/StoresPage";
import Navbar from "./components/Navbar";

function ProtectedRoute({ element }) {
  const { isAuthenticated } = useAuthStore();
  return isAuthenticated ? element : <Navigate to="/login" />;
}

function App() {
  return (
    <Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.900")}>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/find" element={<FindPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/input" element={<ProtectedRoute element={<InputPage />} />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/articles" element={<ArticlesPage />} />
        <Route path="/stores" element={<StoresPage />} />
      </Routes>
    </Box>
  );
}

export default App;
