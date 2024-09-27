

let currentGold = parseInt(localStorage.getItem("gold")) || 0;
let currentIron = parseInt(localStorage.getItem("iron")) || 0;
let currentWood = parseInt(localStorage.getItem("wood")) || 0;

document.getElementById("currentGold").textContent = currentGold;
document.getElementById("currentIron").textContent = currentIron;
document.getElementById("currentWood").textContent = currentWood;

const purchasedArmy = JSON.parse(localStorage.getItem("purchasedArmy")) || [];
console.log("Purchased Army:", purchasedArmy);

const armySection = document.getElementById("army-section");

// funksjon som displayer og printer den kjøpte armeen
const displayArmy = () => {
    armySection.innerHTML = purchasedArmy.map(item => `
            <div class="army-item">
                <h4>${item.name}</h4>
                <img src="${item.image}" alt="${item.name}">
            </div>    
        `).join('');
};

displayArmy();