//Création des titres
let element = document.getElementById('presentation');
element.innerHTML += '<h1>Orinoco vous présente sa sélection "Oripeluche". Une collection d\'ours en peluche faits à la main.</h1>';
element.innerHTML += '<h2>Faites votre choix, personnalisez votre "Teddy" et passez votre commande.</h2>';

//Création d'une fonction "getAllTeddies" pour récupérer les données de l'API
function getAllTeddies() {

const promesse1 = fetch('http://localhost:3000/api/teddies');
promesse1.then((response) => {
	console.log(response);
	const teddiesList = response.json();
	console.log(teddiesList);
	teddiesList.then((response) => {
		affichageTeddies(response);	
	});
})
	.catch((erreur) => {
		console.log(erreur);
	});
	

/*//Création d'une requête de type XMLHttpRequest (AJAX) 
let request = new XMLHttpRequest();
//Le mot clé 'this' de onreadystatechange permet d'accéder aux propriétés 'readyState' et 'status'
request.onreadystatechange = function () {
	//Tant que l'état de la requête et le statut sont bons, envoi des données
	if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
		//création d'une variable 'response' (fichier responseText) 
		//et transformation du format Json en objet JavaScript
		let response = JSON.parse(this.responseText);
		console.log(response);
		//Appel de la fonction 'teddies'  
		teddies(response);
	}
};

//Ouverture d'une connexion vers un service web avec la méthode 'GET' et l'URL 
request.open('GET', 'http://localhost:3000/api/teddies');
//Envoi de la requête au service web
request.send();*/

}

//Exécute le javascript
window.onload = getAllTeddies();

//Récupération de la requête comprenant le nom, l'image, la description et le prix de chaque Teddy
function affichageTeddies(response) {
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

/* section.innerHTML +=
	"<div>" +
	"<h3>" +
	response[i].name +
	"</h3>" +
	"<img width='300px' src='" + response[i].imageUrl + "'>" +
	"<p>" +
	response[i].description +
	"</p>" +
	"<p>" +
	response[i].price +
	"</p>" +
	"<a href='produit.html?id=" + response[i]._id + "'>Voir le produit</a>"
"</div>"; */



