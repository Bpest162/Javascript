const block = document.getElementById('block');
const color = document.getElementById('color');
const btn = document.getElementById('button');

const getRandomHexColor = () => {
    const hexLetters = '0123456789ABCDEF';
    let randomColor = '#';
    for (let x = 0; x < 6; x++) {
        let index = Math.floor(Math.random() * 16);
        randomColor += hexLetters[index]
    };
    return randomColor;
};

btn.addEventListener('click', () => {
    const randomColor = getRandomHexColor();
    
    block.style.backgroundColor = randomColor
    btn.style.backgroundColor = randomColor;
    color.style.color = randomColor;
    color.textContent = randomColor.slice(1);
});



