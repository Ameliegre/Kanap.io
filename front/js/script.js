//Récupération des produits depuis l'API HTTP
fetch("http://localhost:3000/api/products")
  .then(response => response.json())
  .then(products => displayProductList (products))
  .catch(error => console.log(error));

//Affichage des canapés 
function displayProductList (products) {
    const productContainer = document.getElementById('items');
    console.log(products);
    for (let product of products) {
        const linkElement = createProductListElement(product);
        productContainer.appendChild(linkElement);
    }
}

//Création et rattachement des éléments du DOM 
function createProductListElement (product) {
  
  const linkElement = document.createElement("a");
  linkElement.href = "product.html?id=" + product._id;
        
  const articleElement = document.createElement("article");
  linkElement.appendChild(articleElement);

  const imgElement = document.createElement('img');
  imgElement.src = product.imageUrl;
  imgElement.alt = product.altTxt;
  articleElement.appendChild(imgElement);

  const nameElement = document.createElement("h3");
  nameElement.classList.add("productName");
  nameElement.textContent = product.name;
  articleElement.appendChild(nameElement);

  const descElement = document.createElement("p");
  descElement.classList.add("productDescription");
  descElement.textContent = product.description;
  articleElement.appendChild(descElement);

  return linkElement;
}
