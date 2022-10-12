//Récupération de l'ID du produit 
const urlSearchParams = new URLSearchParams(window.location.search);
let id = urlSearchParams.get("id");

//Récupération des produits par ID depuis l'API HTTP
fetch("http://localhost:3000/api/products/" + id)
  .then(response => response.json())
  .then(products => displayProductId(products))
  .catch(error => console.log(error));

//Afficher un produit avec son détail
function displayProductId(products) {
  document.title = products.name;
  const logoElement = document.querySelector('.item__img');
  const imgLogoElement = document.createElement('img');
  imgLogoElement.src = products.imageUrl;
  imgLogoElement.alt = products.altTxt;
  logoElement.appendChild(imgLogoElement);
  const titleElement = document.getElementById('title');
  titleElement.textContent = products.name;
  const priceElement = document.getElementById('price');
  priceElement.textContent = products.price;
  const descElement = document.getElementById('description');
  descElement.textContent = products.description; 

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
    if (colors.value ===''){
      alert('Veuillez selectionner une couleur');
      return
    }

    if (quantityPicked.value <= 0 || quantityPicked.value > 100 ) {
      alert('Veuillez inscrire une quantité entre 1 et 100')
      return
    }

    // Récupération du produit avec le choix de couleur et de la quantité
    let quantityChoice = quantityPicked.value;
    let colorChoice = colors.value;
    let productChoice = {
      id : id,
      quantity : Number(quantityChoice),
      color : colorChoice,
    };
      
    addLocalStorage(productChoice);

  })
}

//Importation dans le local storage 
function addLocalStorage (productChoice) {
  let productInLocalStorage = JSON.parse(localStorage.getItem('products'));

  // si le panier est vide 
  if (productInLocalStorage === null) {
    productInLocalStorage =[];
    productInLocalStorage.push(productChoice);
    localStorage.setItem('products',JSON.stringify(productInLocalStorage));
    alert('Produit ajouté au panier avec succès');
  } else { // si le panier contient des produits differents ou des produits avec le meme id et couleur
    const ifExists = productInLocalStorage.find(
      (element) =>
        element.id === productChoice.id &&
        element.color === productChoice.color
    );
    if (ifExists) {
      ifExists.quantity = ifExists.quantity + productChoice.quantity;
      localStorage.setItem("products", JSON.stringify(productInLocalStorage));
      productInLocalStorage.push(productChoice);
      alert('Produit ajouté au panier avec succès');
      } else {
      productInLocalStorage.push(productChoice);
      localStorage.setItem('products',JSON.stringify(productInLocalStorage));
      alert('Produit ajouté au panier avec succès');
    } 
  }
}
