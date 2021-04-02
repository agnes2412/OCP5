let API_URL = "http://localhost:3000/api/teddies/";
let total = 0;

//Pour récupérer les références des teddies sélectionnés du panier dans le localStorage ///////////////////////////////

function initialisation() {
    panier = JSON.parse(localStorage.getItem('Panier'));
    if (panier === null) {
        panier = [];
    }
    console.log(panier);
    //Pour lister chaque élément du panier
    for (let i = 0; i < panier.length; i++) {
        recuperationDonnees(panier[i], i);
        console.log(i);
        console.log('ok');
        //document.getElementById('btn_remove_teddy' + i).addEventListener('click', supprimerTeddy(i));
    }
    //window.addEventListener('load', function (event) {
    //for (let i = 0; i < panier.length; i++) {
    //console.log(document.getElementById('btn_remove_teddy' + i));
    //console.log('ok');
    //document.getElementById('btn_remove_teddy' + i).addEventListener('click', supprimerTeddy(i));
    // }
    //  })
}

//Récupération du nom et du prix 
function recuperationDonnees(ID, i) {

    //J'envoie une requête vers l'API pour récupérer le nom et le prix de l'ID
    let request = new XMLHttpRequest();

    request.onreadystatechange = function () {
        //Tant qu'il y a des éléments et que le statut est bon, envoi des données
        if (this.readyState == XMLHttpRequest.DONE && this.status == 200) {
            //création d'une variable 'response' (fichier responseText)
            let response = JSON.parse(this.responseText);
            console.log(response);

            affichagePanier(response, i);
            // document.getElementById('btn_remove_teddy' + i).addEventListener('click', supprimerTeddy(i));
        }
    }

    //Ouverture d'une connexion à un service web avec la méthode 'GET' pour récupérer l'URL + ID
    request.open('GET', API_URL + ID);
    //Envoi de la requête au service web
    request.send();
}

//Exécute le javascript
window.onload = initialisation();

//Pour afficher le contenu du panier/////////////////////////////////////////////////////////////////

function affichagePanier(teddy, i) {
    let affichageName = document.getElementById('result_teddy_selectionne');
    ///J'additionne chacun des prix des élément du panier
    total += teddy.price;
    affichageName.innerHTML +=
        "<div>" +
        teddy.name +
        "</div>" +
        "<img width=100px src='" + teddy.imageUrl + "'>" +
        "<div>" +
        teddy.price / 100 + " €" +
        "</div>" +
        "<button id='btn_remove_teddy" + i + "'>Supprimer le teddy</button>";
    let affichTotal = document.getElementById('result_order');
    affichTotal.innerHTML = total / 100 + " €";
}

// Pour calculer le total du panier//////////////////////////////////////////////////////////////////////////

function calculTotal() {
    //J'initialise la variable 'totalPanier' à 0
    let totalPanier = 0;
    //Récupération des références dans le localStorage 
    panier = JSON.parse(localStorage.getItem('Panier'));
    //Avec la boucle for, je parcours l'objet localStorage ('panier') pour récupérer le prix des éléments 'i' du tableau et je les incrémente

    for (let i = 0; i < panier.length; i++) {
        //A chaque tour de boucle avec le +=, je rajoute le prix de l'élément
        totalPanier += [i].price;
    }

    //Je crée une variable que je place dans d'id correspondant au total du panier
    let affichagePrixTotal = document.getElementById('result_order');
    //J'appelle le résultat du tableau 'totalPanier' pour l'afficher
    affichagePrixTotal.innerHTML =
        "<p>Le total : " +
        totalPanier.price +
        "</p>";
}


//Pour supprimer le contenu du panier////////////////////////////////////////////////////////////////////////

//Je vais chercher mon bouton 'vider le panier' par son id et je l'active avec l'écouteur d'évènement au clic
document.getElementById('vider_panier').addEventListener('click', viderPanier);

function viderPanier(event) {
    //permet de stopper le comportement par default du button
    event.preventDefault();
    //permet de supprimer tous les éléments du panier dans le localStorage
    localStorage.removeItem('Panier');

    //Permet le rechargement de la page
    document.location.reload(true);
}


//Pour supprimer un teddy du panier///////////////////////////////////////////////////////////////////////////
//document.getElementById('btn_remove_teddy' + i).addEventListener('click', supprimerTeddy(i));

function supprimerTeddy(i) {

    panier.splice(i, 1);

    localStorage.setItem('Panier', JSON.stringify(panier));

    //Permet le rechargement de la page
    //document.location.reload(true);
}


/////////////////////////////////////////LE FORMULAIRE///////////////////////////////////////////////////

//let firstName = document.getElementById('firstName');
//let lastname = document.getElementById('lastName');
//let address = document.getElementById('address');
//let city = document.getElementById('city');
//let email = document.getElementById('email');

