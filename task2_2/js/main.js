const btnFilter = document.querySelector('.list'),
    items = document.querySelectorAll('.card'),
    logo = document.querySelector('.header-logo');
    
    
function getAllItems(){
    logo.addEventListener('click', () => {
        getItems('card');
    });
};
getAllItems();

function filter() {
    btnFilter.addEventListener('click', event => {
        const targetId = event.target.dataset.id

        getItems(targetId);
    });
};
filter();

function getItems(className) {
    items.forEach(item => {
        if(item.classList.contains(className)) {
            item.style.display = 'flex'
        }
        else {
            item.style.display = 'none'
        }
    });
};







