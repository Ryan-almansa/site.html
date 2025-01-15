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
        return response.json(); 
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
    
        // Créer un tableau HTML
        const table = document.createElement('table');
        table.style.width = "100%";
        table.style.borderCollapse = "collapse"; // Pour enlever les doubles bordures
    
        // Créer l'en-tête du tableau
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        ['ID', 'Nom', 'Prénom'].forEach(headerText => {
          const th = document.createElement('th');
          th.textContent = headerText;
          th.style.border = "1px solid #ccc"; // Ajout d'une bordure légère
          th.style.padding = "8px"; // Espacement autour du texte
          th.style.textAlign = "left"; // Alignement du texte à gauche
          headerRow.appendChild(th);
        });
        thead.appendChild(headerRow);
        table.appendChild(thead);
    
        // Créer le corps du tableau
        const tbody = document.createElement('tbody');
        result.forEach(medecin => {
          const row = document.createElement('tr');
    
          // Créer chaque cellule pour l'ID, le nom et le prénom
          const idCell = document.createElement('td');
          idCell.textContent = medecin.id;
          idCell.style.border = "1px solid #ccc";
          idCell.style.padding = "8px";
          row.appendChild(idCell);
    
          const nomCell = document.createElement('td');
          nomCell.textContent = medecin.nom;
          nomCell.style.border = "1px solid #ccc";
          nomCell.style.padding = "8px";
          row.appendChild(nomCell);
    
          const prenomCell = document.createElement('td');
          prenomCell.textContent = medecin.prenom;
          prenomCell.style.border = "1px solid #ccc";
          prenomCell.style.padding = "8px";
          row.appendChild(prenomCell);
    
          tbody.appendChild(row);
        });
        table.appendChild(tbody);
    
        // Ajouter le tableau à la div
        ladivMagique.appendChild(table);
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

chargerListeMedecins();

var monButton = document.getElementById("lebutton");

monButton.addEventListener("click", envoyerUnTruc);

function envoyerUnTruc() {
  const valeurNom = document.getElementById("leNom").value.trim(); 
  const valeurPrenom = document.getElementById("lePrenom").value.trim(); 

  // Vérifier que les champs ne sont pas vides
  if (!valeurNom || !valeurPrenom) {
    alert("Veuillez entrer le nom et le prénom !");
    return;
  }

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