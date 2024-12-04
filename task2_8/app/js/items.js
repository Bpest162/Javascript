import { renderProductCards } from './modules/renderProduct.js';
import { addProductToCart } from './modules/addProduct.js';
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

    setupFilterForm(products);
    setuptPriceFilter(products);
    renderProductCards(products);

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
});


function setupFilterForm(products){
    const filterForm = document.querySelector('.filter-form');
    const searchField = document.querySelector('.search-input');

    filterForm.addEventListener('change', (e) =>{
        e.preventDefault();
        let name = e.target.name;
        let val = e.target.value;
        let value = searchField.value.toLowerCase();
        
        let filteredProducts = value ? filterByName(products, value) : products;

        

        renderProductCards(filteredProducts);
        setupCategoriesFilter(products, name);
        addUrlParams(name, val);
    });
};

function filterByName(products, name) {
    return products.filter((product) => {
        const title = product.name.toLowerCase();
        return title.startsWith(name);
    });
};

function setupCategoriesFilter(products, name){
    const inputCheckbox = document.querySelector(`[name="${name}"]`); 
        let value = inputCheckbox.value;
        let filteredProducts = products
        if(inputCheckbox.checked == true){
            filteredProducts =
            value === "All"
                ? products
                : products.filter((product) => product.topic == value);

                renderProductCards(filteredProducts);
            inputCheckbox.parentElement.classList.add('active'); 
        }
        else{
            inputCheckbox.parentElement.classList.remove('active');
        } 
};

function setuptPriceFilter(products){
    const rangeInput = document.querySelector('.range');
    const output = document.querySelector('.range-value');
    const prices = products.map((item) => item.price);
    const minPrice = Math.ceil(Math.min(...prices));
    const maxPrice = Math.ceil(Math.max(...prices));
    rangeInput.setAttribute("min", minPrice);
    rangeInput.setAttribute("max", maxPrice);
    rangeInput.value = minPrice;
    output.innerHTML = minPrice;
    let filteredProducts = products;

    rangeInput.addEventListener("mouseout", (event) => {
        const priceValue = event.target.value;
        output.innerHTML = priceValue;
    
        filteredProducts = products.filter(
            (product) => product.price <= priceValue
        );
        renderProductCards(filteredProducts);
    });
    rangeInput.addEventListener('input', () =>{ //на "change" цвет дорожки работает с опозданием
        let x = ((rangeInput.value - rangeInput.min) / (rangeInput.max - rangeInput.min) * 100 );
        let color = 'linear-gradient(90deg, rgb(204, 85, 32)' + x + '%, rgb(255, 255, 255)' + x + '%)';
        rangeInput.style.background = color;
    });
    
};



function addUrlParams(key, value){
    const searchParams = new URLSearchParams(window.location.search);
    searchParams.set(key, value);
    let newReletivePathQuery = window.location.pathname + '?' + searchParams.toString()
    history.pushState(null, "", newReletivePathQuery);
};

outputNumberOfProducts();
addProductToCart();

window.addEventListener('popstate', (event) => {
    let name = event.target.name
    let value = event.target.value
    setupFilterForm(name, value)
    console.log('URL changed:', window.location.href);
    console.log('state:', event.state);
});