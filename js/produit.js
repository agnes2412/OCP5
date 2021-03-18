
//let colorSelected = '';
//récupération de l'id dans l'URL pour le stocker dans une variable
let QUERYSTRING = window.location.search;
let URLPARAMETERS = new URLSearchParams(QUERYSTRING);
let ID = URLPARAMETERS.get('id');
console.log(ID);
let API_URL = "http://localhost:3000/api/teddies/";

//Création d'une fonction 'getTeddy' pour récupérer d'Id de chaque Teddy
function getTeddy() {

	//Création et envoi d'une requête avec l'objet XMLHttpRequest
	let request = new XMLHttpRequest();

	request.onreadystatechange = function () {
		//Tant qu'il y a des images et que le statut est bon, envoi des données
		if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
			//création d'une variable 'response' (fichier responseText)
			let response = JSON.parse(this.responseText);
			console.log(response);
			displayTeddySelected(response);
		}
	};

	//Ouverture de l'URL avec la méthode 'GET'
	request.open('GET', API_URL + ID);
	//Envoi de la requête au service web
	request.send();
}

//Exécute le JavaScript
window.onload = getTeddy();
console.log('ok1');

//Affiche les données du teddy sélectionné
function displayTeddySelected(response) {
	let sectionAffichageTeddy = document.getElementById('affich_teddy_selectionne');

	sectionAffichageTeddy.innerHTML +=
		"<div>" +
		"<h3>" +
		response.name +
		"</h3>" +
		"<img width=600px src='" + response.imageUrl + "'>" +
		"<p>" +
		response.description +
		"</p>" +
		"<select id='select'>" +
		"</select>" +
		"<p>Prix : " +
		response.price +
		"</p>" +
		"<button id='button'>Ajoutez au panier + <span id='ajout_panier'>0</span></button>" +
		"</div>";


	/*function affichColor(event) {
		let resultColor = document.getElementById('result_color');
		resultColor.innerHTML = event.target.value;
	}*/

	for (let i = 0; i < response.colors.length; i++) {
		select.innerHTML +=
			"<option value = '" + response.colors[i] + "'>" + response.colors[i] + "</option>";
	}
	//Ecoute de l'évènement pour récupérer la couleur choisie et l'afficher dans l'id "result_color"
	//let select = document.getElementById('select');

	//Récupération des teddies sélectionnés par l'écouteur d'évènement
	document.getElementById('button').addEventListener('click', function() {
		//Appel de la fonction addTeddyToBasket pour récupérer le panier et son contenu
		addTeddyToBasket();
	});
};


//Création d'une fonction pour stocker dans le localStorage les teddies sélectionnés
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

//récupération de l'id dans l'URL pour le stocker dans une variable
/*let QUERYSTRING = window.location.search;
let URLPARAMETERS = new URLSearchParams(QUERYSTRING);
let ID = URLPARAMETERS.get('id');

let API_URL = "http://localhost:3000/api/teddies/";

//Création et envoi d'une requête avec l'objet XMLHttpRequest
let request = new XMLHttpRequest();

request.onreadystatechange = function () {
	//Tant qu'il y a des images et que le statut est bon, envoi des données
	if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
		//création d'une variable 'response' (fichier responseText)
		let response = JSON.parse(this.responseText);
		console.log(response);
		addToTeddyBasket(response);
	}
};

//Ouverture de l'URL avec la méthode 'GET'
request.open('GET', API_URL + ID);
//Envoi de la requête au service web
request.send();


	//let panierProduct = []

	//Stockage du produit récupéré avec localStorage
	//Vérifie la prise en charge du navigateur
/*if (typeof (storage) !== "undefined" {
	//Si la prise en charge est définit, on stocke
	localStorage.setItem("http://localhost:3000/api/teddies/" + id);
	//et on récupère
	document.getElementById("basket") = localstorage.getItem("http://localhost:3000/api/teddies/");
} else {
	document.getElementById("basket").innerHTML = "Désolé, votre navigateur ne prend pas en charge le stockage web";
}



/*Exemple de mise en pratique de addEventListener qui montre comment afficher un nombre de clics
let parent = document.getElementById('parent');
parent.addEventListener('click', myFonction);
function myFonction() {
let parentCount = document.getElementById('parent-count');
parentCount.innerHTML ++
};

let child = document.getElementById('child');
child.addEventListener('click', mySecondFonction);
function mySecondFonction(event) {
event.stopPropagation();
event.preventDefault();
let childCount = document.getElementById('child-count');
childCount.innerHTML ++;
};

<html>
<head>
<link rel="stylesheet" type="text/css" href="base.css">
</head>
<body>
<article id="parent">
  <a class="link" id="child" href="#">Cliquez ici</a>
  <p>Battle d'événement !</p>
  Parent : <span id="parent-count">0</span>
  Enfant : <span id="child-count">0</span>
</article>

<script type="text/javascript" src="index.js"></script>
</body>
</html>

//Savoir quand le contenu change
let name = document.getElementById('name');
name.addEventListener('change', affichName);
function affichName (event) {
let resName = document.getElementById('res-name');
resName.innerHTML = event.target.value;
};

let gender = document.getElementById('gender');
gender.addEventListener('change', affichGender);
function affichGender (event) {
let resGender = document.getElementById('res-gender');
resGender.innerHTML = event.target.value;
};
let result = document.getElementById('result');
result.addEventListener('mousemove', affichResult);
function affichResult(e) {
const x = event.offsetX;
const y = event.offsetY;
var coor = "Coordinates: (" + x + "," + y + ")";
result.innerHTML = coor;
};

function askWeather()  {

let request = new XMLHttpRequest();
request.onreadystatechange = function() {

   if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
		let response = JSON.parse(this.responseText);
		console.log(response.current_condition.condition);
	}
}
  request.open("GET", "http://url-service-web.com/api/users");
  request.send();
}

//let weatherResult = document.getElementById('weather-result');

weatherResult.innerHTML = askWeather;*/
