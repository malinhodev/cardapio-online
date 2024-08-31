const windowModal = document.getElementById("window-modal")
const cartBtn = document.getElementById("cart-btn")
const menu = document.getElementById("menu")
const cartItems = document.getElementById("cart-items")
const cartTotal = document.getElementById("cart-total")
const inputAddress = document.getElementById("address")
const checkoutBtn = document.getElementById("checkout-btn")
const closeModal  = document.getElementById("close-modal")
const cartCounter = document.getElementById("cart-count")
const addressWarn = document.getElementById("address-warn")

let cart = [];

//abrrir e fechar modal
cartBtn.addEventListener("click", function(){
    updateCartModal()
    windowModal.style.display = "flex";   
})
closeModal.addEventListener("click", function(){
    windowModal.style.display = "none"
})
windowModal.addEventListener("click", function(e){
    if(e.target === windowModal){
        windowModal.style.display = "none"
    }
})
//--------------------------
// logica de adcionar ao carrinho
menu.addEventListener("click",function(e){
    let parentButton = e.target.closest(".add-to-cart-btn")
    if(parentButton){
        const name = parentButton.getAttribute("data-name")
        const price = parseFloat(parentButton.getAttribute("data-price"))
        addToCart(name,price)
    }
})

//add -to- cart
function addToCart(name,price){
    const existingItem = cart.find(item => item.name === name)
    if(existingItem){
        //se o item já existir, incrementa o quantity +1
        existingItem.quantity += 1;
    }else{
        cart.push({
            name,
            price,
            quantity: 1,
        })
    }
   
    updateCartModal()
}

//atualizar carrinho
function updateCartModal(){
    cartItems.innerHTML = "";
    let total = 0
    cart.forEach(item => {
        const cartItemElement = document.createElement("div")
        cartItemElement.innerHTML = `
            <div class="cart-items">
                <div>
                    <h5>${item.name}</h5>
                    <p>Qtd: ${item.quantity}</p>
                    <p>R$ ${item.price.toFixed(2)}</p>
                </div>
                
                <button class="remove-btn" data-name="${item.name}">
                    Remover
                </button>
                
            </div>
        `
        total += item.price * item.quantity;
        cartItems.appendChild(cartItemElement);
    })

    cartTotal.textContent = total.toFixed(2);
    cartCounter.innerHTML = cart.length;
}
//---------------------------------------------

//remover item do carrinho
cartItems.addEventListener("click", function(e){
    if(e.target.classList.contains("remove-btn")){
        const name = e.target.getAttribute("data-name")
        removeItemCart(name);
    }
})

function removeItemCart(name){
    const index = cart.findIndex(item => item.name === name);
    if(index  !== -1){
        const item = cart[index];
        if(item.quantity > 1){
            item.quantity -= 1;
            updateCartModal()
            return
        }

        cart.splice(index, 1)
        updateCartModal()
    }
}
//--------------------------------

//pegando enderço
inputAddress.addEventListener("input", function(e){
    let inputValue = e.target.value;
    if(inputValue !== ""){
        addressWarn.style.display = "none";
        inputAddress.style.border = "none";
    }
})

//verificando endereço vazio e enviando o pedido
checkoutBtn.addEventListener("click",()=>{
    const isOpening = checkIsOpening();
    if(!isOpening){
        alert("Restaurante fechado!");
        return;
    }
    if(cart.length === 0) return;
    if(inputAddress.value === ""){        
        addressWarn.style.display = "block";
        inputAddress.style.border = "1px solid red";
        return;
    }
})

//verificando se está em horário de funcionamento
function checkIsOpening(){
    const data = new Date();
    const hora = data.getHours();
    return hora >= 18 && hora < 23;
}

const dateSpan = document.getElementById("date-span")
const isOpen = checkIsOpening();

if(isOpen){
    dateSpan.classList.remove("red");
    dateSpan.classList.add("green");
}else{
    dateSpan.classList.remove("green");
    dateSpan.classList.add("red");
}