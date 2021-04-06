//Création des titres de la page d'accueil
let element = document.getElementById('presentation');
element.innerHTML += '<h1>Orinoco vous présente sa sélection "Oripeluche". Une collection d\'ours en peluche faits à la main.</h1>';
element.innerHTML += '<h2>Faites votre choix, personnalisez votre "Teddy" et passez votre commande.</h2>';

//Création d'une fonction "getAllTeddies" pour récupérer les produits de l'API
function getAllTeddies() {
	//Transmision de l'URL au serveur
	fetch("http://localhost:3000/api/teddies")
        //Je demande en retour le contenu de l'API (response)
		//Dès qu'il y a le retour, transformation en format JSON
        .then(response => response.json())
		//J'appelle ma fonction 'display Teddies' pour afficher ce retour passé en paramètre (response)
        .then(response => {
			console.log(response);
            displayTeddies(response);
        })
		.catch((erreur) => {
			console.log(erreur);
		});
	}

//Exécute le javascript
window.onload = getAllTeddies();

//Récupération de la requête comprenant le nom, l'image, la description et le prix de chaque Teddy
function displayTeddies(response) {
	let section = document.getElementById('teddies');

	for (let i = 0; i < response.length; i++) {
		//Ajout d'une balise sémantique 'article' pour séparer chaque "teddy";
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

		//console.log pour le test unitaire
		console.log(response[i].name);
	}
}

