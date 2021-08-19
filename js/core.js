import {bubbleSort, debugSort} from './algorithms.js'

var currentAlgorithm = "Bubble sort", currentArraySize = 10, currentData = [];
var state = {
    running: false,
    stop: false,
    delay: 10
}
var algorithms = {
    "Bubble sort": bubbleSort,
    "Debug sort": debugSort
};

window.addEventListener("DOMContentLoaded", init());

function shuffle(data, arraySize){
    if (arraySize != data.length){
        let i = 1;
        data = Array.from({length: arraySize}, () => {return i++;})
    }
    // Knuth shuffle
    let i = arraySize,  j;
    while (i != 0) {
        j = Math.floor(Math.random() * i);
        i--;
        [data[i], data[j]] = [data[j], data[i]];
    }

    currentData = data;
    redrawDiagram(data);
}

function updateCurrentAlgorithm(algorithm){
    currentAlgorithm = algorithm
    document.getElementById("currentAlgorithm").innerHTML = algorithm

}

function updateCurrentDelay(delay){
    state.delay = delay;
    document.getElementById("delayRangeValue").innerHTML = delay + " ms";
}

function updateCurrentArraySize(arraySize){
    currentArraySize = arraySize
    document.getElementById("arraySizeRangeValue").innerHTML = arraySize
}

function initAlgorithmOptions(){
    var algorithmsList = document.getElementById("algorithmSubmenu")
    for (const [key, value] of Object.entries(algorithms)) {
        var newElem = document.createElement("li");
        newElem.innerHTML = "<a class=\"algorithmSubmenuOption\" href=\"#\">" + key + "</a>";
        algorithmsList.appendChild(newElem);
    }
}

function redrawDiagram(data){

    var element = document.getElementById("content");
    if (element.firstChild)
        d3.select(".chartHTML")
            .selectAll("div")
            .style("height", "0px")
            .style("margin", "0px")
            .style("padding", "0px")
            .style("border", "0px");

        function divCleaner()
        {
            while (element.firstChild)
                element.removeChild(element.firstChild);   
        }

        divCleaner();

        var x = d3.scaleLinear()
            .domain([0,d3.max(data)])
            .range([0,700]);

        d3.select(".chartHTML")
            .selectAll("div")
            .data(data)
            .enter().append("div")
            .transition(3000)
            .attr("data-value", function(d){
                return d;
            } )
            .style("height", function(d){
                return x(d) + "px";
            })
            .style("background", function(){
                return "hsl(255, 100%, 50%)";
            })
            
}

function init(){
    initAlgorithmOptions();

    updateCurrentAlgorithm(currentAlgorithm);
    updateCurrentDelay(state.delay);
    updateCurrentArraySize(currentArraySize);
    shuffle(currentData, currentArraySize);

    $(document).ready(function () {
        $('#sidebarCollapse').on('click', function () {
            $('#sidebar').toggleClass('active');
        });
    });

    $("a.algorithmSubmenuOption").click(function() {
        updateCurrentAlgorithm($(this).text());
    });
    $('input#delayRange').val(state.delay);
    $('input#delayRange').on('input change', function () {
        updateCurrentDelay($(this).val());
    });

    $('input#arraySizeRange').val(currentArraySize);
    $('input#arraySizeRange').on('input change', function () {
        updateCurrentArraySize($(this).val());
    });

    $('a.shuffle').click(function() {
        state.stop = true;
        shuffle(currentData, currentArraySize);
    });

    $('a.start').click(function() {
        if (state.running){
            state.stop = true;
            return;
        }
        state.stop = false;
        if (currentArraySize != currentData.length)
            shuffle(currentData, currentArraySize)
        algorithms[currentAlgorithm](currentData, state);
    });

}



