


let currentGold = parseInt(localStorage.getItem("gold")) || 0;
let currentIron = parseInt(localStorage.getItem("iron")) || 0;
let currentWood = parseInt(localStorage.getItem("wood")) || 0;

document.getElementById("currentIron").textContent = currentIron;
document.getElementById("currentWood").textContent = currentWood;

document.getElementById("mines-of-thiartha").addEventListener("click", function() {
    currentIron++;
    updateResources(null, currentIron, null);
});

document.getElementById("woods-of-ghalduz").addEventListener("click", function() {
    currentWood++;
    updateResources(null, currentWood, null);
});



function updateResources(gold, iron, wood) {
    if (gold !== null) {
        localStorage.setItem("gold", gold);
    }
    if (iron !== null) {
        localStorage.setItem("iron", iron);
    }
    if (wood !== null) {
        localStorage.setItem("wood", wood);
    }
    
    document.getElementById("currentIron").textContent = iron !== null ? iron : currentIron;
    document.getElementById("currentWood").textContent = wood !== null ? wood : currentWood;
};
