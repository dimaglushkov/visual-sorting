function selectionSort(data){
    let i, j, min_id;
    for (i = 0; i < data.length; i++){
        min_id = i;
        for (j = i + 1; j < data.length; j++)
            if (data[j] < data[min_id])
                min_id = j;
        [data[i], data[min_id]] = [data[min_id], data[i]]
    }
    return data;
    
}