
import { outputNumberOfProducts, showCart } from './modules/basket.js';
import { emailValidate } from './modules/form.js';

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

const form = document.querySelector('.form');
const emailField = document.querySelector('.input');
form.addEventListener('submit', (event) =>{
    event.preventDefault();
    let emailVal = emailField.value;
    if(emailVal == ""){
        emailField.classList.add('input-error')
        alert('Field can not be blank');
    }else{
        emailField.classList.remove('input-error')
        emailField.classList.add('input-success')
    }
    if(!emailValidate(emailVal)){
        emailField.classList.add('input-error')
        alert('Please enter valid email address');
    }else{
        emailField.classList.remove('input-error')
        emailField.classList.add('input-success')
    }
})

outputNumberOfProducts();
