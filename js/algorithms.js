var x;

export async function bubbleSort(data, state){
    let i, j, len = data.length;

    x = d3.scaleLinear()
        .domain([0,d3.max(data)])
        .range([0,700]);

    for (i = 0; i < len; i++)
        drawUnselect(i);
    
    for (i = 0; i < len ; i++){
        for(j = 0; j < len - i - 1; j++){
            drawSelect(j);
            drawSelect(j + 1);
            await sleep(state.delay);

            if (data[j] > data[j + 1]){
                [data[j], data[j + 1]] = [data[j + 1], data[j]]
                drawSwapSelected(j, j + 1);
                await sleep(state.delay);
            }
            
            if (!state.running) 
                return data;
            if (state.pause)
                while (state.pause) 
                    await sleep(100);
        
            drawUnselect(j);
            drawUnselect(j + 1);
        }
        
        drawSorted(len - 1 - i);
    }
    return data;
}

export async function insertionSort(data, state){ 
    let i, j, k, key, len = data.length;
    x = d3.scaleLinear()
        .domain([0,d3.max(data)])
        .range([0,700]);

    for (i = 0; i < len; i++)
        drawUnselect(i);

    drawSorted(0);
    await sleep(state.delay);

    for (i = 1; i < len; i++){ 
        key = data[i];
        j = i - 1; 
        drawSelect(i);
        await sleep(state.delay);
        
        if (!state.running) 
            return data;
        if (state.pause)
            while (state.pause) 
                await sleep(100);

        while (j >= 0 && data[j] > key){ 
            drawAltSelect(j);
            data[j + 1] = data[j]; 
            j--;  
            await sleep(state.delay);
            
            if (!state.running) 
                return data;
            if (state.pause)
                while (state.pause) 
                    await sleep(100);
        } 
        data[j + 1] = key; 
        for (k = j + 1; k <= i; k++) 
            drawUpdate(data[k], k);

        for (k = j + 1; k <= i; k++) 
            drawSorted(k);
        
        await sleep(state.delay);
    } 
    return data;
} 

export async function selectionSort(data, state){
    let i, j, min_id, len = data.length;
    x = d3.scaleLinear()
        .domain([0,d3.max(data)])
        .range([0,700]);
    for (i = 0; i < len; i++)
        drawUnselect(i);

    for (i = 0; i < len; i++){
        min_id = i;
        drawSelect(i);
        await sleep(state.delay);
        for (j = i + 1; j < len; j++){
            drawSelect(j);
            if (data[j] < data[min_id]){
                drawUnselect(min_id);
                await sleep(state.delay);
                min_id = j;
                drawSelect(j);
            }
            else{
                drawAltSelect(j);
                if (!state.running) 
                    return data;
                if (state.pause)
                    while (state.pause) 
                        await sleep(100);
                await sleep(state.delay);
                drawUnselect(j);
            }
            if (!state.running) 
                return data;
            if (state.pause)
                while (state.pause) 
                    await sleep(100);
            
            
        }

        [data[i], data[min_id]] = [data[min_id], data[i]]
        drawSwapSelected(i, min_id);
        drawUnselect(min_id);
        drawSorted(i);
        await sleep(state.delay);
    }
    return data;

}

export async function mergeSort(data, state){
    x = d3.scaleLinear()
        .domain([0,d3.max(data)])
        .range([0,700]);

    for (let i = 0; i < data.length; i++)
        drawUnselect(i);

    await mergeSortRun(data, state);

    if (state.running)
        for (let i = 0; i < data.length; i++){
            drawUpdate(data[i], i);
            drawSorted(i);
            await sleep (state.delay);
        }
    return data;
}

