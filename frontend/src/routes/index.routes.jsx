import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SidebarLayout from "../layout/SidebarLayout";
import Dashboard from "../views/home";
import Perfil from "../views/profile";

function App() {
  return (
    <Router>
      <Routes>
        {/* Rutas con Sidebar */}
        <Route path="/" element={<SidebarLayout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="perfil" element={<Perfil />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
