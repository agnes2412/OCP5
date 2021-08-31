let API_URL = "http://localhost:3000/api/teddies/";
let total = 0;
let panier;

//Récupération des références des teddies sélectionnés du panier dans le localStorage
function initialisation() {
    //Transformation de la chaine de caractères en tableau pour pouvoir l'exploiter
    panier = JSON.parse(localStorage.getItem('Panier'));
    //Si le tableau 'panier' n'existe pas, je le crée
    if (panier === null) {
        panier = [];
    }
    //Pour lister chaque élément du panier
    for (let i = 0; i < panier.length; i++) {
        //Appel de la fonction qui récupère des données du panier
        getDataTeddiesBasket(panier[i], i);
    }
}

//Récupération les données de chaque Teddy du panier
function getDataTeddiesBasket(ID, i) {
    fetch(API_URL + ID)
        .then(response => response.json())
        .then(response => {
            //Appel de la fonction qui permet d'afficher chaque élément du tableau
            displayBasket(response, i);
        })
        //Si la requête n'aboutit pas, message d'erreur
        .catch(error => {
            console.error(error);
            document.getElementById('aucune_connexion').innerHTML = "Il y a eu un problème avec la requête, veuillez nous en excuser";
        })
}

//Chargement dans la fenêtre de navigation et exécution du javascript
window.onload = initialisation();

//Message pour informer que le panier est vide
if (panier == 0) {
    document.getElementById('panier_vide').innerHTML += "Votre panier est vide !";
}

//Affichage du contenu du panier
function displayBasket(ID, i) {
    document.getElementById('result_teddy_selectionne').innerHTML +=
        "<div id='carte_teddy'>" +
        "<p>" +
        ID.name + " - " +
        ID.price / 100 + " €" +
        "</p>" +
        "<img src='" + ID.imageUrl + "'>" +
        "<div>" +
        //(i) est le curseur qui va se positionner sur l'élément 
        "<button id='btn_remove_teddy" + i + "'>Supprimer " + ID.name + "</button>"
    "</div>" +
        "</div>";

    //Vérification qu'il existe des éléments dans le panier
    for (let y = 0; y < panier.length; y++) {
        let element = document.getElementById('btn_remove_teddy' + y);
        //S'il existe un élément dans le panier, je le cible 
        if (element) {
            //Avec un écouteur d'évènement, au clic, appel de la fonction pour le supprimer
            element.addEventListener('click', function () {
                removeTeddy(y);
            })
        }
    }
    //Addition de chacun des prix des éléments du panier pour calculer le total
    total += ID.price;
    document.getElementById('result_order').innerHTML = total / 100 + " €";

    //Stockage du total dans le localStorage pour le récupérer et l'affichre sur la page commande
    localStorage.setItem('TotalOrder', total);
}

//Pour supprimer un teddy du panier
function removeTeddy(i) {
    panier.splice(i, 1);
    //Mise à jour du panier
    localStorage.setItem('Panier', JSON.stringify(panier));
    //Rechargement de la page
    document.location.reload(true);
}

//Pour supprimer le contenu du panier
//Activation au clic du bouton 'vider le panier' avec l'écouteur d'évènement 
document.getElementById('vider_panier').addEventListener('click', function () {
    //permet de supprimer tous les éléments du panier dans le localStorage
    localStorage.removeItem('Panier');
    //Permet le rechargement de la page
    document.location.reload(true);
})

/////////////////////////////////////////LE FORMULAIRE///////////////////////////

let firstName;
let lastName;
let address;
let city;
let email;
let contact;

//VALIDATION DES DONNEES 
function validateInput(inputId, regex, inputName, message) {
    let inputMessage = document.getElementById(inputId);

    //Si les données ne sont pas saisies ou ne correspondent au Regex prédéfini
    if (inputName === "" || regex.test(inputName) === false) {
        inputMessage.innerHTML = message;
        return false;
        //Si tout est correct
    } else {
        inputMessage.innerHTML = "✔";
    }
}

