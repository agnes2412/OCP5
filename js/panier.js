//récupération de l'id dans l'URL pour le stocker dans une variable
let QUERYSTRING = window.location.search;
let URLPARAMETERS = new URLSearchParams(QUERYSTRING);
let ID = URLPARAMETERS.get('id');
console.log(ID);
let API_URL = "http://localhost:3000/api/teddies/";

//Récupération des références dans le localStorage
panier = JSON.parse(localStorage.getItem('Panier'));
if (panier === null) {
    panier = [];
}
//Pour lister chaque élément, récupérer 
for (let i = 0; i < panier.length; i++) {
    recuperationDonnees(ID);
    affichagePanier(ID);
}

//Récupération du nom et du prix 
function recuperationDonnees(ID) {

    //J'envoie un requête vers l'API pour récupérer le nom et le prix de l'ID
    let request = new XMLHttpRequest();

    request.onreadystatechange = function () {
        //Tant qu'il y a des éléments et que le statut est bon, envoi des données
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            //création d'une variable 'response' (fichier responseText)
            let response = JSON.parse(this.responseText);
            console.log(response);
        }
    }

    //Ouverture d'une connexion à un service web avec la méthode 'GET' pour récupérer l'URL + ID
    request.open('GET', API_URL + ID);
    //Envoi de la requête au service web
    request.send();
}

//Exécute le javascript
window.onload = recuperationDonnees(ID);

function affichagePanier(ID) {
    let affichageName = document.getElementById('result_name');

    affichageName.innerHTML +=
        "<div>" +
        ID.name +
        "</div>";
}




/*//récupération de l'id dans l'URL pour le stocker dans une variable
let QUERYSTRING = window.location.search;
let URLPARAMETERS = new URLSearchParams(QUERYSTRING);
let ID = URLPARAMETERS.get('id');
console.log(ID);
let API_URL = "http://localhost:3000/api/teddies/";

//Création d'une fonction 'getBasket' pour récupérer d'Id de chaque Teddy du panier
function getBasket() {

    //Création et envoi d'une requête avec l'objet XMLHttpRequest
    let request = new XMLHttpRequest();

    request.onreadystatechange = function () {
        //Tant qu'il y a des images  et que le statut est bon, envoi des données
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            //création d'une variable 'response' (fichier responseText)
            let response = JSON.parse(this.responseText);
            console.log(response);

            displayBasket();
        }
    };
    //Ouverture de l'URL avec la méthode 'GET'
    request.open('GET', API_URL + ID);
    //Envoi de la requête au service web
   // request.send();
};

//Exécute le JavaScript
window.onload = getBasket();
console.log('ok');

function displayBasket(response) {
    panier = JSON.parse(localStorage.getItem('Panier'));
    let sectionPanier = document.getElementById('basket');
    if (panier === null) {
        panier = [];
    }
        for (let i = 0; i < panier.length; i++) {
            let nom = ID.name[i] ;
            let div = document.createElement('div');
            div.innerHTML += "<p>" + nom + "</p>";
            sectionPanier.appendChild(div);

            localStorage.setItem('Panier', JSON.stringify(panier));
        }
};*/



