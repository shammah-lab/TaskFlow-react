import { useState } from "react";

function Projects() {
  const [nom, setNom] = useState("");
  const [description, setDescription] = useState("");
  const [couleur, setCouleur] = useState("#21C7A5");

  async function handleSubmit(event) {
    event.preventDefault();

    const nouveauProjet = {
      utilisateurId: 1,
      nom: nom,
      description: description,
      couleur: couleur,
      creeLe: new Date().toISOString().split("T")[0],
    };

    try {
      const response = await fetch(
        "http://localhost:3000/projets",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(nouveauProjet),
        }
      );

      if (!response.ok) {
        throw new Error("Erreur lors de la création du projet");
      }

      const projetCree = await response.json();

      console.log("Projet créé :", projetCree);

      alert("Projet ajouté avec succès !");

      setNom("");
      setDescription("");
      setCouleur("#21C7A5");
    } catch (error) {
      console.error(error);
      alert("Impossible d'ajouter le projet.");
    }
  }

  return (
    <div>
      <h1>Mes projets</h1>

      <h2>Ajouter un projet</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="nom">Nom du projet</label>
          <br />
          <input
            id="nom"
            type="text"
            placeholder="Exemple : Site vitrine"
            value={nom}
            onChange={(event) => setNom(event.target.value)}
            required
          />
        </div>

        <br />

        <div>
          <label htmlFor="description">Description</label>
          <br />
          <textarea
            id="description"
            placeholder="Description du projet"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            required
          />
        </div>

        <br />

        <div>
          <label htmlFor="couleur">Couleur</label>
          <br />
          <input
            id="couleur"
            type="color"
            value={couleur}
            onChange={(event) => setCouleur(event.target.value)}
          />
        </div>

        <br />

        <button type="submit">
          Ajouter le projet
        </button>
      </form>
    </div>
  );
}

export default Projects;