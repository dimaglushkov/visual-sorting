function createHeap(data){
    let i = Math.floor(data.length / 2 - 1);
    while (i >= 0)
        heapify(data, i--, data.length);
    
}
  
function heapify(data, i, n){
    let largest = i, il = 2 * i + 1, ir = il + 1;

    if (il < n && data[il] > data[largest])
        largest = il;
    
    if (ir < n && data[ir] > data[largest])        
        largest = ir;
  
    if (largest != i) {
        [data[i], data[largest]] = [data[largest], data[i]];
        heapify(data, largest, n);
    }
}

function heapSort(data){
    let n = data.length - 1;
    
    createHeap(data);
  	while (n > 0){
        [data[0], data[n]] = [data[n], data[0]];
        heapify(data, 0, n--);
    }
    return data;
}