import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";

// Context
import { AuthProvider } from "./contexts/AuthContext.jsx";

// Components
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import LoginForm from "./components/LoginForm.jsx";
import RegisterForm from "./components/RegisterForm.jsx";
import Home from "./pages/Home";
import MyCollection from "./pages/MyCollection";
import SearchResults from "./pages/SearchResults";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      primary: {
        main: "#1976d2",
      },
      secondary: {
        main: "#dc004e",
      },
      background: {
        default: darkMode ? "#121212" : "#f5f5dc",
        paper: darkMode ? "#1e1e1e" : "#ffffff",
      },
    },
  });

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Box sx={{ display: "flex" }}>
            <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
            <Sidebar />
            <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<LoginForm />} />
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/my-collection" element={<MyCollection />} />
                <Route path="/search" element={<SearchResults />} />
              </Routes>
            </Box>
          </Box>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
