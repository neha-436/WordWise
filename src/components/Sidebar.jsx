import { Link } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../services/firebase";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Sidebar() {
    const navigate = useNavigate();
    const { user } = useAuth();

    const handleLogout = async () => {
        await signOut(auth);
        navigate("/");
    };
  return (
    <aside className="sidebar">

        <Link to="/dashboard">
        Dashboard
        </Link>

        <Link to="/daily-words">
        Daily Words
        </Link>

        <Link to="/review">
        Review
        </Link>

        <Link to="/my-cards">
        My Cards
        </Link>

        <Link to="/add-word">
          Add Word
        </Link>

        <Link to="/statistics">
        Statistics
        </Link>

        <br />
        <br />

        <button onClick={handleLogout}>
        Logout
        </button>
    </aside>
  );
}

export default Sidebar;