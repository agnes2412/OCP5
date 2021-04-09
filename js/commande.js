let titre = document.getElementById('titre');
titre.innerHTML += "<h1>Votre commande</h1>";
let API_URL = "http://localhost:3000/api/teddies/";


function displayConfirmation() {
    let orderId = localStorage.getItem('orderId');
    localStorage.removeItem('orderId');
    let confirmationCommande = document.getElementById('confirmation_commande');
    //Je récupère le total dans le localStorage pour l'afficher
    let totalOrder = localStorage.getItem('TotalOrder');
    localStorage.removeItem('TotalOrder');
    confirmationCommande.innerHTML +=
        "<div>Nous vous remercions pour votre commande !</div>" +
        "<div>Votre numéro de commande est : " +
        orderId +
        "</div>" +
        "<div>Le total de vos achats est de : " +
        totalOrder / 100 + " €" +
        "</div>";
    console.log(confirmationCommande);
    console.log(orderId);
};

//Exécute le javascript
window.onload = displayConfirmation();
