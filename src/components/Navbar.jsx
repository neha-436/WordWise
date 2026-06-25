import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user } = useAuth();

  return (
    <nav className="navbar">
      <h2>WordWise</h2>

      <div>
        {user?.email}
      </div>
    </nav>
  );
}

export default Navbar;