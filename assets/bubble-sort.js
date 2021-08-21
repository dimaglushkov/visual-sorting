function bubbleSort(data){
    let i, j;
    for (i = 0; i < data.length ; i++)
        for(j = 0; j < data.length - i - 1; j++)
            if (data[j] > data[j + 1])
                [data[j], data[j + 1]] = [data[j + 1], data[j]]
    return data;
}