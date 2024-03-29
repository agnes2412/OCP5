
//Création des titres de la page d'accueil
document.getElementById('presentation').innerHTML += 
'<h1>Notre sélection "Oripeluche"</h1>' +
'<h2>Faites votre choix, personnalisez votre "Teddy" et passez votre commande</h2>';

//Création d'une fonction "getAllTeddies" pour récupérer les produits de l'API
function getAllTeddies() {
	let texteErreur = "ICI";
	let lien = 'https://github.com/agnes2412/OCP5';
	//Transmision de l'URL au serveur
	fetch("http://localhost:3000/api/teddies")
		//Dès qu'il y a le retour de la promesse (response), transformation en format JSON
		.then(response => response.json())
		.then(response => {
			//Appel de la fonction 'display Teddies' pour afficher ce retour passé en paramètre (response)
			displayTeddies(response);
		})
		//Si il n'y a pas de connexion au serveur, message d'erreur
		.catch(error => {
			console.error(error);
			document.getElementById('aucune_connexion').innerHTML = "Il y a eu un problème avec la requête. Pour accéder à ce projet, veuillez cliquer " + "<span id='lien'>" + texteErreur.link(lien) + "." + "</span>" + " Merci.";
		})
}

//Permet le chargement de la page dans la fenêtre du navigateur et l'exécution de la fonction
window.onload = getAllTeddies();

//Permet l'affichage des éléments passés en paramètre (response)
function displayTeddies(response) {
	let section = document.getElementById('teddies');
	//Parcours de l'objet contenant tous les produits 
	for (let i = 0; i < response.length; i++) {
		//Ajout d'une balise 'article' pour la mise en page des produits;
		let teddy = document.createElement('article');
		teddy.innerHTML += "<h3>" +
			response[i].name +
			"</h3>" +
			"<img width='100%' alt='ourson en peluche' src='" + response[i].imageUrl + "'>" +
			"<p>" +
			response[i].description +
			"</p>" +
			"<p id='price'>" +
			response[i].price / 100 + " €" +
			"</p>" +
			"<a href='produit.html?id=" + response[i]._id + "'><button>Voir le produit</button></a>"
		section.appendChild(teddy);
	}
}

