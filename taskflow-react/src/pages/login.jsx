import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");

    try {
      const response = await fetch(
        `http://localhost:3000/utilisateurs?email=${encodeURIComponent(
          email
        )}&motDePasse=${encodeURIComponent(password)}`
      );

      const utilisateurs = await response.json();

      if (utilisateurs.length === 0) {
        setError("Email ou mot de passe incorrect.");
        return;
      }

      const utilisateur = utilisateurs[0];

      login(utilisateur);

      navigate("/dashboard");
    } catch (error) {
      setError("Impossible de contacter le serveur.");
    }
  }

  return (
    <div>
      <h1>Connexion à TaskFlow</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <br />

          <input
            id="email"
            type="email"
            placeholder="Entrez votre email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>

        <br />

        <div>
          <label htmlFor="password">Mot de passe</label>
          <br />

          <input
            id="password"
            type="password"
            placeholder="Entrez votre mot de passe"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>

        <br />

        {error && <p>{error}</p>}

        <button type="submit">
          Se connecter
        </button>
      </form>
    </div>
  );
}

export default Login;