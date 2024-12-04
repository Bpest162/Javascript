function selctionSort(array) {
    const { length } = array
    for(let i = 0; i < length - 1; i++){
        let minIndex = i;
        for(let j = i + 1; j < length; j++) {
            if(array[minIndex] > array[j]) {
                minIndex = j;
            }
        }
        if(minIndex !== i) {
            const tmp = array[i];
            array[i] = array[minIndex];
            array[minIndex] = tmp;
        }
    }
    return array;
};

function selctionSortDecs(array) {
    const { length } = array
    for(let i = 0; i < length - 1; i++){
        let minIndex = i;
        for(let j = i + 1; j < length; j++) {
            if(array[minIndex] < array[j]) {
                minIndex = j;
            }
        }
        if(minIndex !== i) {
            const tmp = array[i];
            array[i] = array[minIndex];
            array[minIndex] = tmp;
        }
    }
    return array;
};


const array = [22, 1, 47, 13, 29, 35, 50, 241];

const result = selctionSort(array);
console.log(result);

const resultDesc = selctionSortDecs(array);
console.log(resultDesc);