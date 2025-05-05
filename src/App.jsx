import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import OperationsPage from "./pages/OperationsPage";
import CategoriesPage from "./pages/CategoriesPage";
import PrivateRoute from "./components/PrivateRoute";

function App() {
  return (
    <Router>
      <Routes>

        {/* Page de connexion (publique) */}
        <Route path="/login" element={<LoginPage />} />

        {/* Toutes les routes protégées */}
        <Route 
          path="/dashboard" 
          element={
            <PrivateRoute>
              <DashboardPage />
            </PrivateRoute>
          } 
        />
        
        <Route 
          path="/operations" 
          element={
            <PrivateRoute>
              <OperationsPage />
            </PrivateRoute>
          } 
        />

        <Route 
          path="/categories" 
          element={
            <PrivateRoute>
              <CategoriesPage />
            </PrivateRoute>
          } 
        />

        {/* Redirection par défaut vers /dashboard si connecté */}
        <Route path="*" element={<Navigate to="/dashboard" />} />

      </Routes>
    </Router>
  );
}

export default App;