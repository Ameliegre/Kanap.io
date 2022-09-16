//Récupération de l'ID du produit 
const urlSearchParams = new URLSearchParams(window.location.search);
const id = urlSearchParams.get("id");

//Récupération des produits par ID depuis l'API HTTP
fetch("http://localhost:3000/api/products/" + id)
  .then(response => response.json())
  .then(products => displayProductId(products))
  .catch(error => console.log(error));

//Afficher un produit avec son détail
function displayProductId(products) {
  const logoElement = document.querySelector('.item__img');
  const imgLogoElement = document.createElement('img');
  imgLogoElement.src = '../images/logo.png';
  imgLogoElement.alt = 'Photographie d\'un canapé';
  logoElement.appendChild(imgLogoElement);

  const titleElement = document.getElementById('title');
  titleElement.innerHTML = products.name;
  const priceElement = document.getElementById('price');
  priceElement.innerHTML = products.price;
  const descElement = document.getElementById('description');
  descElement.innerHTML = products.description; 

  //Liste déroulante des couleurs
  let colorSelect = document.getElementById('colors');
  products.colors.forEach(color => {
      let optioncolorsElement = document.createElement('option');
      optioncolorsElement.innerText = color;
      optioncolorsElement.value = color;
      colorSelect.appendChild(optioncolorsElement);
  });
  
  addToCart(products);
}

//Activation de l'evenement ajout d'un produit au panier
function addToCart(products) {
  const btn = document.getElementById('addToCart');
  const quantityPicked = document.getElementById('quantity');
  
  //Initialisation du bouton "Ajout au panier"
  btn.addEventListener('click',() => {  
    if (colors.value !='' && quantityPicked.value > 0 && quantityPicked.value <=100){

    // Récupération du produit avec le choix de couleur et de la quantité
    let quantityChoice = quantityPicked.value;
    let colorChoice = colors.value;
    
    let productChoice = {
      id : id,
      name : products.name,
      quantity : Number(quantityChoice),
      color : colorChoice,
    };
    
    const popupConfirmation = (window.confirm(`L\'article ${products.name} a été ajouté au panier avec succès. Voulez-vous consulter le panier ? Si oui , cliquer sur OK.` ))
    window.location.href ="cart.html";
    
    addLocalStorage(productChoice);

    } else if (colors.value ==='' ){
      alert('Veuillez selectionner une couleur');

    } else if (quantityPicked.value <= 0 || quantityPicked.value > 100 ) {
      alert('Veuillez inscrire une quantité entre 1 et 100')
    }
  })
}

//Importation dans le local storage 
function addLocalStorage (productChoice) {
  //Initialisation du local storage
  let productInLocalStorage = JSON.parse(localStorage.getItem('products'));
  // Si il y a déjà un produit enregistré
  if (productInLocalStorage){
    productInLocalStorage.push(productChoice);
    localStorage.setItem('products',JSON.stringify(productInLocalStorage));
  } else {
  // si il n'y a aucun produit enregistré  
    productInLocalStorage =[];
    productInLocalStorage.push(productChoice);
    localStorage.setItem('products',JSON.stringify(productInLocalStorage));
  }
}

