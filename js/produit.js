//Récupération de l'id dans l'URL 
let QUERYSTRING = window.location.search;
let URLPARAMETERS = new URLSearchParams(QUERYSTRING);
//Pour le stocker dans une variable
let ID = URLPARAMETERS.get('id');
let API_URL = "http://localhost:3000/api/teddies/";

//Création d'une fonction 'getTeddy' pour récupérer les données de l'Id de chaque Teddy
function getTeddy() {
	//Transmision de l'URL et de l'id au serveur
	fetch(API_URL + ID)
		//Dès qu'il y a le retour, transformation en format JSON
		.then(response => response.json())
		.then(response => {
			console.log(response);
			//Appel de la fonction pour afficher le produit
			displayTeddy(response);
		})
		//Si la requête n'aboutit pas
		.catch(error => {
			console.error(error)
			document.getElementById('erreur_serveur').innerHTML = "Suite à un problème de serveur, la requête ne peut aboutir";
			console.log(document.getElementById('erreur_serveur'));
		})
}

//Permet le chargement et l'exécution de la fonction
window.onload = getTeddy();

//Affiche les données de l'élément passé en paramètre (le teddy)
function displayTeddy(response) {
	document.getElementById('affich_teddy_selectionne').innerHTML +=
		"<div>" +
		"<h3>" +
		response.name +
		"</h3>" +
		"<img width=100% src='" + response.imageUrl + "'>" +
		"<p>" +
		response.description +
		"</p>" +
		"<select id='select'>" +
		"</select>" +
		"<p>Prix : " +
		response.price / 100 + " €" +
		"</p>" +
		"<button id='button'>Ajoutez au panier </button>" +
		"<p id='alerte_ajout_panier'></p>" +
		"</div>";

	for (let i = 0; i < response.colors.length; i++) {
		select.innerHTML +=
			"<option value = '" + response.colors[i] + "'>" + response.colors[i] + "</option>";
	}

	//Récupération des teddies sélectionnés par l'écouteur d'évènement
	document.getElementById('button').addEventListener('click', myFonction);
	function myFonction() {
		//Appel de la fonction addTeddyToBasket pour récupérer le panier et son contenu
		addTeddyToBasket();
		document.getElementById("alerte_ajout_panier").innerHTML = "Votre produit a bien été ajouté au panier!";
	};
};

//Création d'une fonction pour stocker les teddies sélectionnés dans le localStorage
function addTeddyToBasket() {

	//Je transforme la chaine de caractères en tableau JSON pour pouvoir l'exploiter
	let panier = JSON.parse(localStorage.getItem('Panier'));
	//Si panier n'existe pas, je crée un tableau vide
	if (panier === null) {
		panier = [];
	}
	//Les teddies sélectionnés s'ajoutent
	panier.push(ID);
	//Je transforme le tableau en chaine de caractère
	localStorage.setItem('Panier', JSON.stringify(panier));
};


