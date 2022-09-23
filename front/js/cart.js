let fromLocalStorage = JSON.parse(localStorage.getItem('products'));
const cartContainer = document.getElementById('cart__items');
console.log(cartContainer);
console.log(fromLocalStorage);

displayCartList();
totalQuantity();
SumCart();


function displayCartList () {
        
    for (let product of fromLocalStorage) {
        const articleElement = createCartList(product);
        cartContainer.appendChild(articleElement);
    }  
}
     
function createCartList (product) {

    // Body 
    const articleElement = document.createElement("article");
    articleElement.classList.add('cart__item');
    articleElement.setAttribute("data-id",product.id);
    articleElement.setAttribute("data-id",product.color);
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

// Affiche la quantité total d'articles
function totalQuantity() {
    let totalQuantity = document.getElementById('totalQuantity');
    let quantitiesProduct = document.querySelectorAll('.itemQuantity');
    let totalQuantities = 0;
    quantitiesProduct.forEach(qte =>{
        totalQuantities += Number(qte.value);
    })
    return totalQuantity.innerHTML = totalQuantities;
}

// Affiche le prix total d'articles
function SumCart () {  
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

//Activation bouton supprimer
function deleteItem () {
    const btnDelete = document.getElementsByClassName('.deleteItem');
    console.log(btnDelete);
};

deleteItem ();
