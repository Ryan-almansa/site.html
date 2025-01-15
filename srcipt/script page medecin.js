// Récupérer l'élément où afficher la liste des médecins
var ladivMagique = document.getElementById("idListeMedecin");

// Afficher un message de chargement pendant la récupération des données
ladivMagique.innerHTML = "Chargement des médecins...";

// Fonction pour charger et afficher la liste des médecins
function chargerListeMedecins() {
  fetch('http://192.168.65.113:8080/Route1', {
    headers: {
      Accept: 'application/json'
    }
  })
    .then(response => {
      if (response.ok) {
        return response.json(); // Convertir la réponse en JSON
      } else {
        throw new Error('Erreur serveur', { cause: response });
      }
    })
    .then(result => {
      console.log('La liste des médecins :', result);

      // Vérifier si le résultat est un tableau et non vide
      if (Array.isArray(result) && result.length > 0) {
        // Effacer le message de chargement
        ladivMagique.innerHTML = "";

        // Ajouter chaque médecin dans une liste HTML
        const ul = document.createElement('ul');
        result.forEach(medecin => {
          const li = document.createElement('li');
          // Afficher ID, nom et prénom du médecin
          li.textContent = `ID : ${medecin.id} | Nom : ${medecin.nom} | Prénom : ${medecin.prenom}`;
          ul.appendChild(li);
        });
        ladivMagique.appendChild(ul);
      } else {
        ladivMagique.innerHTML = "Aucun médecin trouvé.";
      }
    })
    .catch(error => {
      console.error('Une erreur est survenue :', error);

      // Afficher un message d'erreur
      ladivMagique.innerHTML = "Une erreur est survenue lors du chargement des médecins.";
    });
}

// Charger la liste des médecins au chargement de la page
chargerListeMedecins();

// Ajouter un médecin via le bouton "GO"
var monButton = document.getElementById("lebutton");

// Associer l'événement au bouton
monButton.addEventListener("click", envoyerUnTruc);

function envoyerUnTruc() {
  const valeurNom = document.getElementById("leNom").value.trim(); // Récupérer la valeur du champ "Nom"
  const valeurPrenom = document.getElementById("lePrenom").value.trim(); // Récupérer la valeur du champ "Prénom"

  // Vérifier que les champs ne sont pas vides
  if (!valeurNom || !valeurPrenom) {
    alert("Veuillez entrer le nom et le prénom !");
    return;
  }

  // Envoyer les données au backend
  fetch("http://192.168.65.113:8080/AddMedecin", {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "POST",
    body: JSON.stringify({ "nom": valeurNom, "prenom": valeurPrenom }) // Inclure nom et prénom
  })
    .then(response => {
      if (response.ok) {
        console.log("Médecin ajouté :", valeurNom, valeurPrenom);
        alert("Médecin ajouté avec succès !");
        chargerListeMedecins(); // Recharger la liste après ajout
      } else {
        throw new Error("Erreur lors de l'ajout du médecin.");
      }
    })
    .catch(error => {
      console.error('Une erreur est survenue :', error);
      alert("Une erreur est survenue. Veuillez réessayer.");
    });
}