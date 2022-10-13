let fromLocalStorage = JSON.parse(localStorage.getItem('products'));
const cartContainer = document.getElementById('cart__items');
window.check = false;

displayCartList();
modifyQtt();
deleteItem();

//Afficher les produits selectionnés
function displayCartList () {
    
    if (fromLocalStorage == null) {
        alert('votre panier est vide')
    }
        
    for (let product of fromLocalStorage) {
        const articleElement = createCartList(product);
        cartContainer.appendChild(articleElement);
    }  
    totalQuantity();
    sumCart();
    confirmationCart()
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
function modifyQtt () {
    let qttModif = document.getElementsByClassName("itemQuantity");

    for (let j = 0; j < qttModif.length; j++) {
        qttModif[j].addEventListener('change', () => {
            
            let findArticle = qttModif[j].closest("article");
            let productId = findArticle.dataset.id;
            let productColor = findArticle.dataset.color;
            let productToUpdate = fromLocalStorage.find(el => el.id == productId && el.color == productColor);
            
            if (productToUpdate) {
                productToUpdate.quantity = Math.max(qttModif[j].valueAsNumber,1);
                localStorage.setItem("products",JSON.stringify(fromLocalStorage));
            }
            sumCart();
            totalQuantity();
        })
    }
}  

// Affichage de la quantité totale d'articles
function totalQuantity () {
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
     
    for (let product of fromLocalStorage) {
        let priceInCart = product.price * product.quantity;
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
            sumCart();
            totalQuantity();
        });
      }
}

// Validation données formulaire
function checkInputForm () {

    //Verification de la saisie du prénom
    let firstName = document.getElementById('firstName');
    let firstNameError = document.getElementById('firstNameErrorMsg');
    let regFirstName = /^[^<>0-9]{3,20}$/;

    firstName.addEventListener("change", function (e) {
        let firstNameValid = e.target.value;
        if (regFirstName.test(firstNameValid)) {
            firstNameError.innerHTML ="";
            check = true;
        } else {
            firstNameError.innerHTML =
            "Champ invalide, veuillez vérifier votre prénom.";
            check = false;
        }
    });

    //Verification de la saisie du nom
    let lastName = document.getElementById('lastName');
    let lastNameError = document.getElementById('lastNameErrorMsg');
    let regLastName = /^[^<>0-9]{3,20}$/;

    lastName.addEventListener("change", function (e) {
        let lastNameValid = e.target.value;
        if (regLastName.test(lastNameValid)) {
            lastNameError.innerHTML = "";
            check = true;
        } else {
            lastNameError.innerHTML =
            "Champ invalide, veuillez vérifier votre nom.";
            check = false;
        }
    });

    //Verification de la saisie de l'adresse postale
    let address = document.getElementById('address');
    let addressError = document.getElementById('addressErrorMsg');
    let regAddress = /^[^<>]{5,50}$/;

    address.addEventListener("change", function (e) {
        let addressValid = e.target.value;
        if (regAddress.test(addressValid)) {
            addressError.innerHTML = "";
            check = true;
        } else {
            addressError.innerHTML =
            "Champ invalide, veuillez vérifier votre adresse.";
            check = false;
        }
    });

    //Verification de la saisie de la ville
    let city = document.getElementById('city');
    let cityError = document.getElementById('cityErrorMsg');
    let regCity = /^[^<>0-9]{2,30}$/;

    city.addEventListener("change", function (e) {
        let cityValid = e.target.value;
        if (regCity.test(cityValid)) {
            cityError.innerHTML = "";
            check = true;
        } else {
            cityError.innerHTML =
            "Champ invalide, veuillez vérifier votre ville.";
            check = false;
        }
    });

    //Verification de la saisie de l'adresse mail
    let email = document.getElementById('email');
    let emailError = document.getElementById('emailErrorMsg');
    let regEmail = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    email.addEventListener("change", function (e) {
        let emailValid = e.target.value;
        if (regEmail.test(emailValid)) {
            emailError.innerHTML = "";
            check = true;
        } else {
            emailError.innerHTML =
            "Champ invalide, veuillez vérifier votre adresse mail.";
            check = false;
        }    
    });

    let contact = {
        firstName : firstName.value,
        lastName : lastName.value,
        address : address.value,
        city : city.value,
        email : email.value,
    }
    return contact;
}

//Activation de l'evenement Commander
function confirmationCart () {

    checkInputForm()
    
    //Activation du click sur le bouton COMMANDER
    let orderbtn = document.getElementById('order');
    orderbtn.addEventListener("click", (e) => {
        e.preventDefault()

        if (check == false) {
            alert('Merci de verifier les données saisies')
            return
        } 

        //Création Objet produits
        let idProducts = JSON.parse((localStorage.getItem('products')))
        let products = [];
        idProducts.forEach((product) => {
            products.push(product.id);
        });
        //Création Objet Contact
        let contact = checkInputForm();

        let order = {
            contact,
            products
        }
    
        //envoi de l'objet vers le serveur
        fetch("http://localhost:3000/api/products/order", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(order)
        })
        .then(response => response.json())
        .then(orderResp => { 
            console.log(orderResp);
            localStorage.removeItem('products');
            window.location.href = `./confirmation.html?orderId=${orderResp.orderId}`;
        })
        .catch(error => console.log(error));
    }) 
}