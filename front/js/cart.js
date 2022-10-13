"user strict";
let fromLocalStorage = JSON.parse(localStorage.getItem('products'));
let productsFromApi = [];
const cartContainer = document.getElementById('cart__items');

setCartEvents().then()

//Afficher les produits selectionnés
async function displayCartList() {
  
    for (let productLocal of fromLocalStorage) {
        //Récupération des produits depuis l'API HTTP
        await fetch("http://localhost:3000/api/products/" + productLocal.id)
        .then(response => response.json())
        .then(product => {
            product.quantity = productLocal.quantity;
            product.color = productLocal.color;
            product.id = productLocal.id;
            productsFromApi.push(product);
            createCartList(product)
        })
    } 
}

async function setCartEvents() {
    await displayCartList();
    modifyQtt();
    deleteItem();
    totalQuantity();
    sumCart();
}

//Création des produits du panier dans le DOM
function createCartList(product) {
    
    // Body 
    const articleElement = document.createElement("article");
    articleElement.classList.add('cart__item');
    articleElement.setAttribute("data-id",product.id);
    articleElement.setAttribute("data-color",product.color);
    cartContainer.appendChild(articleElement);

    // Image
    const imgContainer = document.createElement("div");
    imgContainer.classList.add('cart__item__img');
    articleElement.appendChild(imgContainer);
    
    const imgElement = document.createElement('img');
    imgElement.src = product.imageUrl;
    imgElement.alt = product.altTxt;
    imgContainer.appendChild(imgElement);

    // Body Contenu
    const itemContainer = document.createElement("div");
    itemContainer.classList.add('cart__item__content');
    articleElement.appendChild(itemContainer);

        //Description
    const descContainer = document.createElement("div");
    descContainer.classList.add('cart__item__content__description');
    itemContainer.appendChild(descContainer);
    const titleItem = document.createElement("h2");
    titleItem.innerHTML = product.name;
    descContainer.appendChild(titleItem);

    const colorItem = document.createElement("p");
    colorItem.innerHTML = product.color;
    descContainer.appendChild(colorItem);

    const priceItem = document.createElement("p");
    priceItem.innerHTML = product.price + ",00 €";
    descContainer.appendChild(priceItem);

        //Body Reglages 
    const settingContainer = document.createElement("div");
    settingContainer.classList.add('cart__item__content__settings');
    itemContainer.appendChild(settingContainer);
        
        // Reglages Quantité
    const quantityContainer = document.createElement("div");
    quantityContainer.classList.add('cart__item__content__settings__quantity');
    settingContainer.appendChild(quantityContainer);

    const quantityElement = document.createElement("p");
    quantityElement.innerHTML = "Qté : ";
    quantityContainer.appendChild(quantityElement);

    const inputQuantity = document.createElement("input");
    inputQuantity.setAttribute("type","number");
    inputQuantity.classList.add('itemQuantity');
    inputQuantity.setAttribute("name","itemQuantity");
    inputQuantity.setAttribute("min","1");
    inputQuantity.setAttribute("max","100");
    inputQuantity.setAttribute("value",product.quantity);
    quantityContainer.appendChild(inputQuantity);

        //Reglages Suppression
    const deleteContainer = document.createElement("div");
    deleteContainer.classList.add('cart__item__content__settings__delete');
    settingContainer.appendChild(deleteContainer);

    const deleteItem = document.createElement("p");
    deleteItem.classList.add('deleteItem');
    deleteItem.innerHTML = "Supprimer";
    deleteContainer.appendChild(deleteItem);

}

//Modification de la quantité
function modifyQtt() {
    let qttModif = document.querySelectorAll(".itemQuantity");

    for (let k = 0; k < qttModif.length; k++){
        qttModif[k].addEventListener("change" , (event) => {
            event.preventDefault();

            // Selection de l'element à modifier en fonction de son id ET sa couleur
            let quantityModif = fromLocalStorage[k].quantity;
            let qttModifValue = qttModif[k].valueAsNumber;
            
            // Correction 1 : dans le cas ou une valeur inférieur à 1 ou supérieur à 100 est renseigné
            if(qttModifValue > 0 && qttModifValue <= 100){
                const resultFind = fromLocalStorage.find((el) => el.qttModifValue !== quantityModif);

                resultFind.quantity = qttModifValue;
                fromLocalStorage[k].quantity = resultFind.quantity;

                localStorage.setItem("products", JSON.stringify(fromLocalStorage));
            
            } else {
                window.alert("Veuillez selectionner une valeur comprise entre 1 et 100");
            } 

            totalQuantity()
            sumCart()
        })
    }
}



// Affichage de la quantité totale d'articles
function totalQuantity() {
    let totalQuantityElt = document.getElementById('totalQuantity');
    let quantitiesProduct = document.querySelectorAll('.itemQuantity');
    let totalQuantities = 0;
    quantitiesProduct.forEach(qte =>{
        totalQuantities += Number(qte.value);
    })

    return totalQuantityElt.innerHTML = totalQuantities;
}

// Affichage du prix total d'articles
function sumCart() {
    let listTotalPrice = [];

    if (fromLocalStorage != null) {
        for (let productLocal of fromLocalStorage) {
            let productFromApi = productsFromApi.find(el => el['_id'] == productLocal.id);
            if(productFromApi) {
                let priceInCart = productFromApi.price * productLocal.quantity;
                listTotalPrice.push(priceInCart);
            }
        }
        
        const reducer = (accumulator, currentValue) => accumulator + currentValue;
        const totalPrice = listTotalPrice.reduce(reducer,0);
        const totalPriceElement = document.getElementById('totalPrice');
        totalPriceElement.innerHTML = totalPrice;
    } 
    
}

