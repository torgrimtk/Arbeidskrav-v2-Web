const warriorsData = [
    { id: 0, name: "Berserker", image: "warrior-2.jpg", price: 1000 },
    { id: 1, name: "Shieldmaiden", image: "warrior-1.jpg", price: 800 },
    { id: 2, name: "Colossus", image: "warrior-3.jpg", price: 800 },
    { id: 3, name: "Warrior", image: "warrior-4.jpg", price: 700 },
    { id: 4, name: "Rogue", image: "warrior-5.jpg", price: 1500 },
    { id: 5, name: "Druid", image: "warrior-6.jpg", price: 400 },
    { id: 6, name: "Warlock", image: "warrior-1.jpg", price: 300 },
    { id: 7, name: "Healer", image: "warrior-2.jpg", price: 350 }
];

const animalsData = [
    { id: 0, name: "Horse", image: "horse.png", price:350},
    { id: 1, name: "Elephant", image: "elephant.png", price:400},
    { id: 2, name: "Horse", image: "horse.png", price:350},
    { id: 3, name: "Elephant", image: "elephant.png", price:400}
];

const machinesData = [
    { id: 0, name: "Catapult", image: "catapult.png", price: 1200, woodCost: 400, ironCost: 100 },
    { id: 1, name: "Cannon", image: "cannon.png", price: 1200, woodCost: 100, ironCost: 300 },
    { id: 2, name: "Catapult", image: "catapult.png", price: 700, woodCost: 400, ironCost: 100 },
    { id: 3, name: "Cannon", image: "cannon.png", price: 800, woodCost: 100, ironCost: 300 }
];



const shopSection = document.getElementById("main-container");

let currentGold = parseInt(localStorage.getItem("gold")) || 0;
let currentIron = parseInt(localStorage.getItem("iron")) || 0;
let currentWood = parseInt(localStorage.getItem("wood")) || 0;

document.getElementById("currentGold").textContent = currentGold;
document.getElementById("currentIron").textContent = currentIron;
document.getElementById("currentWood").textContent = currentWood;


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

shopSection.addEventListener("click", (e) => {
    if (e.target.classList.contains("buy-btn")) {
        const price = parseInt(e.target.getAttribute("data-price"));
        const woodCost = e.target.getAttribute("data-wood" || 0);
        const ironCost = e.target.getAttribute("data-iron" || 0);
        const refundButton = e.target.nextElementSibling;


        if (currentGold >= price && currentWood >= woodCost && currentIron >= ironCost) {
            currentGold -= price;
            currentWood -= woodCost; 
            currentIron -= ironCost; 

            document.getElementById("currentGold").textContent = currentGold;
            document.getElementById("currentWood").textContent = currentWood;
            document.getElementById("currentIron").textContent = currentIron;

            refundButton.disabled = false;
        } else {
            alert(`You do not have enough gold.`);
        }
    }   
    
    if (e.target.classList.contains("refund-btn")) {
        const price = parseInt(e.target.getAttribute("data-price"));
        const buyButton = e.target.previousElementSibling;
        const woodCost = parseInt(buyButton.getAttribute("data-wood") || 0); 
        const ironCost = parseInt(buyButton.getAttribute("data-iron") || 0); 
    
        currentGold += price;
        currentWood += woodCost;
        currentIron += ironCost;
    
        document.getElementById("currentGold").textContent = currentGold;
        document.getElementById("currentWood").textContent = currentWood;
        document.getElementById("currentIron").textContent = currentIron;

        e.target.disabled = true;
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