//VALIDATION DES DONNEES DU FORMULAIRE///////////////////////////////////////////
let btnEnvoiFormulaire = document.getElementById('btn_envoi');
//Ajout d'un écouteur d'évènement à mon bouton d'envoi
btnEnvoiFormulaire.addEventListener('click', function (event) {
    event.preventDefault();
//Je crée un objet 'contact' pour récupérer les valeurs de chaque champs
    let contact = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        address: document.getElementById('address').value,
        city: document.getElementById('city').value,
        email: document.getElementById('email').value
    }

    console.log(contact.firstName);

    //Pour la validation du prénom///////////////////////////////////////////////////////////////
    let firstNameNoConform = document.getElementById('firstName_no_conform');
    let firstNameValid = /^[A-zÀ-ù-'-\s]{2,30}$/;

    //La propriété 'validity' vérifie la présence de données
    //La propriété 'valueMissing' renvoie 'true' si un champ avec 'required' est envoyé vide
    //Si le champ est vide
    if (firstName.validity.valueMissing) {
        firstNameNoConform.textContent = " Veuillez renseigner votre prénom";
        //Si les données ne correspondent au Regex prédéfini
    } else if (firstNameValid.test(firstName.value) === false) {
        event.preventDefault();
        firstNameNoConform.innerHTML = ' Format incorrect';
        //Si tout est correct, validation
    } else {
        firstNameNoConform.innerHTML = " ✔";
    }

    //Pour la validation du nom/////////////////////////////////////////////////////////////////
    let lastNameNoConform = document.getElementById('lastName_no_conform');
    let lastNameValid = /^[A-zÀ-ù-'-\s]{2,30}$/;

    //Si le champ est vide
    if (lastName.validity.valueMissing) {
        lastNameNoConform.textContent = " Veuillez renseigner votre nom";
        //Si les données ne correspondent au Regex prédéfini
    } else if (lastNameValid.test(lastName.value) === false) {
        lastNameNoConform.innerHTML = ' Format incorrect';
    } else {
        //Si tout est correct, validation
        lastNameNoConform.innerHTML = " ✔";
    }

    //Pour la validation de l'adresse//////////////////////////////////////////////////////////////////////
    let addressNoConform = document.getElementById('address_no_conform');
    let addressValid = /^[A-zÀ-ù-0-9-'-\s]{2,100}$/;

    if (address.validity.valueMissing) {
        addressNoConform.textContent = " Veuillez renseigner votre adresse";
        //Si les données ne correspondent au Regex prédéfini
    } else if (addressValid.test(address.value) === false) {
        addressNoConform.innerHTML = ' Format incorrect';
    } else {
        //Si tout est correct, validation
        addressNoConform.innerHTML = " ✔";
    }

    //Pour la validation de la ville//////////////////////////////////////////////////////////////////////
    let cityNoConform = document.getElementById('city_no_conform');
    let cityValid = /^[A-zÀ-ù-'-\s]{2,30}$/;

    if (city.validity.valueMissing) {
        cityNoConform.textContent = " Veuillez renseigner votre ville";
        //Si les données ne correspondent au Regex prédéfini
    } else if (cityValid.test(city.value) === false) {
        cityNoConform.innerHTML = ' Format incorrect';
    } else {
        //Si tout est correct, validation
        cityNoConform.innerHTML = " ✔";
    }

    //Pour la validation de l'email/////////////////////////////////////////////////////////////////////////
    let emailNoConform = document.getElementById('email_no_conform');
    let emailValid = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;

    if (email.validity.valueMissing) {
        emailNoConform.textContent = " Veuillez renseigner votre email";
        //Si les données ne correspondent au Regex prédéfini
    } else if (emailValid.test(email.value) === false) {
        emailNoConform.innerHTML = ' Format incorrect';
    } else {
        //Si tout est correct, validation
        emailNoConform.innerHTML = " ✔";
    }

    // Si toutes les données sont valides, je stocke l'objet "contact" et le tableau "panier" dans le localStorage;
    localStorage.setItem("Panier", JSON.stringify(panier));
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
    envoieDonnees(commande);
});

//ENVOI COMMANDE/////////////////////////////////////////////////////////////

function envoieDonnees(commande) {
    //Je crée un objet 'options' avec la méthod POST, le corps (commande) et les headers
    let options = {
        method: "POST",
        body: commande,
        //Type du corps de la requête
        headers: {
            "Content-Type": "application/json",
        }
    }
    //Je transmets l'URL et l'objet 'options'
    fetch("http://localhost:3000/api/teddies/order", options)
        //Je demande la confirmation (response) de la commande et la transforme en format JSON
        .then(response => response.json())
        .then(response => {
            //Je demande la suppression du panier et contact du localStorage
            localStorage.removeItem('Panier');
            localStorage.removeItem('Contact');
            //Je stocke le numéro de commande dans le localStorage
            localStorage.setItem('orderId', response.orderId);
            console.log(response.orderId);
            //Je renvoie le numéro de commande vers ma page de commande
            window.location.replace('./commande.html');
            validationDonnees();
            affichConfirmation();
            console.log(affichConfirmation);
        })
        //Si la requête n'aboutit pas, j'affiche un message d'erreur
        .catch(error => console.error(error))
};





/*
//création d'une variable pour rassembler les inputs contenant des lettres
let dataString = firstName, lastName, city;
validationDonnees;

    //Ce code Regex n'autorise que les lettres, les apostrophes, les tirets et les espaces et permet un prénom composé (+)
    let validityDataLetters = /^[a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+([-'\s][a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+)?$/;

    if (dataString.validity.valueMissing) {
        event.preventDefault();
        dataStringNoConform.textContent = ' Veuillez renseigner ce champ';
        //Si les données renseignées ne correspondent pas au code Regex = message d'erreur
    } else if (validityDataLetters.test(dataString.value) === false) {
        event.preventDefault();
        alert('Format non conforme!')
    } else {

    }
}


//Création de variable pour le champ prénom (validityDataLetters)

//Création d'une variable pour le champ nom (validityDataLetters)
*/



/*validityForm.addEventListener('click', validity);

//Création d'une fonction avec condition
function validity(event) {

    //Si le champ est vide = message d'erreur

    //La propriété 'validity' vérifie la présence de données
    //La propriété 'valueMissing' renvoie 'true' si un champ avec 'required' est envoyé vide
    if (dataString.validity.valueMissing) {
        event.preventDefault();
        dataStringNoConform.textContent = ' Veuillez renseigner ce champ';
        //Si les données renseignées ne correspondent pas au code Regex = message d'erreur
    } else if (validityDataLetters.test(dataString.value) === false) {
        event.preventDefault();
        alert('Format non conforme!')
    } else {

    }
}*/

//Création d'une variable pour vérifier que l'intégralité des champs est valide
/*let valid = true;
//Je vérifie la validité de chaque input
for (let input of document.getElementsByTagName('input')) {
    valid = valid && input.reportValidity();
}
//Si toutes les données sont valides, j'envoie le contenu du formulaire dans le localStorage (en string)
if (valid) {
    localStorage.setItem('Contact', JSON.stringify(contact));
    //Je récupère mon objet 'contact' et mon tableau 'panier' dans le localStorage
    let products = JSON.parse(localStorage.getItem("Panier"));
    contact = JSON.parse(localStorage.getItem("Contact"));
    let commande = { contact, products };
    console.log('ok');
    //alert('Votre commande a bien été envoyée!');

    envoieDonnees(commande);

    //"<a href='commande.html?=" + response + "'></a>"
}
});*/


/*function envoieDonnees(commande) {

    //Je crée une requête avec la méthode POST pour envoyer les données du localStorage au serveur
    let request = new XMLHttpRequest();
    request.open("POST", "http://localhost:3000/api/teddies/order");
    //'Content-Type' indique le type du corps de la requête (ici json)
    request.setRequestHeader("Content-Type", "application/json");
    request.onreadystatechange = function () {
        //Tant qu'il y a des éléments et que le statut est bon, envoi des données
        if (this.readyState == XMLHttpRequest.DONE && this.status == 201) {
            //création d'une variable 'response' (fichier responseText)
            response = JSON.parse(this.responseText);
            console.log(response);
        }
    }

    //Envoi de la requête avec concaténation de l'objet 'contact' et du tableau 'products' parsés en 'string'
    request.send(JSON.stringify(commande));
    console.log(request);
    console.log(JSON.stringify(commande));
    affichConfirmation();
};*/




//J'utilise un object FormData lié à un élément form
/*window.addEventListener("load", function() {
    function sendData() {
        let XHR = new XMLHttpRequest();

        //Je lie l'objet FormData et l'élément form
        let FD = new FormData(form);

        //Si la soumission s'est bien déroulée
        XHR.addEventListener("load", function(event) {
            alert(event.target.responseText);
        });

        //Si la soumission n'a pas abouti
        XHR.addEventListener("error", function(event) {
            alert('Quelque chose s\'est mal passé.');
          });

        //Configuration de la requête
        XHR.open("POST", "http://localhost:3000/api/teddies/order");

       //Les données envoyées sont celles renseignées par l'utilisateur
       XHR.send(FD);
    }

    //J'accède à l'élément form
    let form = document.getElementById("form");

    //Prise en charge de l'évènement submit
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        sendData();
    });
});*/

