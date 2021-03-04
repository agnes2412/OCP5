
function getTeddyById() {
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
		teddy(response);
	}
};

//Ouverture de l'URL avec la méthode 'GET'
request.open('GET', 'http://localhost:3000/api/teddies/' +id);
//Envoi de la requête au service web
request.send();
}
console.log(request);

window.onload = getTeddyById();

//document.getElementById('teddies').innerHTML = response;

function teddy(response) {
	let section = document.getElementById('teddy');
	console.log('ok')
	for (let i = 0; i < response.length; i++) {
		//addGetAllTeddies(response[i], Teddies);
		console.log('ok2')
		section.innerHTML += 
			"<div>" + 
			"<h3>" + 
			response[i].name + 
			"</h3>" +
			"<img src='"+response[i].imageUrl + "'>" + 
			"<p>" +
			response[i].description + 
			"</p>" +
			"<p>" +
			reponse[i].colors +
			"</div>";
	}
}



