// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

import Home from "./pages/Home";
import AllProperties from "./pages/AllProperties";
import AddProperty from "./pages/AddProperty";
import MyProperties from "./pages/MyProperties";
import MyRatings from "./pages/MyRatings";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";
import AuthProvider from "./context/AuthContext";

function App() {
  return (
    <BrowserRouter>
      {/* <AuthProvider> */}
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/properties" element={<AllProperties />} />
            <Route path="/add-property" element={<ProtectedRoute><AddProperty /></ProtectedRoute>} />
            <Route path="/my-properties" element={<ProtectedRoute><MyProperties /></ProtectedRoute>} />
            <Route path="/my-ratings" element={<ProtectedRoute><MyRatings /></ProtectedRoute>} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
      {/* </AuthProvider> */}
    </BrowserRouter>
  );
}

export default App;
