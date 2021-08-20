export async function bubbleSort(data, state) {
    let i, j, len = data.length;

    for (i = 0; i < len; i++)
        drawUnselect(i);
    
    for (i = 0; i < len ; i++) {
        for(j = 0; j < len - i - 1; j++) {
            drawSelect(j)
            drawSelect(j + 1)
            await sleep(state.delay);

            if (data[j] > data[j + 1]) {
                [data[j], data[j + 1]] = [data[j + 1], data[j]]
                drawSwapSelected(data, j, j + 1);
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

export async function insertionSort(data, state) { 
    let i, j, k, key, len = data.length;

    for (i = 0; i < len; i++)
        drawUnselect(i);

    drawSorted(0);
    await sleep(state.delay);

    for (i = 1; i < len; i++) { 
        key = data[i];
        j = i - 1; 
        drawSelect(i);
        await sleep(state.delay);
        
        if (!state.running) 
            return data;
        if (state.pause)
            while (state.pause) 
                await sleep(100);

        while (j >= 0 && data[j] > key) { 
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
        for (k = j + 1; k < i; k++) 
            drawSwapSelected(data, k, k + 1);

        for (k = j + 1; k <= i; k++) 
            drawSorted(k);
        
        await sleep(state.delay);
    } 
} 




function sleep(ms) {
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
    elem.style.setProperty("background", "rgb(255, 0, 0)", null);
}

function drawUnselect(i, j){
    var diagram = document.getElementById("content").childNodes;
    var elem = diagram.item(i);
    elem.style.setProperty("background", "rgb(64, 0, 255)", null);
}


function drawSwapSelected(arr, i , j){
    var diagram = document.getElementById("content").childNodes;
    var first = diagram.item(i);
    var second = diagram.item(j);
    var x = d3.scaleLinear()
            .domain([0,d3.max(arr)])
            .range([0,700]);
    first.style.setProperty("height", x(arr[i]) + "px", null);
    second.style.setProperty("height", x(arr[j]) + "px", null);
}

function drawSorted(i){
    var diagram = document.getElementById("content").childNodes;
    var sorted = diagram.item(i);
    sorted.style.setProperty("background", "rgb(0, 255, 0)", null);
}