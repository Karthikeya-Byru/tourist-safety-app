import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Onboarding from "./pages/Onboarding";
import Login from "./pages/Login";
import SOS from "./pages/SOS";
import IncidentsList from "./pages/IncidentsList";
import Demo from "./pages/Demo";

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <div className="app-body-wrapper pb-5">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/onboarding" element={<Onboarding />} />
            <Route path="/demo" element={<Demo />} />
            <Route 
              path="/sos" 
              element={
                <ProtectedRoute>
                  <SOS />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/incidents" 
              element={
                <ProtectedRoute>
                  <IncidentsList />
                </ProtectedRoute>
              } 
            />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
