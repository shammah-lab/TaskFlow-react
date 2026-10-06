import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const [nom, setNom] = useState("");
  const [email, setEmail] = useState("");
  const [motDePasse, setMotDePasse] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    setError("");
    setSuccess("");

    try {
      // Vérifier si l'email existe déjà
      const response = await fetch(
        `http://localhost:3000/utilisateurs?email=${encodeURIComponent(email)}`
      );

      const utilisateurs = await response.json();

      if (utilisateurs.length > 0) {
        setError("Cet email est déjà utilisé.");
        return;
      }

      // Créer le nouvel utilisateur
      const newUser = {
        nom: nom,
        email: email,
        motDePasse: motDePasse,
      };

      const createResponse = await fetch(
        "http://localhost:3000/utilisateurs",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        }
      );

      if (!createResponse.ok) {
        throw new Error("Erreur lors de l'inscription");
      }

      setSuccess("Inscription réussie !");

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      setError("Impossible de contacter le serveur.");
    }
  }

  return (
    <div>
      <h1>Créer un compte TaskFlow</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nom">Nom</label>
          <br />

          <input
            id="nom"
            type="text"
            placeholder="Entrez votre nom"
            value={nom}
            onChange={(event) => setNom(event.target.value)}
            required
          />
        </div>

        <br />

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
          <label htmlFor="motDePasse">Mot de passe</label>
          <br />

          <input
            id="motDePasse"
            type="password"
            placeholder="Choisissez un mot de passe"
            value={motDePasse}
            onChange={(event) => setMotDePasse(event.target.value)}
            required
          />
        </div>

        <br />

        {error && <p>{error}</p>}

        {success && <p>{success}</p>}

        <button type="submit">
          S'inscrire
        </button>
      </form>
    </div>
  );
}

export default Register;

