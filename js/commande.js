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
        "<p>Nous vous remercions pour votre confiance !</p>" +
        "<p>Le total de vos achats est de : " +
        totalOrder / 100 + " €" +
        "</p>" +
        "<p id='numero_commande'>Veuillez noter le numéro de votre confirmation de commande : " + "<p>" +
        orderId + "</p>" +
        "</p>";
};

//Charge et exécute la fonction
window.onload = displayConfirmation();
