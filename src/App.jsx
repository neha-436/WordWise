import { Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import DailyWords from "./pages/DailyWords";
import Review from "./pages/Review";
import MyCards from "./pages/MyCards";
import Statistics from "./pages/Statistics";
import AddWord from "./pages/AddWord";

function App() {
  return (
    <Routes>
      <Route path="/"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } 
      />
      <Route path="/signup"
        element={
          <PublicRoute>
            <Signup />
          </PublicRoute>
        }
      />
      <Route path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route path="/daily-words"
        element={
          <ProtectedRoute>
            <DailyWords />
          </ProtectedRoute>
        }
      />
      <Route path="/review"
        element={
          <ProtectedRoute>
            <Review />
          </ProtectedRoute>
        }
      />
      <Route path="/my-cards"
        element={
          <ProtectedRoute>
            <MyCards />
          </ProtectedRoute>
        }
      />
      <Route path="/add-word"
        element={
          <ProtectedRoute>
            <AddWord />
          </ProtectedRoute>
        }
      />
      
      <Route path="/statistics"
        element={
          <ProtectedRoute>
            <Statistics />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;