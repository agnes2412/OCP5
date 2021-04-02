let titre = document.getElementById('titre');
titre.innerHTML += "<h1>Votre commande</h1>";

function affichConfirmation() {
    let confirmationCommande = document.getElementById('confirmation_commande');
    console.log(confirmationCommande);
    confirmationCommande.innerHTML =
        "<div>Votre numéro de commande est : " +
        response.orderId +
        "</div>";
    console.log(response.orderId);

    //envoieDonnees();
};

//Je récupère mon objet 'contact' et mon tableau 'panier' dans le localStorage
/*let products = JSON.parse(localStorage.getItem("Panier"));
contact = JSON.parse(localStorage.getItem("Contact"));
console.log(products, contact);
//envoieDonnees(products, contact);

function envoieDonnees(products, contact) {

    //Je crée une requête avec la méthode POST pour envoyer les données du localStorage au serveur
    let request = new XMLHttpRequest();
    request.open("POST", "http://localhost:3000/api/teddies/order");
    //'Content-Type' indique le type du corps de la requête (ici json)
    request.setRequestHeader("Content-Type", "application/json");
    request.onreadystatechange = function () {
        //Tant qu'il y a des éléments et que le statut est bon, envoi des données
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            //création d'une variable 'response' (fichier responseText)
            response = JSON.parse(this.responseText);
            console.log(response);
        }
    }
    
    //Envoi de la requête avec concaténation de l'objet 'contact' et du tableau 'products' parsés en 'string'
    request.send(JSON.stringify(products) + JSON.stringify(contact));
    console.log(request);
    console.log(JSON.stringify(products) + JSON.stringify(contact));
    affichConfirmation();
};

function affichConfirmation() {
    let confirmationCommande = document.getElementById('confirmation_commande');
    confirmationCommande.innerHTML =
        "<div>Votre numéro de commande est : " +
        response +
        "</div>";
}

//Exécute le JavaScript
window.onload = envoieDonnees(products, contact);*/

    //localStorage.setItem('Panier', JSON.stringify(products));
    //localStorage.setItem('Contact', JSON.stringify(contact));


//Je crée une variable pour faire une requête POST ()
/*let options = {
    method: "POST",
    body: JSON.stringify(commande),
    //Type du corps de la requête
    headers: {
        "Content-Type": "application/json",
    }
})


fetch("http://localhost:3000/api/teddies/order", options)
.then(response  => response.json())
.then(response => {
    localStorage.removeItem('Panier');
    localStorage.removeItem('Contact');
    localStorage.setItem('orderId', response.orderId);
    window.location.replace('./commande.html');

})

.catch(error => console.error(error))*/


//localStorage.setItem('Panier', JSON.stringify(panier));
//localStorage.setItem('Contact', JSON.stringify(contact));
