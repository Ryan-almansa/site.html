  alerte("chargement");
  var ladivmagique = document.getElementById("idListMedecin");


  fetch('http://192.168.65.113:8080/Route1', {
    headers: {
        Accept: 'application/json'
    }
}).then(response => {
    if (response.ok) {
        return response.json()
    } else {
        throw new Error('Erreur serveur', { cause: response })
    }
}).then(result => {
    console.log('La liste des articles : ', result)
}).catch(error => {
    console.error('Une erreur est survenue', error)
})