//Création des titres
let titles = document.getElementById('presentation');
titles.innerHTML = '<h1>Orinoco vous présente sa sélection "Oripeluche". Une collection d\'ours en peluche faits à la main.</h1>' + 
'<h2>Faites votre choix, personnalisez votre "Teddy" et passez votre commande.</h2>';

titles.style.color = "#673ab7";
titles.style.textAlign = "center";

//Création d'une fonction "getAllTeddies" pour récupérer les données de l'API
function getAllTeddies() {
	//Création et envoi d'une requête avec l'objet XMLHttpRequest
	let request = new XMLHttpRequest();

	request.onreadystatechange = function () {
		//Tant qu'il y a des images et que le statut est bon, envoi des données
		if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
			//création d'une variable 'response' (fichier responseText)
			let response = JSON.parse(this.responseText);
			console.log(response);
			teddies(response);
		}
	};

	//Ouverture de l'URL avec la méthode 'GET'
	request.open('GET', 'http://localhost:3000/api/teddies');
	//Envoi de la requête au service web
	request.send();
}

//Exécute le javascript
window.onload = getAllTeddies();

//Récupération de la requête comprenant le nom, l'image, la description et le prix de chaque Teddy
function teddies(response) {
	let section = document.getElementById('teddies');
	console.log('ok');

	document.getElementById('teddies').style.border = '5px solid violet';

	for (let i = 0; i < response.length; i++) {
		console.log('ok2');
		//Ajout d'un article et création d'un cadre autour de chaque "teddy";
		let teddy = document.createElement('article');
		teddy.style.textAlign = 'justify';
		teddy.style.border = "1px solid #673ab7";
		teddy.style.margin = "10px";
		teddy.style.padding = "20px";
		teddy.style.width = "300px";
		teddy.style.height = "450px";
		teddy.style.boxShadow = "4px 4px 4px 1px #ac96d4";

		teddy._id = response[i];
		teddy.innerHTML += "<h3>" +
			response[i].name +
			"</h3>" +
			"<img width='100%' src='" + response[i].imageUrl + "'>" +
			"<p>" +
			response[i].description +
			"</p>" +
			"<p>" +
			response[i].price +
			"</p>" +
			"<a href='produit.html?id=" + response[i]._id + "'>Voir le produit</a>"
		section.appendChild(teddy);

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
	}
}





