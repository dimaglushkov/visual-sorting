function radixLSDSort(data){
    let i, j, a, ith;

    for (i = 0; i < Math.max(...data).toString().length; i++){
        a = Array.from(Array(10), () => new Array());

        for (j = 0; j < data.length; j++){
            ith = digit(data[j], i);
          	a[isNaN(ith) ? 0 : ith].push(data[j]);   
        }

        data = [];
        for (j = 0; j < a.length; j++)
           	data = data.concat(a[j]);
    }
    return data;
}

function digit(x, i){
    let xString = x.toString();
    return Number(xString[xString.length - 1 - i]);
}