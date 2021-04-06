let titre = document.getElementById('titre');
titre.innerHTML += "<h1>Votre commande</h1>";
let API_URL = "http://localhost:3000/api/teddies/";


function displayConfirmation() {
    let orderId = localStorage.getItem('orderId');
    localStorage.removeItem('orderId');
    let confirmationCommande = document.getElementById('confirmation_commande');
    confirmationCommande.innerHTML +=
        "<div>Votre numéro de commande est : " +
        orderId +
        "</div>";
    console.log(confirmationCommande);
    console.log(orderId);
};

//Exécute le javascript
window.onload = displayConfirmation();
