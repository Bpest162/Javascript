function bubbleSortAsc(arr) {
    for(i = 0; i < arr.length; i++) {
        for(j = 0; j < arr.length; j++) {
            if(arr[j] > arr[j + 1]){
                const tmp = arr[j]
                arr[j] = arr[j + 1];
                arr[j + 1] = tmp;
            }
        }
    }
    console.log(arr);
};
function bubbleSortDesc(arr) {
    for(i = 0; i < arr.length; i++) {
        for(j = 0; j < arr.length; j++) {
            if(arr[j] < arr[j + 1]){
                const tmp = arr[j]
                arr[j] = arr[j + 1];
                arr[j + 1] = tmp;
            }
        }
    }
    console.log(arr);
};


const array = [22, 1, 47, 13, 29, 35, 50, 241];

bubbleSortAsc(array);
bubbleSortDesc(array);
