function insertionSort(arr){
    for(i = 0; i < arr.length; i++) {
        const tmp = arr[i]
        let j = i - 1
        while(j >= 0 && arr[j] > tmp) {
            arr[j + 1] = arr[j]
            j--
        }
        arr[j + 1] = tmp
    }
    console.log(arr);
};

function insertionSortDesc(arr){
    for(i = 0; i < arr.length; i++) {
        const tmp = arr[i]
        let j = i - 1
        while(j >= 0 && arr[j] < tmp) {
            arr[j + 1] = arr[j]
            j--
        }
        arr[j + 1] = tmp
    }
    console.log(arr);
};



const array = [22, 1, 47, 13, 29, 35, 50, 241];

insertionSort(array);
insertionSortDesc(array);