import { Box, useColorModeValue } from "@chakra-ui/react";
import { Route, Routes } from 'react-router-dom';
import LandingPage from "./pages/LandingPage";
import HomePage from "./pages/HomePage";
import InputPage from "./pages/InputPage";
import Navbar from "./components/Navbar";


function App() {
  return (
    <Box minH={"100vh"} bg={useColorModeValue("gray.100", "gray.900")}
>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/input" element={<InputPage />} />
      </Routes>
    </Box>
  );
}

export default App;
