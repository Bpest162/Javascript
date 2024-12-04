function quickSort (array) {
    if(array.length < 2){
        return array;
    }

    const pivot = array[0];
    const less = [];
    const greater = [];

    for(let i = 1; i < array.length; i++ ){
        if(array[i] <= pivot) {
            less.push(array[i]);
        } else {
            greater.push(array[i]);
        }
    }
    return [...quickSort(less), pivot, ...quickSort(greater)]
};

function quickSortDesc (array) {
    if(array.length < 2){
        return array;
    }

    const pivot = array[0];
    const less = [];
    const greater = [];

    for(let i = 1; i < array.length; i++ ){
        if(array[i] >= pivot) {
            less.push(array[i]);
        } else {
            greater.push(array[i]);
        }
    }
    return [...quickSortDesc(less), pivot, ...quickSortDesc(greater)]
}

const array = [22, 1, 47, 13, 29, 35, 50, 241];

console.log(quickSort(array));
console.log(quickSortDesc(array));