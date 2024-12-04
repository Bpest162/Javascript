import { outputNumberOfProducts, showCart } from './modules/basket.js';

let productItem = [];
//console.log(productItem);
async function getData() {
    const res = await fetch(`../server/card.json`);
    const data = await res.json();
    return data
};

async function render(){
    const { products } = await getData();
    productItem = products
    console.log(products)
};
render();
const hamburger = document.querySelector('.hamburger');
const dropDownMenu = document.querySelector('.menu');
hamburger.addEventListener('click', () =>{
    dropDownMenu.classList.toggle('show-items');
});

const closeButton = document.querySelector('.close');
closeButton.addEventListener('click', () =>{
    dropDownMenu.classList.remove('show-items');
});

const basketIcon = document.querySelector('.basket-icon');
basketIcon.addEventListener('click', () =>{
    showCart(productItem);
    //console.log('hi');
});

outputNumberOfProducts();