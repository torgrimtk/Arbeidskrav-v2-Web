import ArmyModule from "./utilities/units.js";

const basketItems = document.getElementById("basket-items");
const shopSection = document.getElementById("main-container");

let currentGold = parseInt(localStorage.getItem("gold")) || 0;
let currentIron = parseInt(localStorage.getItem("iron")) || 0;
let currentWood = parseInt(localStorage.getItem("wood")) || 0;

document.getElementById("currentGold").textContent = currentGold;
document.getElementById("currentIron").textContent = currentIron;
document.getElementById("currentWood").textContent = currentWood;

const purchasedItems = {};

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
                        Buy ${className === 'war-machines' ? `War Machine ${item.price}g, ${item.woodCost} wood, ${item.ironCost} iron` : `Warrior ${item.price}g`} 
                        <img src="images/gold-coin.png"/> 
                </button>

                <button class="refund-btn" data-id="${item.id}" data-price="${item.price}" disabled>Refund ${item.name}</button>

              </div>  

            `).join('')}
        </article>
    `;
};

(() =>{
    const allArmy = ArmyModule.getAll();

    document.getElementById("warrior-section").innerHTML = createArmy('Warriors', allArmy.warriors, 'warriors');
    document.getElementById("animal-section").innerHTML = createArmy('Animals', allArmy.animals, 'animals');
    document.getElementById("war-machine-section").innerHTML = createArmy('War Machines', allArmy.machines, 'war-machines');
})();

shopSection.addEventListener("click", (e) => {
    if (e.target.classList.contains("buy-btn")) {
        const price = parseInt(e.target.getAttribute("data-price"));
        const refundButton = e.target.nextElementSibling;
        const itemId = e.target.getAttribute("data-id");
        const itemName = e.target.textContent.split(" ")[1]; //Dette henter item name

        const woodCost = e.target.getAttribute("data-wood");
        const ironCost = e.target.getAttribute("data-iron");

        if (currentGold >= price && currentWood >= woodCost && currentIron >= ironCost) {
            currentGold -= price;
            currentWood -= woodCost; 
            currentIron -= ironCost; 

            document.getElementById("currentGold").textContent = currentGold;
            document.getElementById("currentWood").textContent = currentWood;
            document.getElementById("currentIron").textContent = currentIron;
            
            purchasedItems[itemId] = (purchasedItems[itemId] || 0) + 1; 
            const li = document.createElement("li");
            li.textContent = itemName; 
            basketItems.appendChild(li); //Appendchild fester det valgte itemet til basketcase

            refundButton.disabled = false;
        } else {
            alert(`You do not have enough gold.`);
        }

    }   
    
    if (e.target.classList.contains("refund-btn")) {
        const price = parseInt(e.target.getAttribute("data-price"));
        const buyButton = e.target.previousElementSibling;
        const itemId = buyButton.getAttribute("data-id");
        const itemName = buyButton.textContent.split(" ")[1];
        
        const woodCost = buyButton.getAttribute("data-wood");
        const ironCost = buyButton.getAttribute("data-iron");

        if (purchasedItems[itemId] > 0) {
            currentGold += price;
            if (woodCost && ironCost) {
                currentWood += parseInt(woodCost);
                currentIron += parseInt(ironCost);
            }

            document.getElementById("currentGold").textContent = currentGold;
            document.getElementById("currentWood").textContent = currentWood;
            document.getElementById("currentIron").textContent = currentIron;

            purchasedItems[itemId]--;
            
            const liItems = basketItems.querySelectorAll("li");
            for (let li of liItems) {
                if (li.textContent === itemName) {
                    li.remove()
                    break;
                }
            }
            if (purchasedItems[itemId] === 0) {
                e.target.disabled = true;
            }
        } 
    }
    

    });



shopSection.innerHTML = `
    <div class="grid-category-row">
    ${createArmy('Warriors', warriorsData, 'warriors')}
    </div>

    <div class="grid-category-row">
    ${createArmy('Animals', animalsData, 'animals')}
    </div>

    <div class="grid-category-row">
    ${createArmy('War Machines', machinesData, 'war-machines')}
    </div>
`;