async function mergeSortRun(data, state){
    if (data.length < 2) 
        return data;

    let mid =  Math.ceil(data.length / 2), i, il, ir, left, right;
    left = await mergeSortRun(data.slice(0, mid), state);
    if (left == null)
        return null;
    state.opt += mid;
    right = await mergeSortRun(data.slice(mid), state);
    if (left == null)
        return null;
    state.opt -= mid;

    if (!state.running) 
            return data;
    if (state.pause)
        while (state.pause) 
            await sleep(100);
    
    for (let i = 0; i < data.length; i++)
        drawAltSelect(state.opt + i);

    for (i = 0, il = 0, ir = 0; i < (left.length + right.length); i++){
        if (!state.running) 
            return data;
        if (state.pause)
            while (state.pause) 
                await sleep(100);

        drawSelect(state.opt + i);

        if (left[il] < right[ir] ){
            data[i] = left[il];
            await sleep(state.delay);
            drawUpdate(data[i],state.opt + i);
            il++;
        }
        else{
            data[i] = right[ir];
            await sleep(state.delay);
            drawUpdate(data[i], state.opt + i);
            ir++;
        }
        drawSorted(state.opt + i);

      	if (il == left.length)
            for (i++; ir < right.length; ir++, i++){
                if (!state.running) 
                    return data;
                if (state.pause)
                    while (state.pause) 
                        await sleep(100);
    
                await sleep(state.delay)

                data[i] = right[ir];
                drawSelect(state.opt + i);
                await sleep (state.delay);
                drawUpdate(data[i], state.opt + i);
                await sleep(state.delay);
                drawSorted(state.opt + i);
            }
        if (ir == right.length)
            for (i++; il < left.length; il++, i++){
                if (!state.running) 
                    return data;
                if (state.pause)
                    while (state.pause) 
                        await sleep(100);
                        
                await sleep(state.delay)

                data[i] = left[il];
                drawSelect(state.opt + i);  
                await sleep (state.delay); 
                drawUpdate(data[i], state.opt + i)
                await sleep (state.delay);
                drawSorted(state.opt + i);
            }
            await sleep(state.delay)

    }
    await sleep(state.delay)
    for (let i = 0; i < data.length; i++)
        drawUnselect(state.opt + i);
    
    return data;
}

export async function quickSort(data, state){
    x = d3.scaleLinear()
    .domain([0,d3.max(data)])
    .range([0,700]);

    for (let i = 0; i < data.length; i++)
        drawUnselect(i);


    await quickSortRun(data, 0, data.length - 1, state);
    if (state.running)
        for (let i = 0; i < data.length; i++){
            drawUpdate(data[i], i);
            drawSorted(i);
            await sleep (state.delay);
        }
    
    return data;
}

async function quickSortRun(data, low, high, state){
    if (low < high){
        let pi = await quickSortPartition(data, low, high, state);
        await quickSortRun(data, low, pi - 1, state);
        await quickSortRun(data, pi, high, state);
    }
}

async function quickSortPartition(data, low, high, state){
    let i=low, j=high, pivot_id = Math.floor((low + high) / 2), pivot = data[pivot_id];
    drawSelect(pivot_id);
    await sleep(state.delay);
    if (!state.running) 
        return data;
    if (state.pause)
    while (state.pause) 
        await sleep(100);
    while(i <= j) {
        while(data[i] < pivot){
            drawAltSelect(i);
            await sleep(state.delay);
            if (!state.running) 
                return data;
            if (state.pause)
            while (state.pause) 
                await sleep(100);
            drawUnselect(i);
            i++; 

        }
        if (i != pivot_id)
            drawSorted(i);
        await sleep(state.delay);

        while(data[j] > pivot){
            drawAltSelect(j);
            await sleep(state.delay);
            if (!state.running) 
                return data;
            if (state.pause)
            while (state.pause) 
                await sleep(100);
            drawUnselect(j);
            j--; 

        }
        if (j != pivot_id)
            drawSorted(j);
        await sleep(state.delay);
        if(i <= j) {
            drawSwapSelected(i, j);
            await sleep(state.delay);

            [data[i], data[j]] = [data[j], data[i]];
            i++; j--; 
        }

        if (!state.running) 
            return data;
        if (state.pause)
        while (state.pause) 
            await sleep(100);

        drawUnselect(i - 1);
        drawUnselect(j + 1);
        if (i - 1 == pivot_id) {
            drawUnselect(pivot_id);
            drawSelect(j + 1);
            pivot_id = j + 1;
        }
        if (j + 1 == pivot_id) {
            drawUnselect(pivot_id);
            drawSelect(i - 1);
            pivot_id = i - 1; 
        }

        await sleep(state.delay);
        if (!state.running) 
            return data;
        if (state.pause)
        while (state.pause) 
            await sleep(100);
    }
    drawUnselect(pivot_id);

    return i;
}

