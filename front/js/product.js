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
  imgLogoElement.src = products.imageUrl;
  imgLogoElement.alt = products.altTxt;
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
      price : products.price,
      img : products.imageUrl,
      alt : products.altTxt,
    };
    
    addLocalStorage(productChoice);

    } else if (colors.value ===''){
      alert('Veuillez selectionner une couleur');

    } else if (quantityPicked.value <= 0 || quantityPicked.value > 100 ) {
      alert('Veuillez inscrire une quantité entre 1 et 100')
    }
  })
}

//Importation dans le local storage 
function addLocalStorage (productChoice) {
  let productInLocalStorage = JSON.parse(localStorage.getItem('products'));
  console.log(productInLocalStorage);

  // si le panier est vide 
  if (productInLocalStorage == null) {
    productInLocalStorage =[];
    productInLocalStorage.push(productChoice);
    localStorage.setItem('products',JSON.stringify(productInLocalStorage));
    alert('Produit ajouté au panier avec succès');
  } 
  
  // si le panier contient des produits differents ou des produits avec le meme id et couleur
  if (productInLocalStorage != null ){
    const ifExists = productInLocalStorage.find(
      (element) =>
        element.id == productChoice.id &&
        element.color == productChoice.color
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
