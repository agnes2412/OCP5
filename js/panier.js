let API_URL = "http://localhost:3000/api/teddies/";
let total = 0;
let panier;

//Pour récupérer les références des teddies sélectionnés du panier dans le localStorage ///////////////////////////////
function initialisation() {
    //Je transforme la chaine de caractères en tableau JSON pour pouvoir l'exploiter
    panier = JSON.parse(localStorage.getItem('Panier'));
    if (panier === null) {
        panier = [];
    }
    console.log(panier);
    //Pour lister chaque élément du panier
    for (let i = 0; i < panier.length; i++) {
        getDataTeddiesBasket(panier[i], i);
        console.log(panier[i], i);
        console.log('ok');
    }
}

//Récupération les données de chaque Teddy du panier
function getDataTeddiesBasket(ID, i) {
    fetch(API_URL + ID)
        .then(response => response.json())
        .then(response => {
            console.log(response);
            //J'afiche la réponse de l'index(i) positionné dans le tableau
            displayBasket(response, i);
        })
        //Si la requête n'aboutit pas
        .catch(error => {
            console.error(error)
            document.getElementById('erreur_serveur').innerHTML = "Suite à un problème de serveur, la requête ne peut aboutir";
            console.log(document.getElementById('erreur_serveur'));
        })
}

//Exécute le javascript
window.onload = initialisation();

//Si le panier est vide
if (panier == 0) {
    let panierVide = document.getElementById('panier_vide');
    panierVide.innerHTML += "Votre panier est vide !";
} 

//Pour afficher le contenu du panier/////////////////////////////////////////////////////////////////
function displayBasket(ID, i) {

        let displayTeddy = document.getElementById('result_teddy_selectionne');
        displayTeddy.innerHTML +=
            "<div>" +
            ID.name +
            "</div>" +
            "<img width=150px src='" + ID.imageUrl + "'>" +
            "<div>" +
            ID.price / 100 + " €" +
            "</div>" +
            //(i) est le curseur qui va se positionner sur l'élément pour le supprimer()
            "<button id='btn_remove_teddy" + i + "'>Supprimer le teddy</button>";
    
    //J'additionne chacun des prix des éléments du panier pour calculer le total
    total += ID.price;
    console.log(total / 100 + " €");
    document.getElementById('result_order').innerHTML = total / 100 + " €";
    
    //Je stocke le total dans le localStorage pour le récupérer sur la page commande
    localStorage.setItem('TotalOrder', total);

    //Je vérifie si il y a des éléments dans le panier
    for (let y = 0; y < panier.length; y++) {
        let element = document.getElementById('btn_remove_teddy' + y);
        //S'il existe un élément dans le panier, je le cible 
        if (element) {
            //Avec un écouteur d'évènement, au clic j'appelle la fonction pour le supprimer
            element.addEventListener('click', function () {
                removeTeddy(y);
            })
        }
    }
}

//Pour supprimer un teddy du panier///////////////////////////////////////////////////////////////////////////
function removeTeddy(i) {
    panier.splice(i, 1);
    //Je mets à jour mon panier
    localStorage.setItem('Panier', JSON.stringify(panier));
    //Je recharge la page
    document.location.reload(true);
}

//Pour supprimer le contenu du panier////////////////////////////////////////////////////////////////////////

//Je vais chercher mon bouton 'vider le panier' par son id et je l'active avec l'écouteur d'évènement au clic
document.getElementById('vider_panier').addEventListener('click', clearBasket);

function clearBasket(event) {
    //permet de stopper le comportement par default du button
    event.preventDefault();
    //permet de supprimer tous les éléments du panier dans le localStorage
    localStorage.removeItem('Panier');
    //Permet le rechargement de la page
    document.location.reload(true);
}

/////////////////////////////////////////LE FORMULAIRE///////////////////////////////////////////////////

//VALIDATION DES DONNEES DU FORMULAIRE///////////////////////////////////////////

//Ajout d'un écouteur d'évènement à mon bouton d'envoi
document.getElementById('btn_envoi').addEventListener('click', formulaire);
//Je crée un objet 'contact' 
let contact;

