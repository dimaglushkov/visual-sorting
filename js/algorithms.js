export async function bubbleSort(data, state){
    state.running = true;

    let len = data.length;
    
    for (let i = 0; i < len ; i++) 
    {
        for(let j = 0; j < len - i - 1; j++)
        {
            drawSelect(j)
            drawSelect(j + 1)
            await sleep(state.delay);

            if (data[j] > data[j + 1]) 
            {
                let temp = data[j];
                data[j] = data[j+1];
                data[j + 1] = temp;
                drawSwapSelected(data, j, j + 1);
                await sleep(state.delay);
            }
            drawUnselect(j);
            drawUnselect(j + 1);
            if (state.stop) {
                state.running = false;
                return data;
            }
        }
        
        drawSorted(data, i);
    }
    state.running = false;
    return data;
}


export async function debugSort(data, delay, stopFlag){
    let i = 0;
    while(i < 1000){
        if (stopFlag.item)
            return;
        console.log(++i);
        await sleep(1000);
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


    let temp = first.dataset.value
    first.style.setProperty("height", x(arr[i]) + "px", null);
    first.dataset.value = second.dataset.value
    second.style.setProperty("height", x(arr[j]) + "px", null);
    second.dataset.value = temp;

    
}

function drawSorted(arr, it){
    var diagram = document.getElementById("content").childNodes;
    var sorted = diagram.item(arr.length - 1 - it);
    sorted.style.setProperty("background", "rgb(0, 255, 0)", null);
}