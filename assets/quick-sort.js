function quickSort(data, low, high) {
    if (low < high){
        let pi = partition(data, low, high);
        quickSort(data, low, pi - 1);
        quickSort(data, pi + 1, high);
    }
}

function partition(data, low, high) {
    // hoare partition
    let i=low, j=high, pivot = data[Math.floor((low + high) / 2)];
    while(i <= j) {
        while(data[i] < pivot)  
            i++; 
        while(data[j] > pivot)  
            j--; 
        if(i <= j) {
            [data[i], data[j]] = [data[j], data[i]];
            i++; j--; 
        }
    }
    return i;
}