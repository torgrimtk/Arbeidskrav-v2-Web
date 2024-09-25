let currentGold = parseInt(localStorage.getItem("gold")) || 0;
let currentIron = parseInt(localStorage.getItem("iron")) || 0;
let currentWood = parseInt(localStorage.getItem("wood")) || 0;


document.getElementById("currentGold").textContent = currentGold;
document.getElementById("currentIron").textContent = currentIron;
document.getElementById("currentWood").textContent = currentWood;

document.getElementById("mines-of-thiartha").addEventListener("click", function() {
    currentIron++;
    updateResources(currentGold, currentIron, currentWood);
});

document.getElementById("woods-of-ghalduz").addEventListener("click", function() {
    currentWood++;
    updateResources(currentGold, currentIron, currentWood);
});

document.querySelector(".sell-iron").addEventListener("click", function() {
    if(currentIron > 0) {
        currentIron --;
        currentGold += 1;
        updateResources(currentGold, currentIron, currentWood);
    } else{
        alert("You  have no iron to sell.")
    }
});
document.querySelector(".sell-wood").addEventListener("click", function(){
    if(currentWood > 0) {
        currentWood --;
        currentGold += 1;
        updateResources(currentGold, currentIron, currentWood);
    } else{
        alert("You have no wood to sell")
    }
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
    
    document.getElementById("currentGold").textContent = gold;
    document.getElementById("currentIron").textContent = iron;
    document.getElementById("currentWood").textContent = wood;
};

//Knapp for å cleare localStorage
document.getElementById("clear-local-storage").addEventListener("click", function(){
    localStorage.clear();
    currentGold = 0;
    currentIron = 0;
    currentWood = 0;
    updateResources(currentGold, currentIron, currentWood);
});
