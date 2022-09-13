//Récupération des produits depuis l'API HTTP
fetch("http://localhost:3000/api/products")
  .then(response => response.json())
  .then(data => showElement(data))
  .catch(error => console.log(error));

//Affichage des canapés 
function showElement (data) {
    console.log(data);
    for (let i = 0; i< data.length; i++) {
        //Création et rattachement des éléments du DOM 
        const product = document.getElementById('items');
        console.log(product)

        const linkElement = document.createElement("a");
        linkElement.href = "product.html?id=" + data[i]._id;
        product.appendChild(linkElement);

        const articleElement = document.createElement("article");
        linkElement.appendChild(articleElement);

        const imgElement = document.createElement('img');
        imgElement.src = data[i].imageUrl;
        imgElement.alt = data[i].altTxt;
        articleElement.appendChild(imgElement);

        const nameElement = document.createElement("h3");
        nameElement.classList.add("productName");
        nameElement.innerHTML = data[i].name;
        articleElement.appendChild(nameElement);

        const descElement = document.createElement("p");
        descElement.classList.add("productDescription");
        descElement.innerHTML = data[i].description;
        articleElement.appendChild(descElement);
    }
}