function formulaire(event) {
    event.preventDefault();
    //Pour la validation du prénom///////////////////////////////////////////////////////////////
    let firstNameNoConform = document.getElementById('firstName_no_conform');
    let firstNameValid = /^[A-zÀ-ù-'-\s]{2,30}$/;
    if (firstName === "" || firstNameValid.test(firstName.value) === false) {
        firstNameNoConform.innerHTML = " Veuillez renseigner votre prénom et respecter le format requis";
        return false;
    } else {
        firstNameNoConform.innerHTML = " ✔";
    }

    //Pour la validation du nom/////////////////////////////////////////////////////////////////
    let lastNameNoConform = document.getElementById('lastName_no_conform');
    let lastNameValid = /^[A-zÀ-ù-'-\s]{2,30}$/;
    //Si les données ne sont pas saisies ou ne correspondent au Regex prédéfini
    if (lastName === "" || lastNameValid.test(lastName.value) === false) {
        lastNameNoConform.innerHTML = " Veuillez renseigner votre nom et respecter le format requis";
        return false;
    } else {
        lastNameNoConform.innerHTML = " ✔";
    }

    //Pour la validation de l'adresse//////////////////////////////////////////////////////////////////////
    let addressNoConform = document.getElementById('address_no_conform');
    let addressValid = /^[A-zÀ-ù-0-9-'-\s]{2,100}$/;
    if (address === "" || addressValid.test(address.value) === false) {
        addressNoConform.innerHTML = " Veuillez renseigner votre adresse et respecter le format requis";
        return false;
    } else {
        //Si tout est correct
        addressNoConform.innerHTML = " ✔";
    }

    //Pour la validation de la ville//////////////////////////////////////////////////////////////////////
    let cityNoConform = document.getElementById('city_no_conform');
    let cityValid = /^[A-zÀ-ù-'-\s]{2,30}$/;
    if (city === "" || cityValid.test(city.value) === false) {

        cityNoConform.innerHTML = " Veuillez renseigner votre ville et respecter le format requis";
        return false;
    } else {
        //Si tout est correct, validation
        cityNoConform.innerHTML = " ✔";
    }

    //Pour la validation de l'email/////////////////////////////////////////////////////////////////////////
    let emailNoConform = document.getElementById('email_no_conform');
    let emailValid = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    if (email === "" || emailValid.test(email.value) === false) {
        emailNoConform.innerHTML = " Veuillez renseigner votre email et respecter le format requis";
        return false;
    } else {
        emailNoConform.innerHTML = " ✔";
    }

    if (panier == 0) {
        let alertPanierVide = document.getElementById('alerte_panier_vide');
        alertPanierVide.innerHTML = "Veuillez remplir votre panier avant de valider votre commande !";
        return false;
    }

    //Si tous les champs du formulaire sont corrects et que le panier n'est pas vide, validation
    //Dans mon objet 'contact', je récupère les valeurs de chaque champs du formulaire
    contact = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        address: document.getElementById('address').value,
        city: document.getElementById('city').value,
        email: document.getElementById('email').value
    }
    // Si toutes les données sont valides, je stocke l'objet "contact" dans le localStorage;
    localStorage.setItem("Contact", JSON.stringify(contact));

    //Je renomme mon panier 'products'
    //Je récupère mon objet 'contact' et mon tableau 'panier' dans le localStorage
    let products = JSON.parse(localStorage.getItem("Panier"));
    contact = JSON.parse(localStorage.getItem("Contact"));
    let commande = {
        contact,
        products
    }
    console.log(commande);
    sendData(commande);
}


//ENVOI COMMANDE/////////////////////////////////////////////////////////////

function sendData(commande) {
    console.log(commande);
    //Je crée un objet 'options' avec la méthod POST, le corps (commande) et les headers
    let options = {
        method: "POST",
        //Corps de la requête transformé en format JSON
        body: JSON.stringify(commande),
        //Informations sur le type de contenu de la requête (JSON)
        headers: {
            "Content-Type": "application/json",
        }
    }
    //Je transmets l'URL et l'objet 'options' au serveur
    fetch("http://localhost:3000/api/teddies/order", options)
        //Utilisation des promesses
        //Dès qu'il y a une réponse (confirmation de la commande), transformation en format JSON
        .then(response => response.json())
        //Avec cette réponse transformée en format JSON
        .then(response => {
            //Demande de suppression du panier et contact du localStorage
            localStorage.removeItem('Panier');
            localStorage.removeItem('Contact');
            //Je stocke le numéro de commande dans le localStorage
            localStorage.setItem('orderId', response.orderId);
            console.log(response);
            //Je renvoie le numéro de commande vers ma page de commande
            window.location.replace('./commande.html');
        })
        //Si la requête n'aboutit pas
        .catch(error => {
            console.error(error)
            document.getElementById('erreur_commande').innerHTML = "Suite à un problème de serveur, votre commande n'a pas pu être enregistrée";
            console.log(document.getElementById('erreur_serveur'));
        })
};
