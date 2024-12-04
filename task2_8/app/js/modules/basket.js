import {
    closeCart,
    quantityChange,
    removeCartItem,
    checkOut,
  } from './cartFunc.js';
const wrapper = document.querySelector('.wrapper');

let cart = [];
if (localStorage.getItem('cart')) {
    cart = JSON.parse(localStorage.getItem('cart'));
};

export function outputNumberOfProducts() {
    if (localStorage.getItem('cart')) {
        cart = JSON.parse(localStorage.getItem('cart'));
        let sum = 0;
        for(let i = 0; i < cart.length; i++){
            sum += cart[i].quantity;
            const basketCount = document.querySelector('.basket-count');
            basketCount.innerHTML = `${sum}`;
            //console.log(sum);
        }
    }
};


function createItemHTML(cartItem, item){
    return `
        <li class="basket__cards-box" id="cartId-${cartItem.id}">
            <div class="cards-box__item">
                <div class="cards-box__img-wrap">
                    <img class="cards-box__img" src="${cartItem.image}" alt="#">
                </div>
                <div class="cards-box__item-desc">
                    <p class="cards-box__item-name">${cartItem.name}</p>
                    <p class="cards-box__item-price">$${cartItem.price}</p>
                </div>
            </div>
            <div class="cards-box__btn-wrap">
                <div class="cards-box__count-wrap">
                    <button class="minus quantity_button" type="button" data-item-id="${cartItem.id}" data-button-action="minus">-</button>
                    <span class="count">${item.quantity}</span>
                    <button class="plus quantity_button" data-item-id="${cartItem.id}" data-button-action="plus">+</button>
                </div>
                <button class="remove-item" data-item-id="${cartItem.id}"><span class="remove-item__span"></span> Remove </button>
            </div>
        </li>`;
}; 

function createCartHTML(productItem){
    let itemsHTML = ``;
    let total = 0;
    cart.forEach((item) => {
        const cartItem = productItem.find((product) => item.id === product.id);
        itemsHTML += createItemHTML(cartItem, item);
        total += cartItem.price * item.quantity;
    });

    return `
            <aside class="basket">
                <div class="basket__title-box">
                    <button class="basket__close" type="button">x</button>
                    <p class="basket__text">Box</p>
                    <h2 class="basket__title">Your Bag</h2>
                </div>
                <ul class="basket-cards-wrapper">
                ${itemsHTML}           
                </ul>
                <div class="total-wrap">
                    <h2 class="total-title">Total: </h2>
                    <p class="total">$${total}</p>
                </div>
                <button class="checkout">Checkout</button>
            </aside>
            `;
};



export function showCart(productItem){
    wrapper.insertAdjacentHTML('afterend', createCartHTML(productItem));
    closeCart(wrapper);
    quantityChange(productItem, cart);
    removeCartItem(productItem, cart);
    checkOut(productItem, cart);
};

