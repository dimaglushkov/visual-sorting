import {bubbleSort, debugSort} from './algorithms.js'

var currentAlgorithm = ""
var algorithms = {
    "Bubble sort": bubbleSort,
    "Debug sort": debugSort
};
window.addEventListener("DOMContentLoaded", init());


function updateCurrentAlgorithm(algorithm){
    currentAlgorithm = algorithm
    document.getElementById("currentAlgorithm").innerHTML = algorithm

}

function initAlgorithmOptions(){
    var algorithmsList = document.getElementById("algorithmSubmenu")
    for (const [key, value] of Object.entries(algorithms)) {
        var newElem = document.createElement("li");
        newElem.innerHTML = "<a class=\"algorithmSubmenuOption\" href=\"#\">" + key + "</a>";
        algorithmsList.appendChild(newElem);
    }
}

function init(){
    initAlgorithmOptions();
    updateCurrentAlgorithm("Bubble sort");
    $("a.algorithmSubmenuOption").click(function() {
        updateCurrentAlgorithm($(this).text());
    });
}



