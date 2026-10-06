import { Link, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function MainLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/login");
  }

  return (
    <div>
      <aside>
        <h2>TaskFlow</h2>

        {user && (
          <p>
            Bonjour, {user.nom}
          </p>
        )}

        <nav>
          <Link to="/dashboard">Dashboard</Link>
          <br />

          <Link to="/projects">Projets</Link>
          <br />

          <Link to="/tasks">Tâches</Link>
          <br />

          <button onClick={handleLogout}>
            Déconnexion
          </button>
        </nav>
      </aside>

      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default MainLayout;