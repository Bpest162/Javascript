import { outputNumberOfProducts } from './basket.js';



export function closeCart(wrapper){
    wrapper.classList.add('block');
    const close = document.querySelector('.basket__close');
    const activeCart = document.querySelector('.basket');
    close.addEventListener('click', () => {
        activeCart.remove();
        wrapper.classList.remove('block');
        outputNumberOfProducts();
    });
};

export function removeCartItem(productItem, cart){
    const removeButton = document.querySelectorAll('.remove-item');
  
    for (let button of removeButton) {
        button.addEventListener('click', () => {
                const itemCardElement = document.getElementById(
                    `cartId-${button.dataset.itemId}`
                );
                const cartItem = cart.find((item) => item.id == button.dataset.itemId);
                const indexCartItem = cart.indexOf(cartItem);
        
            if (indexCartItem !== -1) {
                cart.splice(indexCartItem, 1);
                localStorage.setItem('cart', JSON.stringify(cart));
                itemCardElement.remove();
                totalChange(productItem, cart);
            }
        });
    }
};

function totalChange(productItem, cart){
    const totalValue = document.querySelector('.total');
    let total = cart.reduce((total, cartItem) => {
        const product = productItem.find((product) => cartItem.id === product.id);
        return total + product.price * cartItem.quantity;
    }, 0);
    totalValue.textContent = `$${total}`;
};

export function quantityChange(productItem, cart) {
    const quantityButtons = document.querySelectorAll('.quantity_button');
  
    for (let button of quantityButtons) {
        button.addEventListener('click', () => {
            const itemCardElement = document.getElementById(
            `cartId-${button.dataset.itemId}`
            );
            const counter = itemCardElement.querySelector('.count');
    
            let cartItem = cart.find((item) => item.id == button.dataset.itemId);
  
            if (button.dataset.buttonAction == 'plus') {
                cartItem.quantity++;
            } else if (button.dataset.buttonAction == 'minus') {
                cartItem.quantity--;
            }
  
            if (cartItem.quantity == 0) {
                const indexCartItem = cart.indexOf(cartItem);
    
                if (indexCartItem !== -1) {
                    cart.splice(indexCartItem, 1);
                    itemCardElement.remove();
                }
            } else {
                counter.innerText = cartItem.quantity;
            }
            localStorage.setItem('cart', JSON.stringify(cart));
            totalChange(productItem, cart);
      });
    }
};

export function checkOut(productItem, cart) {
    const checkOutButton = document.querySelector('.checkout');
    checkOutButton.addEventListener('click', () => {
        const cartItems = document.querySelector('.basket-cards-wrapper');
    
        cartItems.innerHTML = '';
        cart.splice(0, cart.length);
        localStorage.setItem('cart', JSON.stringify(cart));
        totalChange(productItem, cart);
        alert('Your order was sent');
    });
};