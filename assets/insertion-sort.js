function insertionSort(data){ 
    let i, j, key;

    for (i = 1; i < data.length; i++){ 
        key = data[i];
        j = i - 1; 

        while (j >= 0 && data[j] > key){ 
            data[j + 1] = data[j]; 
            j--;
        } 
        data[j + 1] = key; 
    } 
    return data;
} 