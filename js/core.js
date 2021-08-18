import {bubbleSort, debugSort} from './algorithms.js'

var currentAlgorithm = "Bubble sort", currentDelay = 10, currentArraySize = 10, currentData = [1, 2, 3, 4];
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
    for (let i = 0; i < data.length; i++)
    {
        let from = Math.floor(Math.random() * 1000) % arraySize, to = Math.floor(Math.random() * 1000) % arraySize;
        let temp = data[from];
        data[from] = data[to];
        data[to] = temp;
    }
    currentData = data;
    redrawDiagram(data);
}

function updateCurrentAlgorithm(algorithm){
    currentAlgorithm = algorithm
    document.getElementById("currentAlgorithm").innerHTML = algorithm

}

function updateCurrentDelay(delay){
    currentDelay = delay
    document.getElementById("delayRangeValue").innerHTML = delay + " ms"
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
            .transition(1000)
            .style("height", function(d)
            {
                return x(d) + "px";
            })
            .style("background", function() 
            {
                return "hsl(255, 100%, 50%)";
            })
            .text(" ")

}

function init(){
    initAlgorithmOptions();

    updateCurrentAlgorithm(currentAlgorithm);
    updateCurrentDelay(currentDelay);
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
    $('input#delayRange').val(currentDelay);
    $('input#delayRange').on('input change', function () {
        updateCurrentDelay($(this).val());
    });

    $('input#arraySizeRange').val(currentArraySize);
    $('input#arraySizeRange').on('input change', function () {
        updateCurrentArraySize($(this).val());
    });

    $('a.shuffle').click(function() {
        shuffle(currentData, currentArraySize);
    });

}



