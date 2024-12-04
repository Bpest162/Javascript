const countriesElem = document.querySelector('.counties'),
    dropDownArrow = document.querySelector('.arrow'),
    dropDownMenu = document.querySelector('.drop-down-menu'),
    regionList = document.querySelector('#menu'),
    regions = document.querySelectorAll('.nav-menu__item'),
    dropDownText = document.querySelector('.drop-down-text'),
    searchField = document.querySelector('.src-input'),
    searchBtn = document.querySelector('.search-btn'),
    toggle = document.querySelector('.toggle'),
    toggleSpan = document.querySelector('#span'),
    countryWrap = document.querySelector('.country'),
    pacContainer = document.querySelector('.pac-container'),
    regionName = document.getElementsByClassName('region'),
    countName = document.getElementsByClassName('country-name'),
    searchForm = document.querySelector('.search-form');

window.addEventListener('load', ()=>{

    getCountry();
    initialize();
});

function initialize() {
    const autocomplete = new google.maps.places.Autocomplete(searchField);
    autocomplete.setTypes('countries');

    google.maps.event.addListener(autocomplete, 'place_changed', function () {
    }) 
};

async function getCountry(){
    const url = await fetch('https://restcountries.com/v3.1/all');
    const res = await url.json();
    
    res.forEach(element => {
        showCountry(element);
    });
};

function showCountry(data){
    const country = document.createElement('div');
    country.classList.add('country');
    country.innerHTML = `
            <div class="country-img">
                <img src="${data.flags.png}" alt="">
            </div>
            <div class="country-inf">
                <h2 class="country-name">${data.name.common}</h2>
                <p class="popul"><strong>Population:</strong> ${data.population}</p>
                <p class="region"><strong>Region:</strong> ${data.region}</p>
                <p class="capital"><strong>Capital:</strong> ${data.capital}</p>
            </div>
            `;
            countriesElem.appendChild(country);
};

regions.forEach(element =>{
    element.addEventListener('click', () =>{
        dropDownText.innerHTML = element.innerText;

        Array.from(regionName).forEach(elem =>{
            if(elem.innerText.includes(element.innerText)){
                elem.parentElement.parentElement.style.display = 'block';
            } else{
                elem.parentElement.parentElement.style.display = 'none';
            } 
        })
    })
});

searchForm.addEventListener('submit', (e) =>{
    e.preventDefault();
    
    Array.from(countName).forEach(elem =>{
        if(elem.innerText.toLowerCase().includes(searchField.value.toLowerCase())){
            elem.parentElement.parentElement.style.display = 'block';
        } else{
            elem.parentElement.parentElement.style.display = 'none';
        }
    })
    searchField.value = "";
});

dropDownMenu.addEventListener('click', () =>{
    regionList.classList.toggle('show-items');
    dropDownArrow.classList.toggle('rotate');
});

toggle.addEventListener('click', () =>{
    document.body.classList.toggle('dark');
    toggleSpan.classList.toggle('checkbox-inner-dark');
    regionList.classList.toggle('nav-menu-dark');
    regions.forEach(element => {
        element.classList.toggle('item-dark');
    })
});

