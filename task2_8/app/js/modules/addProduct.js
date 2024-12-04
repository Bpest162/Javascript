import { outputNumberOfProducts } from './basket.js';

export function addProductToCart() {
    const productCards = document.querySelector('.items__cards');
  
    productCards.addEventListener('click', (event) => {
        if (event.target.classList.contains('cards__btn')) {
            const quantity = 1;
            const id = event.target.id;
            let cart = [];
    
            if (localStorage.getItem('cart')) {
            cart = JSON.parse(localStorage.getItem('cart'));
            const existingProduct = cart.find((item) => item.id === id);
    
            if (existingProduct) {
                existingProduct.quantity += 1;
            } else {
                cart.push({ id, quantity });
            }
    
            localStorage.setItem('cart', JSON.stringify(cart));
            } else {
            cart.push({ id, quantity });
            localStorage.setItem('cart', JSON.stringify(cart));
            }
            outputNumberOfProducts();
        }
        
    });
};