// Suppression d'un produit
function deleteItem() {
    const btnDeletes = document.getElementsByClassName("deleteItem");

    //for (let i = 0; i < btnDelete.length; i++) {
    for (let btnDelete of btnDeletes ) {    
        btnDelete.addEventListener("click", () => {
    
          let findArticle = btnDelete.closest("article");
          let productToDelete = fromLocalStorage.indexOf(fromLocalStorage);
          fromLocalStorage.splice(productToDelete, 1);
          findArticle.remove();

         if (localStorage != undefined) {
                localStorage.setItem("products",JSON.stringify(fromLocalStorage));
            } else {
                localStorage.clear();
            }
            alert("Produit supprimé du panier");
            totalQuantity();
            sumCart();
        });
      } 
}

// Validation données formulaire
function checkInputForm() {

    let check = true;

    //Verification de la saisie du prénom
    let firstName = document.getElementById('firstName');
    let firstNameError = document.getElementById('firstNameErrorMsg');
    let regFirstName = /^[A-Za-zâêîôûäëïöüÄËÏÖÜÂÊÎÔÛéèà\s]{3,50}$/;

    let firstNameValid = firstName.value;
    if (regFirstName.test(firstNameValid)) {
        firstNameError.innerHTML ="";
    } else {
        check = false;
        firstNameError.innerHTML =
        "Champ invalide, veuillez vérifier votre prénom.";
    }
    

    //Verification de la saisie du nom
    let lastName = document.getElementById('lastName');
    let lastNameError = document.getElementById('lastNameErrorMsg');
    let regLastName = /^[A-Za-zâêîôûäëïöüÄËÏÖÜÂÊÎÔÛéèà\s]{3,50}$/;

    let lastNameValid = lastName.value;
    if (regLastName.test(lastNameValid)) {
        lastNameError.innerHTML = "";
    } else {
        check = false;
        lastNameError.innerHTML =
        "Champ invalide, veuillez vérifier votre nom.";
        
    }

    //Verification de la saisie de l'adresse postale
    let address = document.getElementById('address');
    let addressError = document.getElementById('addressErrorMsg');
    let regAddress = /^[^<>]{5,50}$/;

    let addressValid = address.value;
    if (regAddress.test(addressValid)) {
        addressError.innerHTML = "";
    } else {
        check = false;
        addressError.innerHTML =
        "Champ invalide, veuillez vérifier votre adresse.";
        
    }

    //Verification de la saisie de la ville
    let city = document.getElementById('city');
    let cityError = document.getElementById('cityErrorMsg');
    let regCity = /^[A-Za-zâêîôûäëïöüÄËÏÖÜÂÊÎÔÛéèà\s]{3,50}$/;

    let cityValid = city.value;
    if (regCity.test(cityValid)) {
        cityError.innerHTML = "";
    } else {
        check = false;
        cityError.innerHTML =
        "Champ invalide, veuillez vérifier votre ville.";
        
    }

    //Verification de la saisie de l'adresse mail
    let email = document.getElementById('email');
    let emailError = document.getElementById('emailErrorMsg');
    let regEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    let emailValid = email.value;
    if (regEmail.test(emailValid)) {
        emailError.innerHTML = "";
    } else {
        check = false;
        emailError.innerHTML =
        "Champ invalide, veuillez vérifier votre adresse mail.";
        
    }    

    return check
}

//Envoi de l'objet contenant les informations de l'utilisateur
function postApi(body){
    fetch("http://localhost:3000/api/products/order",{
      method: 'POST',
      body: JSON.stringify(body),
      headers: {
        "Content-Type" : "application/json",
      }
    })
    .then(response => response.json())
    .then(response => {
      let cart = []
      localStorage.setItem('products',JSON.stringify(cart))
      window.location.href = `./confirmation.html?orderId=${response.orderId}`
    })
    .catch(function(error){
      console.error(error)
    });
}
  
//Récupération des valeurs des champs pour envoi API
function requestBody(){
  
    const firstNameInput = document.querySelector('#firstName')
    const firstName = firstNameInput.value
  
    const lastNameInput = document.querySelector('#lastName')
    const lastName = lastNameInput.value
  
    const addressInput = document.querySelector('#address')
    const address = addressInput.value
  
    const cityInput = document.querySelector('#city')
    const city = cityInput.value
  
    const emailInput = document.querySelector('#email')
    const email = emailInput.value
  
    //Boucle pour mettre les id des produits selectionnés dans le panier
    let idProducts  = [];
    for (let i = 0; i < fromLocalStorage.length; i++){
      for (let number = fromLocalStorage[i].quantity; number>0; number--){
        idProducts.push(fromLocalStorage[i].id)
      }
    }
    
    const body = { 
      contact: {
      firstName: firstName,
      lastName: lastName,
      address: address,
      city: city,
      email: email
    },
    products : idProducts,
    }
    return body
};
  
//Envoi de l'objet vers l'API
function submitForm(e){
    e.preventDefault();
    if (fromLocalStorage.length === 0){
      alert('Vous ne pouvez passer une commande avec un panier vide')
    }else{
      if(checkInputForm()){
        postApi(requestBody())
      };
    }
};

//Lorsque l'utilisateur clique sur le bouton commander, on appelle la fonction submitForm
const submitBtn = document.getElementById('order')
submitBtn.addEventListener("click", (e) => submitForm(e))