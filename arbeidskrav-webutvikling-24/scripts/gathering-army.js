import WarriorModule from "./utilities/warriors.js";
import AnimalsMachinesModule from "./utilities/animals-machines.js";

const shopSection = document.getElementById("main-container");

// Her initialiserer vi ressurser i koden (gold, iron, wood) fra local storage, evt setter verdien til 0
let currentGold = parseInt(localStorage.getItem("gold")) || 0;
let currentIron = parseInt(localStorage.getItem("iron")) || 0;
let currentWood = parseInt(localStorage.getItem("wood")) || 0;

// Her displayer vi gold, iron og wood verdiene fra html elementene deres. 
document.getElementById("currentGold").textContent = currentGold;
document.getElementById("currentIron").textContent = currentIron;
document.getElementById("currentWood").textContent = currentWood;

// Denne funksjonen genererer en arme dynamisk med items. 
const createArmy = (title, items, className) => {
    return `
        <article class="${className}">
            <h3>${title}</h3>
            <div class="grid-category-columns">
            ${items.map(item => `

              <div class="${className === 'warriors' ? 'warrior-box' : className === 'animals' ? 'animal-box' : 'war-machine-box'}">

                <h4>${item.name}</h4>

                <img class="${className}-img" src="images/${item.image}" alt="${item.name}">

                <button class="buy-btn" 
                    data-id="${item.id}" 
                        data-price="${item.price}" 
                        ${className === 'war-machines' ? `data-wood="${item.woodCost}" data-iron="${item.ironCost}"` : ''}>
                        ${className === 'war-machines' ? `${item.price}g, ${item.woodCost} wood, ${item.ironCost} iron` : `${item.price}g`} 
                        <img src="images/gold-coin.png"/> 
                </button>

                <button class="refund-btn" data-id="${item.id}" data-price="${item.price}" disabled>Refund ${item.name}</button>

              </div>  

            `).join('')}
        </article>
    `;
};

// Denne funksjonen skaper en army og printer dem på siden. 
(() =>{
    const printWarriors = WarriorModule.getAll();
    const printAnimalMachines = AnimalsMachinesModule.getAnimalsMachines();

    // Dette skaper en seksjon for hver kategori også printer det til nettsiden.
    document.getElementById("warrior-section").innerHTML = createArmy('Warriors', printWarriors.warriors, 'warriors');
    document.getElementById("animal-section").innerHTML = createArmy('Animals', printAnimalMachines.animals, 'animals');
    document.getElementById("war-machine-section").innerHTML = createArmy('War Machines', printAnimalMachines.machines, 'war-machines');
})();

// Objekt for å holde track på kjøpte items
const purchasedItems = {};

const purchasedArmy = JSON.parse(localStorage.getItem("purchasedArmy")) || [];

// Eventlistener som håndterer kjøp og refunder button clicks
shopSection.addEventListener("click", (e) => {
    // Hvis en knapp er klikket, skjer følgende: 
    if (e.target.classList.contains("buy-btn")) {
        const price = parseInt(e.target.getAttribute("data-price")); // Henter pris
        const woodCost = parseInt(e.target.getAttribute("data-wood")) || 0; // Henter wood (default 0)
        const ironCost = (e.target.getAttribute("data-iron")) || 0; // Henter iron
        const refundButton = e.target.nextElementSibling; // Henter refundbutton
        const itemId = e.target.getAttribute("data-id"); // Henter itemID
        const itemName = e.target.previousElementSibling.previousElementSibling.textContent;
        const itemImage = e.target.previousElementSibling.getAttribute("src"); // Henter itemImage

        // Sjekker om du har nok ressurser til å kjøpe produktet
        if (currentGold >= price && currentWood >= woodCost && currentIron >= ironCost) {
            // Tar vekk kostnadene du har brukt
            currentGold -= price;
            currentWood -= woodCost; 
            currentIron -= ironCost; 

            // Oppdaterer ressursene etter transaksjon
            document.getElementById("currentGold").textContent = currentGold;
            document.getElementById("currentWood").textContent = currentWood;
            document.getElementById("currentIron").textContent = currentIron;

            // Oppdaterer itemcounten i objektet vi lagde over
            purchasedItems[itemId] = (purchasedItems[itemId] || 0) + 1;
            refundButton.disabled = false;

            // Legger til kjøpt unit i array
            purchasedArmy.push({
                id: itemId,
                name: itemName,
                image: itemImage,
                price: price
            });

            localStorage.setItem("purchasedArmy", JSON.stringify(purchasedArmy));

           
        } else {
            alert(`You do not have enough gold.`);
        }
    }

    // Hvis refundknappen blir trykket bruker vi mye av samme kode som ved kjøp, bare reversert. 
    if (e.target.classList.contains("refund-btn")) {
        const price = parseInt(e.target.getAttribute("data-price"));
        const buyButton = e.target.previousElementSibling;
        const woodCost = parseInt(buyButton.getAttribute("data-wood") || 0); 
        const ironCost = parseInt(buyButton.getAttribute("data-iron") || 0); 
        const itemId = buyButton.getAttribute("data-id");
    
        currentGold += price;
        currentWood += woodCost;
        currentIron += ironCost;
    
        document.getElementById("currentGold").textContent = currentGold;
        document.getElementById("currentWood").textContent = currentWood;
        document.getElementById("currentIron").textContent = currentIron;

        purchasedItems[itemId]--; // Dette decreaser itemcount    
        if (purchasedItems[itemId] === 0){
            e.target.disabled = true;
        }    

        const itemIndex = purchasedArmy.findIndex(item => item.id === itemId);
        if (itemIndex !== -1){
            purchasedArmy.splice(itemIndex, 1);
            localStorage.setItem("purchasedArmy", JSON.stringify(purchasedArmy));
        }
    }
});
