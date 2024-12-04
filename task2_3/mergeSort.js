function mergeSort(array) {
    if(array.length < 2) {
        return array;
    }

    const mid = Math.floor(array.length / 2)
    const left = array.slice(0, mid)
    const right = array.slice(mid)

    function merge(left, right) {
        const result = []
        while(left.length && right.length) {
            if(left[0] < right[0]) {
                result.push(left.shift())
            } else {
                result.push(right.shift())
            }
        }
        return result.concat(left, right)
    }
    return merge(mergeSort(left), mergeSort(right))
};
function mergeSortDesc(array) {
    if(array.length < 2) {
        return array;
    }

    const mid = Math.floor(array.length / 2)
    const left = array.slice(0, mid)
    const right = array.slice(mid)

    function merge(left, right) {
        const resultDesc = []
        while(left.length && right.length) {
            if(left[0] > right[0]) {
                resultDesc.push(left.shift())
            } else {
                resultDesc.push(right.shift())
            }
        }
        return resultDesc.concat(left, right)
    }
    return merge(mergeSortDesc(left), mergeSortDesc(right))
};
    


const array = [22, 1, 47, 13, 29, 35, 50, 241];
const result = mergeSort(array);
const resultDesc = mergeSortDesc(array);

console.log(result);
console.log(resultDesc);

