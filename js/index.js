
function getAllTeddies() {
	//Création et envoi d'une requête avec l'objet XMLHttpRequest
let request = new XMLHttpRequest();

request.onreadystatechange = function() 
{
	//Tant qu'il y a des images et que le statut est bon, envoi des données
	if (this.readyState == XMLHttpRequest.DONE && this.status == 200) 
	{
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

window.onload = getAllTeddies();

//document.getElementById('teddies').innerHTML = response;

//Intégration d'une div dans la section id 'teddies' comprenant le nom, l'image, la description et le prix de chaque Teddy sous forme de liste
function teddies(response)
{
	let section = document.getElementById('teddies');
	console.log('ok')
	for (let i = 0; i < response.length; i++) 
	{
		//addProduct(response[i], Teddies);
		console.log('ok2')
		
		
		section.innerHTML += 
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
			"<a href='produit.html?id=" + response[i]._id +"'>Voir le produit</a>"
			"</div>";
	}
}

/*let  = new TeddyCard;

class TeddyCard {
	constructor(name, imageUrl, description, price) {
		this.name = name;
		this.imageUrl = imageUrl;
		this.description = description;
		this.price = price;
	}
}

let teddyOne = TeddyCard(')
*/

document.getElementById('teddies').style.border = '5px solid violet';










