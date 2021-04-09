//Création des titres de la page d'accueil
document.getElementById('presentation').innerHTML += 
'<h1>Orinoco vous présente sa sélection "Oripeluche". Une collection d\'ours en peluche faits à la main.</h1>' +
'<h2>Faites votre choix, personnalisez votre "Teddy" et passez votre commande.</h2>';

//Création d'une fonction "getAllTeddies" pour récupérer les produits de l'API
function getAllTeddies() {
	//Transmision de l'URL au serveur
	fetch("http://localhost:3000/api/teddies")
		//Je demande en retour le contenu de l'API (response)
		//Dès qu'il y a le retour, transformation en format JSON
		.then(response => response.json())
		.then(response => {
			console.log(response);
			//J'appelle ma fonction 'display Teddies' pour afficher ce retour passé en paramètre (response)
			displayTeddies(response);
		})
		//Si il n'y a pas de connexion au serveur
		.catch(error => {
			console.error(error)
			document.getElementById('aucune_connexion').innerHTML = "Il y a eu un problème avec la requête, veuillez nous en excuser";
		})
}

//Exécute le javascript
window.onload = getAllTeddies();

//Récupération de la requête comprenant le nom, l'image, la description et le prix de chaque Teddy
function displayTeddies(response) {
	let section = document.getElementById('teddies');
	//Parcours de la requête pour récupérer tous les produits
	for (let i = 0; i < response.length; i++) {
		//Ajout d'une balise sémantique 'article' pour séparer chaque produit;
		let teddy = document.createElement('article');

		teddy.innerHTML += "<h3>" +
			response[i].name +
			"</h3>" +
			"<img width='100%' src='" + response[i].imageUrl + "'>" +
			"<p>" +
			response[i].description +
			"</p>" +
			"<p>" +
			response[i].price / 100 + " €" +
			"</p>" +
			"<a href='produit.html?id=" + response[i]._id + "'>Voir le produit</a>"
		section.appendChild(teddy);
	}
}

