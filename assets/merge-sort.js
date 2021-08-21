function mergeSort(data){
    if (data.length < 2) 
        return data;

    let mid =  Math.ceil(data.length / 2), i, il, ir, left, right;

    left = mergeSort(data.slice(0, mid));
    right = mergeSort(data.slice(mid));

    for (i = 0, il = 0, ir = 0; i < (left.length + right.length); i++){
        if (left[il] < right[ir])
            data[i] = left[il++];
        else 
            data[i] = right[ir++];
        

      	if (il == left.length)
            for (i++; ir < right.length; ir++, i++)
                data[i] = right[ir];
        if (ir == right.length)
            for (i++; il < left.length; il++, i++)
                data[i] = left[il];
    }
    return data;
}