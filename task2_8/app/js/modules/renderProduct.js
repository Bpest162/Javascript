const productCards = document.querySelector('.items__cards');

function createProductHTML(product) {
    const productHTML = `
        <div class="cards " data-product-id="${product.id}"> 
            <div class="cards__img-wrap">
                <button class="cards__btn" id="${product.id}" type="button"><span>+</span>add</button>
                <img class="cards__img" src="${product.image}" alt="">
            </div>
            <div class="cards__desc">
                <p class="cards__name">${product.name}</p>
                <p class="cards__price">$${product.price}</p>
                <div class="cards__rating" id="cards__rating">
                    <span class="cards__rating-item rating-active" data-rate="1">&#9733;</span>
                    <span class="cards__rating-item" data-rate="2">&#9733;</span>
                    <span class="cards__rating-item" data-rate="3">&#9733;</span>
                    <span class="cards__rating-item" data-rate="4">&#9733;</span>
                    <span class="cards__rating-item" data-rate="5">&#9733;</span>
                </div>
                <p class="cards__topic">${product.topic}</p>
            </div>   
        </div>
        `;
        return productHTML;
  
};
export function renderProductCards(products){
    let resultHTML = products
        .map((product) => createProductHTML(product))
        .join('');
    productCards.innerHTML = resultHTML;
};