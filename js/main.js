//cart open close
let cartIcon = document.querySelector("#cart-icon");
let cart = document.querySelector(".cart");
let CLOSECART = document.querySelector("#CLOSE-CART");
//open cart
cartIcon.onclick = () => {
    cart.classList.add("active")
};
// close cart
CLOSECART.onclick = () => {
    cart.classList.remove("active")
};

//MAKING ADD TO CART
// CART WORKIN JS
if (document.readyState == "loading") {
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}

//MAKING FUNCTION
function ready() {
    //REMOVE ITEM FROM CART
    var removeCartButtons = document.getElementsByClassName("cart-remove");
    for (var i = 0; i < removeCartButtons.length; i++) {
        var button = removeCartButtons[i];
        button.addEventListener("click", removeCartItem);
    }
    // QUATITY CHANGE
    var quantityInputs = document.getElementsByClassName("cart-quantity");
    for (var i = 0; i < quantityInputs.length; i++) {
        var input = quantityInputs[i];
        input.addEventListener("change", quantitychanged);
    }
    // add to cart
    var addCart = document.getElementsByClassName("add-cart");
    for (var i = 0; i < addCart.length; i++) {
        var button = addCart[i];
        button.addEventListener("click", addCartClicked);
    }
    loadCartItems();
}

// remove cart Iem
function removeCartItem(event) {
    var buttonclicked = event.target;
    buttonclicked.parentElement.remove();
    updatetotal();
    saveCartItems();
}

function quantitychanged(event) {
    var input = event.target;
    if (isNaN(input.value) || input.value <= 0) {
        input.value = 1;
    }
    updatetotal();
    saveCartItems();
}
// add cert fuction
function addCartClicked(event) {
    var button = event.target;
    var shopProducts = button.parentElement;
    var title = shopProducts.getElementsByClassName("product-title")[0].innerText;
    var price = shopProducts.getElementsByClassName("price")[0].innerText;
    var productImg = shopProducts.getElementsByClassName("product-img")[0].src;
    addproductToCart(title, price, productImg);
    updatetotal();
    saveCartItems();
}

function addproductToCart(title, price, productImg) {
    var cartshopBox = document.createElement("div");
    cartshopBox.classList.add("cart-box");
    var cartItems = document.getElementsByClassName("cart-content")[0];
    var cartItemsNames = cartItems.getElementsByClassName("cart-product-title");
    for (var i = 0; i < cartItemsNames.length; i++) {
        if (cartItemsNames[i].innerText == title) {
            alert("you have already added this item to cart");
            return;
        }
    }

    var carBoxContent = `
    <img src="${productImg}"alt=""class="cart-img"/>
        <div class="detail-box"/>
        <div class="cart-product-title" />${title}</div> 
        <div class="cart-price"/>${price}</div> 
        <input
    type="number"
    name=""
    id=""
    value="1"
    class="cart-quantity"/>
        </div>
        <!--remove Item-->
        <i class="bx bx-trash-alt cart-remove"/></i>`;
    cartshopBox.innerHTML = carBoxContent;
    cartItems.append(cartshopBox);
    cartshopBox
        .getElementsByClassName("cart-remove")[0]
        .addEventListener("click", removeCartItem);
    cartshopBox
        .getElementsByClassName("cart-quantity")[0]
        .addEventListener("change", quantitychanged);
    saveCartItems();
}
//update total
function updatetotal() {
    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart-box");
    var total = 0;
    for (var i = 0; i < cartBoxes.length; i++) {
        var cartBox = cartBoxes[i];
        var priceElement = cartBox.getElementsByClassName("cart-price")[0];
        var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
        var price = parseFloat(priceElement.innerText.replace("EG", ""));
        var quantity = quantityElement.value;
        total += price * quantity;
    }
    // IF PRICE CONTAIN SOME CETS
    total = Math.round(total * 100) / 100;
    document.getElementsByClassName("total-price")[0].innerText = "EG" + total;
    //save total to ocalstorage
    localStorage.setItem("cartTotal", total)
}

// keep item in cart when page refresh with localstore
function saveCartItems() {
    var cartContent = document.getElementsByClassName("cart-content")[0];
    var cartBoxes = cartContent.getElementsByClassName("cart-box");
    var cartItems = [];

    for (var i = 0; i < cartBoxes.length; i++) {
        cartBox = cartBoxes[i];
        var titleElement = cartBox.getElementsByClassName("cart-product-title")[0];
        var priceElement = cart.getElementsByClassName("cart-price")[0];
        var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
        var productImg = cartBox.getElementsByClassName("cart-img")[0].src

        var item = {
            title: titleElement.innerText,
            price: priceElement.innerText,
            quantity: quantityElement.value,
            productImg: productImg,
        };
        cartItems.push(item);
    }
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
}
// loads in caet
function loadCartItems() {
    var cartItems = localStorage.getItem("cartItems");
    if (cartItems) {
        cartItems = JSON.parse(cartItems);

        for (var i = 0; i < cartItems.length; i++) {
            var item = cartItems[i];
            addproductToCart(item.title, item.price, item.productImg);

            var cartBoxes = document.getElementsByClassName("cart-box");
            var cartBox = cartBoxes[cartBoxes.length - 1];
            var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0];
            quantityElement.value = item.quantity;
        }
    }
    var cartTotal = localStorage.getItem("cartTotal");
    if (cartTotal) {
        document.getElementsByClassName("total-price")[0].innerText =
            "EG" + cartTotal;
    }
}