//Récupération de l'ID du produit 
const urlSearchParams = new URLSearchParams(window.location.search);
const id = urlSearchParams.get("id");

//Récupération des produits par ID depuis l'API HTTP
fetch("http://localhost:3000/api/products/" + id)
  .then(response => response.json())
  .then(data => showElementID(data))
  .catch(error => console.log(error));

//Afficher un produit avec son détail
function showElementID(data) {
    const logoElement = document.querySelector('.item__img');
    const imgLogoElement = document.createElement('img');
    imgLogoElement.src = '../images/logo.png';
    imgLogoElement.alt = 'Photographie d\'un canapé';
    logoElement.appendChild(imgLogoElement);

    const titleElement = document.getElementById('title');
    titleElement.innerHTML = data.name;
    const priceElement = document.getElementById('price');
    priceElement.innerHTML = data.price;
    const descElement = document.getElementById('description');
    descElement.innerHTML = data.description; 

    //Liste déroulante des couleurs
}

//Evenement click ajout au panier