export async function heapSort(data, state){
    let n = data.length - 1;
    
    x = d3.scaleLinear()
    .domain([0,d3.max(data)])
    .range([0,700]);

    for (let i = 0; i < data.length; i++)
        drawUnselect(i);

    await heapSortCreateHeap(data, state);
    for (let i = 0; i < data.length; i++)
        drawAltSelect(i);

    await sleep(state.delay);

  	while (n > 0){
        drawSelect(0);
        await sleep(state.delay);
        if (!state.running) 
            return data;
        if (state.pause)
            while (state.pause) 
                await sleep(100);

        drawSwapSelected(0, n);
        drawSorted(n);
        await sleep(state.delay);
        if (!state.running) 
            return data;
        if (state.pause)
            while (state.pause) 
                await sleep(100);

        [data[0], data[n]] = [data[n], data[0]];
        await heapSortHeapify(data, 0, n--, state);
    }
    drawSorted(0);
    return data;
}

async function heapSortCreateHeap(data, state){
    let i = Math.floor(data.length / 2 - 1);
    while (i >= 0){
        await heapSortHeapify(data, i--, data.length, state);
    }
}

async function heapSortHeapify(data, i, n, state){
    let largest = i, il = 2 * i + 1, ir = il + 1;

    if (il < n && data[il] > data[largest])
        largest = il;
    
    if (ir < n && data[ir] > data[largest])        
        largest = ir;

    if (!state.running) 
        return data;
    if (state.pause)
        while (state.pause) 
            await sleep(100);

    if (largest != i) {
        drawSwapSelected(i, largest);
        
        [data[i], data[largest]] = [data[largest], data[i]];
        await sleep(state.delay);

        if (!state.running) 
            return data;
        if (state.pause)
            while (state.pause) 
                await sleep(100);


        await heapSortHeapify(data, largest, n, state);
    }
}

export async function radixLSDSort(data, state){
    let i, j, a, k, c, d, ith;

    x = d3.scaleLinear()
        .domain([0,d3.max(data)])
        .range([0,700]);
    
    for (i = 0; i < data.length; i++)
        drawUnselect(i);

    k = Math.max(...data).toString().length;
    

    for (i = 0; i < k; i++){
        a = Array.from(Array(10), () => new Array());

        for (j = 0; j < data.length; j++){
            drawSelect(j);
            await sleep(state.delay);
            drawUnselect(j);
            ith = digit(data[j], i);
          	a[isNaN(ith) ? 0 : ith].push(data[j]);   
            if (!state.running) 
                return data;
            if (state.pause)
            while (state.pause) 
                await sleep(100);
        }

        // this is done to make inplace changes on data. Probably not the smartest way but at least it works...
        d = new Array();
        for (j = 0; j < a.length; j++)
           	d = d.concat(a[j]);
        for (j = 0; j < data.length; j++)
            data[j] = d[j];

        for (j = 0; j < data.length; j++) { 
            drawUpdate(data[j], j);
            if (!state.running) 
                return data;
            if (state.pause)
            while (state.pause) 
                await sleep(100);
            if (i == k - 1)
                drawSorted(j);
            await sleep(state.delay);
        }
    }
    return data;
}

function digit(x, i){
    let xString = x.toString();
    return Number(xString[xString.length - 1 - i]);
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}

function drawSelect(i){
    var diagram = document.getElementById("content").childNodes;
    var elem = diagram.item(i);
    elem.style.setProperty("background", "rgb(255, 0, 255)", null);
}

function drawAltSelect(i){
    var diagram = document.getElementById("content").childNodes;
    var elem = diagram.item(i);
    elem.style.setProperty("background", "rgb(200, 200, 0)", null);
}

function drawUnselect(i, j){
    var diagram = document.getElementById("content").childNodes;
    var elem = diagram.item(i);
    elem.style.setProperty("background", "rgb(64, 0, 255)", null);
}

function drawSwapSelected(i , j){
    var diagram = document.getElementById("content").childNodes;
    var first = diagram.item(i);
    var second = diagram.item(j);
    let temp = first.style.getPropertyValue("height");
    first.style.setProperty("height", second.style.getPropertyValue("height"), null);
    second.style.setProperty("height", temp, null);
}

function drawUpdate(val, i){
    var diagram = document.getElementById("content").childNodes;
    var elem = diagram.item(i);
    elem.style.setProperty("height", x(val) + "px", null);
}


function drawSorted(i){
    var diagram = document.getElementById("content").childNodes;
    var sorted = diagram.item(i);
    sorted.style.setProperty("background", "rgb(0, 220, 0)", null);
}