let API_URL = "http://localhost:3000/api/teddies/";
let total = 0;
let panier;

//Pour récupérer les références des teddies sélectionnés du panier dans le localStorage ///////////////////////////////
function initialisation() {
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
    /*window.addEventListener('load', function (event) {
        event.preventDefault();
        for (let i = 0; i < panier.length; i++) {
            //document.getElementsByClassName('btn_remove_teddy' + i).addEventListener('click', removeTeddy(i));
            console.log(document.getElementsByClassName('btn_remove_teddy' + i));
        }
    })*/
}

//Récupération les données de chaque Teddy du panier
function getDataTeddiesBasket(ID, i) {

    fetch(API_URL + ID)
        .then(response => response.json())
        .then(response => {
            console.log(response);
            displayBasket(response, i);
        })
        .catch((erreur) => {
            console.log(erreur);
        });
    //document.getElementById('btn_remove_teddy' + i).addEventListener('click', removeTeddy());
}

//Exécute le javascript
window.onload = initialisation();

//Pour afficher le contenu du panier/////////////////////////////////////////////////////////////////
function displayBasket(ID, i) {
    let affichageName = document.getElementById('result_teddy_selectionne');
    ///J'additionne chacun des prix des élément du panier
    total += ID.price;
    affichageName.innerHTML +=
        "<div>" +
        ID.name +
        "</div>" +
        "<img width=100px src='" + ID.imageUrl + "'>" +
        "<div>" +
        ID.price / 100 + " €" +
        "</div>" +
        "<button id='btn_remove_teddy" + i + "'>Supprimer le teddy</button>";
    let affichTotal = document.getElementById('result_order');
    
    affichTotal.innerHTML = total / 100 + " €";
    for(let y = 0; y < panier.length; y++) { 
        let element = document.getElementById('btn_remove_teddy' + y);
        if(element) {
            element.addEventListener('click', function() {
                supprimTeddy(y);
            })
        }
    }
    //console.log(ID, i);
}

// Pour calculer le total du panier//////////////////////////////////////////////////////////////////////////
function calculTotal() {
    //J'initialise la variable 'totalPanier' à 0
    let totalPanier = 0;
    //Récupération des références dans le localStorage 
    //panier = JSON.parse(localStorage.getItem('Panier'));
    //Avec la boucle for, je parcours l'objet localStorage ('panier') pour récupérer le prix des éléments 'i' du tableau et je les incrémente
    for (let i = 0; i < panier.length; i++) {
        //A chaque tour de boucle avec le +=, je rajoute le prix de l'élément selectionné
        totalPanier += [i].price;
        console.log(totalPanier);
    }

    //Je crée une variable que je place dans d'id correspondant au total du panier
    let affichagePrixTotal = document.getElementById('result_order');
    //J'appelle le résultat du tableau 'totalPanier' pour l'afficher
    affichagePrixTotal.innerHTML =
        "<p>Le total : " +
        totalPanier.price +
        "</p>";
}

//Pour supprimer un teddy du panier///////////////////////////////////////////////////////////////////////////

function supprimTeddy(i) {
    panier.splice(i, 1);
    localStorage.setItem('Panier', JSON.stringify(panier))
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
//Je crée un objet 'contact' pour récupérer les valeurs de chaque champs
let contact;

function formulaire(event) {
    event.preventDefault();
    //Pour la validation du prénom///////////////////////////////////////////////////////////////
    let firstNameNoConform = document.getElementById('firstName_no_conform');
    let firstNameValid = /^[A-zÀ-ù-'-\s]{2,30}$/;
    if (firstName === "" || firstNameValid.test(firstName.value) === false) {
        firstNameNoConform.textContent = " Veuillez renseigner votre prénom et respecter le format requis";
        return false;
    } else {
        firstNameNoConform.textContent = " ✔";
    }

    //Pour la validation du nom/////////////////////////////////////////////////////////////////
    let lastNameNoConform = document.getElementById('lastName_no_conform');
    let lastNameValid = /^[A-zÀ-ù-'-\s]{2,30}$/;
    //Si les données ne sont pas saisies ou ne correspondent au Regex prédéfini
    if (lastName === "" || lastNameValid.test(lastName.value) === false) {
        lastNameNoConform.textContent = " Veuillez renseigner votre nom et respecter le format requis";
        return false;
    } else {
        lastNameNoConform.textContent = " ✔";
    }

    //Pour la validation de l'adresse//////////////////////////////////////////////////////////////////////
    let addressNoConform = document.getElementById('address_no_conform');
    let addressValid = /^[A-zÀ-ù-0-9-'-\s]{2,100}$/;
    if (address === "" || addressValid.test(address.value) === false) {
        addressNoConform.textContent = " Veuillez renseigner votre adresse et respecter le format requis";
        return false;
    } else {
        //Si tout est correct
        addressNoConform.innerHTML = " ✔";
    }

    //Pour la validation de la ville//////////////////////////////////////////////////////////////////////
    let cityNoConform = document.getElementById('city_no_conform');
    let cityValid = /^[A-zÀ-ù-'-\s]{2,30}$/;
    if (city === "" || cityValid.test(city.value) === false) {

        cityNoConform.textContent = " Veuillez renseigner votre ville et respecter le format requis";
        return false;
    } else {
        //Si tout est correct, validation
        cityNoConform.innerHTML = " ✔";
    }

    //Pour la validation de l'email/////////////////////////////////////////////////////////////////////////
    let emailNoConform = document.getElementById('email_no_conform');
    let emailValid = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
    if (email === "" || emailValid.test(email.value) === false) {
        emailNoConform.textContent = " Veuillez renseigner votre email et respecter le format requis";
        return false;
    } else {
        emailNoConform.innerHTML = " ✔";
    }
    //Si tous les champs du formulaire sont corrects, validation
    alert('votre commande a bien été envoyée');
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
        //Dès qu'il y a une réponse (confirmation de la commande) + transformation en format JSON
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
            //formulaire();
        })
        //Si la requête n'aboutit pas, j'affiche un message d'erreur
        .catch(error => console.error(error))
};