//Ecouteur d'évènement associé au bouton d'envoi de la commande
document.getElementById('btn_envoi').addEventListener('click', event => confirmOrder(event));
//Vérification des données renseignées 
function confirmOrder(event) {
    event.preventDefault();
    let dataValid = true;
    contact = {
        firstName: document.getElementById('first_name').value,
        lastName: document.getElementById('last_name').value,
        address: document.getElementById('address').value,
        city: document.getElementById('city').value,
        email: document.getElementById('email').value
    }
    //Si le panier est vide, l'envoi ne s'effectue pas
    if (panier.length === 0) {
        document.getElementById('alerte_panier_vide').innerHTML = "Veuillez remplir votre panier avant de valider votre commande !";
        return false;
    };

    //Si les données ne sont pas valides, l'envoi ne s'effectue pas
    if (validateInput('firstName_no_conform', /^[A-zÀ-ù-'-\s]{2,30}$/, contact.firstName, ' Veuillez renseigner votre prénom et respecter le format requis') === false) {
        dataValid = false;
    };
    if (validateInput('lastName_no_conform', /^[A-zÀ-ù-'-\s]{2,30}$/, contact.lastName, ' Veuillez renseigner votre nom et respecter le format requis') === false) {
        dataValid = false;
    };
    if (validateInput('address_no_conform', /^[A-zÀ-ù-0-9-'-\s]{2,100}$/, contact.address, 'Veuillez renseigner votre adresse et respecter le format requis') === false) {
        dataValid = false;
    };
    if (validateInput('city_no_conform', /^[A-zÀ-ù-'-\s]{2,30}$/, contact.city, 'Veuillez renseigner votre ville et respecter le format requis') === false) {
        dataValid = false;
    };
    if (validateInput('email_no_conform', /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/, contact.email, 'Veuillez renseigner votre email et respecter le format requis') === false) {
        dataValid = false;
    };

    if (dataValid === true) {

        // Si toutes les données sont valides, stockage de l'objet "contact" dans le localStorage;
        localStorage.setItem("Contact", JSON.stringify(contact));
        console.log(contact);
        //Changement de nom de variable: 'panier' devient 'products'
        //Récupération de l'objet 'contact' et l'objet 'products' dans le localStorage
        let products = JSON.parse(localStorage.getItem("Panier"));
        contact = JSON.parse(localStorage.getItem("Contact"));
        //Création d'un objet commande 
        let commande = {
            contact,
            products
        }
        //Appel de la fonction qui permet l'envoi de la commande
        sendData(commande);
    }
}

//ENVOI COMMANDE/////////////////////////////////////////////////////////////

function sendData(commande) {
    //Création d'un objet 'options' avec la méthod POST, le body (commande) et les headers
    let options = {
        method: "POST",
        //Corps de la requête transformé en format JSON
        body: JSON.stringify(commande),
        //Informations sur le type de contenu de la requête (JSON)
        headers: {
            "Content-Type": "application/json",
        }
    }
    //Transmission de l'URL et de l'objet 'options' au serveur. Utilisation des promesses
    fetch("http://localhost:3000/api/teddies/order", options)
        //Dès qu'il y a une réponse (confirmation de la commande), transformation en format JSON
        .then(response => response.json())
        //Avec cette réponse transformée en format JSON
        .then(response => {
            //Demande de suppression du panier et contact du localStorage
            localStorage.removeItem('Panier');
            localStorage.removeItem('Contact');
            //Stockage du numéro de commande dans le localStorage
            localStorage.setItem('orderId', response.orderId);
            console.log(response);
            //Renvoi du numéro de commande vers la page de commande
            window.location.replace('./commande.html');
        })
        //Si la requête n'aboutit pas
        .catch(error => {
            console.error(error)
            document.getElementById('erreur_commande').innerHTML = "Suite à un problème de serveur, votre commande n'a pas pu être enregistrée";
        })
}
