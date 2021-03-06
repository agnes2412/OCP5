


let header  = document.createElement('header');
header.innerHTML = '<ul><li>Accueil</li><li>Panier</li></ul>';
console.log('ok');

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
			teddy(response);
		}
	};
	console.log('ok1');
	//Ouverture de l'URL avec la méthode 'GET'
	request.open('GET', 'http://localhost:3000/api/teddies/:_id');
	//Envoi de la requête au service web
	request.send();
}
console.log('ok2');
window.onload = getTeddy();

//document.getElementById('teddies').innerHTML = response;

function teddy(response) {
	let section1 = document.getElementById('teddy');
	console.log('ok')

	document.getElementById('teddy').style.border = '5px solid violet';

	let teddyProduct = document.createElement('div');
	//teddyProduct._id = response[i];

	for (let i = 0; i < response.length; i++) {
		//addteddy(response[i]);
		console.log('ok2')
		teddyProduct.innerHTML +=
			"<div>" +
			"<h3>" +
			response[i].name +
			"</h3>" +
			"<img src='" + response[i].imageUrl + "'>" +
			"<p>" +
			response[i].description +
			"</p>" +
			"<p>" +
			response[i].colors +
			"</div>";
	}
}
section1.appendChild(teddyProduct);


