function envoyerUntruc() {
  let valeurDeMonChamp = document.getElementById("leNom");
  fetch("http://192.168.65.113:8080/AddMedecin",
      {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: "POST",
          body: JSON.stringify({"nom": valeurDeMonChamp})
      })
      .then(function(res){ console.log(res) })
      .catch(function(res){ console.log(res) })  
}

var monBouton = document.getElementById("LeNom"); 
monBouton.addEventListener("click", envoyerUntruc);











// Récupérer l'élément où afficher la liste des médecins
var ladivMagique = document.getElementById("idListeMedecin");

// Afficher un message de chargement pendant la récupération des données
ladivMagique.innerHTML = "Chargement des médecins...";

// Appeler l'API pour récupérer la liste des médecins
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
        // Afficher prénom et nom du médecin
        li.textContent = `${medecin.nom} ${medecin.prenom}`; // Concaténer nom et prénom
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