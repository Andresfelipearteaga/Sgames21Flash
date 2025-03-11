import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SidebarLayout from "../layout/SidebarLayout";
import Dashboard from "../views/home";
import Perfil from "../views/profile";
import Auth from "../views/auth";

function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas con Sidebar */}
        <Route path="/" element={<Auth />} />
        <Route path="/app" element={<SidebarLayout />}>
          <Route path="Inicio" index element={<Dashboard />} />
          <Route path="Perfil" element={<Perfil />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
