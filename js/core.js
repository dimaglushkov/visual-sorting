import {bubbleSort, insertionSort, selectionSort} from './algorithms.js'

var currentAlgorithm = "Bubble sort", currentArraySize = 10, currentData = [];
var state = {
    running: false,
    pause: false,
    delay: 10
};
var algorithms = {
    "Bubble sort": bubbleSort,
    "Insertion sort": insertionSort,
    "Selection sort": selectionSort
};

window.addEventListener("DOMContentLoaded", init());

function shuffle(data, arraySize){
    // Knuth shuffle
    let i = 1, j;
    data = Array.from({length: arraySize}, () => {return i++;})
    i = arraySize;
    while (i != 0){
        j = Math.floor(Math.random() * i);
        i--;
        [data[i], data[j]] = [data[j], data[i]];
    }

    currentData = data;
    redrawDiagram(data);
}

function updateCurrentAlgorithm(algorithm){
    document.getElementById(currentAlgorithm).setAttribute("active", "false");
    currentAlgorithm = algorithm;
    document.getElementById(currentAlgorithm).setAttribute("active", "true");
}

function updateCurrentDelay(delay){
    state.delay = delay;
    document.getElementById("delayRangeValue").innerHTML = delay + " ms";
}

function updateCurrentArraySize(arraySize){
    currentArraySize = arraySize;
    document.getElementById("arraySizeRangeValue").innerHTML = arraySize;
}

function sortingStart(s){
    s.running = true;
    s.pause = false;

    document.getElementsByClassName("start")[0].innerHTML = "Pause";
    document.getElementsByClassName("shuffle")[0].innerHTML = "Stop & Shuffle";
}

function sortingStop(s){
    s.running = false;
    s.pause = false;

    document.getElementsByClassName("start")[0].innerHTML = "Start";
    document.getElementsByClassName("shuffle")[0].innerHTML = "Shuffle";
}

function sortingPause(s){
    s.running = true;
    s.pause = true;

    document.getElementsByClassName("start")[0].innerHTML = "Continue";
}

function initAlgorithmOptions(){
    var algorithmsList = document.getElementById("algorithmSubmenu");
    for (const [key, value] of Object.entries(algorithms)) {
        var newElem = document.createElement("li");
        newElem.innerHTML = "<a class=\"algorithmSubmenuOption\" href=\"#\" id =\"" + key + "\">" + key + "</a>";
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
            .style("height", function(d){
                return x(d) + "px";
            })
            .style("background", function(){
                return "hsl(255, 100%, 50%)";
            });
            
}

function init(){
    initAlgorithmOptions();

    updateCurrentAlgorithm(currentAlgorithm);
    updateCurrentDelay(state.delay);
    updateCurrentArraySize(currentArraySize);
    shuffle(currentData, currentArraySize);

    $(document).ready(function(){
        $('#sidebarCollapse').on('click', function(){
            $('#sidebar').toggleClass('active');
        });
    });

    $("a.algorithmSubmenuOption").click(function(){
        sortingStop(state);
        updateCurrentAlgorithm($(this).text());
    });
    $('input#delayRange').val(state.delay);
    $('input#delayRange').on('input change', function(){
        updateCurrentDelay($(this).val());
    });

    $('input#arraySizeRange').val(currentArraySize);
    $('input#arraySizeRange').on('input change', function(){
        updateCurrentArraySize($(this).val());
    });

    $('input#arraySizeRange').on('change', function(){
        if (!state.running)
            shuffle(currentData, currentArraySize);
    });

    $('a.shuffle').click(function(){
        sortingStop(state);
        shuffle(currentData, currentArraySize);
    });

    $('a.start').click(function(){
        if (state.running & !state.pause){
            sortingPause(state);
            return;
        }
        if (state.running & state.pause){
            sortingStart(state);
            return;
        }

        if (currentArraySize != currentData.length)
            shuffle(currentData, currentArraySize);

        sortingStart(state);
        algorithms[currentAlgorithm](currentData, state).then(function() {sortingStop(state)});
    });

}



