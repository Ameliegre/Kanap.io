let fromLocalStorage = JSON.parse(localStorage.getItem('products'));
const cartContainer = document.getElementById('cart__items');
console.log(fromLocalStorage);

displayCartList();
modifyQtt();
totalQuantity();
sumCart();
deleteItem();


//Afficher les produits selectionnés
function displayCartList () {
        
    for (let product of fromLocalStorage) {
        const articleElement = createCartList(product);
        cartContainer.appendChild(articleElement);
    }  
    
}

//Création des produits du panier dans le DOM
function createCartList (product) {

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
    imgElement.src = product.img;
    imgElement.alt = product.alt;
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

    return articleElement;
}

//Modification de la quantité
function modifyQtt() {
    let qttModif = document.getElementsByClassName("itemQuantity");

    for (let j = 0; j < qttModif.length; j++) {
        qttModif[j].addEventListener('change', () => {
            
            let findArticle = qttModif[j].closest("article");
            let productId = findArticle.dataset.id;
            let productColor = findArticle.dataset.color;
            let productToUpdate = fromLocalStorage.find(el => el.id == productId && el.color == productColor);
            
            if (productToUpdate) {
                productToUpdate.quantity = qttModif[j].valueAsNumber;
                localStorage.setItem("products",JSON.stringify(fromLocalStorage));
            }
            location.reload();
        })
    }
}  

// Affichage de la quantité totale d'articles
function totalQuantity() {
    let totalQuantity = document.getElementById('totalQuantity');
    let quantitiesProduct = document.querySelectorAll('.itemQuantity');
    let totalQuantities = 0;
    quantitiesProduct.forEach(qte =>{
        totalQuantities += Number(qte.value);
    })
    return totalQuantity.innerHTML = totalQuantities;
}

// Affichage du prix total d'articles
function sumCart () {  
    let listTotalPrice = [];
     
    for (product of fromLocalStorage) {
        priceInCart = product.price * product.quantity;
        listTotalPrice.push(priceInCart);
    }
    
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const totalPrice = listTotalPrice.reduce(reducer,0);
    const totalPriceElement = document.getElementById('totalPrice');
    totalPriceElement.innerHTML = totalPrice;
}

// Suppression d'un produit
function deleteItem () {
    const btnDelete = document.getElementsByClassName("deleteItem");

    for (let i = 0; i < btnDelete.length; i++) {
        btnDelete[i].addEventListener("click", () => {
    
          let findArticle = btnDelete[i].closest("article");
          let productToDelete = fromLocalStorage.indexOf(fromLocalStorage[i]);
          fromLocalStorage.splice(productToDelete, 1);
          findArticle.remove();

         if (localStorage != undefined) {
            localStorage.setItem("products",JSON.stringify(fromLocalStorage));
            } else {
            localStorage.clear();
            }
          alert("Produit supprimé du panier");
          location.reload();
        });
      }
}

// Validation données formulaire
function checkInputForm () {
    const form = document.querySelector(".cart__order__form");

    //Verification de la saisie du prénom
    let firstName = document.getElementById('firstName');
    let firstNameError = document.getElementById('firstNameErrorMsg');
    let regFirstName = /^[a-zA-Z ]{2,30}$/;

    form.firstName.addEventListener("change", function (e) {
        let value = e.target.value;
        if (regFirstName.test(value)) {
            firstNameError.innerHTML = "";
        } else {
            firstNameError.innerHTML =
            "Champ invalide, veuillez vérifier votre prénom.";
        }
    });

    //Verification de la saisie du nom
    let lastName = document.getElementById('lastName');
    let lastNameError = document.getElementById('lastNameErrorMsg');
    let regLastName = /^[a-zA-Z ]{2,30}$/;

    form.lastName.addEventListener("change", function (e) {
        let value = e.target.value;
        if (regLastName.test(value)) {
            lastNameError.innerHTML = "";
        } else {
            lastNameError.innerHTML =
            "Champ invalide, veuillez vérifier votre nom.";
        }
    });

    //Verification de la saisie de l'addresse postale
    let address = document.getElementById('address');
    let addressError = document.getElementById('addressErrorMsg');
    let regAddress = /^[a-zA-Z ]{2,30}$/;

    form.address.addEventListener("change", function (e) {
        let value = e.target.value;
        if (regAddress.test(value)) {
            addressError.innerHTML = "";
        } else {
            addressError.innerHTML =
            "Champ invalide, veuillez vérifier votre adresse.";
        }
    });

    //Verification de la saisie de la ville
    let city = document.getElementById('city');
    let cityError = document.getElementById('cityErrorMsg');
    let regCity = /^[a-zA-Z ]{2,30}$/;

    form.city.addEventListener("change", function (e) {
        let value = e.target.value;
        if (regCity.test(value)) {
            cityError.innerHTML = "";
        } else {
            cityError.innerHTML =
            "Champ invalide, veuillez vérifier votre ville.";
        }
    });

    //Verification de la saisie de l'adresse mail
    let email = document.getElementById('email');
    let emailError = document.getElementById('emailErrorMsg');
    let regEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    form.email.addEventListener("change", function (e) {
        let value = e.target.value;
        if (regEmail.test(value)) {
            emailError.innerHTML = "";
        } else {
            emailError.innerHTML =
            "Champ invalide, veuillez vérifier votre ville.";
        }
    });

}

function SubmitForm () {
    checkInputForm ()

    const order = document.getElementById('order');

}

    
SubmitForm ()
