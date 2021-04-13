document.getElementById('titre').innerHTML += "<h1>Votre commande</h1>";
let API_URL = "http://localhost:3000/api/teddies/";

//Affichage du numéro de confirmation de la commande
function displayConfirmation() {
    //Récupération de la confirmation de la commande dans le localStorage pour l'afficher
    let orderId = localStorage.getItem('orderId');
    localStorage.removeItem('orderId');
    //Réupération du total dans le localStorage pour l'afficher
    let totalOrder = localStorage.getItem('TotalOrder');
    localStorage.removeItem('TotalOrder');
    document.getElementById('confirmation_commande').innerHTML +=
        "<div>Nous vous remercions pour votre commande !</div>" +
        "<div>Le total de vos achats est de : " +
        totalOrder / 100 + " €" +
        "</div>" +
        "<div>Le numéro de votre confirmation de commande est : " +
        orderId +
        "</div>";
};

//Charge et exécute la fonction
window.onload = displayConfirmation();
